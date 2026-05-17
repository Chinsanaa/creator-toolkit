export interface WalletSummary {
  availableBalanceMnt: number;
  pendingPayoutMnt: number;
  totalEarnedMnt: number;
  totalFeesMnt: number;
  totalPaidOutMnt: number;
  platformFeeRate: number;
  minPayoutMnt: number;
}

export interface WalletTransaction {
  id: string;
  type: string;
  amount_mnt: number;
  currency: string;
  status: string;
  description: string | null;
  reference_type: string | null;
  reference_id: string | null;
  bank_account_id: string | null;
  created_at: string;
}

export interface BankAccount {
  id: string;
  bank_name: string;
  account_number: string;
  account_holder_name: string;
  is_default: boolean;
  verified: boolean;
  created_at: string | null;
}
