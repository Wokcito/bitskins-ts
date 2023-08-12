import { ResponseData } from './response-data.interface';

export interface ItemHistoryData<T> extends ResponseData<{
    app_id:     string;
    context_id: string;
    page:       number;
    items:      T;
}> {}