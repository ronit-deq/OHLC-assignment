export interface TimeFrameTypes{
    [name:string]:string
}

export interface ApiDataTypes {
    [name:string]:number
}

export interface OHLCValueInterface {
  x: number;
  y: number[];
}

export interface OrderBookInterface {
  price: number;
  amount: number;
  count: number;
  total: number;
}

export interface CandleStickChartProps {
  candleSeries: OHLCValueInterface[];
  tooltipValues: (event: object, chartContext: object, config: object) => void;
}
