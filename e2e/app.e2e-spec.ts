import { WorkoutSchedulerPage } from './app.po';

describe('workout-scheduler App', function() {
  let page: WorkoutSchedulerPage;

  beforeEach(() => {
    page = new WorkoutSchedulerPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
