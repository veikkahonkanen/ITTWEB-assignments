import { Component, OnInit } from '@angular/core';
import {Workout} from "../../workout/workout.model";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent implements OnInit {
  workouts: Workout[];

  constructor(private _activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.workouts = this._activatedRoute.snapshot.data.workouts;
  }
}
