/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
  pgm.createTable('lkp_flight_class', {
    id: 'id',
    trip_class_code: { type: 'integer' },
    trip_class_name: { type: 'varchar' },
    date_created: {
      type: 'timestamp',
      notNull: true,
      default: pgm.func('current_timestamp')
    },
    date_modified: {
      type: 'timestamp',
      notNull: true,
      default: pgm.func('current_timestamp')
    }
  });
};

exports.down = pgm => {};
