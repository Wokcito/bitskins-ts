import { InventoryItem } from "../inventory-item.interface";
import { Phase } from "../../types";
import { Tags } from "../tags.interface";
import { Sticker } from "../sticker.interface";
import { RecentSalesInfo } from "../recent-sales-info.interface";

export interface SteamItem extends InventoryItem {
    market_hash_name:   string;
    number_of_items:    number;
    item_ids:           string[];
    asset_ids:          string[];
    item_class:         string | null;
    item_rarity:        string | null;
    item_weapon:        string | null;
    item_quality:       string;
    item_itemset:       string | null;
    inspectable:        boolean;
    inspect_link:       string | null;
    phase:              Phase | null;
    tags:               Tags;
    has_buy_orders:     boolean;
    recent_sales_info:  RecentSalesInfo | null;
    stickers:           Sticker[] | null;
    fraud_warnings:     string[][];
    is_listing_allowed: boolean;
}