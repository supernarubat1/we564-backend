const mongoose = require("mongoose");
require("dotenv").config();

if (process.env.NODE_ENV === "development") {
  const connect = async () => {
    await mongoose
      .connect(process.env.MONGO_CON_STR_DEV)
      .then(() => console.log("Database connection..."))
      .catch((err) => console.error(err));
  };

  module.exports = connect;
}

if (process.env.NODE_ENV === "production" || process.env.NODE_ENV === "test") {
  const connect = async () => {
    await mongoose
      .connect(process.env.MONGO_CON_STR_POD)
      .then(() => console.log("Database connection..."))
      .catch((err) => console.error(err));
  };

  module.exports = connect;
}
