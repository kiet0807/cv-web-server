const mongoose = require("mongoose");

const MONGODB_URI =
  "mongodb+srv://kiet87:kiet0347551122@cluster0.nltqm.mongodb.net/account?retryWrites=true&w=majority";

try {
  // Connect to the MongoDB cluster
  mongoose.connect(
    MONGODB_URI,
    { useNewUrlParser: true, useUnifiedTopology: true },
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
