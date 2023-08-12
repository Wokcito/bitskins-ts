import { State } from "../../types";
import { PatternInfo } from "../pattern-info.interface";
import { Tags } from "../tags.interface";
import { Sticker } from "../sticker.interface";

export interface GetSpecificItemsOnSaleItem {
    app_id:           string;
    context_id:       string;
    item_id:          string;
    asset_id:         string;
    class_id:         string;
    instance_id:      string;
    market_hash_name: string;
    item_type:        string;
    item_class:       null | string;
    item_rarity:      string;
    item_weapon:      null | string;
    item_quality:     string;
    image:            string;
    inspectable:      boolean;
    inspect_link:     string;
    price:            string;
    suggested_price:  string;
    is_featured:      boolean;
    float_value:      null | string;
    pattern_info:     PatternInfo;
    phase:            null;
    type:             State;
    is_mine:          boolean;
    tags:             Tags;
    fraud_warnings:   string[];
    stickers:         Sticker[] | null;
    updated_at:       number;
    withdrawable_at:  number;
    bot_uid:          string;
}