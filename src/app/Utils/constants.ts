import { ApiDataTypes } from "./Types/constants.type";

export const SOCKET_URL='wss://api-pub.bitfinex.com/ws/2' 

export const BASE_URL='https://api-pub.bitfinex.com/v2' 

export const INITIAL_TIMEFRAME='1h';

export enum TimeFrame {
    "3y"="1W",
    "1y"="1D",
    "3m"="12h",
    "1m"="6h",
    "7d"="1h",
    "3d"="30m",
    "1d"="15m",
    "6h"="5m",
    "1h"="1m",    
}

export const OHLC_DATA_POINTS : ApiDataTypes ={
    "OPEN": 0,
    "HIGH":1,
    "LOW":2,
    "CLOSE":3
}  

