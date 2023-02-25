const { Thought } = require('../models/thought');

const thoughtController = {
    // get all thoughts
    getAllThoughts(req, res) {
        Thought.find()
            .select('-__v')
            .then(dbThoughtData => res.json(dbThoughtData))
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            }
        );
    },
    // get one thought by id
    getThoughtById({ params }, res) {
        Thought.findOne({ _id: params.thoughtId })
            .select('-__v')
            .then(dbThoughtData => {
                if (!dbThoughtData) {
                    res.status(404).json({ message: 'No thought with this id!' });
                    return;
                }
                res.json(dbThoughtData);
            })
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            }
        );
    },
    // create thought
    createThought({ params, body }, res) {
        console.log(body);
        Thought.create(body)
            .then(({ _id }) => {
                return User.findOneAndUpdate(
                    { _id: params.userId },
                    { $push: { thoughts: _id } },
                    { new: true }
                );
            })
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({ message: 'No user with this id!' });
                    return;
                }
                res.json(dbUserData);
            })
            .catch(err => res.json(err));
    },
    // update thought by id
    updateThought(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $set: req.body },
            { runValidators: true, new: true }
        )
            .then((thought) =>
            !thought
                ? res.status(404).json({ message: 'No thought with this id' })
                : res.status(200).json('You have successfully updated a thought.')
            )
            .catch((err) => {
            console.log(err);
            res.status(500).json(err);
            });
        },
    // delete thought
    deleteThought({ params }, res) {
        Thought.findOneAndDelete({ _id: params.thoughtId })
            .then(deletedThought => {
                if (!deletedThought) {
                    return res.status(404).json({ message: 'No thought with this id!' });
                }
                return User.findOneAndUpdate(
                    { username: params.username },
                    { $pull: { thoughts: params.thoughtId } },
                    { new: true }
                );
            })
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({ message: 'No user with this id!' });
                    return;
                }
                res.json('You have successfully deleted a thought.');
            })
            .catch(err => res.json(err));
    },
    // add reaction to thought
    addReaction(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $addToSet: { reactions: req.body } },
            { new: true, runValidators: true }
        )
        .then((thought) =>
            !thought
                ? res.status(404).json({ message: 'No thought with this id!' })
            : res.json(thought)
        )
        .catch((err) => res.status(500).json(err));
    },
    // remove reaction
    removeReaction({ params }, res) {
        Thought.findOneAndUpdate(
            { _id: params.thoughtId },
            { $pull: { reactions: { reactionId: params.reactionId } } },
            { new: true }
        )
            .then(dbThoughtData => res.json(dbThoughtData))
            .catch(err => res.json(err));
    }
};

module.exports = thoughtController;