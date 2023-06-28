import { ApiDataTypes, TimeFrameTypes } from "./Types/constants.type";

export const SOCKET_URL='wss://api-pub.bitfinex.com/ws/2' 

export const BASE_URL='https://api-pub.bitfinex.com/v2' 


export const TIMEFRAME : TimeFrameTypes ={
    "1h":"1m",
    "6h":"5m",
    "1d":"15m",
    "3d":"30m",
    "7d":"1h",
    "1m":"6h",
    "3m":"12h",
    "1y":"1D",
    "3y":"1W"
}


// export enum TIMEFRAME {
//     "1h"="1m",
//     "6h"="5m",
//     "1d"="15m",
//     "3d"="30m",
//     "7d"="1h",
//     "1m"="6h",
//     "3m"="12h",
//     "1y"="1D",
//     "3y"="1W"
// }



export const OHLC_DATA_POINTS : ApiDataTypes ={
    "OPEN": 0,
    "HIGH":1,
    "LOW":2,
    "CLOSE":3
}  

export const INITIAL_TIMEFRAME='1h';
