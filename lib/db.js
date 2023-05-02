'use strict';

const { Pool } = require('pg');

const pool = new Pool({
  host: '127.0.0.1',
  port: 5432,
  database: 'jetup',
  user: 'postgres',
  password: '12345',
});



async function insertInDb(obj) {

  const client = await pool.connect();
  try {
    await client.query('BEGIN');

    for (let i = 0; i < obj.name.length; i++) {
      const sql = `INSERT INTO teamjetup ( name, position, userText, photo ) VALUES
      ($1, $2, $3, $4)`;
      await client.query(sql, [obj.name[i], obj.position[i], obj.userText[i], obj.photo[i]]);
    }
    await client.query('COMMIT');
  } catch (e) {
    await client.query('ROLLBACK');
    console.error(e);
  } finally {
    client.release();
  }
  //pool.end();
}

const query = async (column, par) => {
  let sql = 'SELECT name, position, userText, photo FROM teamJetUp';
  if (par !== '' && par !== undefined) {
    sql = `SELECT name, position, userText, photo FROM teamJetUp WHERE ${column} = '${par}'`;
  }
  const { rows } = await pool.query(sql, []);
  return rows;
};

module.exports = {
  insertInDb,
  query,
};
