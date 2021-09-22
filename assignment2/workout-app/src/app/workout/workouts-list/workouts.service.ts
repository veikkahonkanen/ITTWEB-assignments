import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Workout, WorkoutDetail } from '../workout.model';
import { HttpClient } from '@angular/common/http';
import {environment} from "../../../environments/environment";

@Injectable()
export class WorkoutsService {

  constructor(private _http: HttpClient) { }

  addWorkout(workout: Workout): Observable<WorkoutDetail> {
    console.log("adding new workout: " + workout);
    return this._http.post<WorkoutDetail>(`${environment.appUrl}workouts`, workout, {});
  }

}
