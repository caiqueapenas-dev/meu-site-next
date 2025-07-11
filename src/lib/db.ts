// src/lib/db.ts
import mysql from 'mysql2/promise';

// Cria um "pool" de conexões. É mais eficiente do que criar uma nova conexão para cada consulta.
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

export default pool;