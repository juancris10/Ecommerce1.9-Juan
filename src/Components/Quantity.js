import React from "react";
import { useContext } from "react";
import { useState } from "react";
import Contexto from "../Context/Contexto";

const Quantity = ({ ProdId, ProdPrecio, ProdFot, ProdNomb }) => {
  const { agregarCarrito, user } = useContext(Contexto);
  const [quantity, setQuantity] = useState(0);

  // Increase Quantity
  const AddItems = () => setQuantity((quantity) => quantity + 1);

  // Decrease Quantity
  const DecreaseItems = () => {
    if (quantity > 0) setQuantity((quantity) => quantity - 1);
  };
  var Total = ProdPrecio * quantity;

  try {
    var usuario = user.email;
  } catch (error) {
    console.log("Error");
  }
  const handleQuantity = async (e) => {
    e.preventDefault();
    await agregarCarrito(
      ProdId,
      quantity,
      Total,
      ProdPrecio,
      ProdFot,
      ProdNomb,
      usuario
    );

    setQuantity(0);
  };

  return (
    <form onSubmit={handleQuantity}>
      <div className="input-group mb-2" key={ProdId}>
        <span className="input-group-btn">
          <button
            type="button"
            className=" btn btn-info"
            onClick={DecreaseItems}
          >
            <i className="fa-solid fa-minus"></i>
          </button>
        </span>
        <input
          style={{ cursot: "pointer" }}
          type="text"
          value={quantity}
          name="quantity"
          disabled
          className="form-control input-number text-center fs-4"
          onChange={(e) => setQuantity(e.target.value)}
        ></input>
        <span className="input-group-btn  ">
          <button type="button" className="btn btn-success" onClick={AddItems}>
            <i className="fa-solid fa-plus"></i>
          </button>
        </span>
        <div
          className="d-flex text-center "
          style={{
            alignSelf: "center",
            textAlign: "center",
            display: "block",
            alignItems: "center",
            margin: "auto",
            width: "65%",
          }}
        >
          <button className="btn btn-outline-light fs-6  display-5 	 mt-3" style={{cursot:"pointer"}}>
            <i className="fa-solid fa-cart-shopping">Agregar</i>
          </button>
        </div>
      </div>
    </form>
  );
};

export default Quantity;
