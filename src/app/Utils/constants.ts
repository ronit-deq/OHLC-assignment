import { apiDataTypes, timeFrameTypes } from "./Types/constants.type";


export const timeFrame : timeFrameTypes ={
    "1h":"1m",
    "6h":"5m",
    "1d":"15m",
    "3d":"30m",
    "7d":"1h",
    "1M":"6h",
    "3M":"12h",
    "1y":"1D",
    "3y":"1W"
}


export const socketUrl='wss://api-pub.bitfinex.com/ws/2' 


export const ohlcDataPoints : apiDataTypes ={
    "OPEN": 0,
    "HIGH":1,
    "LOW":2,
    "CLOSE":3
}  
