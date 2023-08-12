export interface GetItemHistoryItem {
    market_hash_name: string;
    item_id:          string;
    asset_id:         string;
    app_id:           string;
    context_id:       string;
    price:            string;
    on_hold:          boolean;
    on_sale:          boolean;
    sold_at?:         number | null;
    listed_at:        number;
    bought_at?:       number;
    withdrawn_at:     number | null;
    listed_by_me:     boolean;
    last_update_at:   number;
}