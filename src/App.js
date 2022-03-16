import { useState, useEffect } from "react";
import CardItem from "./components/CardItem";
import "./styles.css";
import data from "./data.js";

// const data = [
//   {
//     _id: 1,
//     title: "Good Shepherd Book",
//     price: "2.5",
//     count: 2
//   },
//   {
//     _id: 2,
//     title: "Some random book",
//     price: "1",
//     count: 5
//   },
//   {
//     _id: 3,
//     title: "Some another random book",
//     price: "0.5",
//     count: 3
//   },
//   {
//     _id: 4,
//     title: "Orange",
//     price: "0.99",
//     count: 1
//   },
//   {
//     _id: 5,
//     title: "Pear",
//     price: "6.00",
//     count: 4
//   }
// ];

export default function App() {
  const [items, setItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [modalState, setModalState] = useState(false);

  //  handlers

  const handleDeleteItem = (index) => {
    const latest_items = items.filter((item) => {
      if (item._id !== index) return item;
    });
    setItems(latest_items);
    setMessage("Successfully deleted!!!!");
    handleModal();
  };

  const handleCountChange = (changedCount, id) => {
    const temp_items = [...items];
    temp_items[id - 1].count = changedCount;
    setItems(temp_items);
  };

  const handleTotalPrice = () => {
    let total_price = 0;
    items.map((item) =>
      (total_price =
        total_price + Number(item.count) * Number(item.price)).toFixed(3)
    );
    setTotalPrice(total_price);
  };

  const handleModal = () => {
    setModalState(true);
    setTimeout(() => {
      setModalState(false);
    }, 1250);
  };

  const handleClick = () => {
    handleTotalPrice();
    handleModal();
  };

  // useeffect
  useEffect(() => {
    setItems([...items, ...data]);
  }, []);

  useEffect(() => {
    handleTotalPrice();
  }, [items]);

  return (
    <div className="container">
      <h1>Shopping Cart</h1>
      <p>
        Total Price :{" "}
        <b>${Math.round((totalPrice + Number.EPSILON) * 100) / 100}</b>
      </p>
      <div className="shopping-cart-container">
        {items.map((item) => {
          return (
            <CardItem
              item={item}
              key={item.title}
              handleDeleteItem={handleDeleteItem}
              handleCountChange={handleCountChange}
            />
          );
        })}
        <button className="btn" onClick={handleClick}>
          <span className="span-text">Check Out</span>
          <span>
            Total Price : $
            {Math.round((totalPrice + Number.EPSILON) * 100) / 100}
          </span>
        </button>
      </div>
      <div className={modalState ? "modal" : "modal display-hide"}>
        <p className="modal-text">Order successful!!!</p>
      </div>
    </div>
  );
}
