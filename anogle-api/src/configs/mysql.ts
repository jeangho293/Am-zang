const host = process.env.MYSQL_HOST || '';
const username = process.env.MYSQL_USERNAME || '';
const password = process.env.MYSQL_PASSWORD || '';
const database = process.env.MYSQL_DATABASE || '';

const config = {
  host,
  username,
  password,
  database,
};

Object.entries(config).forEach(([key, value]) => {
  if (!value) {
    throw new Error(`There is no mysql ${key} env.`);
  }
});

export default config;
