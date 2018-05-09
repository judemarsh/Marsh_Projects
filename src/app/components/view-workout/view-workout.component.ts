import { Component, Directive, OnInit, OnDestroy, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Workout } from '../../model/workout';
import { WorkoutService } from '../../service/workout.service';

@Component({
  selector: 'app-view-workout',
  templateUrl: './view-workout.component.html',
  styleUrls: ['./view-workout.component.css'],
  providers: [WorkoutService]
})
export class ViewWorkoutComponent implements OnInit {
  
  public workoutList: Workout[];
  public searchWorkout: string;
    
  constructor(private router: Router, private workoutService: WorkoutService/*, private dialog: MatDialog*/) { 
  }
  ngOnInit() {
    this.getWorkoutList();
  }

  getWorkoutList(){
    this.workoutList = this.workoutService.getWorkoutList();
  }
  startWorkoutActive(startWorkoutObj: Workout){
    this.router.navigate(['/startWorkout/'+startWorkoutObj.workoutId], {queryParams : {workoutId: startWorkoutObj.workoutId, hasStarted: startWorkoutObj.hasStarted}});
  }

  editWorkout(id: number){
    this.router.navigate(['/editWorkout/'+id], {queryParams : {id: id, contentHeader: "Edit Workout"}});
  }

  deleteWorkout(delWorkoutObj: Workout){
    if(confirm("Are you sure you want to delete this Workout?")){
      this.workoutService.deleteWorkout(delWorkoutObj.workoutId).subscribe(responseData => { 
        let index = this.workoutList.indexOf(delWorkoutObj);
        if(index != -1){
          this.workoutList.splice(index,1);
        }
      });
    }
  }
}
