import { ResponseData } from "../response-data.interface";
import { GetMarketDataItem } from "../items/get-market-data.interface";

export interface GetMarketDataResponse extends ResponseData<{
    app_id:     string;
    context_id: string;
    items:      GetMarketDataItem[];
}> {}

