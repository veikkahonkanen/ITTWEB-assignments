import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {WorkoutLogDetail} from "../workout-log.model";
import {ActivatedRoute} from "@angular/router";
import {AuthService} from "../../core/auth/auth.service";
import {MatPaginator} from "@angular/material/paginator";
import {MatTableDataSource} from "@angular/material/table";

@Component({
  selector: 'app-my-workouts',
  templateUrl: './my-workouts.component.html',
  styleUrls: ['./my-workouts.component.scss']
})
export class MyWorkoutsComponent implements OnInit, AfterViewInit {
  logs: WorkoutLogDetail[];
  logsDataSource: MatTableDataSource<WorkoutLogDetail>;
  displayedColumns = ['name', 'time'];
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private _activatedRoute: ActivatedRoute, private _authService: AuthService) { }

  ngOnInit(): void {
    this.logs = this._activatedRoute.snapshot.data.workouts;
    this.logsDataSource = new MatTableDataSource<WorkoutLogDetail>(this.logs);
  }

  ngAfterViewInit(): void {
    this.logsDataSource.paginator = this.paginator;
  }

}
