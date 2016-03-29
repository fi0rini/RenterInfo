const isProduction = () => process.env.NODE_ENV === 'production';
const config = {
  proxy: {
    api: isProduction() ? 'http://api.renterinfo.com' : 'http://localhost:5000',
    auth: isProduction() ? 'http://auth.renterinfo.com' : 'http://localhost:4444'
  }
};

module.exports = config;
