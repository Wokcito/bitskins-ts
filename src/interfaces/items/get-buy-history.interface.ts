export interface GetBuyHistoryItem {
    market_hash_name: string;
    item_id:          string;
    asset_id:         string;
    app_id:           string;
    context_id:       string;
    time:             number;
    class_id:         string;
    withdrawn:        boolean;
    instance_id:      string;
    buy_price:        string;
}