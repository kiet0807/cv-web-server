const express = require("express");
var app = express();
const AccountModel = require("./models/account");
var accountRouter = require("./router");
const jwt = require("jsonwebtoken");
var cookieParser = require("cookie-parser");

app.use(cookieParser());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
});

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

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
        const data = req.body;
        const accessToken = jwt.sign(data, "jwtabc");
        res.json({
          message: "Đăng nhập thành công",
          token: accessToken,
          username: data.username,
        });
      } else {
        return res.status(202).json("Tài khoản không tồn tại");
      }
    })
    .catch((err) => {
      res.status(500).json("Có lỗi bên server");
    });
});

app.get("/check", authenToken, (res, req) => {
  res.json({ check: true });
});

function authenToken(req, res, next) {
  const token = req.body.token;
  if (!token) res.sendStatus(401).json({ check: false });

  jwt.verify(token, "jwtabc", (err, data));
  if (err) res.sendStatus(403).json({ check: false });
  next();
}

app.use("/api/account", accountRouter);

app.get("/", (req, res, next) => {
  res.json("CV web server");
});

app.listen(process.env.PORT || 3001, () => {
  console.log(`Server đã chạy trên port`);
});
