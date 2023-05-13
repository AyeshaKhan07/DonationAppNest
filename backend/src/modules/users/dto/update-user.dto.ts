// import { ApiModelPropertyOptional } from '@nestjs/swagger';
// import {
//   IsEmail,
//   IsString,
//   IsNotEmpty,
//   IsOptional,
//   IsBoolean,
//   IsEnum,
// } from 'class-validator';
// import { UserRoles } from '../../shared/user-roles';

export class UpdateUserDto {
//   @ApiModelPropertyOptional()
//   @IsString()
//   @IsNotEmpty()
//   @IsOptional()
  readonly username?: string;

//   @ApiModelPropertyOptional()
//   @IsString()
//   @IsNotEmpty()
//   @IsOptional()
  readonly firstName?: string;

//   @ApiModelPropertyOptional()
//   @IsBoolean()
//   @IsNotEmpty()
//   @IsOptional()
  readonly lastName?: string;

//   @ApiModelPropertyOptional({
//     enum: UserRoles,
//   })
//   @IsNotEmpty()
//   @IsEnum(UserRoles)
//   @IsOptional()
//   readonly role?: UserRoles;
}