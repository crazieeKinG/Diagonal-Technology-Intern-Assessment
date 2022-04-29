import logo from './logo.svg';
import './App.css';

function App() {
  const calculateTime = (n, m, speed) => {
    if (n === 0) {
      console.log("Shortest time: 0 seconds [Already at 0 floor]");
    } else {
      //Pure Walk TIme
      let totalTimeToReachDownstairsViaWalking = n * speed[3];

      //Walk and Elevator mixed time
      let timeToWalkToElevatorFloor = Math.abs(m - n) * speed[3];
      let totalTimeToOpenAndCloseElevator = (2 * speed[1]) + speed[2];
      let timeTimeToReachDownStairs = timeToWalkToElevatorFloor + totalTimeToOpenAndCloseElevator + (m * speed[0]);


      //Pure Elevator Time
      let timeForElevatorToMoveToNFloor = Math.abs(m - n) * speed[0];
      let totalTimeToReachDownstairsViaElevator = totalTimeToOpenAndCloseElevator + timeForElevatorToMoveToNFloor + (n * speed[0]);

      //Identify shortest time
      if ((totalTimeToReachDownstairsViaWalking < timeTimeToReachDownStairs) && (totalTimeToReachDownstairsViaWalking < totalTimeToReachDownstairsViaElevator)){
        console.log(`Shortest time is pure walking: ${totalTimeToReachDownstairsViaWalking}`);
      }
      else if ((totalTimeToReachDownstairsViaWalking > timeTimeToReachDownStairs) && (timeTimeToReachDownStairs < totalTimeToReachDownstairsViaElevator)){
        console.log(`Shortest time is walking to ${m} floor and taking elevator: ${timeTimeToReachDownStairs}`);
      }
      else {
        console.log(`Shortest time is taking only elevator: ${totalTimeToReachDownstairsViaElevator}`);
      }
    }
  }

  // n = 4, m = 5 and speeds = [1,2,3,10]
  calculateTime(4, 5, [1,2,3,10])
  // n = 0, m = 5 and speeds = [1,2,3,10]
  calculateTime(0, 5, [1,2,3,10])
  // n = 4, m = 3 and speeds = [2,3,4,5]
  calculateTime(4, 3, [2,3,4,5])
  // n = 7, m = 6 and speeds = [3,1,1,4]
  calculateTime(7, 6, [3,1,1,4])

  return (
    <div className="App">
      <header className="App-header">
        <p>
          Task-3
        </p>
      </header>
    </div>
  );
}

export default App;
