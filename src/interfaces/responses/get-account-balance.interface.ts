import { ResponseData } from "../response-data.interface";

export interface GetAccountBalanceResponse extends ResponseData<{
    available_balance:    string;
    pending_withdrawals:  string;
    withdrawable_balance: string;
    couponable_balance:   string;
}> {}