const express = require('express')
const {
    createWorkout,
    getWorkout,
    getWorkouts,
    deleteWorkout,
    updateWorkout
}= require('../controllers/workoutController')

const router = express.Router()


//GET all Workouts
router.get('/',getWorkouts)

//Get a singke workout
router.get('/:id',getWorkout)

//POST a new workout 
router.post('/',createWorkout)


//DELETE a workout
router.delete('/:id',deleteWorkout)

//UPDATE a workout
router.patch('/:id',updateWorkout)

module.exports = router