import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {Observable} from "rxjs";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Workout} from "../../workout/workout.model";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class LandingResolverService implements Resolve<any> {

  constructor(private _httpClient: HttpClient) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
    const params = new HttpParams().append("top", "5");
    return this._httpClient.get<Workout[]>(`${environment.appUrl}workouts`, { params });
  }
}
