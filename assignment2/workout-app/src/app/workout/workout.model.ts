import {Exercise} from "./exercise.model";

export interface Workout {
  _id: string;
  userId: string;
  name: string;
  description: string;
}

export interface WorkoutDetail extends Workout{
  exercises: Exercise[];
}