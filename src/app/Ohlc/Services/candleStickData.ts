import timeCalculation from '@/app/Utils/timeCalculation';
import { apiCall } from '@/app/Utils/apiCall';
import { ENDPOINT } from '@/app/Utils/endpoint';
import { TIMEMAPPING } from '@/app/Utils/constants';

const candleStickData = async(selectedTime:string) => {
    const { start, end ,limit} = timeCalculation(selectedTime);      
      
    const API_END_POINT=`${ENDPOINT.candle}:${TIMEMAPPING[selectedTime]}:${ENDPOINT.currencyToken}?start=${start}&end=${end}&limit=${limit}`;
      
    const {data,error}=await apiCall(API_END_POINT,'GET')
      
    if (!error) {
      const apiData = data.map((candle: number[]) => {
        const [x,open, close, high, low] = candle
          return {
            x,
            y: [open, high, low, close],
          };
      });
      return {data:apiData,error:null}
    }
    return {data:null,error:error}
}

export default candleStickData;