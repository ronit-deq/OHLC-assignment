import axios from 'axios';
import TimeCalculation from '@/app/Utils/TimeCalculation';
import { BASE_URL, TIMEFRAME } from '@/app/Utils/constants';

const CandleStickData = async(selectedTime:string) => {
 try {
      const { start, end } = TimeCalculation(selectedTime);
      const response = await axios.get(
        `${BASE_URL}/candles/trade:${TIMEFRAME[selectedTime]}:tBTCUSD/hist?start=${start}&end=${end}`
      );
      if (response.status === 200) {
        const data = response.data.map((candle: number[]) => {
          const [open, close, high, low] = candle.slice(1, 5);
          return {
              x: candle[0],
              y: [open, high, low, close],
            };
        });
        return {data,error:false}
      }
    }
    catch (error) {
      console.error(error);
      return {data:null,error}
    }
    return {data:null,error:null}
}

export default CandleStickData