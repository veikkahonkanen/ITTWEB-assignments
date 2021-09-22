import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {WorkoutLog, WorkoutLogDetail} from "../../workout/workout-log.model";
import {environment} from "../../../environments/environment";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Injectable()
export class MyWorkoutsResolverService implements Resolve<WorkoutLogDetail[]> {

  constructor(private _httpClient: HttpClient) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<WorkoutLogDetail[]> | Promise<WorkoutLogDetail[]> | WorkoutLogDetail[] {
    return this._httpClient.get<WorkoutLogDetail[]>(`${environment.appUrl}user/activity-logs`);
  }
}
