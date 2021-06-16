const express = require("express");
var router = express.Router();

const AccountModel = require("./models/account");

router.get("/", (req, res, next) => {
  var id = req.params.id;
  AccountModel.find({})
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

router.post("/", (req, res, next) => {
  var username = req.body.username;
  var password = req.body.password;
  AccountModel.create({
    username: username,
    password: password,
  })
    .then((data) => {
      res.json("Thêm tài khoản thành công");
    })
    .catch((err) => {
      res.status(500).json("Lỗi server: ", err);
    });
});

router.put("/:id", (req, res, next) => {
  var newPassword = req.body.newPassword;
  var id = req.params.id;
  AccountModel.findByIdAndUpdate(id, {
    password: newPassword,
  })
    .then((data) => {
      res.json("Cập nhật thành công");
    })
    .catch((err) => {
      res.status(500).json("Lỗi server: ", err);
    });
});

router.delete("/:id", (req, res, next) => {
  var id = req.params.id;
  AccountModel.deleteOne({
    _id: id,
  })
    .then((data) => {
      res.json("Xóa thành công");
    })
    .catch((err) => {
      res.status(500).json("Lỗi server");
    });
});

module.exports = router;
