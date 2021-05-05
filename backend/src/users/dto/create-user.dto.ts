import {IsNotEmpty} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

export class CreateUserDto {
  @ApiProperty() @IsNotEmpty()
  username: string;
  @ApiProperty() @IsNotEmpty()
  password: string;
  @ApiProperty() @IsNotEmpty()
  first_name: string;
  @ApiProperty() @IsNotEmpty()
  last_name: string;
  @ApiProperty() @IsNotEmpty()
  email: string;
  @ApiProperty() @IsNotEmpty()
  city: string;
}