import axios from "axios";
import { totp } from "notp";
const base32 = require("thirty-two");

import {
    // Methods
    GetAccountBalanceResponse, GetAllItemPricesResponse, GetMarketDataResponse, GetAccountInventoryResponse, GetInventoryOnSaleResponse, GetSpecificItemsOnSaleResponse,
    GetMoneyEventsResponse, BuyItemResponse, SellItemResponse, ModifySaleResponse, DelistItemResponse, RelistItemResponse, WithdrawItemResponse,
    GetBuyHistoryResponse, GetSellHistoryResponse, GetItemHistoryResponse, GetRecentTradeOffersResponse, GetRecentSaleInfoResponse, GetSteamPriceDataResponse,
    CreateBuyOrderResponse, GetExpectedPlaceInQueueResponse, CancelBuyOrdersResponse, GetMyBuyOrdersResponse, GetMarketBuyOrdersResponse,
    SellItemAdvancedResponse,

    // Items
    GetBuyHistoryItem, GetSellHistoryItem, GetItemHistoryItem, GetMyItemsToWithdrawItem, GetMyItemsToSellItem
} from '../interfaces';

import { SortBy, Order, TriValue, BuyOrderPrice, BuyOrderType, History, AppId, InstantItemPrice } from '../types';

export class BitSkinsAPI {

    constructor(
        private readonly api_key: string,
        private readonly secret:  string,
        private readonly app_id:  AppId = '730'
    ) {}

    public async getAccountBalance() {
        return await this.makeRequest<GetAccountBalanceResponse>('get_account_balance');
    }

    public async getAllItemPrices() {
        return await this.makeRequest<GetAllItemPricesResponse>('get_all_item_prices');
    }

    public async getMarketData() {
        return await this.makeRequest<GetMarketDataResponse>('get_price_data_for_items_on_sale');
    }

    public async getAccountInventory(page?: number) {
        return await this.makeRequest<GetAccountInventoryResponse>('get_my_inventory', { page });
    }

    public async getInventoryOnSale(options?: {
        page?:                     number;
        min_price?:                string;
        max_price?:                string;
        per_page?:                 number;
        market_hash_name?:         string;
        sort_by?:                  SortBy;
        order?:                    Order;
        has_stickers?:             TriValue;
        is_stattrak?:              TriValue;
        is_souvenir?:              TriValue;
        show_trade_delayed_items?: TriValue;
    }) {
        return await this.makeRequest<GetInventoryOnSaleResponse>('get_inventory_on_sale', options);
    }

    public async getSpecificItemsOnSale(item_ids: string | string[]) {
        if (Array.isArray(item_ids)) item_ids = item_ids.join(',');

        return await this.makeRequest<GetSpecificItemsOnSaleResponse>('get_specific_items_on_sale', { item_ids });
    }

    public async getResetPriceItems(page?: number) {
        return await this.makeRequest('get_reset_price_items', { page });
    }

    public async getMoneyEvents(page?: number) {
        return await this.makeRequest<GetMoneyEventsResponse>('get_money_events', { page });
    }

    public async buyItem(
        item_ids: string | string[],
        prices:   string | string[],
        options?: {
            auto_trade?:                    boolean,
            allow_trade_delayed_purchases?: boolean
        }
    ) {
        if (Array.isArray(item_ids)) item_ids = item_ids.join(',');
        if (Array.isArray(prices)) prices = prices.join(',');

        return await this.makeRequest<BuyItemResponse>('buy_item', { item_ids, prices, ...options });
    }

    public async sellItem(item_ids: string | string[], prices: InstantItemPrice | InstantItemPrice[]) {
        if (Array.isArray(item_ids)) item_ids = item_ids.join(',');
        if (Array.isArray(prices)) prices = prices.join(',');

        return await this.makeRequest<SellItemResponse>('list_item_for_sale', { item_ids, prices });
    }

    public async modifySale(item_ids: string | string[], prices: string | string[]) {
        if (Array.isArray(item_ids)) item_ids = item_ids.join(',');
        if (Array.isArray(prices)) prices = prices.join(',');

        return await this.makeRequest<ModifySaleResponse>('modify_sale_item', { item_ids, prices });
    }

    public async delistItem(item_ids: string | string[]) {
        if (Array.isArray(item_ids)) item_ids = item_ids.join(',');

        return await this.makeRequest<DelistItemResponse>('delist_item', { item_ids });
    }

    public async relistItem(item_ids: string | string[], prices: InstantItemPrice | InstantItemPrice[]) {
        if (Array.isArray(item_ids)) item_ids = item_ids.join(',');
        if (Array.isArray(prices)) prices = prices.join(',');

        return await this.makeRequest<RelistItemResponse>('relist_item', { item_ids, prices  });
    }

    public async withdrawItem(item_ids: string | string[]) {
        if (Array.isArray(item_ids)) item_ids = item_ids.join(',');
        
        return await this.makeRequest<WithdrawItemResponse>('withdraw_item', { item_ids });
    }

    public async bumpItem(item_ids: string | string[]) {
        if (Array.isArray(item_ids)) item_ids = item_ids.join(',');

        return await this.makeRequest('bump_item', { item_ids });
    }

    public async getBuyHistory(page?: number) {
        return await this.makeRequest<GetBuyHistoryResponse>('get_buy_history', { page });
    }

    public async getSellHistory(page?: number) {
        return await this.makeRequest<GetSellHistoryResponse>('get_sell_history', { page });
    }

