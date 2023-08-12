export interface GetMyItemsToSellItem {
    market_hash_name: string;
    number_of_items:  number;
    trade_tokens:     string[];
    steam_item_ids:   string[];
    pending_item_ids: string[];
}