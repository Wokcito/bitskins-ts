import { ResponseData } from "../response-data.interface";
import { GetRecentSaleInfoItem } from "../items/get-recent-sale-info.interface";

export interface GetRecentSaleInfoResponse extends ResponseData<{
    app_id:     string;
    context_id: string;
    sales:      GetRecentSaleInfoItem[];
}> {}