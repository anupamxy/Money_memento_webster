const mongoose = require("mongoose");

const connectdb = async () => {
  try {
    const connect = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true, // Use "useNewUrlParser" instead of "useNewUrlParse"
      //useNewUrlParser: true: This option is used to parse MongoDB connection strings using the new URL parser instead of the old one.
      useUnifiedTopology: true, // Use "useUnifiedTopology" instead of "userUnifiedTopology"
    //   useFindAndModify: false, // Use "useFindAndModify" instead of "userFindAndModify"
    // This option enables the use of a new engine for monitoring all the servers in a replica set or sharded cluster. It helps ensure a stable and efficient connection.
    });
    console.log(`MongoDB connected: ${connect.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1); // Exit the process with an error code
  }
};

module.exports = connectdb;
