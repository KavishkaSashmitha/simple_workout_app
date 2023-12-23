const Workout = require('../models/workoutModel')
const mongoose = require('mongoose')


//get all workouts
const getWorkouts = async(req,res )=> {
    const workouts = await Workout.find({}).sort({createdAt:-1})


    res.status(200).json(workouts)
}


//get a single workout
const getWorkout = async (req,res)=>{
    const{id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({Error:"Error with Id"})
    }

    const workout = await Workout.findById(id)

    if(!workout){
        return res.status(400).json({errorP:"No such Workout"})
    }

    res.status(200).json(workout)
}

//create new workout
const createWorkout = async(req,res)=>{
    const{title,load,reps} = req.body

    let emptyField = []

    if(!title){
        emptyField.push('title')
    }
    if(!load){
        emptyField.push('load')
    }
    if(!reps){
        emptyField.push('reps')
    }
   if(emptyField.length>0){
    return res.status(400).json({error : 'Please fill  all the fields',emptyField})
   }


    try {
        const workout = await Workout.create({title,load,reps});
        res.status(200).json(workout)
    } catch (error) {
        res.status(400).json({error:error.message})
    }
    res.json({mssg:'POST a new workout'})
}


//delete a workout
const deleteWorkout =  async(req,res)=>{
    const{id}= req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({Error:"Error with Id"})
    }

    
    const delWorkout = await Workout.findOneAndDelete({_id:id})
        
     if(!delWorkout){
        return res.status(400).json({Error:'No such Workout'})
        
    }
    res.status(200).json(delWorkout)

}


//update a workout
const updateWorkout = async (req,res) => {

    const{id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json ({error:'No such a workout'})
    }

    const workout  =  await Workout.findOneAndUpdate({_id:id},
        {
            ...req.body
        })

    if(!workout){
            return res.status(400).json({errorP:"No such Workout"})
    }

    res.status(200).json(workout)
    
        

}




module.exports={
    createWorkout,
    getWorkouts,
    getWorkout,
    deleteWorkout,
    updateWorkout
}