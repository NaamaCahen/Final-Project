import knex from 'knex';
import dotenv from 'dotenv';

dotenv.config();

 const db = knex({
    client:'pg',
    connection: {
      host:process.env.DB_HOST,
      port:process.env.DB_PORT,
      user:process.env.DB_USER_DATABASE,
      password:process.env.DB_PASSWORD,
      database:process.env.DB_USER_DATABASE
    }
  })

  export default db;