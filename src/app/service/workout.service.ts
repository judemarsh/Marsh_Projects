import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { AppSettings } from '../app-settings';
import { Category } from '../model/category';
import { Workout } from '../model/workout';
import { WorkoutActive } from '../model/workout-active';

@Injectable()
export class WorkoutService {

  workoutList: Workout[];

  constructor(private http: Http) {
    this.workoutList = [];
   }

  public getWorkoutList() : Workout[] {
    this.http.get(AppSettings.serviceBaseURL + '/getWorkoutList').map(res => res.json()).subscribe(workoutList => {
      workoutList.forEach(workout => {
        console.log(workout);
        this.workoutList.push(workout);
      });
    });
    return this.workoutList;
  }

  public getWorkoutById(workoutId: number) : Observable<Workout>{
    return this.http.get(AppSettings.serviceBaseURL + '/getWorkoutById/' + workoutId).map(res => res.json());
  }

  public getWorkoutActive(workoutId: number) : Observable<WorkoutActive>{
    return this.http.get(AppSettings.serviceBaseURL + '/getWorkoutActiveById/' + workoutId).map(res => res.json());
  }

  public saveWorkout(workoutObj: Workout) : Observable<number>{
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(AppSettings.serviceBaseURL + '/saveWorkout', workoutObj, options).map(res => res.json());
  }

  public deleteWorkout(workoutId: number){
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(AppSettings.serviceBaseURL + '/deleteWorkout/' +workoutId, null, options).map(res => res.json());
  }

  public startWorkout(workoutActiveObj: WorkoutActive) : Observable<number>{
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(AppSettings.serviceBaseURL + '/startWorkout', workoutActiveObj, options).map(res => res.json());
  }

  public endWorkout(workoutActiveObj: WorkoutActive) : Observable<number>{
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(AppSettings.serviceBaseURL + '/endWorkout', workoutActiveObj, options).map(res => res.json());
  }

}

