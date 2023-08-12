import { ResponseData } from "../response-data.interface";
import { MarketBuyOrder } from "../orders/market-buy-order.interface";

export interface GetMarketBuyOrdersResponse extends ResponseData<{
    app_id:          string;
    context_id:      string;
    total:           number;
    orders:          MarketBuyOrder[];
    overall_summary: Record<string, number>;
    page:            number;
}> {}