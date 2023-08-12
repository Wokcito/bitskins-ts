import { PricingMode } from "../../types";

export interface GetAllItemPricesItem {
    market_hash_name:   string;
    app_id:             string;
    context_id:         string;
    price:              string;
    pricing_mode:       PricingMode;
    skewness:           string;
    created_at:         number;
    icon_url:           string | null;
    name_color:         string | null;
    quality_color:      string | null;
    rarity_color:       string | null;
    instant_sale_price: string | null;
}