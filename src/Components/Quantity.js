import React, { useContext, useState } from "react";
import Contexto from "../Context/Contexto";

class Quantity extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      quantity: 0,
    };

    this.agregarCarrito = this.agregarCarrito.bind(this);
    this.AddItems = this.AddItems.bind(this);
    this.DecreaseItems = this.DecreaseItems.bind(this);
    this.handleQuantity = this.handleQuantity.bind(this);
  }

  static contextType = Contexto;

  agregarCarrito(
    ProdId,
    quantity,
    Total,
    ProdPrecio,
    ProdFot,
    ProdNomb,
    usuario
  ) {
    const { agregarCarrito } = this.context;
    agregarCarrito(
      ProdId,
      quantity,
      Total,
      ProdPrecio,
      ProdFot,
      ProdNomb,
      usuario
    );
    this.setState({ quantity: 0 });
  }

  AddItems() {
    this.setState((prevState) => ({ quantity: prevState.quantity + 1 }));
  }

  DecreaseItems() {
    if (this.state.quantity > 0) {
      this.setState((prevState) => ({ quantity: prevState.quantity - 1 }));
    }
  }

  handleQuantity(e) {
    e.preventDefault();
    const { ProdId, ProdPrecio, ProdFot, ProdNomb } = this.props;
    const { quantity } = this.state;
    try {
      const usuario = this.context.user.email;
      this.agregarCarrito(
        ProdId,
        quantity,
        ProdPrecio * quantity,
        ProdPrecio,
        ProdFot,
        ProdNomb,
        usuario
      );
    } catch (error) {
      console.log("Error");
    }
  }

  render() {
    const { quantity } = this.state;

    return (
      <form onSubmit={this.handleQuantity}>
        <div className="input-group mb-2" key={this.props.ProdId}>
          <span className="input-group-btn">
            <button
              type="button"
              className=" btn btn-info"
              onClick={this.DecreaseItems}
            >
              <i className="fa-solid fa-minus"></i>
            </button>
          </span>
          <input
            style={{ cursor: "pointer" }}
            type="text"
            value={quantity}
            name="quantity"
            disabled
            className="form-control input-number text-center fs-4"
            onChange={(e) => this.setState({ quantity: e.target.value })}
          ></input>
          <span className="input-group-btn  ">
            <button
              type="button"
              className="btn btn-success"
              onClick={this.AddItems}
            >
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
            <button
              className="btn btn-outline-light fs-6  display-5 	 mt-3"
              style={{ cursor: "pointer" }}
            >
              <i className="fa-solid fa-cart-shopping">Agregar</i>
            </button>
          </div>
        </div>
      </form>
    );
  }
}

export default Quantity;