    public async getItemHistory(options?: {
        page?:      number;
        names?:     string | string[];
        per_page?:  number;
    }) {
        if (options?.names && Array.isArray(options?.names)) options.names = options.names.join(',');

        return await this.makeRequest<GetItemHistoryResponse>('get_item_history', options);
    }

    public async getTradeDetails(trade_token: string, trade_id: string) {
        return await this.makeRequest('get_trade_details', { trade_token, trade_id });
    }

    public async getRecentTradeOffers(active_only?: boolean) {
        return await this.makeRequest<GetRecentTradeOffersResponse>('get_recent_trade_offers', { active_only });
    }

    public async getRecentSaleInfo(market_hash_name: string, page?: number) {
        return await this.makeRequest<GetRecentSaleInfoResponse>('get_sales_info', { market_hash_name, page });
    }

    public async getSteamPriceData(market_hash_name: string) {
        return await this.makeRequest<GetSteamPriceDataResponse>('get_steam_price_data', { market_hash_name });
    }

    public async createBuyOrder(name: string, price: BuyOrderPrice, quantity?: number) {
        return await this.makeRequest<CreateBuyOrderResponse>('create_buy_order', { name, price, quantity });
    }

    public async getExpectedPlaceInQueue(name: string, price: BuyOrderPrice) {
        return await this.makeRequest<GetExpectedPlaceInQueueResponse>('get_expected_place_in_queue_for_new_buy_order', { name, price });
    }

    public async cancelBuyOrders(buy_order_ids: number[]) {
        const joined_buy_order_ids = buy_order_ids.join(',');
        return await this.makeRequest<CancelBuyOrdersResponse>('cancel_buy_orders', { buy_order_ids: joined_buy_order_ids });
    }

    public async cancelAllBuyOrders(market_hash_name: string) {
        return await this.makeRequest<CancelBuyOrdersResponse>('cancel_all_buy_orders', { market_hash_name });
    }

    public async getMyBuyOrders(options?: {
        market_hash_name?: string;
        type?:             BuyOrderType;
        page?:             number;
    }) {
        return await this.makeRequest<GetMyBuyOrdersResponse>('get_buy_order_history', options);
    }

    public async getSettledOrders(page?: number) {
        return await this.makeRequest<GetMyBuyOrdersResponse>('get_settled_buy_orders', { page });
    }

    public async getActiveBuyOrders(page?: number) {
        return await this.makeRequest<GetMyBuyOrdersResponse>('get_active_buy_orders', { page });
    }

    public async getMarketBuyOrders(options?: {
        market_hash_name?: string;
        page?:             number;
    }) {
        return await this.makeRequest<GetMarketBuyOrdersResponse>('get_market_buy_orders', options);
    }

    public async getLowestPrice(market_hash_name: string, market_data?: GetMarketDataResponse) {
        // Check that the market_hash_name exists
        if (!market_hash_name)
            throw new Error('The parameter market_hash_name is required.');

        // Check that the market_hash_name is a string
        if (typeof market_hash_name !== 'string')
            throw new Error('Invalid parameter. The market_hash_name must be a string.');

        // Check that the market_data has the shape of a response of getMarketData
        if (market_data && !market_data?.data?.items)
            throw new Error('Invalid parameter. The market_data must be a response of getMarketData');

        const { items } = market_data!.data || (await this.getMarketData())!.data;
        const item = items.find(item => item.market_hash_name.toLowerCase() === market_hash_name.toLowerCase());
        return item?.lowest_price ? +item.lowest_price : undefined;
    }

    public async getHistorySince(
        history:   History,
        timestamp: number,
        options?: {
            names?:     string | string[],
            per_page?:  number
        }
    ) {
        // Check that the history exists
        if (!history)
            throw new Error('The parameter history is required');
        
        // Check that the history is buy, sell or item
        if (history !== 'buy'  &&
            history !== 'sell' &&
            history !== 'item'
        ) throw new Error('The parameter history must be { buy | sell | item }');

        // Check that the timestamp exists
        if (!timestamp)
            throw new Error('The parameter timestamp is required');
        
        // Check that the timestamp is a number
        if (typeof timestamp !== 'number')
            throw new Error('The parameter timestamp must be a number');

        const historyFunctions = {
            "buy" : (options: { page: number }) => this.getBuyHistory(options.page),
            "sell": (options: { page: number }) => this.getSellHistory(options.page),
            "item": (options: object)           => this.getItemHistory(options),
        }

        const foundItems: (GetBuyHistoryItem | GetSellHistoryItem | GetItemHistoryItem)[] = [];

        let lastPage = false;
        let page = 1;

        while (!lastPage) {
            const { items } = (await historyFunctions[history]({ page, ...options}))!.data;
            
            const lastItem = items[items.length - 1];

            const time = (lastItem as GetBuyHistoryItem).time;
            const last_update_at = (lastItem as GetItemHistoryItem).last_update_at;

            if (time >= timestamp || last_update_at >= timestamp) {
                foundItems.push(...items);
                page++;
                continue;
            }

            items.forEach((item) => {
                const time = (item as GetBuyHistoryItem).time;
                const last_update_at = (item as GetItemHistoryItem).last_update_at;

                if (time >= timestamp || last_update_at >= timestamp) foundItems.push(item);
            });
            lastPage = true;
        }

        return foundItems;
    }

