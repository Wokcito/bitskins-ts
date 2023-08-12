import { ResponseData } from "../response-data.interface";

export interface GetMoneyEventsResponse extends ResponseData<{
    events: Event[];
    page:   number;
}> {}

interface Event {
    time:         number;
    type:         string;
    medium:       string | ItemMedium;
    description?: string;
    price?:       string;
    pending?:     boolean;
    withdrawn?:   number;
}

interface ItemMedium {
    market_hash_name: string;
    app_id:           string;
    context_id:       string;
    class_id:         string;
    instance_id:      string;
}