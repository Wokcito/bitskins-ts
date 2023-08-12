import { ItemHistoryData } from "../item-history-data.interface";
import { GetItemHistoryItem } from "../items";

export interface GetItemHistoryResponse extends ItemHistoryData<GetItemHistoryItem[]> {}