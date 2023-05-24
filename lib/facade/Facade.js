import { FlightIngestJobDomain } from '../domains/FlightIngestJobDomain.js';
import { FlightDomain } from '../domains/FlightDomain.js';

class Facade {
  ingestFlights() {
    return new FlightIngestJobDomain().ingestFlights();
  }

  selectFlights() {
    return FlightDomain.selectFlights();
  }
}

export const facade = new Facade();