    public async getMyItemsToWithdraw() {
        const { bitskins_inventory, pending_withdrawal_from_bitskins } = (await this.getAccountInventory())!.data;
        const now = Math.floor(Date.now()/1000);

        const market_hash_names: Set<string> = new Set();
        const foundItems: GetMyItemsToWithdrawItem[] = [];

        bitskins_inventory.items.forEach((item) => item.withdrawable_at[0] < now ? market_hash_names.add(item.market_hash_name) : null);
        pending_withdrawal_from_bitskins.items.forEach((item) => item.withdrawable_at < now ? market_hash_names.add(item.market_hash_name) : null);

        market_hash_names.forEach((market_hash_name) => {
            const toWithdrawItem: GetMyItemsToWithdrawItem = {
                market_hash_name,
                number_of_items: 0,
                trade_tokens: [],
                item_ids: [],
            }

            pending_withdrawal_from_bitskins.items.forEach((item) => {
                if (item.market_hash_name === market_hash_name && item.withdrawable_at < now) {
                    toWithdrawItem.item_ids.push(item.item_id);
                    toWithdrawItem.number_of_items++;
                    toWithdrawItem.trade_tokens.push(item.trade_token);
                }
            });

            bitskins_inventory.items.forEach((item) => {
                if (item.market_hash_name === market_hash_name && item.withdrawable_at[0] < now) {
                    toWithdrawItem.item_ids.push(...item.item_ids);
                    toWithdrawItem.number_of_items += item.number_of_items;
                }
            });

            foundItems.push(toWithdrawItem);
        });

        return foundItems;
    }

    public async getMyItemsToSell() {
        const { steam_inventory, pending_withdrawal_from_bitskins } = (await this.getAccountInventory())!.data;

        const market_hash_names: Set<string> = new Set();
        const foundItems: GetMyItemsToSellItem[] = [];
        
        steam_inventory.items.forEach(item => item.is_listing_allowed ? market_hash_names.add(item.market_hash_name) : null);
        pending_withdrawal_from_bitskins.items.forEach(item => market_hash_names.add(item.market_hash_name));

        market_hash_names.forEach(market_hash_name => {
            const toSellItem: GetMyItemsToSellItem = {
                market_hash_name,
                number_of_items: 0,
                trade_tokens: [],
                steam_item_ids: [],
                pending_item_ids: [],
            }

            pending_withdrawal_from_bitskins.items.forEach(item => {
                if (item.market_hash_name === market_hash_name) {
                    toSellItem.pending_item_ids.push(item.item_id);
                    toSellItem.number_of_items++;
                    toSellItem.trade_tokens.push(item.trade_token);
                }
            });
            
            steam_inventory.items.forEach(item => {
                if (item.market_hash_name === market_hash_name && item.is_listing_allowed) {
                    toSellItem.steam_item_ids.push(...item.item_ids);
                    toSellItem.number_of_items += item.number_of_items;
                }
            });

            foundItems.push(toSellItem);
        });

        return foundItems;
    }

    public async withdrawItemAdvanced(
        market_hash_names: string | string[],
        number_of_items:   number | number[]
    ) {
        // Check that the array of market_hash_names exists
        if (!market_hash_names)
            throw new Error('The parameter market_hash_names is required.');
        
        // Check that the array of number_of_items exists
        if (!number_of_items)
            throw new Error('The parameter number_of_items is required.');

        // Check that market_hash_name is an array
        if (typeof market_hash_names !== 'string' && !Array.isArray(market_hash_names))
            throw new Error('Invalid parameter. The market_hash_names must be either a string or an array of strings.');
        
        // Check that number_of_items is an array
        if (typeof number_of_items !== 'number' && !Array.isArray(number_of_items))
            throw new Error('Invalid parameter. The number_of_items must be either a number or an array of numbers.');

        // Check that the parameters are arrays or individual data
        if (
            !(typeof market_hash_names === 'string' && typeof number_of_items === 'number') &&
            !(Array.isArray(market_hash_names) && Array.isArray(number_of_items))
        ) throw new Error('Invalid parameters. Please ensure that market_hash_names and number_of_items are either both arrays or both individual data.');
        
        if (Array.isArray(market_hash_names) && Array.isArray(number_of_items)) {
            // Check that market_hash_names and number_of_items have the same number of elements
            if (market_hash_names.length !== number_of_items.length)
                throw new Error('Invalid parameters. The market_hash_names and number_of_items arrays must have the same number of elements.');

            // Chech that market_hash_name is not empty
            if (!market_hash_names.length)
                throw new Error('Invalid parameter. The market_hash_names array must not be empty.');
    
            // Check that the elements in market_hash_name are strings 
            if (!market_hash_names.every(market_hash_name => typeof market_hash_name === 'string'))
                throw new Error('Invalid parameter. All elements in the market_hash_names array must be strings.');
            
            // Check that number_of_items is not empty
            if (!number_of_items.length)
                throw new Error('Invalid parameter. The number_of_items array must not be empty.');
            
            // Check that the elements in number_of_items are numbers
            if (!number_of_items.every(number => typeof number === 'number'))
                throw new Error('Invalid parameter. All elements in the number_of_items array must be numbers.');
        }

        const [ itemsToWithdraw, dataOffers ] = await Promise.all([this.getMyItemsToWithdraw(), this.getRecentTradeOffers(true)]);

        const item_ids: string[] = [];
        const toAwait: Promise<void>[] = [];

        const findItems = async (market_hash_name: string, number_of_items: number) => {
            const foundItem = itemsToWithdraw.find((item) => item.market_hash_name.toLowerCase() === market_hash_name.toLowerCase());

            if (foundItem) {
                const filteredItemIds = await this.filterItemsInActiveTrades(foundItem.item_ids, foundItem.trade_tokens, dataOffers!);

                let idIndex = 0;

                while (idIndex < number_of_items && filteredItemIds[idIndex]) {
                    item_ids.push(filteredItemIds[idIndex]);
                    idIndex++;
                }
            }
        };

        if (Array.isArray(market_hash_names) && Array.isArray(number_of_items)) {
            market_hash_names.forEach((market_hash_name, itemIndex) => toAwait.push(findItems(market_hash_name, number_of_items[itemIndex])));
            await Promise.all(toAwait);
        } else if (typeof market_hash_names === 'string' && typeof number_of_items === 'number') {
            await findItems(market_hash_names, number_of_items);
        }

        if (!item_ids.length) {
            throw new Error('Items not found');
        }

        return await this.withdrawItem(item_ids);
    }

