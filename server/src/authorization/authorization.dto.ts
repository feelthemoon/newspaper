import { IsEmail, MinLength } from 'class-validator';

export class AuthorizationDto {
  @IsEmail({}, { message: 'Некорректный email' })
  email: string;
  @MinLength(8, { message: 'Минимальная длина пароля - 8 символов' })
  password: string;
  rememberMe?: boolean;
}
