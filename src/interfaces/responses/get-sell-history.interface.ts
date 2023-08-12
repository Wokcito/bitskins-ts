import { ItemHistoryData } from "../item-history-data.interface";
import { GetSellHistoryItem } from "../items";

export interface GetSellHistoryResponse extends ItemHistoryData<GetSellHistoryItem[]> {}