    public async sellItemAdvanced(
        market_hash_names: string | string[],
        number_of_items:   number | number[],
        prices:            string | string[]
    ) {
        // Check that the array of market_hash_names exists
        if (!market_hash_names)
            throw new Error('The parameter market_hash_names is required.');
        
        // Check that the array of number_of_items exists
        if (!number_of_items)
            throw new Error('The parameter number_of_items is required.');

        // Check that the array of prices exists
        if (!prices)
            throw new Error('The parameter prices is required.');

        // Check that market_hash_name is an array
        if (typeof market_hash_names !== 'string' && !Array.isArray(market_hash_names))
            throw new Error('Invalid parameter. The market_hash_names must be either a string or an array of strings.');
        
        // Check that number_of_items is an array
        if (typeof number_of_items !== 'number' && !Array.isArray(number_of_items))
            throw new Error('Invalid parameter. The number_of_items must be either a number or an array of numbers.');

        // Check that prices is a string or an array
        if (typeof prices !== 'string' && !Array.isArray(prices))
            throw new Error('Invalid parameter. The prices must be either a string or an array of strings.');

        // Check that the parameters are arrays or individual data
        if (
            !(typeof market_hash_names === 'string' && typeof number_of_items === 'number' && typeof prices === 'string') &&
            !(Array.isArray(market_hash_names) && Array.isArray(number_of_items) && Array.isArray(prices))
        ) throw new Error('Invalid parameters. Please ensure that market_hash_names, number_of_items, prices are either both arrays or both individual data.');
        
        if (Array.isArray(market_hash_names) && Array.isArray(number_of_items) && Array.isArray(prices)) {
            // Check that market_hash_names and number_of_items have the same number of elements
            if (market_hash_names.length !== number_of_items.length && number_of_items.length !== prices.length)
                throw new Error('Invalid parameters. The market_hash_names, number_of_items and prices arrays must have the same number of elements.');

            // Chech that market_hash_name is not empty
            if (!market_hash_names.length)
                throw new Error('Invalid parameter. The market_hash_names array must not be empty.');
    
            // Check that the elements in market_hash_name are strings 
            if (!market_hash_names.every(market_hash_name => typeof market_hash_name === 'string'))
                throw new Error('Invalid parameter. All elements in the market_hash_names array must be strings.');
            
            // Check that number_of_items is not empty
            if (!number_of_items.length)
                throw new Error('Invalid parameter. The number_of_items array must not be empty.');
            
            // Check that the elements in number_of_items are numbers
            if (!number_of_items.every(number => typeof number === 'number'))
                throw new Error('Invalid parameter. All elements in the number_of_items array must be numbers.');

            // Check that prices is not empty
            if (!prices.length)
                throw new Error('Invalid parameter. The prices array must not be empty.');

            // Check that the elements in prices are strings
            if (!prices.every(price => typeof price === 'string'))
                throw new Error('Invalid parameter. All elements in the number_of_items array must be strings.');
        }

        const [ itemsToSell, dataOffers ] = await Promise.all([this.getMyItemsToSell(), this.getRecentTradeOffers(true)]);

        const toRelist: { item_ids: string[], prices: string[] } = {
            item_ids: [],
            prices: []
        }

        const toSell: { item_ids: string[], prices: string[] } = {
            item_ids: [],
            prices: []
        };

        const toAwait: Promise<void>[] = [];

        const getTotalItems = () => toRelist.item_ids.length + toSell.item_ids.length;

        const findItems = async (market_hash_name: string, number_of_items: number, price: string) => {
            const foundItem = itemsToSell.find(item => item.market_hash_name.toLowerCase() === market_hash_name.toLowerCase());

            if (foundItem) {
                const { steam_item_ids, pending_item_ids, trade_tokens } = foundItem;
                const filteredItemIds = await this.filterItemsInActiveTrades(pending_item_ids, trade_tokens, dataOffers!);
                
                let totalItems = 0;
                let idIndex = 0;

                while (totalItems < number_of_items && filteredItemIds[idIndex]) {
                    const id = filteredItemIds[idIndex];

                    toRelist.item_ids.push(id)
                    toRelist.prices.push(price);
                    totalItems++;
                    
                    idIndex++;
                }

                idIndex = 0;

                while (totalItems < number_of_items && steam_item_ids[idIndex]) {
                    const id = steam_item_ids[idIndex];

                    toSell.item_ids.push(id)
                    toSell.prices.push(price);
                    totalItems++;

                    idIndex++;
                }
            }
        }

        if (Array.isArray(market_hash_names) && Array.isArray(number_of_items) && Array.isArray(prices)) {
            market_hash_names.forEach((market_hash_name, itemIndex) => {
                return toAwait.push(findItems(market_hash_name, number_of_items[itemIndex], prices[itemIndex]));
            });
            await Promise.all(toAwait);
        } else if (typeof market_hash_names === 'string' && typeof number_of_items === 'number' && typeof prices === 'string') {
            await findItems(market_hash_names, number_of_items, prices);
        }

        if (!toRelist.item_ids.length && !toSell.item_ids.length)
            throw new Error('Items not found');

        const [ relistData, sellData ] = await Promise.allSettled([
            this.relistItem(toRelist.item_ids, toRelist.prices),
            this.sellItem(toSell.item_ids, toSell.prices)
        ]);

        const response: SellItemAdvancedResponse = {
            status: "success",
            data: {
                total_items: getTotalItems(),
                responses: {
                    to_relist: relistData,
                    to_sell: sellData
                }
            }
        }

        return response;
    }

