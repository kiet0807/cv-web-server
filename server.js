const express = require("express");
var app = express();
const AccountModel = require("./models/account");
var accountRouter = require("./router");

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
});

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.post("/register", (req, res, next) => {
  var username = req.body.username;
  var password = req.body.password;

  AccountModel.findOne({
    username: username,
  })
    .then((data) => {
      if (data) {
        res.json("User này đã tồn tại");
      } else {
        return AccountModel.create({
          username: username,
          password: password,
        });
      }
    })
    .then((data) => {
      res.status(201).json("Tạo tài khoản thành công");
    })
    .catch((err) => {
      res.status(400).json("Tao tai khoản thất bại");
    });
});

app.post("/login", (req, res, next) => {
  var username = req.body.username;
  var password = req.body.password;

  AccountModel.findOne({
    username: username,
    password: password,
  })
    .then((data) => {
      if (data) {
        res.json("Đăng nhập thành công");
      } else {
        res.status(202).json("Tài khoản không tồn tại");
      }
    })
    .catch((err) => {
      res.status(500).json("Có lỗi bên server");
    });
});

app.use("/api/account", accountRouter);

app.get("/", (req, res, next) => {
  res.json("CV web server");
});

app.listen(process.env.PORT || 3001, () => {
  console.log(`Server đã chạy trên port`);
});
