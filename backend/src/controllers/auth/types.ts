export interface IAuth {
  user_id: number;
  name: string;
  email: string;
  username: string;
  password: string;
  bio?: string;
  profile?: string;
  otp?: string;
  otp_expiry?: Date;
  is_verified?: boolean;
}
