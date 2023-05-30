import { postgresConnectionService } from "../services/PostgresConnectionService.js";

export class FlightDomain {
  constructor(flightBuilderObject) {
    this.departureDate = flightBuilderObject.departureDate;
    this.destination = flightBuilderObject.destination;
    this.distance = flightBuilderObject.distance;
    this.duration = flightBuilderObject.duration;
    this.md5Hash = flightBuilderObject.md5Hash;
    this.origin = flightBuilderObject.origin;
    this.priceUsd = flightBuilderObject.priceUsd;
    this.returnDate = flightBuilderObject.returnDate;
    this.tripClassCode = flightBuilderObject.tripClassCode;
  }

  static selectFlights() {
    try {
      const sql = `
        SELECT 
        f.id,
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

      return postgresConnectionService.runQuery(sql);
    } catch (err) {
      throw err;
    }
  }

  async insertFlight() {
    try {
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
        this.departureDate,
        this.destination,
        this.distance,
        this.duration,
        this.md5Hash,
        this.origin,
        this.priceUsd,
        this.returnDate,
        this.tripClassCode
      ];
      return await postgresConnectionService.runQuery(sql, values);
    } catch (err) {
      throw err;
    }
  }
}
