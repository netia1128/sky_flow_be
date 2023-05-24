import { FlightBuilder } from '../../lib/builders/FlightBuilder.js';

let flightBuilder;
let invalidIncomingFlight;
let validIncomingFlight;

beforeAll(async () => {
  flightBuilder = new FlightBuilder();
  invalidIncomingFlight = {};
  validIncomingFlight = {
    depart_date: `2023-06-14`,
    destination: `testDestination`,
    distance: 400,
    duration: 500,
    md5Hash: `testMd5Hash`,
    origin: `testOrigin`,
    return_date: `2023-08-03`,
    trip_class: 1,
    value: 6
  };
});

describe('FlightBuilder --->', () => {
  it('should have a builder and the builder should be of class FlightBuilder', () => {
    expect(flightBuilder).toBeInstanceOf(FlightBuilder);
  });
  it('is instantiated with various properties, all set to null', () => {
    expect(flightBuilder.departureDate).toEqual(null);
    expect(flightBuilder.destination).toEqual(null);
    expect(flightBuilder.distance).toEqual(null);
    expect(flightBuilder.duration).toEqual(null);
    expect(flightBuilder.md5Hash).toEqual(null);
    expect(flightBuilder.origin).toEqual(null);
    expect(flightBuilder.priceUsd).toEqual(null);
    expect(flightBuilder.returnDate).toEqual(null);
    expect(flightBuilder.tripClassCode).toEqual(null);
  });
});

describe('builder methods', () => {
  it('withDepartureDate throws an exception if the key doesnt exist in the incoming data', () => {
    try {
      flightBuilder.withDepartureDate(invalidIncomingFlight);
    } catch (err) {
      expect(err.message).toEqual(`Incoming flight departure date either missing or invalid data type`);
    }
  });
  it('withDepartureDate throws an exception if the key is of the wrong type', () => {
    try {
      invalidIncomingFlight.depart_date = 6;
      flightBuilder.withDepartureDate(invalidIncomingFlight);
    } catch (err) {
      expect(err.message).toEqual(`Incoming flight departure date either missing or invalid data type`);
    }
  });
  it('withDepartureDate sets the objects departureDate to the value of the incoming flights depart_date key', () => {
    flightBuilder.withDepartureDate(validIncomingFlight);

    expect(flightBuilder.departureDate).toEqual(`2023-06-14`);
  });
  it('withDestination throws an exception if the key doesnt exist in the incoming data', () => {
    try {
      flightBuilder.withDestination(invalidIncomingFlight);
    } catch (err) {
      expect(err.message).toEqual(`Incoming flight destination either missing or invalid data type`);
    }
  });
  it('withDestination sets the objects destination to the value of the incoming flights destination key', () => {
    flightBuilder.withDestination(validIncomingFlight);

    expect(flightBuilder.destination).toEqual('testDestination');
  });
  it('withDistance sets the objects distance to the value of the incoming flights distance key', () => {
    flightBuilder.withDistance(validIncomingFlight);

    expect(flightBuilder.distance).toEqual(400);
  });
  it('withDistance throws an error if the incoming flights distance property is of the wrong data type', () => {
    try {
      flightBuilder.withDistance(invalidIncomingFlight);
    } catch (err) {
      expect(err.message).toEqual(`Incoming flight distance either missing or invalid data type`);
    }
  });
  it('withDuration throws an exception if the key doesnt exist in the incoming data', () => {
    try {
      flightBuilder.withDuration(invalidIncomingFlight);
    } catch (err) {
      expect(err.message).toEqual(`Incoming flight duration either missing or invalid data type`);
    }
  });
  it('withDuration throws an exception if the property is of the wrong data type', () => {
    try {
      invalidIncomingFlight.duration = `dog`;
      flightBuilder.withDuration(invalidIncomingFlight);
    } catch (err) {
      expect(err.message).toEqual(`Incoming flight duration either missing or invalid data type`);
    }
  });
  it('withDuration sets the objects duration to the value of the incoming flights duration key', () => {
    flightBuilder.withDuration(validIncomingFlight);

    expect(flightBuilder.duration).toEqual(500);
  });
  it('withMd5Hash creates an MD5 hash using the incoming flights details', async () => {
    await flightBuilder.withMd5Hash(validIncomingFlight);

    expect(flightBuilder.md5Hash).toEqual(`ee9229700ebefbe8323e975e9b2c35fb`);
  });
  it('withOrigin throws an exception if the key doesnt exist in the incoming data', () => {
    try {
      flightBuilder.withOrigin(invalidIncomingFlight);
    } catch (err) {
      expect(err.message).toEqual(`Incoming flight origin either missing or invalid data type`);
    }
  });
  it('withOrigin throws an exception if the property is of the wrong data type', () => {
    try {
      invalidIncomingFlight.origin = 6;
      flightBuilder.withOrigin(invalidIncomingFlight);
    } catch (err) {
      expect(err.message).toEqual(`Incoming flight origin either missing or invalid data type`);
    }
  });
  it('withOrigin sets the objects duration to the value of the incoming flights duration key', () => {
    flightBuilder.withOrigin(validIncomingFlight);

    expect(flightBuilder.origin).toEqual(`testOrigin`);
  });
  it('withPriceUsd throws an exception if the key doesnt exist in the incoming data', () => {
    try {
      flightBuilder.withPriceUsd(invalidIncomingFlight);
    } catch (err) {
      expect(err.message).toEqual(`Incoming flight price either missing or invalid data type`);
    }
  });
  it('withPriceUsd throws an exception if the property is of the wrong data type', () => {
    try {
      invalidIncomingFlight.value = 6;
      flightBuilder.withPriceUsd(invalidIncomingFlight);
    } catch (err) {
      expect(err.message).toEqual(`Incoming flight price either missing or invalid data type`);
    }
  });
  it('withPriceUsd sets the objects duration to the value of the incoming flights duration key', () => {
    flightBuilder.withPriceUsd(validIncomingFlight);

    expect(flightBuilder.priceUsd).toEqual(6);
  });
  it('withReturnDate throws an exception if the key is of the wrong type', () => {
    try {
      invalidIncomingFlight.return_date = 6;
      flightBuilder.withReturnDate(invalidIncomingFlight);
    } catch (err) {
      expect(err.message).toEqual(`Incoming flight return date is invalid data type`);
    }
  });
  it('withReturnDate sets the objects returnDate to the value of the incoming flights return_date key', () => {
    flightBuilder.withReturnDate(validIncomingFlight);

    expect(flightBuilder.returnDate).toEqual(`2023-08-03`);
  });
  it('withTripClassCode throws an exception if the key doesnt exist in the incoming data', () => {
    try {
      flightBuilder.withTripClassCode(invalidIncomingFlight);
    } catch (err) {
      expect(err.message).toEqual(`Incoming flight trip class code either missing or invalid value`);
    }
  });
  it('withTripClassCode throws an exception if the property is of the wrong data type', () => {
    try {
      invalidIncomingFlight.value = 6;
      flightBuilder.withTripClassCode(invalidIncomingFlight);
    } catch (err) {
      expect(err.message).toEqual(`Incoming flight trip class code either missing or invalid value`);
    }
  });
  it('withTripClassCode sets the objects duration to the value of the incoming flights duration key', () => {
    flightBuilder.withTripClassCode(validIncomingFlight);
    
    expect(flightBuilder.tripClassCode).toEqual(1);
  });
});
