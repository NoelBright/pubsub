const express = require("express");
const UserService = require("../services/userService");
const Logger = require('../helpers/logger');

const logger = Logger.getLogger('users');
const router = express.Router();
const userService = new UserService();

router.get("/", (req, res) => {
    userService.getUserList().then(users => {
        res.json(users)
    }).catch(err => {
        res.json(err)
    });
});

router.get("/:name", (req, res) => {
    userService.getUserByName(req.params.name).then(user => {
        res.json(user);
    }).catch(err => {
        res.json(err);
    });
});

router.post("/", (req, res) => {
    userService.createUser(req.body).then(user => {
        res.json(user);
    }).catch(err => {
        res.json(err);
    });
});

router.put("/:name", (req, res) => {
    userService.updateUser(req.params.name, req.body).then(user => {
        res.json(user);
    }).catch(err => {
        res.json(err);
    });
});


router.delete("/:name", (req, res) => {
    userService.deleteUser(req.params.name).then(user => {
        res.json(user);
    }).catch(err => {
        res.json(err);
    });
});

module.exports = router;

