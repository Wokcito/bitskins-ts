import { ResponseData } from "../response-data.interface"

export interface GetExpectedPlaceInQueueResponse extends ResponseData<{ expected_place_in_queue: number }> {}