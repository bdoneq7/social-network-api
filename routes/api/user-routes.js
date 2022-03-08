const router = require('express').Router();

// Variables
const {
    getAllUsers,
    getUsersById,
    createUsers,
    updateUsers,
    deleteUsers,
    addFriend,
    deleteFriend
  } = require('../../controllers/users-controller');

// GET and POST All Users
router.route('/').get(getAllUsers).post(createUsers);

// GET, PUT, and DELETE Users
router.route('/:id').get(getUsersById).put(updateUsers).delete(deleteUsers);

// POST and DELETE Friends
router.route('/:id/friends/:friendId').post(addFriend).delete(deleteFriend)

module.exports = router; 