    public async buyItemAdvanced(
        market_hash_names: string | string[],
        number_of_items:   number | number[],
        max_prices:        string | string[],
        options?: {
            auto_trade?:               boolean,
            show_trade_delayed_items?: TriValue,
        }
    ) {
        // Check that the array of market_hash_names exists
        if (!market_hash_names)
            throw new Error('The parameter market_hash_names is required.');
        
        // Check that the array of number_of_items exists
        if (!number_of_items)
            throw new Error('The parameter number_of_items is required.');

        // Check that the array of max_prices exists
        if (!max_prices)
            throw new Error('The parameter max_prices is required.');

        // Check that market_hash_name is an array
        if (typeof market_hash_names !== 'string' && !Array.isArray(market_hash_names))
            throw new Error('Invalid parameter. The market_hash_names must be either a string or an array of strings.');
        
        // Check that number_of_items is an array
        if (typeof number_of_items !== 'number' && !Array.isArray(number_of_items))
            throw new Error('Invalid parameter. The number_of_items must be either a number or an array of numbers.');

        // Check that max_prices is a string or an array
        if (typeof max_prices !== 'string' && !Array.isArray(max_prices))
            throw new Error('Invalid parameter. The max_prices must be either a string or an array of strings.');

        // Check that the parameters are arrays or individual data
        if (
            !(typeof market_hash_names === 'string' && typeof number_of_items === 'number' && typeof max_prices === 'string') &&
            !(Array.isArray(market_hash_names) && Array.isArray(number_of_items) && Array.isArray(max_prices))
        ) throw new Error('Invalid parameters. Please ensure that market_hash_names, number_of_items, max_prices are either both arrays or both individual data.');
        
        if (Array.isArray(market_hash_names) && Array.isArray(number_of_items) && Array.isArray(max_prices)) {
            // Check that market_hash_names and number_of_items have the same number of elements
            if (market_hash_names.length !== number_of_items.length && number_of_items.length !== max_prices.length)
                throw new Error('Invalid parameters. The market_hash_names and number_of_items arrays must have the same number of elements.');

            // Chech that market_hash_name is not empty
            if (!market_hash_names.length)
                throw new Error('Invalid parameter. The market_hash_names array must not be empty.');
    
            // Check that the elements in market_hash_name are strings 
            if (!market_hash_names.every(market_hash_name => typeof market_hash_name === 'string'))
                throw new Error('Invalid parameter. All elements in the market_hash_names array must be strings.');
            
            // Check that number_of_items is not empty
            if (!number_of_items.length)
                throw new Error('Invalid parameter. The number_of_items array must not be empty.');
            
            // Check that the elements in number_of_items are numbers
            if (!number_of_items.every(number => typeof number === 'number'))
                throw new Error('Invalid parameter. All elements in the number_of_items array must be numbers.');

            // Check that max_prices is not empty
            if (!max_prices.length)
                throw new Error('Invalid parameter. The max_prices array must not be empty.');

            // Check that the elements in max_prices are strings
            if (!max_prices.every(price => typeof price === 'string'))
                throw new Error('Invalid parameter. All elements in the number_of_items array must be strings.');
        }

        const { available_balance } = (await this.getAccountBalance())!.data;
        
        const toBuy: { item_ids: string[], prices: string[] } = {
            item_ids: [],
            prices: []
        }

        const toAwait: Promise<void>[] = [];

        const findItems = async (market_hash_name: string, number_of_items: number, max_price: string) => {
            const show_trade_delayed_items = options?.show_trade_delayed_items || 0;

            let totalPrice = 0;
            let totalItems = 0;
            let page = 1;

            while (totalItems < number_of_items && totalPrice < +available_balance) {
                const { items } = (await this.getInventoryOnSale({
                    market_hash_name,
                    max_price,
                    page,
                    show_trade_delayed_items,
                    sort_by: "price",
                    order: "asc",
                }))!.data;

                const per_page = items.length;
                const firstItem = items[0];
                const lastItem = items[per_page - 1];

                if (per_page < 1 || +firstItem.price > +max_price) break;

                if (+lastItem.price <= +max_price && totalItems + per_page <= number_of_items) {
                    let itemIndex = 0;

                    while (
                        items[itemIndex] &&
                        +available_balance >= +items[itemIndex].price + totalPrice
                    ) {
                        const item = items[itemIndex];

                        toBuy.item_ids.push(item.item_id);
                        toBuy.prices.push(item.price);
                        totalPrice += +item.price;
                        totalItems++;

                        itemIndex++;
                    }

                    page++;
                    continue;
                }
    
                items.forEach(item => {
                    if (
                        +item.price <= +max_price &&
                        totalItems < number_of_items &&
                        +available_balance >= (+item.price + totalPrice)
                    ) {
                        toBuy.item_ids.push(item.item_id);
                        toBuy.prices.push(item.price);
                        totalPrice += +item.price;
                        totalItems++;
                    }
                });
            }
        }

        if (Array.isArray(market_hash_names) && Array.isArray(number_of_items) && Array.isArray(max_prices)) {
            market_hash_names.forEach((market_hash_name, itemIndex) => {
                return toAwait.push(findItems(market_hash_name, number_of_items[itemIndex], max_prices[itemIndex]));
            });
            await Promise.all(toAwait);
        } else if (typeof market_hash_names === 'string' && typeof number_of_items === 'number' && typeof max_prices === 'string') {
            await findItems(market_hash_names, number_of_items, max_prices);
        }

        if (!toBuy.item_ids.length)
            throw new Error('Items not found');

        return await this.buyItem(toBuy.item_ids, toBuy.prices, { auto_trade: options?.auto_trade, allow_trade_delayed_purchases: true });
    }

