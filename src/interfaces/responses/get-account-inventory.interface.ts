import { ResponseData } from "../response-data.interface";
import { BitskinsItem } from "../items/bitskins-inventory.interface";
import { PendingWithdrawalFromBitskinsItem } from "../items/pending-withdraw-from-bitskins.interface";
import { SteamItem } from "../items/steam-inventory.interface";

export interface GetAccountInventoryResponse extends ResponseData<{
    app_id:                           string;
    context_id:                       string;
    steam_inventory:                  SteamInventory;
    bitskins_inventory:               BitskinsInventory;
    pending_withdrawal_from_bitskins: PendingWithdrawalFromBitskins;
}> {}

interface InventoryData<T> {
    status:      string;
    total_items: number;
    items:       T
}

interface BitskinsInventory extends InventoryData<BitskinsItem[]> {
    total_price:    string;
    page:           number;
    items_per_page: number;
}

interface PendingWithdrawalFromBitskins extends InventoryData<PendingWithdrawalFromBitskinsItem[]> {}

interface SteamInventory extends InventoryData<SteamItem[]> {
    fresh_or_cached: string;
}