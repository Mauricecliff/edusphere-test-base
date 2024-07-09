import { ApiProperty } from "@nestjs/swagger";

export class ApiResponseDTO{
    @ApiProperty({type:"integer",default:200})
    statusCode: number;

    @ApiProperty({type:"string"})
    message: string|string[];
}