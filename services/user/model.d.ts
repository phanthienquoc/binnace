enum OTP_METHOD {
  PHONE = 'PHONE',
  EMAIL = 'EMAIL',
  TOTP = 'TOTP',
}
export interface IUser {
  user_id?: string;
  merchant_id?: string;
  phone?: string;
  email?: string;
  detail_info?: string;
  state?: string;
  first_name?: string;
  last_name?: string;
  country?: string;
  gender?: string;
  date_of_birth?: string;
  passport_number?: string;
  issued_date?: string;
  description?: string;
  avatar?: string;
  address?: string;
  enable_2fa?: boolean;
  created_at?: string;
  updated_at?: string;
  role?: string;
  otp_method?: OTP_METHOD;
}

export { IUser };
