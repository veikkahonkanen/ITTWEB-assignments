import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Workout, WorkoutDetail } from '../workout.model';

@Injectable()
export class WorkoutDetailResolverService implements Resolve<WorkoutDetail>{

  constructor(private _httpClient: HttpClient) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): WorkoutDetail | Observable<WorkoutDetail> | Promise<WorkoutDetail> {
    return this._httpClient.get<WorkoutDetail>(`${environment.appUrl}workouts/${route.params.workoutId}`);
  }}
