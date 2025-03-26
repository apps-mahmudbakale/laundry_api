import { PartialType } from '@nestjs/mapped-types';
import { CreateLaunderDTO } from './create-launder.dto';

export class UpdateLaunderDTO extends PartialType(CreateLaunderDTO) {}
