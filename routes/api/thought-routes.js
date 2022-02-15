const router = require('express').Router();
const {
  addThought,
  deleteThought,
  createReaction,
  deleteReaction
} = require('../../controllers/thought-controller');

// /api/thoughts/<userId>
router.route('/:userId').post(addThought);

// /api/thoughts/<userId>/<thoughtId>
router
  .route('/:userId/:thoughtId')
  .put(addThought)
  .delete(deleteThought);

// /api/thoughts/<userId>/<thoughtId>
router.route('/:userId/:thoughtId/').delete(deleteThought);

module.exports = router;
