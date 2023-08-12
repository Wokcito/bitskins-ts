import { ResponseData } from "../response-data.interface";

export interface CancelBuyOrdersResponse extends ResponseData<{
    app_id:        string;
    context_id:    string;
    num:           number;
    buy_order_ids: string[];
}> {}