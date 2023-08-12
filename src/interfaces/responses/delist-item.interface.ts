import { ResponseData } from "../response-data.interface";
import { DelistItemItem } from "../items/delist-item.interface";

export interface DelistItemResponse extends ResponseData<{ items: DelistItemItem[] }> {}