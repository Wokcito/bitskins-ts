import { BuyOrder } from "./buy-order.interface";

export interface MarketBuyOrder extends BuyOrder { is_mine: boolean }