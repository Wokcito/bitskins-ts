import { ResponseData } from "../response-data.interface";
import { SellItemItem } from "../items/sell-item.interface";

export interface SellItemResponse extends ResponseData<{
    items:        SellItemItem[];
    trade_tokens: string[];
    bot_info:     BotInfo;
}> {}

interface BotInfo {
    uid:             string;
    name_prefix:     string;
    joined_steam_at: number;
}