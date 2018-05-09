import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';

import { AppComponent } from './app.component';
import { MenuComponent } from './components/menu/menu.component';
import { ViewWorkoutComponent } from './components/view-workout/view-workout.component';
import { ManageWorkoutComponent } from './components/manage-workout/manage-workout.component';
import { LogWorkoutComponent } from './components/log-workout/log-workout.component';
import { ManageCategoryComponent } from './components/manage-category/manage-category.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { WorkoutPipe } from './pipe/workout.pipe';
import { CategoryPipe } from './pipe/category.pipe';
import { CategoryService } from './service/category.service';
import { WorkoutService } from './service/workout.service';
import { AngularDateTimePickerModule } from 'angular2-datetimepicker';

const appRoutes: Routes = [ 
  {path: 'viewWorkout', component: ViewWorkoutComponent},
  {path: 'addWorkout', component: ManageWorkoutComponent, data: {contentHeader: "Add Workout"}},
  {path: 'editWorkout/:id', component: ManageWorkoutComponent, data: {contentHeader: "Edit Workout"}},
  {path: 'startWorkout/:workoutId', component: LogWorkoutComponent, data: {contentHeader: "Start Workout", hasStarted: false}},
  {path: 'endWorkout/:workoutId', component: LogWorkoutComponent, data: {contentHeader: "End Workout", hasStarted: true}},
  {path: 'manageCategory', component: ManageCategoryComponent},
  {path: '**', component: PageNotFoundComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    ViewWorkoutComponent,
    ManageWorkoutComponent,
    LogWorkoutComponent,
    ManageCategoryComponent,
    PageNotFoundComponent,
    WorkoutPipe,
    CategoryPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes,{enableTracing: false}),
    CommonModule,
    AngularDateTimePickerModule
  ],
  providers: [CategoryService, WorkoutService],
  bootstrap: [AppComponent]
})
export class AppModule { }