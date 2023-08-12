import { ResponseData } from "../response-data.interface";
import { ModifySaleItem } from "../items/modify-sale.interface";

export interface ModifySaleResponse extends ResponseData<{ items: ModifySaleItem[] }> {}