const Users = require('../models/users');
const Logger = require('../helpers/logger');

const logger = Logger.getLogger("userService");

class UserService {
    async getUserList() {
        try {
            let userList = await Users.find({}).sort({'ordinal': -1});
            return userList;
        } catch (err) {
            return err;
        }
    }

    async getUserByName(name) {
        try {
            let user = await Users.findByName(name);
            return user;
        } catch (err) {
            return err;
        }
    }

    async createUser(newUser) {
        try {
            let users = await Users.create(newUser);
            return users;
        } catch (err) {
            return err;
        }
    }

    async updateUser(userName, newTopics) {
        try {
            let user = await Users.findOneAndUpdate(
                {name: userName},
                {$push: {topics: newTopics}},
                {new: true}
            );
            return user;
        } catch (err) {
            return err;
        }
    }

    async deleteUser(userName) {
        try {
            let user = await Users.findOneAndRemove({name: userName});
            return user;
        } catch (err) {
            return err;
        }
    }
}

module.exports = UserService;

