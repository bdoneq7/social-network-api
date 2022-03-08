const router = require('express').Router();

// Variables
const { 
    getAllThoughts, 
    getThoughtsById, 
    createThoughts, 
    updateThoughts,
    deleteThoughts,
    addReaction,
    deleteReaction

} = require('../../controllers/thoughts-controller');

// GET All Thoughts
router.route('/').get(getAllThoughts);

// GET Thoughts By Id
router.route('/:id').get(getThoughtsById).put(updateThoughts).delete(deleteThoughts); 

// POST New Thought
router.route('/:userId').post(createThoughts);

// POST New Reaction to Thought
router.route('/:thoughtId/reactions').post(addReaction);

// DELETE Reaction to Thought
router.route('/:thoughtId/reactions/:reactionId').delete(deleteReaction);

module.exports = router;
