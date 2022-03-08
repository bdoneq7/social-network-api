const { Thoughts, User } = require('../models');

const thoughtsController = {

  // CREATE new thought
  createThoughts({params, body}, res) {
    Thoughts.create(body)
    .then(({_id}) => {
        return Users.findOneAndUpdate({ _id: params.userId}, {$push: {thoughts: _id}}, {new: true});
    })
    .then(dbThoughtsData => {
        if(!dbThoughtsData) {
            res.sendStatus(404).json({message: 'No Thoughts Found with this ID!'});
            return;
        }
        res.json(dbThoughtsData)
    })
    .catch(err => res.json(err)); 
},

  // GET all thoughts
  getAllThoughts(req,res) {
    Thoughts.find({})
    .populate({path: 'reactions', select: '-__v'})
    .select('-__v')
    .then(dbThoughtsData => res.json(dbThoughtsData))
    .catch(err => {
        console.log(err);
        res.sendStatus(500).json(err);
    });
},

  // GET one Thought by id
  getThoughtsById({params}, res) {
    Thoughts.findOne({ _id: params.id })
    .populate({path: 'reactions',select: '-__v'})
    .select('-__v')
    .then(dbThoughtsData => {
        if(!dbThoughtsData) {
        res.sendStatus(404).json({message: 'No Thoughts Found with this ID!'});
        return;
    }
    res.json(dbThoughtsData)
    })
    .catch(err => {
        console.log(err);
        res.sendStatus(400);
    });
},
  

  // UPDATE Thought by id
  updateThoughts({params, body}, res) {
    Thoughts.findOneAndUpdate({_id: params.id}, body, {new: true, runValidators: true})
    .populate({path: 'reactions', select: '-__v'})
    .select('-___v')
    .then(dbThoughtsData => {
        if (!dbThoughtsData) {
            res.sendStatus(404).json({message: 'No Thoughts Found with this ID!'});
            return;
        }
            res.json(dbThoughtsData);
    })
    .catch(err => res.json(err));
},

  // DELETE Thought
  deleteThoughts({params}, res) {
    Thoughts.findOneAndDelete({_id: params.id})
    .then(dbThoughtsData => {
        if (!dbThoughtsData) {
            res.sendStatus(404).json({message: 'No Thoughts Found with this ID!'});
            return;
        }
        res.json(dbThoughtsData);
        })
        .catch(err => res.sendStatus(400).json(err));
},

  // CREATE new Reaction
  addReaction({params, body}, res) {
    Thoughts.findOneAndUpdate({_id: params.thoughtId}, {$push: {reactions: body}}, {new: true, runValidators: true})
    .populate({path: 'reactions', select: '-__v'})
    .select('-__v')
    .then(dbThoughtsData => {
    if (!dbThoughtsData) {
        res.sendStatus(404).json({message: 'No Thoughts Found with this ID!'});
        return;
    }
    res.json(dbThoughtsData);
    })
    .catch(err => res.sendStatus(400).json(err))

},

  // DELETE Reaction
  deleteReaction({params}, res) {
    Thoughts.findOneAndUpdate({_id: params.thoughtId}, {$pull: {reactions: {reactionId: params.reactionId}}}, {new : true})
    .then(dbThoughtsData => {
        if (!dbThoughtsData) {
            res.sendStatus(404).json({message: 'No Thoughts Found with this ID!'});
            return;
        }
        res.json(dbThoughtsData);
    })
    .catch(err => res.sendStatus(400).json(err));
  }

};

module.exports = thoughtsController;
