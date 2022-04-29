import logo from "./logo.svg";
import "./App.css";

function App() {
  const formulatePayment = (choice, amount) => {
    const initialPayment = ((10 / 100) * amount).toFixed(2);
    let amountToPay = amount;
    if (choice == "weekly") {
      let totalAmountForWeekly = (156 * amount) - initialPayment;
      let weekly = totalAmountForWeekly / amountToPay;
      if (amount % 50 != 0){
          amountToPay = (amount + 50) - (amount % 50);
          weekly = Math.ceil(totalAmountForWeekly / amountToPay);
      }
      console.log(`You will be paid ${amountToPay} for ${weekly} weeks.`);
      return { time: weekly, amount: amountToPay };
    } else if (choice == "monthly") {
      let totalAmountForMonthly = (36 * amount) - initialPayment;
      let monthly = totalAmountForMonthly / amountToPay;
      if (amount % 50 != 0){
          amountToPay = (amount + 100) - (amount % 100);
          monthly = Math.ceil(totalAmountForMonthly / amountToPay);
      }
      console.log(`You will be paid ${amountToPay} for ${monthly} months.`);
      return { time: monthly, amount: amountToPay };
    } else {
      return null;
    }
  };
  
  // Function call for weekly and monthly at $122
  formulatePayment('weekly', 122);
  formulatePayment('monthly', 122);

  return (
    <div className="App">
      <header className="App-header">
        <p>Task-2</p>
      </header>
    </div>
  );
}

export default App;
