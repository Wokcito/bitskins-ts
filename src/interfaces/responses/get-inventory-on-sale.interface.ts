import { ResponseData } from "../response-data.interface";
import { GetInventoryOnSaleItem } from "../items/get-inventory-on-sale.interface";

export interface GetInventoryOnSaleResponse extends ResponseData<{
    items:               GetInventoryOnSaleItem[];
    page:                number;
    cache_expires_at:    number;
    rendered_in_seconds: number;
}> {}