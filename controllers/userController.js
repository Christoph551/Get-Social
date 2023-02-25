const User = require('../models/User');

// Example from class repo
const userController = {
    getAllUsers(req, res) {
        User.find()
            .select('-__v')
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
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $set: req.body },
            { runValidators: true, new: true }
        )
            .then((dbUserData) => {
                if (!dbUserData) {
                    return res.status(404).json({ message: 'No user with that ID' });
                }
                return res.json('You have successfully updated a user.');
            })
            .catch((err) => res.status(500).json(err));
        },
    // delete a user by its _id
    deleteUser( req, res ) {
        User.findOneAndRemove({ _id: req.params.userId })
            .then((deletedUser) => 
                !deletedUser ? res.status(404).json({ message: 'No user with this ID'})
                : User.findOneAndUpdate(
                    { users: req.params.userId },
                    { $pull: { users: req.params.userId } },
                    { new: false }
                )
            )
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({ message: 'No user with this id!' });
                    return;
                }
                res.json('You have successfully deleted a user.');
            })
            .catch(err => res.json(err));
        },
        // function to find a user by id and create an association with another user
        createFriend(req, res){
            User.findOneAndUpdate(
                {_id: req.params.userId},
                { $addToSet: {friends: req.params.friendId}},
                { runValidators: true, new: true}
            )
            .then((user) =>{
                !user
                ? res.status(404).json({message: "No user found"})
                : res.status(200).json('Friend Added!')
            })
            .catch((err) => res.status(500).json(err))
        },
        // function to delete the friend association
        deleteFriend(req,res){
            User.findOneAndUpdate(
                {_id: req.params.userId},
                { $pull: {friends: req.params.friendId}},
                { new: true}
            )
            .then((user)=>{
                !user
                ? res.status(404).json({message: "No user found"})
                : res.status(200).json(user)
            })
            .catch((err)=>res.status(500).json(err))
        }
};

module.exports = userController;