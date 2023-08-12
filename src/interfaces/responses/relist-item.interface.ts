import { ResponseData } from "../response-data.interface";
import { RelistItemItem } from "../items/relist-item.interface";

export interface RelistItemResponse extends ResponseData<{ items: RelistItemItem[] }> {}