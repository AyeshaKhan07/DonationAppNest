// import { ApiModelProperty } from '@nestjs/swagger';
import { MIN_LENGTHS } from 'src/constants';
import { IsEmail, IsString, IsNotEmpty, MinLength } from 'class-validator';
import { EmailNotExists } from 'src/validation-rules/email-exists.rule';

export class CreateUserDto {

  @IsNotEmpty()
  @IsString()
  @MinLength(MIN_LENGTHS.NAME)
  readonly firstName: string

  @IsNotEmpty()
  @IsString()
  @MinLength(MIN_LENGTHS.NAME)
  readonly lastName: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(MIN_LENGTHS.CONTACT)
  readonly contact: string;
  
  @IsNotEmpty()
  @IsEmail()
  @EmailNotExists()
  readonly email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(MIN_LENGTHS.PASSWORD)
  readonly password: string;
}