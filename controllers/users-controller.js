const { User } = require('../models');

const usersController = {

  // CREATE New User
  createUsers({body}, res) {
    Users.create(body)
    .then(dbUsersData => res.json(dbUsersData))
    .catch(err => res.sendStatus(400).json(err));
  },
  
  // GET all users
  getAllUsers(req, res) {
    Users.find({})
    .populate({path: 'thoughts', select: '-__v'})
    .populate({path: 'friends', select: '-__v'})
    .select('-__v')
    .then(dbUsersData => res.json(dbUsersData))
    .catch(err => {
        console.log(err);
        res.sendStatus(500).json(err);
    });
  },

  // GET One User by id
  getUsersById({params}, res) {
    Users.findOne({_id: params.id })
    .populate({path: 'thoughts', select: '-__v'})
    .populate({path: 'friends', select: '-__v'})
    .select('-__v')
    // return if no user is found 
    .then(dbUsersData => {
        if(!dbUsersData) {
            res.sendStatus(404).json({message: 'No User Found with this ID!'});
            return; 
        }
        res.json(dbUsersData)
    })
    .catch(err => {
        console.log(err);
        res.sendStatus(400).json(err)
    })
  },


  // UPDATE User by id
  updateUser({ params, body }, res) {
    User.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true })
      .then(dbUserData => {
        if (!dbUserData) {
          res.status(404).json({ message: 'No User Found with this ID!' });
          return;
        }
        res.json(dbUserData);
      })
      .catch(err => res.json(err));
  },

  // DELETE User
  deleteUser({ params }, res) {
    Users.findOneAndDelete({_id: params.id})
    .then(dbUsersData => {
        if(!dbUsersData) {
            res.status(404).json({message: 'No User Found with this ID!'});
            return;
        }
        res.json(dbUsersData);
    })
    .catch(err => res.sendStatus(400).json(err));
  },

  // CREATE new Friend
  addFriend({params}, res) {
    Users.findOneAndUpdate({_id: params.id}, {$push: { friends: params.friendId}}, {new: true})
    .populate({path: 'friends', select: ('-__v')})
    .select('-__v')
    .then(dbUsersData => {
        if (!dbUsersData) {
            res.sendStatus(404).json({message: 'No User Found with this ID!'});
            return;
        }
    res.json(dbUsersData);
    })
    .catch(err => res.json(err));
},

  // DELETE Friend
  deleteFriend({ params }, res) {
    Users.findOneAndUpdate({_id: params.id}, {$pull: { friends: params.friendId}}, {new: true})
    .populate({path: 'friends', select: '-__v'})
    .select('-__v')
    .then(dbUsersData => {
        if(!dbUsersData) {
            res.sendStatus(404).json({message: 'No User Found with this ID!'});
            return;
        }
        res.json(dbUsersData);
    })
    .catch(err => res.status(400).json(err));
}


};

module.exports = usersController;
