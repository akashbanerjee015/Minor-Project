#!/usr/bin/env node
// Usage:
//   node scripts/create_table.js "<connection_string>"
// or set env var NEON_DB_URL and run without args

const { Client } = require('pg');

const conn = process.argv[2] || process.env.NEON_DB_URL || process.env.NEXT_PUBLIC_NEON_DB_CONNECTION_STRING;

if (!conn) {
  console.error('No connection string provided. Pass as first arg or set NEON_DB_URL or NEXT_PUBLIC_NEON_DB_CONNECTION_STRING');
  process.exit(1);
}

async function main() {
  const client = new Client({ connectionString: conn });
  try {
    await client.connect();
    console.log('Connected to DB');
    const sql = `CREATE TABLE IF NOT EXISTS users (
      id integer GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
      name varchar(255) NOT NULL,
      email varchar(255) NOT NULL UNIQUE
    );`;
    await client.query(sql);
    console.log('Table `users` created or already exists');
  } catch (err) {
    console.error('Error creating table:', err);
    process.exitCode = 1;
  } finally {
    await client.end();
  }
}

main();
