import { Contains, IsNumberString, IsString } from 'class-validator';

export class AppAuthQueryDto {
  @IsNumberString()
  @Contains(process.env.APP_ID)
  vk_app_id: string;

  @IsNumberString()
  vk_user_id: string;

  @IsString()
  sign: string;
}
