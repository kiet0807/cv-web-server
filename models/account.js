const mongoose = require("mongoose");
mongoose.connect(
  "mongodb+srv://kiet0987070899@gmail.com:anhyeuem0987070899@cluster0.nltqm.mongodb.net/account?retryWrites=true&w=majority",
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
