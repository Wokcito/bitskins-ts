import { ResponseData } from "../response-data.interface";
import { GetRecentTradeOffersItem } from "../items/get-recent-trade-offers.interface";

export interface GetRecentTradeOffersResponse extends ResponseData<{ offers: GetRecentTradeOffersItem[] }> {}