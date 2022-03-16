import { useState, useEffect } from "react";

const CardItem = ({ item, handleDeleteItem, handleCountChange }) => {
  const [count, setCount] = useState(1);

  // useEffect
  useEffect(() => {
    setCount(item.count);
  }, []);

  useEffect(() => {
    handleCountChange(count, item._id);
  }, [count]);

  return (
    <div className="card-container">
      <h3 className="item-title">{item.title}</h3>
      <p className="base-price">${item.price}</p>
      <div className="item-counter">
        <div className="btn-container">
          <button className="btn add" onClick={() => setCount(count + 1)}>
            +
          </button>
          <button
            className="btn minus"
            onClick={() => {
              setCount(count - 1);
              if (count <= 1) {
                // alert to delete the item?
                const answer = confirm("Do you really want to delete?");
                if (answer) {
                  handleDeleteItem(item._id);
                  setCount(1);
                } else {
                  setCount(1);
                }
              }
            }}
          >
            -
          </button>
        </div>
        <span className="small-counter-show">{count}</span>
      </div>
    </div>
  );
};

export default CardItem;
