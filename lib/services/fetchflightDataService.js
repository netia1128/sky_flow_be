import axios from 'axios';
import { logger } from '../logger/Logger.js';

// Documentation for the source API can be found here:
// https://travelpayouts.github.io/slate/#about-api

export const fetchFlightDataService = async () => {
  const queryParams = new URLSearchParams([
    [`currency`, `usd`],
    [`period_type`, `year`],
    [`page`, `10`],
    [`limit`, `10`],
    [`sorting`, `price`],
    [`trip_class`, `0`],
    [`token`, `${process.env.TRAVELPAYOUTS_TOKEN}`]
  ]);

  const url = `${process.env.TRAVELPAYOUTS_HOST}/v2/prices/latest?${queryParams}`;

  const response = await axios.get(url);
  return response.data.data;
};
