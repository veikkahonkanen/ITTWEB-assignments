import { Workout } from './workout.model';

interface WorkoutBase{
  userId: string;
  timestamp: Date;
}
export interface WorkoutLog extends WorkoutBase {
  workoutId: string;
}

export interface WorkoutLogDetail extends WorkoutBase{
  workout: Workout;
}