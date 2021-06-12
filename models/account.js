const mongoose = require("mongoose");

const mongoAtlasUri =
  "mongodb+srv://kiet87:kiet0347551122@cluster0.nltqm.mongodb.net/account?retryWrites=true&w=majority";

try {
  // Connect to the MongoDB cluster
  mongoose.connect(
    mongoAtlasUri,
    { useNewUrlParser: true, useUnifiedTopology: true },
    () => console.log(" Mongoose blog mindx is connected")
  );
} catch (e) {
  console.log("could not connect");
}

const Schema = mongoose.Schema;

const AccountSchema = new Schema(
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
