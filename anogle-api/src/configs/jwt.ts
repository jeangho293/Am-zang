const secret = process.env.JWT_SECRET || '';

const config = {
  secret,
};

Object.entries(config).forEach(([key, value]) => {
  if (!value) {
    throw new Error(`There is no jwt ${key} env.`);
  }
});

export default config;
