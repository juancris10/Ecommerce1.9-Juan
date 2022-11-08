import React from "react";
// Import css files

import { useState, useContext, useEffect } from "react";
import { fs } from "../Services/Firebase";
import { collection, query, onSnapshot } from "firebase/firestore";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Quantity from "./Quantity";

const ProductCard = () => {
  const [ProductoImp, setProductoImp] = useState([]);
  // Quantity State
  const [quantity, setQuantity] = useState(0);

  // Increase Quantity
  const AddItems = () => setQuantity((quantity) => quantity + 1);

  // Decrease Quantity
  const DecreaseItems = () => {
    if (quantity > 0) setQuantity((quantity) => quantity - 1);
  };
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  useEffect(() => {
    const colRef = collection(fs, "Productos");
    const q = query(colRef);
    const mostrarDatos = onSnapshot(q, (querysnapshot) => {
      const docs = [];
      querysnapshot.forEach((productos) => {
        docs.push({ ...productos.data(), id: productos.id });
      });
      console.log(docs);
      setProductoImp(docs);
    });
  }, []);

  return (
    <div>
      <div className="text-center">
        <h5 className=" display-2 border-light border-bottom border-3 m-2">
          Bienvenido al Supermercado Libertad
        </h5>
      </div>
      <div>
        <div className="d-block">
          <div
            id="carouselExampleIndicators"
            className="carousel slide"
            data-bs-ride="carousel"
          >
            <div class="carousel-indicators">
              <button
                type="button"
                data-bs-target="#carouselExampleIndicators"
                data-bs-slide-to="0"
                class="active"
                aria-current="true"
                aria-label="Slide 1"
              ></button>
              <button
                type="button"
                data-bs-target="#carouselExampleIndicators"
                data-bs-slide-to="1"
                aria-label="Slide 2"
              ></button>
              <button
                type="button"
                data-bs-target="#carouselExampleIndicators"
                data-bs-slide-to="2"
                aria-label="Slide 3"
              ></button>
            </div>
            <div className="carousel-inner ">
              <div className="carousel-item active ">
                <img
                  className="img-fluid"
                  src="https://i.imgur.com/8TJ2KL1.jpg"
                  alt="..."
                  style={{alignSelf:"center",textAlign:"center",display:"block",alignItems:"center",margin:"auto",width:"60%"}}
                />
              </div>
              <div className="carousel-item ">
                <img
                  src="https://i.imgur.com/pfyXeEt.jpg"
                  style={{alignSelf:"center",textAlign:"center",display:"block",alignItems:"center",margin:"auto",width:"60%"}}
                  alt="..."
                />
              </div>
              <div className="carousel-item">
                <img
                  src="https://i.imgur.com/rFwaelK.jpg"
                  style={{alignSelf:"center",textAlign:"center",display:"block",alignItems:"center",margin:"auto",width:"60%"}}
                  alt="..."
                />
              </div>
            </div>
            <button
              className="carousel-control-prev"
              type="button"
              data-bs-target="#carouselExampleIndicators"
              data-bs-slide="prev"
            >
              <span
                className="carousel-control-prev-icon"
                aria-hidden="true"
              ></span>
              <span className="visually-hidden">Previous</span>
            </button>
            <button
              className="carousel-control-next"
              type="button"
              data-bs-target="#carouselExampleIndicators"
              data-bs-slide="next"
            >
              <span
                className="carousel-control-next-icon"
                aria-hidden="true"
              ></span>
              <span className="visually-hidden">Next</span>
            </button>
          </div>
        </div>
      </div>

      <div className="text-center">
        <h5 className=" display-5 border-light border-bottom border-3 mt-5">
          Nuestros Productos
        </h5>
      </div>
      <div className="mt-4">
        <Carousel
          responsive={responsive}
          infinite={true}
          autoPlaySpeed={5000}
          autoPlay={true}
          itemClass="carousel-item-padding-70-px"
        >
          {ProductoImp.map((producto) => (
            <div
              className="card-id "
              style={{ width: "27rem", cursor: "pointer" }}
              key={producto.id}
            >
              <div
                className="card text-center justify-content-center pe-1"
                style={{ marginLeft: "110px" }}
              >
                <img
                  src={producto.FotoProduct}
                  className="rounded mx-auto d-block img-fluid p-2"
                  alt="..."
                  style={{ height: "200px", width: "200px" }}
                />
                <div className="card-body">
                  <h5 className="card-title">{producto.NombreProduc}</h5>
                  <div className="d-flex justify-content-between  border-light border-bottom border-3">
                    <h5 className=" card-title fs-4 display-5">Precio</h5>
                    <i className=" fa-dollar-sign card-title fs-5 display-5">
                      {producto.Precio}
                    </i>
                  </div>
                  <div className="mt-2 ">
                    <Quantity
                      quantity={producto.Cantidad}
                      AddItems={AddItems}
                      DecreaseItems={DecreaseItems}
                    />
                  </div>
                  <div className="text-center">
                    <button className="btn btn-outline-light fs-6  display-5 ">
                      <i class="fa-solid fa-cart-shopping "> Agregar</i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Carousel>
        <h5 className=" display-5 border-light border-bottom border-3 mt-2"></h5>
      </div>
    </div>
  );
};

export default ProductCard;