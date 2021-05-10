const env = {
  database: 'automotor',
  username: 'root',
  password: '1234',
  host: 'localhost',
  dialect: 'mariadb',
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
  force: false
};
  
module.exports = env;