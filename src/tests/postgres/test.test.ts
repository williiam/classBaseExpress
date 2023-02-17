import { Client } from 'pg';

const config = {
  user: 'william',
  database: 'startech',
  password: 'postgres',
  host: 'localhost',
  port: 5432,
};

const client = new Client(config);

async function main() {
  try {
    await client.connect();
    const result = await client.query('SELECT * FROM users');
    console.log(result.rows);
  } catch (err) {
    console.error(err);
  } finally {
    await client.end();
  }
}

main();
