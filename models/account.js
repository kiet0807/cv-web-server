const mongoose = require("mongoose");

const MONGODB_URI = "mongodb://localhost/my_database";

try {
  // Connect to the MongoDB cluster
  mongoose.connect(
    MONGODB_URI,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    },
    () => console.log("Mongoose đã kết nối")
  );
} catch (e) {
  console.log("Không thể kết nối với Mongoose");
}

const AccountSchema = new mongoose.Schema(
  {
    username: String,
    password: String,
  },
  {
    collection: "account",
  }
);

const AccountModel = mongoose.model("account", AccountSchema);

module.exports = AccountModel;
