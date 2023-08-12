import { InventoryItem } from "../inventory-item.interface";
import { Phase, State } from "../../types";
import { PatternInfo } from "../pattern-info.interface";
import { Tags } from "../tags.interface";
import { Sticker } from "../sticker.interface";

export interface GetInventoryOnSaleItem extends InventoryItem {
    item_id:          string;
    asset_id:         string;
    item_class:       string | null;
    item_rarity:      string;
    item_weapon:      string | null;
    item_quality:     string;
    inspectable:      boolean;
    inspect_link:     string;
    price:            string;
    is_featured:      boolean;
    float_value:      string;
    pattern_info:     PatternInfo;
    phase:            Phase | null;
    type:             State;
    is_mine:          boolean;
    tags:             Tags;
    fraud_warnings:   string[];
    stickers:         Sticker[] | null;
    updated_at:       number;
    withdrawable_at:  number;
    bot_uid:          string;
}