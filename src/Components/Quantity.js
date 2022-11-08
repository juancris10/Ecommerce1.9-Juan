import React from "react";

const Quantity = ({ quantity, AddItems, DecreaseItems }) => {
  return (
    <div className="input-group mb-2">
      <span className="input-group-btn d-grid gap-2 d-flex">
        <button type="button" className=" btn btn-info" onClick={DecreaseItems}>
          <i className="fa-solid fa-minus"></i>
        </button>
      </span>
      <input
        type="text"
        value={quantity}
        name="quantity"
        readOnly
        className="form-control input-number text-center fs-5"
      ></input>
      <span className="input-group-btn d-flex gap-2">
        <button type="button" className="btn btn-success" onClick={AddItems}>
          <i className="fa-solid fa-plus"></i>
        </button>
      </span>
    </div>
  );
};

export default Quantity;
