
let start: number, end: number;
const TimeCalculation = (selectedTime:string) => {
  const currentTime = Math.floor(Date.now() / 1000);

  switch (selectedTime) {
    case "1h":
      start = (currentTime - 3600) * 1000;
      end = currentTime * 1000;
      break;

    case "6h":
      start = (currentTime - 6 * 3600) * 1000;
      end = currentTime * 1000;
      break;

    case "1d":
      start = (currentTime - 24 * 3600) * 1000;
      end = currentTime * 1000;
      break;

    case "3d":
      start = (currentTime - 3 * 24 * 3600) * 1000;
      end = currentTime * 1000;
      break;

    case "7d":
      start = (currentTime - 7 * 24 * 3600) * 1000;
      end = currentTime * 1000;
      break;

    case "1m":
      start = (currentTime - 30 * 24 * 3600) * 1000;
      end = currentTime * 1000;
      break;

    case "3m":
      start = (currentTime - 3 * 30 * 24 * 3600) * 1000;
      end = currentTime * 1000;
      break;

    case "1y":
      start = (currentTime - 365 * 24 * 3600) * 1000;
      end = currentTime * 1000;
      break;

    case "3y":
      start = (currentTime - 3 * 365 * 24 * 3600) * 1000;
      end = currentTime * 1000;
      break;
  }
  return {start,end}

}

export default TimeCalculation