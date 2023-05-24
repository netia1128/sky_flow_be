import { FlightBuilder } from "../builders/FlightBuilder.js";
import { fetchFlightDataService } from "../services/fetchflightDataService.js";
import { FlightDomain } from "./FlightDomain.js";
import { logger } from '../logger/Logger.js';

export class FlightIngestJobDomain {
  constructor() {
    this.existingFutureFlights = [];
    this.incomingFlights = [];
    this.ingestedFlights = [];
    this.success = null;
  }

  async ingestFlights() {
    try {
      this.existingFutureFlights = await FlightDomain.selectFlights();
      await this.fetchNewFlights();
      this.incomingFlights.forEach((flight) => {
        const flightBuilderObject = this.buildFlight(flight);
        if (!flightBuilderObject) return;
        if (this.existingFutureFlights.find((existingFlight) => existingFlight.md5Hash === flightBuilderObject.md5Hash)) return;
        this.incomingFlights.push(this.insertFlight(flightBuilderObject));
      });

      const ingestResults = await Promise.all(this.ingestedFlights);

      // Checks to make sure that each promise (ingested flight) resolved to true
      if (ingestResults.every((ingestResult) => ingestResult)) {
        this.success = true;
      } else {
        this.success = false;
      }

      return { ingestSuccessful: this.success };
    } catch (err) {
      console.log(err);
    }
  }

  async fetchNewFlights() {
    try {
      this.incomingFlights = await fetchFlightDataService();
    } catch (err) {
      logger.logFlightDataServiceError(err);
      this.success = false;
    }
  }

  buildFlight(flight) {
    try {
      return new FlightBuilder()
        .withDepartureDate(flight)
        .withDestination(flight)
        .withDistance(flight)
        .withDuration(flight)
        .withOrigin(flight)
        .withPriceUsd(flight)
        .withReturnDate(flight)
        .withTripClassCode(flight)
        .withMd5Hash(flight);
    } catch (err) {
      logger.logFlightBuilderError(flight, err);
      return false;
    }
  }

  insertFlight(flightBuilderObject) {
    try {
      new FlightDomain(flightBuilderObject).insertFlight();
    } catch (err) {
      logger.logFlightInsertionError(flightBuilderObject, err);
      return (false);
    }
  }
}
