import crypto from 'crypto';

export class FlightBuilder {
  constructor() {
    this.destination = null;
    this.departureDate = null;
    this.distance = null;
    this.duration = null;
    this.origin = null;
    this.priceUsd = null;
    this.returnDate = null;
    this.tripClassCode = null;
    this.md5Hash = null;
  }

  withDestination(incomingFlight) {
    if(incomingFlight?.destination && typeof incomingFlight.destination === `string`) {
      this.destination = incomingFlight?.destination;
      return this;
    }
    throw new Error(`Incoming flight destination either missing or invalid data type`)
  }

  withDepartureDate(incomingFlight) {
    if(incomingFlight?.depart_date 
      && ( typeof incomingFlight.depart_date === `string` || typeof incomingFlight.depart_date === `date`)) {
      this.departureDate = incomingFlight?.depart_date;
      return this;
    }
    throw new Error(`Incoming flight departure date either missing or invalid data type`)
  }

  withDistance(incomingFlight) {
    if(typeof incomingFlight.distance === `number`) {
      this.distance = incomingFlight?.distance;
      return this;
    }
    throw new Error(`Incoming flight distance either missing or invalid data type`)
  }

  withDuration(incomingFlight) {
    if(incomingFlight?.duration && typeof incomingFlight.duration === `number`) {
      this.duration = incomingFlight?.duration;
      return this;
    }
    throw new Error(`Incoming flight duration either missing or invalid data type`)
  }

  withMd5Hash(incomingFlight) {
    const incomingFlightStringified = JSON.stringify(incomingFlight);
    this.md5Hash = crypto.createHash('md5').update(incomingFlightStringified).digest('hex');
    return this;
  }

  withOrigin(incomingFlight) {
    if(incomingFlight?.origin && typeof incomingFlight.origin === `string`) {
      this.origin = incomingFlight?.origin;
      return this;
    }
    throw new Error(`Incoming flight origin either missing or invalid data type`)
  }

  withPriceUsd(incomingFlight) {
    if(incomingFlight?.value && typeof incomingFlight.value === `number`) {
      this.priceUsd = incomingFlight?.value;
      return this;
    }
    throw new Error(`Incoming flight price either missing or invalid data type`)
  }

  withReturnDate(incomingFlight) {
    if(!incomingFlight?.return_date 
      || (new Date(incomingFlight.return_date) && isNaN(incomingFlight.return_date))
    ) {
      this.returnDate = incomingFlight?.return_date;
      return this;
    }
    throw new Error(`Incoming flight return date is invalid data type`)
  }

  withTripClassCode(incomingFlight) {
    const validTripClassCodes = [0, 1, 2];
    if(incomingFlight.trip_class !== undefined && validTripClassCodes.includes(incomingFlight.trip_class)) {
      this.tripClassCode = incomingFlight.trip_class;
      return this;
    }
    throw new Error(`Incoming flight trip class code either missing or invalid value`)
  }

}