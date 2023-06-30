import timeCalculation from '@/app/Utils/timeCalculation';
import {TimeFrame} from '@/app/Utils/constants';
import { apiCall } from '@/app/Utils/apiCall';
import { endpoints } from '@/app/Utils/endpoint';

const candleStickData = async(selectedTime:string) => {
      const { start, end ,limit} = timeCalculation(selectedTime);
      
      const endpoint=`${endpoints.candle}:${TimeFrame[selectedTime as keyof typeof TimeFrame]}:${endpoints.currencyToken}?start=${start}&end=${end}&limit=${limit}`

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