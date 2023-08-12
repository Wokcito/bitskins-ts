export interface GetRecentTradeOffersItem {
    steam_trade_offer_id:    string;
    steam_trade_offer_state: string;
    sender_uid:              string;
    recipient_uid:           string;
    app_id:                  string;
    context_id:              string;
    num_items_sent:          number;
    num_items_retrieved:     number;
    trade_message:           string;
    created_at:              number;
    updated_at:              number;
}