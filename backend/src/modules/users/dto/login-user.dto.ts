import { MIN_LENGTHS } from 'src/constants';
import { IsString, IsNotEmpty, MinLength } from 'class-validator';

export class LoginUserDto {

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
  
}