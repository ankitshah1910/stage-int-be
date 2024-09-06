const dotenv = require('dotenv');
dotenv.config();

module.exports = {
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  clusterName: process.env.CLUSTER_NAME,
  host: process.env.DB_HOST || '127.0.0.1',
  useUnifiedTopology: true,
  useNewUrlParser: true,
};
