import { GetAllItemPricesItem } from "../items/get-all-item-prices.interface";

export interface GetAllItemPricesResponse {
    status: string;
    prices: GetAllItemPricesItem[];
}