const express = require('express');
const {
    getTests,
    getTest,
    createTest,
    deleteTest,
    updateTest
} = require('../controllers/testController')

const router = express.Router();

//get all tests
router.get('/', getTests);

//get a single test
router.get('/:id', getTest);

//post a new test
router.post('/',createTest);

//delete a test
router.delete('/:id', deleteTest);

//update a test
router.patch('/:id',updateTest)


module.exports = router;