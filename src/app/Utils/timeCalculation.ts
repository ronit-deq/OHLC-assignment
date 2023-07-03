
const timeCalculation = (selectedTime:string) => {
  let start: number
  const CURRENT_TIME = Math.floor(+(new Date())/ 1000);
  const END = CURRENT_TIME * 1000;
  const LIMIT=500;

  switch (selectedTime) {
    case "1h":
      start = (CURRENT_TIME - 3600) * 1000;
      break;

    case "6h":
      start = (CURRENT_TIME - 6 * 3600) * 1000;
      break;

    case "1d":
      start = (CURRENT_TIME - 24 * 3600) * 1000;
      break;

    case "3d":
      start = (CURRENT_TIME - 3 * 24 * 3600) * 1000;
      break;

    case "7d":
      start = (CURRENT_TIME - 7 * 24 * 3600) * 1000;
      break;

    case "1m":
      start = (CURRENT_TIME - 30 * 24 * 3600) * 1000;
      break;

    case "3m":
      start = (CURRENT_TIME - 3 * 30 * 24 * 3600) * 1000;
      break;

    case "1y":
      start = (CURRENT_TIME - 365 * 24 * 3600) * 1000;
      break;

    case "3y":
      start = (CURRENT_TIME - 3 * 365 * 24 * 3600) * 1000;
      break;
    
    default:
      start = (CURRENT_TIME - 3600) * 1000;
      break;
  }
  return {start,END,LIMIT}
}

export default timeCalculation