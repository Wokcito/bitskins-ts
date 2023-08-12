import { ResponseData } from "../response-data.interface";
import { BuyItemItem } from "../items/buy-item.interface";

export interface BuyItemResponse extends ResponseData<{
    items:        BuyItemItem[];
    trade_tokens: string[];
}> {}