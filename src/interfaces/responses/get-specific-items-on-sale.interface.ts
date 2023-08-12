import { ResponseData } from "../response-data.interface";
import { GetSpecificItemsOnSaleItem } from "../items/get-specific-items-on-sale.interface";

export interface GetSpecificItemsOnSaleResponse extends ResponseData<{
    items_not_on_sale: string[];
    items_on_sale:     GetSpecificItemsOnSaleItem[];
}> {}