/*const config = {
env: process.env.NODE_ENV || 'development', 
port: process.env.PORT || 3000,
jwtSecret: process.env.JWT_SECRET || "YOUR_secret_key", 
mongoUri: process.env.MONGODB_URI ||
process.env.MONGO_HOST ||
'mongodb://' + (process.env.IP || 'localhost') + ':' + 
(process.env.MONGO_PORT || '27017') +
'/mernproject' 
}
export default config*/

const config = {
  env: "development",
  port: 3000, //process.env.PORT || 
  jwtSecret: "YOUR_secret_key",
  mongoUri:
    "mongodb+srv://amodi21:harekrishna@cluster0.agnrs5z.mongodb.net/Marketplace?retryWrites=true&w=majority",
};
export default config;
