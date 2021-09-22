import {Component, Inject, OnInit, Optional} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {Exercise} from "../exercise.model";

@Component({
  selector: 'app-exercise-form',
  templateUrl: './exercise-form.component.html',
  styleUrls: ['./exercise-form.component.scss']
})
export class ExerciseFormComponent implements OnInit {

  form: FormGroup;

  constructor(@Optional() @Inject(MAT_DIALOG_DATA) private _exercise: Exercise) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      name: new FormControl(null, Validators.required),
      description: new FormControl(null, Validators.required),
      sets: new FormControl(null, Validators.required),
      durationType: new FormControl("reps", Validators.required),
      duration: new FormControl(null, Validators.required)
    });

    if (this._exercise) this.form.patchValue(this._exercise);
  }
}
