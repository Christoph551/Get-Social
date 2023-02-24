const User = require('../models/User');
// const { Thought } = require('../models/Thought')

// Example from class repo
const userController = {
    getAllUsers(req, res) {
        User.find()
            .select('-__v')
        // populate('thoughts')
            .then((users) => res.json(users))
            .catch((err) => {
                console.log( { message: err } )
                res.status(500).json(err)
            });
    },
    getUserById(req, res) {
        User.findOne({ _id: req.params.userId })
            .then((user) =>
                !user
                    ? res.status(404).json({ message: 'No user with that ID' })
                    : res.json(user)
            )
            .catch((err) => res.status(500).json(err));
    },
    // create a new user
    createUser(req, res) {
        User.create(req.body)
            .then((dbUserData) => res.json(dbUserData))
            .catch((err) => res.status(500).json(err));
    },
    // update a user by its _id and return the updated user
    updateUser(req, res) {
        User.findAndUpdateOne(
            { _id: req.params.userId },
            { $set: req.body },
            { runValidators: true, new: true }
        )
            .then((dbUserData) => {
                if (!dbUserData) {
                    return res.status(404).json({ message: 'No user with that ID' });
                }
                return res.json(dbUserData);
            })
            .catch((err) => res.status(500).json(err));
        },
        // delete a user by its _id
    deleteUser(req, res) {
        User.findAndRemoveOne(
            { _id: req.params.userId },
            { $set: req.body },
            { runValidators: true, new: true }
            )
        }
    };

module.exports = userController;