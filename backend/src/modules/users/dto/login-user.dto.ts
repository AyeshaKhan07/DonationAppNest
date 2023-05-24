import { MIN_LENGTHS } from 'src/constants';
import { IsEmail, IsString, IsNotEmpty, MinLength } from 'class-validator';

export class LoginUserDto {
    @IsNotEmpty()
    @IsEmail()
    readonly email: string;
  
    @IsNotEmpty()
    @IsString()
    @MinLength(MIN_LENGTHS.PASSWORD)
    readonly password: string;
}