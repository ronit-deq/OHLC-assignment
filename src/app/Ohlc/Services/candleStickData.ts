import timeCalculation from '@/app/Utils/timeCalculation';
import { apiCall } from '@/app/Utils/apiCall';
import { endpoints } from '@/app/Utils/endpoint';
import { TIMEFRAME } from '@/app/Utils/constants';

const candleStickData = async(selectedTime:string) => {
    const { start, END ,LIMIT} = timeCalculation(selectedTime);      
      
    const API_END_POINT=`${endpoints.candle}:${TIMEFRAME[selectedTime as keyof typeof TIMEFRAME]}:${endpoints.currencyToken}?start=${start}&end=${END}&limit=${LIMIT}`;
      
    const {data,error}=await apiCall(API_END_POINT,'GET')
      
    if (!error) {
      const API_DATA = data.map((candle: number[]) => {
      const [x,open, close, high, low] = candle
        return {
          x,
          y: [open, high, low, close],
        };
      });
      return {data:API_DATA,error:null}
    }
    return {data:null,error:error}
}

export default candleStickData;