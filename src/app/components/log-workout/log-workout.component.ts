import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { WorkoutService } from '../../service/workout.service';
import { WorkoutActive } from '../../model/workout-active';
import { Workout } from '../../model/workout';

@Component({
  selector: 'app-log-workout',
  templateUrl: './log-workout.component.html',
  styleUrls: ['./log-workout.component.css'],
  providers: [WorkoutService]
})
export class LogWorkoutComponent implements OnInit {

  public hasStarted: boolean;
  public workoutId: number;
  public workoutActiveObj: WorkoutActive = new WorkoutActive(null,null,null,null,null,null,null,null,null,null);

  date: Date = new Date();
    settings = {
        bigBanner: false,
        timePicker: false,
        format: 'dd-MM-yyyy',
        defaultOpen: false
    }

  constructor(private router: Router, private route: ActivatedRoute, private workoutService: WorkoutService) { 
    this.workoutId = this.route.snapshot.queryParams['workoutId'];
    if(this.route.snapshot.queryParams['hasStarted'] == "true"){
      this.hasStarted = true;
    } else {
      this.hasStarted = false;
    }
  }

  ngOnInit() {
    if(this.hasStarted){
      this.getWorkoutActive(this.workoutId);
    } else {
      this.workoutService.getWorkoutById(this.workoutId).subscribe(res => {
        this.workoutActiveObj.workoutId = res.workoutId;
        this.workoutActiveObj.workoutNote = res.workoutNote;
        this.workoutActiveObj.workoutTitle = res.workoutTitle;
      })
    }
  }

  getWorkoutActive(id: number){
    this.workoutService.getWorkoutActive(id).subscribe(responseData => {
      this.workoutActiveObj.workoutActiveId = responseData.workoutActiveId;
      this.workoutActiveObj.workoutId = responseData.workoutId;
      this.workoutActiveObj.workoutNote = responseData.workoutNote;
      this.workoutActiveObj.workoutTitle = responseData.workoutTitle;
      this.workoutActiveObj.comments = responseData.comments;
      this.workoutActiveObj.startDate = responseData.startDate;
      this.workoutActiveObj.startTime = responseData.startTime;
      this.workoutActiveObj.status = responseData.status;
      this.workoutActiveObj.endDate = responseData.endDate;
      this.workoutActiveObj.endTime = responseData.endTime;
    });
  }

  endWorkout(){
    this.workoutService.endWorkout(this.workoutActiveObj).subscribe(res => {
      this.workoutActiveObj.workoutActiveId = res;
    });
    this.router.navigate(['/viewWorkout']);
  }

  startWorkout(){
    this.workoutService.endWorkout(this.workoutActiveObj).subscribe(res => {
      this.workoutActiveObj.workoutActiveId = res;
    });
    this.router.navigate(['/viewWorkout']);
  }

  cancel(){
    this.router.navigate(['/viewWorkout']);
  }

}
