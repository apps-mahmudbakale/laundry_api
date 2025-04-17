import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { SubscriptionService } from './subscription.service';

@Controller('subscriptions')
export class SubscriptionController {
  constructor(private readonly subscriptionsService: SubscriptionService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async subscribe(
      userId: number,
      packageId: number,
      paymentReference: string, plateNumbers: string[]) {
    return this.subscriptionsService.subscribeUser(userId, packageId, paymentReference, plateNumbers);
  }
}