    public async delistItemAdvanced(
        market_hash_names: string | string[],
        number_of_items:   number | number[])
    {
        // Check that the array of market_hash_names exists
        if (!market_hash_names)
            throw new Error('The parameter market_hash_names is required.');
        
        // Check that the array of number_of_items exists
        if (!number_of_items)
            throw new Error('The parameter number_of_items is required.');

        // Check that market_hash_name is an array
        if (typeof market_hash_names !== 'string' && !Array.isArray(market_hash_names))
            throw new Error('Invalid parameter. The market_hash_names must be either a string or an array of strings.');
        
        // Check that number_of_items is an array
        if (typeof number_of_items !== 'number' && !Array.isArray(number_of_items))
            throw new Error('Invalid parameter. The number_of_items must be either a number or an array of numbers.');

        // Check that the parameters are arrays or individual data
        if (
            !(typeof market_hash_names === 'string' && typeof number_of_items === 'number') &&
            !(Array.isArray(market_hash_names) && Array.isArray(number_of_items))
        ) throw new Error('Invalid parameters. Please ensure that market_hash_names and number_of_items are either both arrays or both individual data.');
        
        if (Array.isArray(market_hash_names) && Array.isArray(number_of_items)) {
            // Check that market_hash_names and number_of_items have the same number of elements
            if (market_hash_names.length !== number_of_items.length)
                throw new Error('Invalid parameters. The market_hash_names and number_of_items arrays must have the same number of elements.');

            // Chech that market_hash_name is not empty
            if (!market_hash_names.length)
                throw new Error('Invalid parameter. The market_hash_names array must not be empty.');
    
            // Check that the elements in market_hash_name are strings 
            if (!market_hash_names.every(market_hash_name => typeof market_hash_name === 'string'))
                throw new Error('Invalid parameter. All elements in the market_hash_names array must be strings.');
            
            // Check that number_of_items is not empty
            if (!number_of_items.length)
                throw new Error('Invalid parameter. The number_of_items array must not be empty.');
            
            // Check that the elements in number_of_items are numbers
            if (!number_of_items.every(number => typeof number === 'number'))
                throw new Error('Invalid parameter. All elements in the number_of_items array must be numbers.');
        }

        const { bitskins_inventory } = (await this.getAccountInventory())!.data;

        const item_ids: string[] = [];

        const findItems = (market_hash_name: string, number_of_items: number) => {
            const foundItem = bitskins_inventory.items.find(item => item.market_hash_name.toLowerCase() === market_hash_name.toLowerCase());

            if (foundItem) {
                let idIndex = 0;

                while (item_ids.length < number_of_items && foundItem.item_ids[idIndex]) {
                    item_ids.push(foundItem.item_ids[idIndex]);
                    idIndex++;
                }
            }
        }

        if (Array.isArray(market_hash_names) && Array.isArray(number_of_items)) {
            market_hash_names.forEach((market_hash_name, itemIndex) => findItems(market_hash_name, number_of_items[itemIndex]));
        } else if (typeof market_hash_names === 'string' && typeof number_of_items === 'number') {
            findItems(market_hash_names, number_of_items);
        }

        if (!item_ids.length)
            throw new Error('Items not found');

        return await this.delistItem(item_ids);
    }

