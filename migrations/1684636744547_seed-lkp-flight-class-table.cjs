/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
  pgm.sql(
    `INSERT INTO lkp_flight_class
    (
      trip_class_code, 
      trip_class_name
    ) 
      VALUES 
    (
      0, 
      'Economy' 
    );

    INSERT INTO lkp_flight_class
    (
      trip_class_code, 
      trip_class_name
    ) 
      VALUES 
    (
      1, 
      'Business'
    );

    INSERT INTO lkp_flight_class
    (
      trip_class_code, 
      trip_class_name
    ) 
      VALUES 
    (
      2, 
      'First'
    );
  `
  );
};

exports.down = pgm => {};
