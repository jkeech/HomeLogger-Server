const express = require('express');
const Joi = require('joi');
const workoutRouter = express.Router();
const path = require('path');

const {
    HTTP_STATUS_CODES
} = require('../config');
const {
    jwtPassportMiddleware
} = require('../auth/auth.strategy');
const {
    Workout,
    WorkoutJoiSchema
} = require('./workout.model');

//CREATE NEW WORKOUT
workoutRouter.post('/', jwtPassportMiddleware, (request, response) => {

        const newWorkout = {
            user: request.user.id,
            exercise: request.body.exercise,
            reps: request.body.reps,
            weight: request.body.weight,
            set: request.body.set
        };

        const validation = Joi.validate(newWorkout, WorkoutJoiSchema);
        if (validation.error) {
            console.log("Validation Error")
            return response.status(HTTP_STATUS_CODES.BAD_REQUEST).json({
                error: validation.error
            });
        }

        Workout.create(newWorkout)
            .then(createdWorkout => {
                return response.status(HTTP_STATUS_CODES.CREATED).json(createdWorkout.serialize());
            })
            .catch(error => {
                return response.status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR).json(error);
            })
    })
    // jwtPassportMiddleware,
workoutRouter.get('/', jwtPassportMiddleware, (request, response) => {
    console.log("Your Workouts")
    response.sendFile(path.resolve('./app/views/auth/home.html'));
    // response.send('Text here')
})

module.exports = {
    workoutRouter
};