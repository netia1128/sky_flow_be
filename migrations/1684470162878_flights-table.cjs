/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
  pgm.createTable('flights', {
    id: 'id',
    price_usd: { type: 'float' },
    trip_class_code: { type: 'float' },
    origin: { type: 'varchar' },
    destination: { type: 'varchar' },
    departure_date: { type: 'timestamp' },
    return_date: { type: 'timestamp' },
    duration: { type: 'integer' },
    distance: { type: 'integer' },
    md5_hash: { type: 'text' },
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
