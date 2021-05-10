import {ApiProperty} from "@nestjs/swagger";
import {IsNotEmpty} from "class-validator";

export class CreateMessageDto {
    @ApiProperty() @IsNotEmpty()
    from: string;
    @ApiProperty() @IsNotEmpty()
    to: string;
    @ApiProperty() @IsNotEmpty()
    payload: string;
}