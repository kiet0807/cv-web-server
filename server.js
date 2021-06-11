const express = require("express");
var app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const AccountModel = require("./models/account");

app.post("/register", (req, res, next) => {
  var username = req.body.username;
  var password = req.body.password;

  AccountModel.findOne({
    username: username,
    password: password,
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
      res.json("Tao tai khoan thanh cong");
    })
    .catch((err) => {
      res.status(500).json("Tao tai khoan that bai");
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
        res.status(400).json("Đăng nhập thất bại");
      }
    })
    .catch((err) => {
      res.status(500).json("Có lỗi bên server");
    });
});

app.get("/", (req, res, next) => {
  res.json("Server");
});

app.get("/home", (req, res, next) => {
  res.json("home");
});

app.listen(process.env.PORT, () => {
  console.log(`Server started on port`);
});
