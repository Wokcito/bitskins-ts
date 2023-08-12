import { BuyOrder } from "./buy-order.interface";
import { BuyOrderType } from "../../types";

export interface MyBuyOrder extends BuyOrder {
    state:             BuyOrderType;
    updated_at:        number;
    settled_with_item: SettledItem | null;
}

interface SettledItem {
    app_id:           string;
    context_id:       string;
    item_id:          string;
    asset_id:         string;
    class_id:         string;
    instance_id:      string;
    market_hash_name: string;
    buy_price:        string;
    withdrawn:        boolean;
    time:             number;
}