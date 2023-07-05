import {TimeFrame} from "./constants"

const timeCalculation = (selectedTime:string) => {
  let start: number
  const currentTime = Math.floor(+(new Date())/ 1000);
  //lowercase
  const end = currentTime * 1000;
  const limit=500;

  switch (selectedTime) {
    case TimeFrame.ONE_HOUR:
      start = (currentTime - 3600) * 1000;
      break;

    case TimeFrame.SIX_HOURS:
      start = (currentTime - 6 * 3600) * 1000;
      break;

    case TimeFrame.ONE_DAY:
      start = (currentTime - 24 * 3600) * 1000;
      break;

    case TimeFrame.THREE_DAYS:
      start = (currentTime - 3 * 24 * 3600) * 1000;
      break;

    case TimeFrame.SEVEN_DAYS:
      start = (currentTime - 7 * 24 * 3600) * 1000;
      break;

    case TimeFrame.ONE_MONTH:
      start = (currentTime - 30 * 24 * 3600) * 1000;
      break;

    case TimeFrame.THREE_MONTH:
      start = (currentTime - 3 * 30 * 24 * 3600) * 1000;
      break;

    case TimeFrame.ONE_YEAR:
      start = (currentTime - 365 * 24 * 3600) * 1000;
      break;

    case TimeFrame.THREE_YEAR:
      start = (currentTime - 3 * 365 * 24 * 3600) * 1000;
      break;
    
    default:
      start = (currentTime - 3600) * 1000;
      break;
  }
  return {start,end,limit}
}

export default timeCalculation