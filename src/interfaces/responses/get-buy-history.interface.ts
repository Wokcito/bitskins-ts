import { ItemHistoryData } from "../item-history-data.interface";
import { GetBuyHistoryItem } from "../items/get-buy-history.interface";

export interface GetBuyHistoryResponse extends ItemHistoryData<GetBuyHistoryItem[]> {}