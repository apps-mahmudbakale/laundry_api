<?php

namespace App\Http\Controllers\Api;

use Carbon\Carbon;
use App\Models\User;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Validator;

/**
 * @OA\Info(
 *     title="My Laravel API",
 *     version="1.0.0",
 *     description="Authentication API with OTP and Sanctum"
 * )
 *
 * @OA\SecurityScheme(
 *     type="http",
 *     description="Use bearer token for authentication",
 *     name="Authorization",
 *     in="header",
 *     scheme="bearer",
 *     bearerFormat="JWT",
 *     securityScheme="bearerAuth"
 * )
 */
class AuthController extends Controller
{
    private function generateOtp()
    {
        $otp = rand(1000, 9999);
        $otpExpires = Carbon::now()->addMinutes(10);
        return [$otp, $otpExpires];
    }

    private function sendOtpEmail($email, $otp)
    {
        Mail::raw("Your OTP code is {$otp}", function ($message) use ($email) {
            $message->to($email)->subject('Your OTP Code');
        });
    }

    /**
     * @OA\Post(
     *     path="/api/signup",
     *     summary="Sign up with OTP verification",
     *     tags={"Authentication"},
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *             required={"name","email","password"},
     *             @OA\Property(property="name", type="string", example="John Doe"),
     *             @OA\Property(property="email", type="string", format="email", example="john@example.com"),
     *             @OA\Property(property="password", type="string", format="password", example="password123")
     *         )
     *     ),
     *     @OA\Response(response=201, description="User registered and OTP sent")
     * )
     */
    public function signup(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name'     => 'required|string',
            'email'    => 'required|email|unique:users,email',
            'password' => 'required|string|min:6',
        ]);
        if ($validator->fails()) return response()->json($validator->errors(), 422);

        [$otp, $otpExpires] = $this->generateOtp();

        $user = User::create([
            'name'        => $request->name,
            'email'       => $request->email,
            'password'    => Hash::make($request->password),
            'otp'         => $otp,
            'otp_expires' => $otpExpires,
        ]);

        $this->sendOtpEmail($user->email, $otp);

        return response()->json(['id' => $user->id, 'name' => $user->name, 'email' => $user->email], 201);
    }

    /**
     * @OA\Post(
     *     path="/api/resend-otp",
     *     summary="Resend OTP to email",
     *     tags={"Authentication"},
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *             required={"email"},
     *             @OA\Property(property="email", type="string", format="email", example="john@example.com")
     *         )
     *     ),
     *     @OA\Response(response=200, description="OTP resent successfully")
     * )
     */
    public function resendOtp(Request $request)
    {
        $user = User::where('email', $request->email)->first();
        if (!$user) return response()->json(['error' => 'User not found'], 404);

        [$otp, $otpExpires] = $this->generateOtp();
        $user->update(['otp' => $otp, 'otp_expires' => $otpExpires]);

        $this->sendOtpEmail($user->email, $otp);

        return response()->json(['message' => 'OTP resent successfully']);
    }

    /**
     * @OA\Post(
     *     path="/api/verify-otp",
     *     summary="Verify OTP and get token",
     *     tags={"Authentication"},
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *             required={"email","otp"},
     *             @OA\Property(property="email", type="string", example="john@example.com"),
     *             @OA\Property(property="otp", type="integer", example=1234)
     *         )
     *     ),
     *     @OA\Response(response=200, description="OTP verified and token issued")
     * )
     */
    public function verifyOtp(Request $request)
    {
        $user = User::where('email', $request->email)->first();
        if (!$user) return response()->json(['error' => 'User not found'], 404);

        if ($user->otp !== $request->otp || Carbon::now()->gt($user->otp_expires)) {
            return response()->json(['error' => 'Invalid or expired OTP'], 400);
        }

        $user->update(['otp' => null, 'otp_expires' => null]);

        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json(['token' => $token, 'user' => $user]);
    }

    /**
     * @OA\Post(
     *     path="/api/login",
     *     summary="Login with email and password",
     *     tags={"Authentication"},
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *             required={"email","password"},
     *             @OA\Property(property="email", type="string", example="john@example.com"),
     *             @OA\Property(property="password", type="string", format="password", example="password123")
     *         )
     *     ),
     *     @OA\Response(response=200, description="Login successful")
     * )
     */
    public function login(Request $request)
    {
        $user = User::where('email', $request->email)->first();
        if (!$user || !Hash::check($request->password, $user->password)) {
            return response()->json(['error' => 'Invalid email or password'], 401);
        }

        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json(['token' => $token, 'user' => $user]);
    }

    /**
     * @OA\Post(
     *     path="/api/admin-login",
     *     summary="Admin login",
     *     tags={"Authentication"},
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *             required={"email","password"},
     *             @OA\Property(property="email", type="string", example="admin@example.com"),
     *             @OA\Property(property="password", type="string", format="password", example="password123")
     *         )
     *     ),
     *     @OA\Response(response=200, description="Admin login successful"),
     *     @OA\Response(response=403, description="Access denied")
     * )
     */
    public function adminLogin(Request $request)
    {
        $user = User::where('email', $request->email)->first();
        if (!$user || $user->role !== 'admin') {
            return response()->json(['error' => 'Access denied'], 403);
        }

        if (!Hash::check($request->password, $user->password)) {
            return response()->json(['error' => 'Invalid email or password'], 401);
        }

        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json(['token' => $token, 'user' => $user]);
    }

    /**
     * @OA\Post(
     *     path="/api/save-location",
     *     summary="Save user location",
     *     tags={"User"},
     *     security={{"bearerAuth":{}}},
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *             required={"latitude","longitude","address"},
     *             @OA\Property(property="latitude", type="string", example="37.7749"),
     *             @OA\Property(property="longitude", type="string", example="-122.4194"),
     *             @OA\Property(property="address", type="string", example="San Francisco, CA")
     *         )
     *     ),
     *     @OA\Response(response=200, description="Location updated successfully")
     * )
     */
    public function saveLocation(Request $request)
    {
        $user = Auth::user();
        if (!$user) {
            return response()->json(['error' => 'User not found'], 404);
        }

        $user->update([
            'lat'     => $request->latitude,
            'long'    => $request->longitude,
            'address' => $request->address,
        ]);

        return response()->json(['message' => 'Location updated successfully']);
    }

    /**
     * @OA\Post(
     *     path="/api/forgot-password-otp",
     *     summary="Send forgot password OTP",
     *     tags={"Password"},
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *             required={"email"},
     *             @OA\Property(property="email", type="string", example="john@example.com")
     *         )
     *     ),
     *     @OA\Response(response=200, description="OTP sent successfully")
     * )
     */
    public function sendForgotPasswordOtp(Request $request)
    {
        $user = User::where('email', $request->email)->first();
        if (!$user) return response()->json(['error' => 'Email not found'], 400);

        [$otp, $otpExpires] = $this->generateOtp();
        $user->update(['otp' => $otp, 'otp_expires' => $otpExpires]);

        $this->sendOtpEmail($user->email, $otp);

        return response()->json(['message' => 'OTP sent successfully']);
    }

    /**
     * @OA\Post(
     *     path="/api/reset-password",
     *     summary="Reset password with OTP",
     *     tags={"Password"},
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *             required={"email","new_password"},
     *             @OA\Property(property="email", type="string", example="john@example.com"),
     *             @OA\Property(property="new_password", type="string", format="password", example="newpass123")
     *         )
     *     ),
     *     @OA\Response(response=200, description="Password reset successfully")
     * )
     */
    public function resetPassword(Request $request)
    {
        $user = User::where('email', $request->email)->first();
        if (!$user) return response()->json(['error' => 'User not found'], 404);

        $user->update(['password' => Hash::make($request->new_password)]);

        return response()->json(['success' => true, 'message' => 'Password reset successfully']);
    }
}
