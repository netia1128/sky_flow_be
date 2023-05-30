import { FlightIngestJobDomain } from '../domains/FlightIngestJobDomain.js';
import { FlightDomain } from '../domains/FlightDomain.js';

class Facade {
  ingestFlights() {
    return new FlightIngestJobDomain().ingestFlights();
  }

  async selectFlights() {
    try {
      return FlightDomain.selectFlights();
    } catch (err) {
      throw err;
    }
  }
}

export const facade = new Facade();
