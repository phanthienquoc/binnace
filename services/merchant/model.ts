interface WalletAccountInfo {
  [key: string]: string;
}

export interface AddressConfig {
  [key: string]: string;
}

enum MERCHANT_ROLE {
  ADMIN = 'ADMIN',
  ACCOUNTANT = 'ACCOUNTANT',
  SUPPORT = 'SUPPORT',
}

enum MERCHANT_LEVEL {
  ONE = '1',
  TWO = '2',
  THREE = '3',
}

export interface IMerchantProfile {
  merchant_id: string;
  merchant_name: string;
  business_industry: string;
  country: string;
  role: MERCHANT_ROLE;
  emergency_email: string;
  emergency_phone: string;
  tax_id_number: string;
  business_license: string;
  state: string;
  level: MERCHANT_LEVEL;
  description: string;
  merchant_category: string;
  business_registration: string;
  address: string;
  created_at: string;
  updated_at: string;
  address_config: AddressConfig;
  wallet_account_info: WalletAccountInfo;
  store_limit: number;
}
