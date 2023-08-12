import { RecentSalesInfo } from "../recent-sales-info.interface";

export interface GetMarketDataItem {
    market_hash_name:  string;
    updated_at:        number;
    total_items:       number;
    lowest_price:      string;
    highest_price:     string;
    cumulative_price:  string;
    recent_sales_info: RecentSalesInfo | null;
}