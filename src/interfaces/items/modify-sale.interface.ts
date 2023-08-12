export interface ModifySaleItem {
    app_id:           string;
    context_id:       string;
    item_id:          string;
    asset_id:         string;
    class_id:         string;
    instance_id:      string;
    market_hash_name: string;
    image:            string;
    price:            string;
    old_price:        string;
    discount:         string;
    withdrawable_at:  number;
}