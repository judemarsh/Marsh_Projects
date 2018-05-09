import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CategoryService } from '../../service/category.service';
import { Category } from '../../model/category';
import { Workout } from '../../model/workout';
import { WorkoutService } from '../../service/workout.service';

@Component({
  selector: 'app-manage-workout',
  templateUrl: './manage-workout.component.html',
  styleUrls: ['./manage-workout.component.css'],
  providers: [CategoryService, WorkoutService]
})
export class ManageWorkoutComponent implements OnInit {
  public editWorkoutId: number;
  public caloriesBurnt: number = 0.0;
  public categoryList: Category[];
  public workoutObj: Workout;
  contentHeader = "Add Workout";
  
  constructor(private router: Router,private route: ActivatedRoute, private categoryService: CategoryService, private workoutService: WorkoutService) { 
    this.contentHeader = this.route.snapshot.queryParams['contentHeader'];
    this.editWorkoutId = this.route.snapshot.queryParams['id'];
    this.workoutObj = new Workout(null,null,null,null,null,null,null);
  }

  ngOnInit() {
    console.log('editWorkoutId'+this.editWorkoutId);
    console.log('contentHeader'+this.contentHeader);
    if(this.editWorkoutId != null && this.editWorkoutId != undefined){
      this.getWorkoutById(this.editWorkoutId);
    }
    this.getCategoryList();
    console.log(this.categoryList);
  }

  addCalories(){
    this.workoutObj.caloriesBurnPerMin = this.workoutObj.caloriesBurnPerMin + 0.10;
  }

  reduceCalories(){
    if(this.workoutObj.caloriesBurnPerMin <= 0.10){
      this.workoutObj.caloriesBurnPerMin = 0.0;
    } else {
      this.workoutObj.caloriesBurnPerMin = this.workoutObj.caloriesBurnPerMin - 0.10;
    }
  }

  getCategoryList(){
    this.categoryList = this.categoryService.getCategoryList();
  }

  getWorkoutById(workoutId: number){
    this.workoutService.getWorkoutById(workoutId).subscribe(responseData => { 
      this.workoutObj = responseData;
      this.editWorkoutId = responseData.workoutId;
    });
  }

  addCategory(){
    console.log('here');
    this.router.navigate(['manageCategory']);
  }

  saveWorkout(){
    console.log(this.workoutObj);
    this.workoutService.saveWorkout(this.workoutObj).subscribe(responseData => { 
      this.workoutObj.workoutId = responseData;
      this.router.navigate(['/viewWorkout']);
    });
  }

  cancel(){
    this.router.navigate(['/viewWorkout']);
  }

}
