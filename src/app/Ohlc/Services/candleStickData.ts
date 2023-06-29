import timeCalculation from '@/app/Utils/timeCalculation';
import {TIMEFRAME} from '@/app/Utils/constants';
import { apiCall } from '@/app/Utils/apiCall';
import { endpoints } from '@/app/Utils/endpoint';

const candleStickData = async(selectedTime:string) => {
      const { start, end } = timeCalculation(selectedTime);
      const endpoint=`${endpoints.candle}:${TIMEFRAME[selectedTime]}:tBTCUSD/hist?start=${start}&end=${end}&limit=500`

      const {data,error}=await apiCall(endpoint,'GET')
      if (!error) {
        const apiData = data.map((candle: number[]) => {
          const [x,open, close, high, low] = candle
          return {
              x,
              y: [open, high, low, close],
            };
        });
        return {data:apiData,error:false}
      }
    
    
    return {data:null,error:null}
}

export default candleStickData