import knex from "knex"
const configuration = require("../../knexfile")

const connection = knex(
  process.env.NODE_ENV === "test" ?
    configuration.test
  : configuration.development
)

export default connection
