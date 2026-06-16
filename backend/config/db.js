const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    console.log("Connecting to MongoDB...");

    await mongoose.connect(process.env.MONGO_URI);

    console.log("MongoDB Connected");
  } catch (error) {
    console.log("ERROR:", error.message);

    if (error.reason?.servers) {
      for (const [host, server] of error.reason.servers) {
        console.log("\nHOST:", host);

        if (server.error) {
          console.log("NETWORK ERROR:");
          console.log(server.error);
        }
      }
    }
  }
};

module.exports = connectDB;