import { Workout } from './workout';

export class WorkoutActive {

    constructor(
        public workoutActiveId: number, 
        public startTime: Date, 
        public startDate: Date, 
        public endDate: Date, 
        public endTime: Date, 
        public comments: string, 
        public status: boolean, 
        public workoutId: number,
        public workoutNote: string,
        public workoutTitle: string
    ){
    }
}
