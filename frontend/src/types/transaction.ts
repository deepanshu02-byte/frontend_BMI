
export interface ITransactionInput {
  fromAccountId: string;
  toAccountNumber?: string;
  toMobileNumber?: string;
  accountHolderName?: string; // optional unless validated server-side
  amount: number;
  transactionType: "transfer";
}

export interface ITransactionResponse {
  _id: string;
  fromAccountId: string;
  toAccountNumber: string;
  amount: number;
  transactionType: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  // Optional additions:
  toMobileNumber?: string;
  accountHolderName?: string;
}
