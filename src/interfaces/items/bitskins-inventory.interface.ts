import { InventoryItem } from "../inventory-item.interface";
import { Phase } from "../../types";
import { Tags } from "../tags.interface";
import { Sticker } from "../sticker.interface";
import { RecentSalesInfo } from "../recent-sales-info.interface";

export interface BitskinsItem extends InventoryItem {
    market_hash_name:  string;
    number_of_items:   number;
    item_ids:          string[];
    asset_ids:         string[];
    item_class:        string | null;
    item_rarity:       string;
    item_weapon:       string | null;
    item_quality:      string;
    item_itemset:      string | null;
    inspectable:       boolean;
    inspect_link:      string;
    phase:             Phase | null;
    prices:            string[];
    is_featured:       boolean[];
    float_values:      string[] | null[];
    tags:              Tags;
    created_at:        number[];
    updated_at:        number[];
    withdrawable_at:   number[];
    has_buy_orders:    boolean;
    stickers:          Sticker[] | null;
    fraud_warnings:    string[][];
    recent_sales_info: RecentSalesInfo | null;
}