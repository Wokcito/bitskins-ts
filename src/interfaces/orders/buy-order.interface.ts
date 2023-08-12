export interface BuyOrder {
    buy_order_id:     number;
    market_hash_name: string;
    price:            string;
    suggested_price:  string;
    created_at:       number;
    place_in_queue:   number | null;
}