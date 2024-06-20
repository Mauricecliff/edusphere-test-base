import { ApiPropertyOptional } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';
import { IsEmail, IsOptional } from 'class-validator';

export class GetStudentsRequestDTO {
  @ApiPropertyOptional({ type: 'Email equal to value' })
  @IsEmail()
  @IsOptional()
  email_eq?: string;

  @ApiPropertyOptional({ type: 'Email not equal to value' })
  @IsOptional()
  email_not?: string;

  @ApiPropertyOptional({ type: 'Email string contains value' })
  @IsOptional()
  email_contains?: string;

  @ApiPropertyOptional({ type: 'Email string starts with value' })
  @IsOptional()
  email_starts_with?: string;

  @ApiPropertyOptional({ type: 'Email string ends with value' })
  @IsOptional()
  email_ends_with?: string;

  @ApiPropertyOptional({ type: 'How email string should be treated: as insensitive or not' })
  @IsOptional()
  email_query_mode?: Prisma.QueryMode

  year_eq: number;
  year_not: number;
  years_in: Array<number>;
  years_not_in: Array<number>;
}

/**
 * 
 * 
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
 */
