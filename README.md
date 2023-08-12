# bitskins-ts

Wrapper of the BitSkins API that expands it with new methods

## Table of Contents

- [Features](#features)
- [Getting started](#getting-started)
	- [Installing](#installing)
	- [Import library](#import-library)
	- [Create instances](#create-instances)
- [BitSkins API Methods](#bitskins-api-methods)
	- [Get Account Balance](#getaccountbalance--documentation)
	- [Get All Item Prices](#getallitemprices--documentation)
	- [Get Market Data](#getmarketdata--documentation)
	- [Get Account Inventory](#getaccountinventorypage--documentation)
	- [Get Inventory On Sale](#getinventoryonsaleoptions--documentation)
	- [Get Specific Items On Sale](#getspecificitemsonsaleitem_ids--documentation)
	- [Get Reset-Price Items](#getresetpriceitemspage--documentation)
	- [Get Money Events](#getmoneyevents--documentation)
	- [Money Withdrawal](#moneywithdrawalamount-withdrawal_method--documentation)
	- [Buy Item](#buyitemitem_ids-prices-options--documentation)
	- [Sell Item](#sellitemitem_ids-prices--documentation)
	- [Modify Sale](#modifysaleitem_ids-prices--documentation)
	- [Delist Item](#delistitemitem_ids--documentation)
	- [Relist Item](#relistitemitem_ids-prices--documentation)
	- [Withdraw Item](#withdrawitemitem_ids--documentation)
	- [Bump Item](#bumpitemitem_ids--documentation)
	- [Get Buy History](#getbuyhistorypage--documentation)
	- [Get Sell History](#getsellhistorypage--documentation)
	- [Get Item History](#getitemhistoryoptions--documentation)
	- [Get Trade Details](#gettradedetailstrade_token-trade_id--documentation)
	- [Get Recent Trade Offers](#getrecenttradeoffersactive_only--documentation)
	- [Get Recent Sale Info](#getrecentsaleinfomarket_hash_name-page--documentation)
	- [Get Steam Price Data](#getsteampricedatamarket_hash_name--documentation)
	- [Create Buy Order](#createbuyordername-price-quantity--documentation)
	- [Get Expected Place In Queue](#getexpectedplaceinqueuename-price--documentation)
	- [Cancel Buy Orders](#cancelbuyordersbuy_order_ids--documentation)
	- [Cancel All Buy Orders](#cancelallbuyordersmarket_hash_name--documentation)
	- [Get My Buy Orders](#getmybuyordersoptions--documentation)
	- [Get Settled Orders](#getsettledorderspage--documentation)
	- [Get Active Buy Orders](#getactivebuyorderspage--documentation)
	- [Get Market Buy Orders](#getmarketbuyordersoptions--documentation)
- [Custom Methods](#custom-methods)
	- [Get Lowest Price](#getlowestpricemarket_hash_name-market_data)
	- [Get History Since](#gethistorysincehistory-unixtime-options)
	- [Get My Items To Withdraw](#getmyitemstowithdraw)
	- [Get My Items To Sell](#getmyitemstosell)
	- [Withdraw Item Advanced](#withdrawitemadvancedmarket_hash_names-number_of_items)
	- [Sell Item Advanced](#sellitemadvancedmarket_hash_names-number_of_items-prices)
	- [Buy Item Advanced](#buyitemadvancedmarket_hash_names-number_of_items-max_prices-options)
  	- [Delist Item Advanced](#delistitemadvancedmarket_hash_names-number_of_items)
	- [Modify Sale Advanced](#modifysaleadvancedmarket_hash_names-number_of_items-prices)
	- [Cancel Buy Orders Advanced](#cancelbuyordersadvancedmarket_hash_names-quantities)
	- [Get Total Buy Orders Money](#gettotalbuyordersmoney)
	- [Filter Items In Active Trades](#filteritemsinactivetradesitem_ids-trade_tokens-data_offers)
- [Examples](#examples)

## Features

-  Supports all `general`, `buy order` and `crypto deposits` methods.
-  Supports BitSkins Web Socket
-  New useful custom methods
-  Responses' Types and Interfaces

## Getting started

### Installing

```bash
$ npm install bitskins-ts
```

### Import library

```ts
import { BitSkinsAPI, BitSkinsWS } from 'bitskins-ts';
```

```ts
const { BitSkinsAPI, BitSkinsWS } = require('bitskins-ts');
```

### Create instances

```ts
const API = new BitSkinsAPI(api_key, secret, app_id);
const WS = new BitSkinsWS();
```

```ts
// app_id is 730 by default
const csAPI = new BitSkinsAPI('your api key', 'your secret');

// specify the app_id for other games
const dotaAPI = new BitSkinsAPI('your api key', 'your secret', 570);
const tf2API = new BitSkinsAPI('your api key', 'your secret', 440);
```

## BitSkins API Methods

### getAccountBalance() | [documentation](https://bitskins.com/docs/api/v1#api-general-get_account_balance)
Allows you to retrieve your available and pending balance in all currencies supported by BitSkins.

### getAllItemPrices() | [documentation](https://bitskins.com/docs/api/v1#api-general-get_all_item_prices)
Allows you to retrieve the entire price database used at BitSkins.

### getMarketData() | [documentation](https://bitskins.com/docs/api/v1#api-general-get_price_data_for_items_on_sale)
Allows you to retrieve basic price data for items currently on sale at BitSkins.

### getAccountInventory(page) | [documentation](https://bitskins.com/docs/api/v1#api-general-get_my_inventory)
Allows you to retrieve your account's available inventory on Steam (items listable for sale), your BitSkins inventory (items currently on sale), and your pending withdrawal inventory (items you delisted or purchased).

- page (optional): `number` - the page number of the Bitskins inventory.

### getInventoryOnSale(options) | [documentation](https://bitskins.com/docs/api/v1#api-general-get_inventory_on_sale)
Allows you to retrieve the BitSkins inventory currently on sale. This includes items you cannot buy (i.e., items listed for sale by you). By default, upto 30 items per page, and optionally up to 480 items per page. This method allows you to search the inventory just as the search function on the website allows you to search inventory.

*Multiple simultaneous calls to this method may result in 'Failed to acquire lock' errors.*

-  options - Object of options
   - page: `number` - Page number.
   - min_price: `number` - Minimum price.
   - max_price: `number` - Maximum price.
   - per_page: `number` - Results per page. Must be 24, 30, 60, 64, 120, 128, 240 or 480.
   - market_hash_name: `string` - Full or partial item name.
   - sort_by: `'created_at'` | `'price'` | `'wear_value'` - CS:GO only: wear_value.
   - order: `'desc'` | `'asc'`
   - has_stickers: `-1` | `0` | `1` - For CS:GO only.
   - is_stattrak: `-1` | `0` | `1` - For CS:GO only.
   - is_souvenir: `-1` | `0` | `1` - For CS:GO only.
   - show_trade_delayed_items: `-1` | `0` | `1` - For CS:GO only.

### getSpecificItemsOnSale(item_ids) | [documentation](https://bitskins.com/docs/api/v1#api-general-get_specific_items_on_sale)
Allows you to retrieve data for specific Item IDs that are currently on sale. To gather Item IDs you wish to track/query, see the 'Get Inventory on Sale' API call for items currently on sale.

-  item_ids: `string | string[]` - Upto 250 comma-delimited item IDs.

### getResetPriceItems(page) | [documentation](https://bitskins.com/docs/api/v1#api-general-get_reset_price_items)
Returns a paginated list of items that need their prices reset. Items need prices reset when Steam changes tracker so we are unable to match specified prices to the received items when you list them for sale. Upto 30 items per **page**. Items that need price resets always have the reserved price of 4985.11.

-  page (optional): `number` - Page number.

### getMoneyEvents() | [documentation](https://bitskins.com/docs/api/v1#api-general-get_money_events)
Allows you to retrieve historical events that caused changes in your balance. Upto 30 items per page.

-  page (optional): `number` - Page number.

### buyItem(item_ids, prices, options) | [documentation](https://bitskins.com/docs/api/v1#api-general-buy_item)
Allows you to buy the item currently on sale on BitSkins. Item must not be currently be on sale to you. Requires 2FA (Secure Purchases) to be enabled on your account if not logged in.

*Multiple simultaneous calls to this method may result in 'Failed to acquire lock' errors.*

-  item_ids: `string | string[]` - Comma-separated list of item IDs.
-  prices: `string | string[]` - Comma-delimited prices at which you want to make the purchase. Important to specify this in case the prices change by the time you make this call.
-  options - Object of options
   -  auto_trade: `boolean` - Initiate trade offer for purchased items' delivery. Default: true.
   -  allow_trade_delayed_purchases: `boolean` - Use 'true' if you want to purchase items that are trade-delayed. Default: false.

### sellItem(item_ids, prices) | [documentation](https://bitskins.com/docs/api/v1#api-general-list_item_for_sale)
Allows you to list an item for sale. This item comes from your Steam inventory. If successful, our bots will ask you to trade in the item you want listed for sale. Check for instant sale prices in the 'Get All Item Prices' endpoint if selling items instantly.

-  item_ids: `string | string[]` - Comma-separated list of item IDs from your Steam inventory.
-  prices: `string | 'instant' | (string | 'instant')[]` - Comma-separated list of prices for each item ID you want to list for sale (order is respective to order of item_ids). Use 'instant' if selling instantly.

### modifySale(item_ids, prices) | [documentation](https://bitskins.com/docs/api/v1#api-general-modify_sale_item)
Allows you to change the price on an item currently on sale.

-  item_ids: `string | string[]` - Item IDs to modify.
-  prices: `string | string[]` - New item prices, comma-delimited, in order of item_ids.

### delistItem(item_ids) | [documentation](https://bitskins.com/docs/api/v1#api-general-modify_sale_item)
Allows you to delist an active sale item.

*Multiple simultaneous calls to this method may result in 'Failed to acquire lock' errors.*

-  item_ids: `string | string[]` - Comma-separated list of item IDs.

### relistItem(item_ids, prices) | [documentation](https://bitskins.com/docs/api/v1#api-general-relist_item)
Allows you to re-list a delisted/purchased item for sale. Re-listed items can be sold instantly, where applicable.

*Multiple simultaneous calls to this method may result in 'Failed to acquire lock' errors.*

-  item_ids: `string | string[]` - Comma-separated list of item IDs.
-  prices: `string | string[]` - Comma-separated prices for want for the item_ids. Use 'instant' if selling instantly.

### withdrawItem(item_ids) | [documentation](https://bitskins.com/docs/api/v1#api-general-withdraw_item)
Allows you to delist an active sale item and/or re-attempt an item pending withdrawal.

-  item_ids: `string | string[]` - Comma-separated list of item IDs.

### bumpItem(item_ids) | [documentation](https://bitskins.com/docs/api/v1#api-general-bump_item)
Allows you to bump items higher for $0.75. Must have 2FA enabled if not logged in.

*Multiple simultaneous calls to this method may result in 'Failed to acquire lock' errors.*

-  item_ids: `string | string[]` - Item IDs to bump, comma-delimited.

### getBuyHistory(page) | [documentation](https://bitskins.com/docs/api/v1#api-general-get_buy_history)
Allows you to retrieve your history of bought items on BitSkins. Defaults to 30 items per page, with most recent appearing first.

-  page (optional): `number` - Page number.

### getSellHistory(page) | [documentation](https://bitskins.com/docs/api/v1#api-general-get_sell_history)
Allows you to retrieve your history of sold items on BitSkins. Defaults to 30 items per page, with most recent appearing first.

-  page (optional): `number` - Page number.

### getItemHistory(options) | [documentation](https://bitskins.com/docs/api/v1#api-general-get_item_history)
Allows you to retrieve bought/sold/listed item history. By default, upto 30 items per page, and optionally up to 480 items per page.

-  options - Object of options.
   -  page: `number` - Page number.
   -  names: `string | string[]` - Delimited item names.
   -  per_page: `number` - Results per page (between 30 and 480).

### getTradeDetails(trade_token, trade_id) | [documentation](https://bitskins.com/docs/api/v1#api-general-get_trade_details)
Allows you to retrieve information about items requested/sent in a given trade from BitSkins. Trade details will be unretrievable 7 days after the initiation of the trade.

-  trade_token: `string` - The trade token in the Steam trade's message.
-  trade_id: `string` - The trade ID in the Steam trade's message.

### getRecentTradeOffers(active_only) | [documentation](https://bitskins.com/docs/api/v1#api-general-get_recent_trade_offers)
Allows you to retrieve information about 50 most recent trade offers sent by BitSkins. Response contains 'steam_trade_offer_state,' which is '2' if the only is currently active.

-  active_only (optional): `boolean` - Value is 'true' if you only need trade offers currently active.

	### getRecentSaleInfo(market_hash_name, page) | [documentation](https://bitskins.com/docs/api/v1#api-general-get_sales_info)
Allows you to retrieve upto 5 pages worth of recent sale data for a given item name. These are the recent sales for the given item at BitSkins, in descending order.

-  market_hash_name: `string` - The item's name.
-  page (optional): `number` - The page number.

### getSteamPriceData(market_hash_name) | [documentation](https://bitskins.com/docs/api/v1#api-general-get_steam_price_data)
Allows you to retrieve raw Steam Community Market price data for a given item. You can use this data to create your own pricing algorithm if you need it.

-  market_hash_name: `string` - The item's name.

### createBuyOrder(name, price, quantity) | [documentation](https://bitskins.com/api_market_buy_orders#create_buy_order)
Allows you to create a buy order for a single item. Buy orders are executed within 30 seconds if an eligible item becomes available given your buy order price. Funds are not withheld because of pending buy orders, but will be automatically cancelled if your account has insufficient funds to execute a buy order when an eligible item is up for sale.

*Multiple simultaneous calls to this method may result in 'Failed to acquire lock' errors.*

-  name: `string` - The name of the item you want to purchase.
-  price: `string | 'auto'` - The price at which you want to purchase the item. Use 'auto' to buy at current market value.
-  quantity (optional): `number` - Number of buy orders to create at this price for this item.

### getExpectedPlaceInQueue(name, price) | [documentation](https://bitskins.com/api_market_buy_orders#get_expected_place_in_queue_for_new_buy_order)
Allows you to retrieve the expected place in queue for a new buy order without creating the buy order.

-  name: `string` - The name of the item you want to purchase.
-  price: `string | 'auto'` - The price at which you want to purchase the item. Use 'auto' to buy at current market value.

### cancelBuyOrders(buy_order_ids) | [documentation](https://bitskins.com/api_market_buy_orders#cancel_buy_orders)
Allows you to cancel upto 999 active buy orders.

*Multiple simultaneous calls to this method may result in 'Failed to acquire lock' errors.*

-  buy_order_ids: `number[]` - Comma-separated string of up to 999 buy order IDs.

### cancelAllBuyOrders(market_hash_name) | [documentation](https://bitskins.com/api_market_buy_orders#cancel_all_buy_orders)
Allows you to cancel all buy orders for a given item name.

*Multiple simultaneous calls to this method may result in 'Failed to acquire lock' errors.*

-  market_hash_name: `string` - The item name.

### getMyBuyOrders(options) | [documentation](https://bitskins.com/api_market_buy_orders#get_buy_order_history)
Allows you to retrieve all buy orders you have placed, whether active or not.

-  options - Object of options
   -  market_hash_name: `string` - An item's name.
   -  type: `'LISTED'`| `'SETTLED'` | `'CANCELLED_BY_USER'` | `'CANCELLED_BY_SYSTEM'`
   -  page: `number` - The page number.

### getSettledOrders(page) | [documentation](https://bitskins.com/api_market_buy_orders#get_settled_buy_orders)
Allows you to retrieve all buy orders you made that have been settled. Provides information on the item you purchased to settle this buy order. Deprecated, use get_buy_order_history.

-  page (optional): `number` - The page number.

### getActiveBuyOrders(page) | [documentation](https://bitskins.com/api_market_buy_orders#get_active_buy_orders)
Allows you to retrieve all buy orders that have not been cancelled or settled. Deprecated, use get_buy_order_history.

-  page (optional): `number` - The page number.

### getMarketBuyOrders(options) | [documentation](https://bitskins.com/api_market_buy_orders#get_market_buy_orders)
Allows you to retrieve all market orders by all buyers (except your own) that need fulfillment.

-  options - Object of options.
   -  market_hash_name: `string` - The item name for which you seek buy orders. If not provided, you will get active buy orders for all items.
   -  page: `number` - The page number.

## Custom Methods

### getLowestPrice(market_hash_name, market_data)
Allows you to get the lowest price of an item. For several calls in a short period, pass a response of getMarketData as a parameter.

-  market_hash_name: `string` - The item's name. Accepts uppercase, lowercase, or mixed.
-  market_data (optional): `GetMarketDataResponse` - A response of getMarketData.

### getHistorySince(history, unixtime, options)

-  history: `'buy'` | `'sell'` | `'item'` - Depends on the history that you want to get the information.
-  unixtime: `number` - The time since you want to obtain the information, represented as a number in Unix Time.
-  options - Object of options
   -  names: `string | string[]` - Delimited item names.
   -  per_page: `number` - Results per page (between 30 and 480).

More information of Unix Time:
-  [Wikipedia Unix Time](https://en.wikipedia.org/wiki/Unix_time)
-  [Current Unix Time Stamp](https://www.unixtimestamp.com/)

### getMyItemsToWithdraw()
Allows you to get the items that you can withdraw. The response includes the items on sale and pending items.

### getMyItemsToSell()
Allows you to get the items that you can sell. The response includes the steam inventory items that are allowed to sell and the pending items.

### withdrawItemAdvanced(market_hash_names, number_of_items)
Allows you to withdraw a list of items without pass the item_ids.

*The parameters must have the same number of elements*

-  market_hash_names: `string | string[]` - An array of market_hash_names. Accepts uppercase, lowercase, or mixed.
-  number_of_times: `number | number[]` - An array with the number of items to withdraw, in order of market_hash_names.

### sellItemAdvanced(market_hash_names, number_of_items, prices)
Allows you to sell a list of items without pass the item_ids.

*The parameters must have the same number of elements*

-  market_hash_names: `string | string[]` - An array of market_hash_names. Accepts uppercase, lowercase, or mixed.
-  number_of_times: `string | number[]` - An array with the number of items to sell, in order of market_hash_names.
-  prices: `string | number[]` - An array with the prices, in order of market_hash_names.

### buyItemAdvanced(market_hash_names, number_of_items, max_prices, options)
Allows you to buy a list of items with a maximun price and without pass the item_ids.

*The parameters must have the same number of elements*

-  market_hash_names: `string | string[]` - An array of market_hash_names. Accepts uppercase, lowercase, or mixed.
-  number_of_times: `number | number[]` - An array with the number of items to buy, in order of market_hash_names.
-  max_prices: `string | string[]` - An array with the prices, in order of market_hash_names.
-  options - Object of options
   -  auto_trade: `boolean` - Initiate trade offer for purchased items' delivery. Default: true.
   -  allow_trade_delayed_purchases: `boolean` - Use 'true' if you want to purchase items that are trade-delayed. Default: false.

### delistItemAdvanced(market_hash_names, number_of_items)
Allows you to delist a list of items without pass the item_ids.

*The parameters must have the same number of elements*

-  market_hash_names: `string | string[]` - An array of market_hash_names. Accepts uppercase, lowercase, or mixed.
-  number_of_times: `number | number[]` - An array with the number of items to delist, in order of market_hash_names.

### modifySaleAdvanced(market_hash_names, number_of_items, prices)
Allows you to modify a list of items on sale without pass the item_ids.

*The parameters must have the same number of elements*

-  market_hash_names: `string | string[]` - An array of market_hash_names. Accepts uppercase, lowercase, or mixed.
-  number_of_items: `number | number[]` - An array with the number of items to delist, in order of market_hash_names.
-  prices: `string | string[]` - An array with the prices, in order of market_hash_names.

### cancelBuyOrdersAdvanced(market_hash_names, quantities)
Allows you to cancel buy orders without pass the item_ids.

-  market_hash_names: `string | string[]` - An array of market_hash_names. Accepts uppercase, lowercase, or mixed.
-  quantities: `number | number[]` - The quantity of buy orders to cancel.

### getTotalBuyOrdersMoney()
Allows you to get how much money you have in buy orders.

### filterItemsInActiveTrades(item_ids, trade_tokens, data_offers)
Allows you to get an array with item ids of items that are not in active trades.

-  item_ids: `string[]` - An array of item ids to check.
-  trade_tokens: `string[]` - An array of trade tokens in order of item_ids.
-  data_offers (optional): `GetRecentTradeOffersResponse` - A response of getRecentTradeOffers.

## Examples

```ts
import { BitSkinsAPI } from 'bitskins-ts';

const API = new BitSkinsAPI('your api key', 'your secret');

// getAccountBalance

API.getAccountBalance().then(data => console.log(data));

// getInventoryOnSale

const options = {
	sort_by: 'price',
	order: 'asc',
	market_hash_name: 'clutch case',
	max_price: 0.8
}

API.getInventoryOnSale(options).then(data => console.log(data));

// sellItem

// You can use both of this ways to pass the item_ids
const item_ids_1 = '31776552281,31776552258';
const item_ids_2 = ['31776552281', '31776552258'];

// You can use both of this ways to pass the prices
const prices_1 = '1,3';
const prices_2 = ['1', '3'];

API.sellItem(item_ids, prices).then(data => console.log(data));

// getLowestPrice

API.getLowestPrice('Clutch Case').then(data => console.log(data));
```

Response

```json
{
   	"status": "success",
   	"data": {
    	"available_balance": "9999.00",
    	"pending_withdrawals": "0.00",
    	"withdrawable_balance": "0.00",
    	"couponable_balance": "0.00"
    }
}

{
  	"status": "success",
  	"data": {
    	"items": [
      	{
        	"app_id": "730",
        	"context_id": "2",
        	"item_id": "31756880076",
        	"asset_id": "31756880076",
			"class_id": "5430513263",
			"instance_id": "0",
			"market_hash_name": "Clutch Case",
			"item_type": "Container",
			"item_class": null,
			"item_rarity": "Base Grade",
			"item_weapon": null,
			"item_quality": "Normal",
			"image": "https://steamcommunity-a.akamaihd.net/economy/image/...",
			"inspectable": false,
			"inspect_link": "",
			"price": "0.62",
			"suggested_price": "0.76",
			"is_featured": false,
			"float_value": null,
			"pattern_info": {},
			"phase": null,
			"type": "listed",
			"is_mine": false,
			"tags": {
				"type": "Container",
				"itemset": "The Clutch Collection",
				"quality": "Normal",
				"rarity": "Base Grade"
			},
			"fraud_warnings": [],
			"stickers": null,
			"updated_at": 1690064639,
			"withdrawable_at": 1690700399,
			"bot_uid": "76561198305109198"
    	},
			]
  	}
}

{
  	"status": "success",
  	"data": {
    	"items": [	],
    	"trade_tokens": [  ],
    	"bot_info": {  }
	}
}

0.70
```