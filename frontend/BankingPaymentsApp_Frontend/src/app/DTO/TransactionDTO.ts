export interface TransactionDTO {
  transactionId: number;
  accountNumber?: string;
  clientUserName?: string;
  paymentId?: number | null;
  salaryDisbursementId?: number | null;
  toFrom?: string;
  transactionTypeId: number;
  amount: number;
  createdAt: string; // ISO string from backend
}
