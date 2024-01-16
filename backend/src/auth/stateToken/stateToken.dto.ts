import { IsNotEmpty, IsUUID } from 'class-validator';

export class StateTokenDto {
  @IsUUID()
  @IsNotEmpty()
  state: string;
}
