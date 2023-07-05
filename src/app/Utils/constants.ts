import { ApiDataTypes, TimeFrameTypes } from "./Types/constants.type";

export const SOCKET_URL='wss://api-pub.bitfinex.com/ws/2' 

export const BASE_URL='https://api-pub.bitfinex.com/v2' 

export const INITIAL_TIMEFRAME='1h';

export enum TimeFrame {
    THREE_YEAR="3y",
    ONE_YEAR="1y",
    THREE_MONTH="3m",
    ONE_MONTH="1m",
    SEVEN_DAYS="7d",
    THREE_DAYS="3d",
    ONE_DAY="1d",
    SIX_HOURS="6h",
    ONE_HOUR="1h",    
}

export const TIMEMAPPING : TimeFrameTypes ={
    "3y":"1W",
    "1y":"1D",
    "3m":"12h",
    "1m":"6h",
    "7d":"1h",
    "3d":"30m",
    "1d":"15m",
    "6h":"5m",
    "1h":"1m",
}

export const OHLC_DATA_POINTS : ApiDataTypes ={
    "OPEN": 0,
    "HIGH":1,
    "LOW":2,
    "CLOSE":3
}  

