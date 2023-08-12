import { ResponseData } from "../response-data.interface";

export interface GetSteamPriceDataResponse extends ResponseData<{
    app_id:           string;
    context_id:       string;
    market_hash_name: string;
    raw_data:         RawDatum[];
    updated_at:       number;
}> {}

interface RawDatum {
    time:   number;
    price:  string;
    volume: number;
}