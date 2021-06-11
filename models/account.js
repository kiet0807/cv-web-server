const mongoose = require("mongoose");
mongoose.connect(
  process.env.MONGODB_URI ||
    "mongodb+srv://kiet87:kiet0347551122@cluster0.nltqm.mongodb.net/account?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

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
