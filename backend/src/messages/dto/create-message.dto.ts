import {ApiProperty} from "@nestjs/swagger";
import {IsNotEmpty} from "class-validator";

export class CreateMessageDto {
    @ApiProperty() @IsNotEmpty()
    from: number;
    @ApiProperty() @IsNotEmpty()
    to: number;
    @ApiProperty() @IsNotEmpty()
    payload: string;
}