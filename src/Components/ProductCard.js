import React, { Component } from "react";
import { fs } from "../Services/Firebase";
import { collection, query, onSnapshot } from "firebase/firestore";
import Contexto from "../Context/Contexto";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Quantity from "./Quantity";

class ProductCard extends Component {
  static contextType = Contexto;

  constructor(props) {
    super(props);

    this.state = {
      ProductoImp: [],
    };

    this.responsive = {
      superLargeDesktop: { breakpoint: { max: 4000, min: 3000 }, items: 5 },
      desktop: { breakpoint: { max: 3000, min: 1024 }, items: 4 },
      tablet: { breakpoint: { max: 1024, min: 464 }, items: 2 },
      mobile: { breakpoint: { max: 464, min: 0 }, items: 1 },
    };
  }

  componentDidMount() {
    const colRef = collection(fs, "Productos");
    const q = query(colRef);
    const mostrarDatos = onSnapshot(q, (querysnapshot) => {
      const docs = [];
      querysnapshot.forEach((productos) => {
        docs.push({ ...productos.data(), id: productos.id });
      });
      this.setState({ ProductoImp: docs });
    });
  }

  render() {
    const {
      desconectar,
      user,
      actualizarEstado,
      estadoAdmin,
      modoAdmin,
      EliminarCarrito,
      lstCarritoUser,
    } = this.context;

    const { ProductoImp } = this.state;

    return (
      <div>
        {user ? (
          <>
            <div className="text-center mt-4 	"></div>
            <div>
              <div className="d-block">
                <div
                  id="carouselExampleIndicators"
                  className="carousel slide"
                  data-bs-ride="carousel"
                >
                  <div className="carousel-indicators">
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
                        style={{
                          alignSelf: "center",
                          textAlign: "center",
                          display: "block",
                          alignItems: "center",
                          margin: "auto",
                          width: "60%",
                        }}
                      />
                    </div>
                    <div className="carousel-item ">
                      <img
                        src="https://i.imgur.com/pfyXeEt.jpg"
                        style={{
                          alignSelf: "center",
                          textAlign: "center",
                          display: "block",
                          alignItems: "center",
                          margin: "auto",
                          width: "60%",
                        }}
                        alt="..."
                      />
                    </div>
                    <div className="carousel-item">
                      <img
                        src="https://i.imgur.com/rFwaelK.jpg"
                        style={{
                          alignSelf: "center",
                          textAlign: "center",
                          display: "block",
                          alignItems: "center",
                          margin: "auto",
                          width: "60%",
                        }}
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

            <div className="text-center mt-5 ">
              <h5 className=" display-6 border-light border-bottom border-3 	fa-brands">
                Todos los Productos
              </h5>
            </div>
            <div className="">
              <Carousel
                responsive={this.responsive}
                infinite={true}
                autoPlaySpeed={5000}
                autoPlay={true}
                draggable={false}
                centerMode={true}
                FocusOnSelect={false}
              >
                {ProductoImp.map((producto) => (
                  <div key={producto.id}>
                    <div
                      className="card"
                      style={{ width: "18rem", cursor: "pointer" }}
                    >
                      <img
                        src={producto.FotoProduct}
                        className=" mx-auto d-block img-fluid mt-3 rounded"
                        alt="..."
                        style={{ height: "160px", width: "160px" }}
                      />
                      <div className="card-body">
                        <h5 className="card-title 	fa-brands">
                          {producto.NombreProduc}
                        </h5>
                        <div className="d-flex justify-content-between  border-light border-bottom border-3">
                          <h5 className=" card-title fs-4 display-5 	fa-brands">
                            Precio
                          </h5>
                          <i className=" fa-dollar-sign card-title fs-5 display-5 	fa-brands">
                            {producto.Precio}
                          </i>
                        </div>
                        <div className="mt-2 ">
                          <Quantity
                            ProdId={producto.id}
                            ProdNomb={producto.NombreProduc}
                            ProdPrecio={producto.Precio}
                            ProdFot={producto.FotoProduct}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </Carousel>
            </div>
          </>
        ) : (
          <>
            <div className="text-center mt-4 	"></div>
            <div>
              <div className="d-block">
                <div
                  id="carouselExampleIndicators"
                  className="carousel slide"
                  data-bs-ride="carousel"
                >
                  <div className="carousel-indicators">
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
                        style={{
                          alignSelf: "center",
                          textAlign: "center",
                          display: "block",
                          alignItems: "center",
                          margin: "auto",
                          width: "60%",
                        }}
                      />
                    </div>
                    <div className="carousel-item ">
                      <img
                        src="https://i.imgur.com/pfyXeEt.jpg"
                        style={{
                          alignSelf: "center",
                          textAlign: "center",
                          display: "block",
                          alignItems: "center",
                          margin: "auto",
                          width: "60%",
                        }}
                        alt="..."
                      />
                    </div>
                    <div className="carousel-item">
                      <img
                        src="https://i.imgur.com/rFwaelK.jpg"
                        style={{
                          alignSelf: "center",
                          textAlign: "center",
                          display: "block",
                          alignItems: "center",
                          margin: "auto",
                          width: "60%",
                        }}
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
          </>
        )}
      </div>
    );
  }
}

export default ProductCard;