    public async modifySaleAdvanced(
        market_hash_names: string | string[],
        number_of_items:   number | number[],
        prices:            string | string[]
    ) {
        // Check that the array of market_hash_names exists
        if (!market_hash_names)
            throw new Error('The parameter market_hash_names is required.');
        
        // Check that the array of number_of_items exists
        if (!number_of_items)
            throw new Error('The parameter number_of_items is required.');

        // Check that the array of prices exists
        if (!prices)
            throw new Error('The parameter prices is required.');

        // Check that market_hash_name is an array
        if (typeof market_hash_names !== 'string' && !Array.isArray(market_hash_names))
            throw new Error('Invalid parameter. The market_hash_names must be either a string or an array of strings.');
        
        // Check that number_of_items is an array
        if (typeof number_of_items !== 'number' && !Array.isArray(number_of_items))
            throw new Error('Invalid parameter. The number_of_items must be either a number or an array of numbers.');

        // Check that prices is a string or an array
        if (typeof prices !== 'string' && !Array.isArray(prices))
            throw new Error('Invalid parameter. The prices must be either a string or an array of strings.');

        // Check that the parameters are arrays or individual data
        if (
            !(typeof market_hash_names === 'string' && typeof number_of_items === 'number' && typeof prices === 'string') &&
            !(Array.isArray(market_hash_names) && Array.isArray(number_of_items) && Array.isArray(prices))
        ) throw new Error('Invalid parameters. Please ensure that market_hash_names, number_of_items, prices are either both arrays or both individual data.');
        
        if (Array.isArray(market_hash_names) && Array.isArray(number_of_items) && Array.isArray(prices)) {
            // Check that market_hash_names and number_of_items have the same number of elements
            if (market_hash_names.length !== number_of_items.length && number_of_items.length !== prices.length)
                throw new Error('Invalid parameters. The market_hash_names, number_of_items and prices arrays must have the same number of elements.');

            // Chech that market_hash_name is not empty
            if (!market_hash_names.length)
                throw new Error('Invalid parameter. The market_hash_names array must not be empty.');
    
            // Check that the elements in market_hash_name are strings 
            if (!market_hash_names.every(market_hash_name => typeof market_hash_name === 'string'))
                throw new Error('Invalid parameter. All elements in the market_hash_names array must be strings.');
            
            // Check that number_of_items is not empty
            if (!number_of_items.length)
                throw new Error('Invalid parameter. The number_of_items array must not be empty.');
            
            // Check that the elements in number_of_items are numbers
            if (!number_of_items.every(number => typeof number === 'number'))
                throw new Error('Invalid parameter. All elements in the number_of_items array must be numbers.');

            // Check that prices is not empty
            if (!prices.length)
                throw new Error('Invalid parameter. The prices array must not be empty.');

            // Check that the elements in prices are strings
            if (!prices.every(price => typeof price === 'string'))
                throw new Error('Invalid parameter. All elements in the number_of_items array must be strings.');
        }

        if (
            !(typeof market_hash_names === 'string' && typeof number_of_items === 'number' && typeof prices === 'string') &&
            !(Array.isArray(market_hash_names) && Array.isArray(number_of_items) && Array.isArray(prices))
        ) throw new Error();

        const { bitskins_inventory } = (await this.getAccountInventory())!.data;

        const toModify: { item_ids: string[], prices: string[] } = {
            item_ids: [],
            prices: []
        }

        const findItems = (market_hash_name: string, number_of_items: number, price: string) => {
            const foundItem = bitskins_inventory.items.find(item => item.market_hash_name.toLowerCase() === market_hash_name.toLowerCase());

            if (foundItem) {
                let totalItems = 0;
                let itemIndex = 0;

                while (totalItems < number_of_items && foundItem.item_ids[itemIndex]) {
                    const id = foundItem.item_ids[itemIndex];

                    toModify.item_ids.push(id);
                    toModify.prices.push(price);
                    totalItems++;

                    itemIndex++;
                }
            }
        }

        if (Array.isArray(market_hash_names) && Array.isArray(number_of_items) && Array.isArray(prices)) {
            market_hash_names.forEach((market_hash_name, itemIndex) => {
                return findItems(market_hash_name, number_of_items[itemIndex], prices[itemIndex]);
            });
        } else if (typeof market_hash_names === 'string' && typeof number_of_items === 'number' && typeof prices === 'string') {
            findItems(market_hash_names, number_of_items, prices);
        }

        if (!toModify.item_ids.length)
            throw new Error('Items not found');

        return await this.modifySale(toModify.item_ids, toModify.prices);
    }

    public async getTotalBuyOrdersMoney() {
        let totalMoney = 0;
        let lastPage = false;
        let page = 1;

        while (!lastPage) {
            const { orders } = (await this.getActiveBuyOrders(page))!.data;

            if (orders.length > 0) {
                orders.forEach(order => totalMoney += +order.price)
                page++;
                continue;
            } else {
                lastPage = true;
            }
        }

        return totalMoney;
    }

