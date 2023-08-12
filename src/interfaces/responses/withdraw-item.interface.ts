import { WithdrawItemItem } from "../items/withdraw-item.interface";
import { ResponseData } from "../response-data.interface";

export interface WithdrawItemResponse extends ResponseData<{
    items:        WithdrawItemItem[];
    trade_tokens: string[];
}> {}