import * as knex from "knex";
import configuration from "../../knexfile";

const connection = knex(
  process.env.NODE_ENV === "test" ?
    configuration.development : configuration.test
);

export default connection;