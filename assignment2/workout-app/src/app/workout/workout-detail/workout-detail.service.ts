import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Workout, WorkoutDetail} from "../workout.model";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import {Exercise} from "../exercise.model";
import {Router} from "@angular/router";
import {WorkoutLog} from "../workout-log.model";

@Injectable()
export class WorkoutDetailService {

  constructor(private _httpClient: HttpClient, private _router: Router) { }

  addExercise(exercise: Exercise): Observable<WorkoutDetail> {
    return this._httpClient.post<WorkoutDetail>(`${environment.appUrl}${this._router.url}`, exercise, {});
  }

  logWorkout(log: WorkoutLog): Observable<any> {
    return this._httpClient.post<WorkoutLog>(`${environment.appUrl}/user/activity-logs`, log);
  }
}
