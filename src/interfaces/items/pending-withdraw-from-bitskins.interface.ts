import { InventoryItem } from "../inventory-item.interface";
import { State } from "../../types";
import { ErrorCorrectionDetails } from "../error-correction-details.interface";

export interface PendingWithdrawalFromBitskinsItem extends InventoryItem {
    market_hash_name:         string;
    item_id:                  string;
    asset_id:                 string;
    inspectable:              boolean;
    inspect_link:             string;
    attempting_to_send_offer: boolean;
    trade_token:              string;
    error_correction_details: ErrorCorrectionDetails;
    withdrawable_at:          number;
    type:                     State;
    last_price:               string;
    bot_uid:                  string;
}