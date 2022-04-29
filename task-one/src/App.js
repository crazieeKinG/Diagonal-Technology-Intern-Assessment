import logo from './logo.svg';
import { useState } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { data } from './data.js';

function App() {
  const [menu, setMenu] = useState(data);
  const [selected, setSelected] = useState(JSON.parse(localStorage.getItem('Selected'))||[]);
  const [orderHistory, setOrder] = useState(JSON.parse(localStorage.getItem('History'))||[]);
  const [checkedItem, setChecked] = useState(JSON.parse(localStorage.getItem('Checked'))||[]);

  let total = 0;

  const selectItem = (item) => {
    let includeItem = checkedItem.includes(item.id);
    if (!includeItem) {
      setSelected([...selected, item]);
      setChecked([...checkedItem, item.id]);
    } else {
      const filteredItem = selected.filter((sitem) => sitem.id !== item.id);
      setSelected([...filteredItem]);
      const filteredChecked = checkedItem.filter((citem) => citem !== item.id);
      setChecked([...filteredChecked]);
    }
  }

  const orderFood = () => {
    if(selected.length !== 0){
      let currentDate = new Date();
      let itemList = {
        orderId: currentDate.getTime(),
        dateTime: currentDate.toISOString().slice(0, 10),
        itemList: selected
      }
      setOrder([itemList, ...orderHistory]);
      setSelected([]);
      setChecked([]);
    }
  }

  localStorage.setItem('Selected', JSON.stringify(selected));
  localStorage.setItem('History', JSON.stringify(orderHistory));
  localStorage.setItem('Checked', JSON.stringify(checkedItem));

  return (
    <div className="container">
      <h1>Task-1</h1>

      <div className="row">
        {menu.map((item) => {
          let checkedValue = false;
          if (checkedItem.includes(item.id)){
            checkedValue = true;
          }

          return (
            <div className='col-4 col-lg-3 my-2' key={item.id}>
              <div className="card col-12">
                <img className="card-img-top" src={item.image} alt="Card image cap" />
                <div className="card-body">
                  <h5 className="card-title">{item.title}</h5>
                  <p className="card-text">Rs. {item.price}</p>
                  <input type="checkbox" name={item.id} id={item.id} onChange={() => selectItem(item)} checked={checkedValue}/>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <hr />
      <div className="col-10 mx-4 my-2">
        <div className="h2">Selected items</div>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Item name</th>
              <th scope="col">Price</th>
            </tr>
          </thead>
          <tbody>
            {selected.map((item) => {
              total += item.price;
              return (
                <tr key={item.id}>
                  <td>{item.title}</td>
                  <td>Rs. {item.price}</td>
                </tr>
              );
            })}
            <tr>
              <th>Total</th>
              <th>Rs. {total}</th>
            </tr>
          </tbody>
        </table>
        <button className='btn btn-primary col-12' onClick={orderFood}>Order</button>
      </div>

      <hr />
      <div className="col-10 mx-4 my-2">
        <div className="h2">Order History</div>
        {orderHistory.map((order) => {
          total = 0;
          return (
            <div key={order.orderId}>
              <h4>Order Date: {order.dateTime}</h4>
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">Item name</th>
                    <th scope="col">Price</th>
                  </tr>
                </thead>
                <tbody>
                  {order.itemList.map((item) => {
                    total += item.price;
                    return (
                      <tr key={item.id}>
                        <td>{item.title}</td>
                        <td>Rs. {item.price}</td>
                      </tr>
                    );
                  })}
                  <tr>
                    <th>Total</th>
                    <th>Rs. {total}</th>
                  </tr>
                </tbody>
              </table>
            </div>
          );
        })}
      </div>

    </div>
  );
}

export default App;