    public async cancelBuyOrdersAdvanced(
        market_hash_names: string | string[],
        quantities:        number | number[]
    ) {
        // Check that the array of market_hash_names exists
        if (!market_hash_names)
            throw new Error('The parameter market_hash_names is required.');
        
        // Check that the array of quantities exists
        if (!quantities)
            throw new Error('The parameter quantities is required.');

        // Check that market_hash_name is an array
        if (typeof market_hash_names !== 'string' && !Array.isArray(market_hash_names))
            throw new Error('Invalid parameter. The market_hash_names must be either a string or an array of strings.');
        
        // Check that quantities is an array
        if (typeof quantities !== 'number' && !Array.isArray(quantities))
            throw new Error('Invalid parameter. The quantities must be either a number or an array of numbers.');

        // Check that the parameters are arrays or individual data
        if (
            !(typeof market_hash_names === 'string' && typeof quantities === 'number') &&
            !(Array.isArray(market_hash_names) && Array.isArray(quantities))
        ) throw new Error('Invalid parameters. Please ensure that market_hash_names and quantities are either both arrays or both individual data.');
        
        if (Array.isArray(market_hash_names) && Array.isArray(quantities)) {
            // Check that market_hash_names and quantities have the same number of elements
            if (market_hash_names.length !== quantities.length)
                throw new Error('Invalid parameters. The market_hash_names and quantities arrays must have the same number of elements.');

            // Chech that market_hash_name is not empty
            if (!market_hash_names.length)
                throw new Error('Invalid parameter. The market_hash_names array must not be empty.');
    
            // Check that the elements in market_hash_name are strings 
            if (!market_hash_names.every(market_hash_name => typeof market_hash_name === 'string'))
                throw new Error('Invalid parameter. All elements in the market_hash_names array must be strings.');
            
            // Check that quantities is not empty
            if (!quantities.length)
                throw new Error('Invalid parameter. The quantities array must not be empty.');
            
            // Check that the elements in quantities are numbers
            if (!quantities.every(number => typeof number === 'number'))
                throw new Error('Invalid parameter. All elements in the quantities array must be numbers.');
        }

        const buy_order_ids: number[] = [];
        const toAwait: Promise<void>[] = [];

        const findOrders = async (market_hash_name: string, quantity: number) => {
            let totalOrders = 0;
            let lastPage = false;
            let page = 1;

            while (!lastPage) {
                const { orders } = (await this.getMyBuyOrders({ market_hash_name, page, type: "LISTED" }))!.data;

                if (orders.length === 0) break;

                if (orders.length <= quantity) {
                    orders.forEach(order => {
                        buy_order_ids.push(order.buy_order_id);
                        totalOrders++;
                    });
                    page++;
                    continue;
                }

                let orderIndex = 0;

                while (totalOrders < quantity) {
                    const buy_order_id = orders[orderIndex].buy_order_id;

                    buy_order_ids.push(buy_order_id);
                    totalOrders++;

                    orderIndex;
                }
                lastPage = true;
            }
        }

        if (Array.isArray(market_hash_names) && Array.isArray(quantities)) {
            market_hash_names.forEach((market_hash_name, itemIndex) => {
                return findOrders(market_hash_name, quantities[itemIndex]);
            });
            await Promise.all(toAwait);
        } else if (typeof market_hash_names === 'string' && typeof quantities === 'number') {
            await findOrders(market_hash_names, quantities);
        }

        if (!buy_order_ids.length)
            throw new Error('Orders not found');

        return this.cancelBuyOrders(buy_order_ids);
    }

    public async filterItemsInActiveTrades(item_ids: string[], trade_tokens: string[], data_offers?: GetRecentTradeOffersResponse) {
        // Check that the array item_ids exists
        if (!item_ids)
            throw new Error('The parameter item_ids is required.');

        // Check that the array trade_tokens exists
        if (!trade_tokens)
            throw new Error('The parameter trade_tokens is required.');
        
        // Check that item_ids is an array
        if (!Array.isArray(item_ids))
            throw new Error('Invalid parameter. The item_ids must be an array of strings.');

        // Check that item_ids is not empty
        if (!item_ids.length)
            throw new Error('Invalid parameter. The item_ids array must not be empty.');
        
        // Check that the elements in item_ids are strings
        if (!item_ids.every(id => typeof id === 'string'))
            throw new Error('Invalid parameter. All elements in the item_ids array must be strings.');
        
        // Check that trade_tokens is an array
        if (!Array.isArray(trade_tokens))
            throw new Error('Invalid parameter. The trade_tokens must be an array of strings.');
        
        // Check that trade_tokens is not empty
        if (!trade_tokens.length)
            throw new Error('Invalid parameter. The trade_tokens array must not be empty.');
        
        // Check that the elements in trade_tokens are strings
        if (!trade_tokens.every(token => typeof token === 'string'))
            throw new Error('Invalid parameter. All elements in the trade_tokens array must be strings.');

        // Check that data_offers has the shape of a response of GetRecentTradeOffers
        if (data_offers && !data_offers?.data?.offers)
            throw new Error('Invalid parameter. The data_offers must be a response of GetRecentTradeOffers');

        const { offers } = data_offers?.data || (await this.getRecentTradeOffers(true))!.data;
        
        const lastTokenIndex = trade_tokens.length - 1;
        const filteredItemIds: string[] = [];
        
        let idIndex = 0;

        if (!offers.length) return item_ids;

        while (lastTokenIndex >= idIndex) {
            const id = item_ids[idIndex];
            const RegExpTradeToken = new RegExp(trade_tokens[idIndex]);

            if (!offers.some(offer => RegExpTradeToken.test(offer.trade_message))) {
                filteredItemIds.push(id);
            }
            
            idIndex++;
        }

        return filteredItemIds;
    }

    private async makeRequest<ResponseType>(endpoint: string, params?: object): Promise<ResponseType | undefined> {
        const instance = axios.create({
            baseURL: 'https://bitskins.com/api/v1/',
            params: {
                api_key: this.api_key,
                app_id:  this.app_id,
                code:    this.getCode(),
                ...params
            }
        });

        try {
            return (await instance.post(endpoint)).data;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.log(error.response?.data);
                throw new Error(error.response?.data.data.error_message)
            } else {
                console.log(error);
                throw new Error('Unknown error');
            }
        }
    }

    private getCode() {
        return totp.gen(base32.decode(this.secret));
    }
}