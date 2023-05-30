import { jest } from "@jest/globals";
import { FlightDomain } from '../../lib/domains/FlightDomain.js';
import { postgresConnectionService } from '../../lib/services/PostgresConnectionService.js';

let flightDomain;
let flightBuilder;
let spyRunQuery;

beforeAll(async () => {
  flightBuilder = {
    departureDate: `2023-06-14`,
    destination: `DEN`,
    distance: 400,
    duration: 60,
    md5Hash: `xxx`,
    origin: `BOS`,
    priceUsd: 64,
    returnDate: `2023-06-15`,
    tripClassCode: 2
  };
  flightDomain = new FlightDomain(flightBuilder);
  spyRunQuery = jest.spyOn(postgresConnectionService, 'runQuery').mockImplementation(() => {});
});

beforeEach(async () => {
  spyRunQuery.mockClear();
});

describe('FlightDomain --->', () => {
  it('should have a builder and the builder should be of class FlightDomain', () => {
    expect(flightDomain).toBeInstanceOf(FlightDomain);
  });
  it('is instantiated with various properties', () => {
    expect(flightBuilder.departureDate).toEqual(`2023-06-14`);
    expect(flightBuilder.destination).toEqual(`DEN`);
    expect(flightBuilder.distance).toEqual(400);
    expect(flightBuilder.duration).toEqual(60);
    expect(flightBuilder.md5Hash).toEqual(`xxx`);
    expect(flightBuilder.origin).toEqual(`BOS`);
    expect(flightBuilder.priceUsd).toEqual(64);
    expect(flightBuilder.returnDate).toEqual(`2023-06-15`);
    expect(flightBuilder.tripClassCode).toEqual(2);
  });
});

describe('FlightDomain methods', () => {
  it('should call the runQuery method when calling selectFlights', () => {
    const sql = `
      SELECT 
      f.price_usd as "priceUsd", 
      lkp_fc.trip_class_name as "tripClassName",
      f.origin,
      f.destination,
      f.departure_date as "departureDate",
      f.md5_hash as "md5Hash",
      f.return_date as "returnDate",
      f.duration,
      f.distance
      FROM 
      flights f,
      lkp_flight_class lkp_fc
      WHERE 
      lkp_fc.trip_class_code = f.trip_class_code
      AND departure_date > NOW()
      ORDER BY departure_date;`;

    FlightDomain.selectFlights();

    expect(spyRunQuery).toHaveBeenCalledTimes(1);
  });
  it('should call the runQuery method when calling selectFlights', () => {
    const sql = `
        INSERT INTO flights 
        (
          departure_date,
          destination,
          distance,
          duration,
          md5_hash,
          origin,
          price_usd,
          return_date,
          trip_class_code
          ) 
          VALUES (
            $1,
            $2,
            $3,
            $4,
            $5,
            $6,
            $7,
            $8,
            $9
          )
        ;
      `;

    const values = [
      "2023-06-14",
      "DEN",
      400,
      60,
      "xxx",
      "BOS",
      64,
      "2023-06-15",
      2
    ];

    flightDomain.insertFlight(flightDomain);

    expect(spyRunQuery).toHaveBeenCalledTimes(1);
    expect(spyRunQuery).toHaveBeenCalledWith(sql, values);
  });
});
