import { createLogger, format, transports } from 'winston';

class Logger {
  constructor() {
    this.logger = createLogger({
      level: "debug",
      format: format.json(),
      transports: [
        new transports.Console({ level: 'error' }),
        new transports.File({ filename: './logs/error.log', level: 'error' }),
        new transports.File({ filename: './logs/combined.log' })
      ]
    });
  }

  logFlightBuilderError(flight, err) {
    const msg = `ERROR : SKYFLOW-0001 : Failed to build flight with flight details ${JSON.stringify(flight)} and error ${JSON.stringify(err)}`;
    this.logger.error(msg);
    return msg;
  }

  logFlightInsertionError(flight, err) {
    const msg = `ERROR : SKYFLOW-0002 : Failed to insert flight with flight builder ${JSON.stringify(flight)} and error ${JSON.stringify(err)}`;
    this.logger.error(msg);
    return msg;
  }

  logFlightDataServiceError(err) {
    const msg = `ERROR : SKYFLOW-0003 : Error in FlightDataService: ${JSON.stringify(err)}`;
    this.logger.error(msg);
    return msg;
  }

  logPostgresError(err) {
    const msg = `ERROR : SKYFLOW-0004 : Error in PostgresConnectionService: ${JSON.stringify(err)}`;
    this.logger.error(msg);
    return msg;
  }

  logFlightDataServiceError(err) {
    const msg = `ERROR : SKYFLOW-0005 : Error in fetching flight data: ${JSON.stringify(err)}`;
    this.logger.error(msg);
    return msg;
  }
}

export const logger = new Logger();
