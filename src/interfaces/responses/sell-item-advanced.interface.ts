import { ResponseData } from "../response-data.interface";
import { RelistItemResponse } from "./relist-item.interface";
import { SellItemResponse } from "./sell-item.interface";

export interface SellItemAdvancedResponse extends ResponseData<{
    total_items: number;
    responses: {
        to_relist: PromiseSettledResult<RelistItemResponse | undefined>;
        to_sell:   PromiseSettledResult<SellItemResponse | undefined>;
    };
}> {}