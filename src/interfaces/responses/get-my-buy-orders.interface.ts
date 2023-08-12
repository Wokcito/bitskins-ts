import { ResponseData } from "../response-data.interface";
import { MyBuyOrder } from "../orders/my-buy-order.interface";

export interface GetMyBuyOrdersResponse extends ResponseData<{
    app_id:     string;
    context_id: string;
    orders:     MyBuyOrder[];
    page:       number;
}> {}