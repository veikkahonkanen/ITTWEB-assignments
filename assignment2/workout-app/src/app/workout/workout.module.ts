import { LayoutModule } from '@angular/cdk/layout';
import { MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule, Routes } from '@angular/router';
import { WorkoutDetailResolverService } from './workout-detail/workout-detail-resolver.service';
import { WorkoutDetailComponent } from './workout-detail/workout-detail.component';
import { WorkoutFormComponent } from './workout-form/workout-form.component';
import { WorkoutsListComponent } from './workouts-list/workouts-list.component';
import { WorkoutsResolverService } from './workouts-list/workouts-resolver.service';
import { MatRippleModule } from '@angular/material/core';
import { MatCardModule } from '@angular/material/card';
import { ExerciseFormComponent } from './exercise-form/exercise-form.component';
import { MatSelectModule } from '@angular/material/select';
import { MyWorkoutsResolverService } from './my-workouts/my-workouts-resolver.service';
import { MyWorkoutsComponent } from './my-workouts/my-workouts.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSnackBarModule } from '@angular/material/snack-bar';

const routes: Routes = [
  {
    path: '',
    component: WorkoutsListComponent,
    resolve: {
      workouts: WorkoutsResolverService,
    },
  },
  {
    path: 'my-workouts',
    component: MyWorkoutsComponent,
    resolve: { workouts: MyWorkoutsResolverService },
  },
  {
    path: ':workoutId',
    component: WorkoutDetailComponent,
    resolve: {
      workout: WorkoutDetailResolverService,
    },
  },

  {
    path: '**',
    redirectTo: '',
  },
];

@NgModule({
  declarations: [
    WorkoutsListComponent,
    WorkoutDetailComponent,
    WorkoutFormComponent,
    ExerciseFormComponent,
    MyWorkoutsComponent,
  ],
  imports: [
    RouterModule.forChild(routes),
    MatTableModule,
    MatToolbarModule,
    MatButtonModule,
    LayoutModule,
    MatSidenavModule,
    MatIconModule,
    MatRippleModule,
    MatInputModule,
    MatListModule,
    FlexLayoutModule,
    MatSnackBarModule,
    MatDialogModule,
    ReactiveFormsModule,
    CommonModule,
    MatPaginatorModule,
    MatCardModule,
    MatSelectModule,
  ],
  providers: [
    WorkoutsResolverService,
    WorkoutDetailResolverService,
    MyWorkoutsResolverService,
  ],
})
export class WorkoutModule {}
