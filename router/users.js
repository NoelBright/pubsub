const express = require("express");
const Users = require("../models/users");

const router = express.Router();

// 查询
router.get("/", (req, res) => {
    Users.find({})
        .sort({ update_at: -1 })
        .then(user=> {res.json(user)})
        .catch(err => {res.json(err)});
});

// 通过name查询
router.get("/:name", (req, res) => {
    Users.findByName(req.params.name, (err, user) => {
        if (err) {
            res.json(err);
        } else {
            res.json(user);
        }
    });
});

// 添加new user
router.post("/", (req, res) => {
    let user = req.body;
    Users.create(user, (err, user) => {
        if (err) {
            res.json(err);
        } else {
            res.json(user);
        }
    });
});

//更新
router.put("/:name", (req, res) => {
    Users.findOneAndUpdate(
        {name: req.params.name}, 
        {$push: {topics: req.body}},
        {new: true})
        .then(user => res.json(user))
        .catch(err => res.json(err))
});

//删除
router.delete("/:name", (req, res) => {
    Users.findOneAndRemove({name: req.params.name})
        .then(user => res.send(`{result: "${user.name} delete successfully"}`))
        .catch(err => res.json(err));
});

module.exports = router;
