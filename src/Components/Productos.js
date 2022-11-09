import "../Assets/css/Home.css";
import { useState, useContext, useEffect } from "react";
import Contexto from "../Context/Contexto";
import Select from "react-select";
import "bootswatch/dist/quartz/bootstrap.min.css";
import {
  addDoc,
  collection,
  doc,
  updateDoc,
  deleteDoc,
  query,
  onSnapshot,
  setDoc,
  DocumentReference,
  where,
  getDocs,
} from "firebase/firestore";

import { fs } from "../Services/Firebase";



export default function Productos() {


  const suppliers = [
    { value: "Carnes", label: "Carnes" },
    { value: "Lacteos", label: "Lacteos" },
    { value: "Bazar", label: "Bazar" },
    { value: "Productos de limpieza", label: "Productos de limpieza" },
    { value: "Bebidas", label: "Bebidas" },
    { value: "Comestibles", label: "Comestibles" },
    { value: "Varios", label: "Varios" },
  ];

  const [NombreProduc, setNombreProduc] = useState("");
  const [Cantidad, setCantidad] = useState("");
  const [FotoProduct, setFotoProduct] = useState("");
  const [Precio, setPrecio] = useState("");
  const [Value, setValue] = useState(null);
  const [ProductoImp, setProductoImp] = useState([]);
  const [identificador, setIdentificador] = useState("");
  const {registro,modificar,eliminar} = useContext(Contexto);

  function iden(id) {
    const ide = id;
    setIdentificador(ide);
  }

  const registrarProducto = async (e) => {
    e.preventDefault();
    const file = document.getElementById('customFileLang').files[0];
    await registro(NombreProduc, Cantidad, FotoProduct, Precio, Value);
  };

  const modificarProducto = async (e) => {
    e.preventDefault();
    await modificar(identificador, NombreProduc, Cantidad, FotoProduct, Precio);
  };

  const eliminarProducto = async (e) => {
    e.preventDefault();
    await eliminar(identificador);
  };

  useEffect(() => {
    const colRef = collection(fs, "Productos");
    const q = query(colRef);
    const mostrarDatos = onSnapshot(q, (querysnapshot) => {
      const docs = [];
      querysnapshot.forEach((productos) => {
        docs.push({ ...productos.data(), id: productos.id });
      });

      setProductoImp(docs);
    });
  }, []);


  return (
    <>
      <div className="container bg-dark">
        <div className="table-responsive">
          <div className="table-wrapper bg-dark">
            <div className="table-title bg-dark">
              <div className="row">
                <div className="col text-light">
                  <h2 className="text-center">Alta producto</h2>
                  <div className="d-flex justify-content-start">
                    <a href="#addEmployeeModal"className="btn btn-danger mt-2 mb-2"data-toggle="modal">
                        <i className="fa-solid fa-plus"></i>{" "}
                      <span className="text-dark">Añadir Nuevo producto</span>
                    </a>

                    <a href="/"className="btn btn-trasnparent mt-2 mb-2 ">
                        <i className="fa-solid fa-left-long"></i>{" "}
                      <span className="text-light ">Regresar</span>
                    </a>
                  </div>
                  <table className="table table-dark table-hover">
                    <thead>
                      <tr className="text-center">
                        <th className="border-bottom">Categoria</th>
                        <th className="border-bottom">Nombre</th>
                        <th className="border-bottom">Cantidad</th>
                        <th className="border-bottom">Foto Producto</th>
                        <th className="border-bottom">Precio</th>
                        <th className="border-bottom">Opciones</th>
                      </tr>
                    </thead>
                    <tbody>
                      {ProductoImp.map((producto, index) => (
                        <tr key={index} className="text-center">
                          <td className="border-bottom">{producto.Categoria}</td>
                          <td className="border-bottom">{producto.NombreProduc}</td>
                          <td className="border-bottom">{producto.Cantidad}</td>
                          <td className="border-bottom">{producto.FotoProduct}</td>
                          <td className="border-bottom">{producto.Precio}</td>
                          <td className="border-bottom">
                            <a href="#editEmployeeModal" className="edit" onClick={() => iden(producto.id)}data-toggle="modal"><i className="fa-solid fa-pen-to-square"></i></a>
                            <a href="#deleteEmployeeModal" className="delete" onClick={() => iden(producto.id)}data-toggle="modal"><i className="fa-solid fa-eraser"></i></a>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <!-- Añadir nuevo Producto --> */}
      <div id="addEmployeeModal" className="modal fade">
        <div className="modal-dialog">
          <div className="modal-content">
            <div>
              <div className="modal-header">
                <h4 className="modal-title">Añadir Producto</h4>
                <button type="button" className="close" data-dismiss="modal" aria-hidden="true" > &times;</button>
              </div>
              <div className="modal-body">
                <div className="Suppliers-container ">
                    <label>Categoria</label>
                  <Select className="text-primary" defaultValue={suppliers.value} options={suppliers} onChange={(Value) => setValue(Value.value)}/>
                </div>
                <div className="form-group">
                  <label>Nombre</label>
                  <input type="text" className="form-control" requiredonChange={(e) => setNombreProduc(e.target.value)}/>
                </div>
                <div>
                  <label>Cantidad</label>
                  <input type="text" className="form-control" required onChange={(e) => setCantidad(e.target.value)}/>
                </div>
                <div>
                  <label>Foto Producto</label>
                  <input type="text" className="form-control" placeholder="Ingrese la Url de la Imagen..." required onChange={(e) => setFotoProduct(e.target.value)}/>
                    <div className="custom-file">
                        <input type="file" className="custom-file-input btn btn-transparent" id="customFileLang" lang="es"/>
                    </div>
                </div>
                <div>
                  <label>Precio</label>
                  <input type="text" className="form-control" required onChange={(e) => setPrecio(e.target.value)} />
                </div>
              </div>
              <div className="modal-footer">
                <input type="button" className="btn btn-default" data-dismiss="modal" value="Cancel"/>
                <input type="submit" className="btn btn-success" data-dismiss="modal" value="Añadir"onClick={registrarProducto}/>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Editar Producto */}
      <div id="editEmployeeModal" className="modal fade">
        <div className="modal-dialog">
          <div className="modal-content">
            <div>
              <div className="modal-header">
                <h4 className="modal-title">Editar Producto</h4>
                <button type="button" className="close" data-dismiss="modal" aria-hidden="true" > &times;</button>
              </div>
              <div className="modal-body">
                <div className="Suppliers-container ">
                    <label>Categoria</label>
                  <Select className="text-primary" defaultValue={suppliers.value} options={suppliers} onChange={(Value) => setValue(Value.value)}/>
                </div>
                <div className="form-group">
                  <label>Nombre</label>
                  <input type="text" className="form-control" requiredonChange={(e) => setNombreProduc(e.target.value)}/>
                </div>
                <div>
                  <label>Cantidad</label>
                  <input type="text" className="form-control" required onChange={(e) => setCantidad(e.target.value)}/>
                </div>
                <div>
                  <label>Foto Producto</label>
                  <input type="text" className="form-control" placeholder="Ingrese la Url de la Imagen..." required onChange={(e) => setFotoProduct(e.target.value)}/>
                    <div className="custom-file">
                        <input type="file" className="custom-file-input btn btn-transparent" id="customFileLang" lang="es"/>
                    </div>
                </div>
                <div>
                  <label>Precio</label>
                  <input type="text" className="form-control" required onChange={(e) => setPrecio(e.target.value)} />
                </div>
              </div>
              <div className="modal-footer">
                <input type="button" className="btn btn-default" data-dismiss="modal" value="Cancel"/>
                <input type="submit" className="btn btn-success" data-dismiss="modal" value="Añadir"onClick={modificarProducto}/>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Eliminar Producto */}
      <div id="deleteEmployeeModal" className="modal fade">
        <div className="modal-dialog">
          <div className="modal-content">
            <div>
              <div className="modal-header">
                <h4 className="modal-title">Eliminar numero</h4>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-hidden="true"
                >
                  &times;
                </button>
              </div>
              <div className="modal-body">
                <p>¿Estas Seguro que deseas Eliminar el Producto?</p>
                <p className="text-warning">
                  <small>Esta accion no se puede Revertir.</small>
                </p>
              </div>
              <div className="modal-footer">
                <input type="button" className="btn btn-default" data-dismiss="modal" value="Cancel"/>
                <input type="submit" className="btn btn-danger" data-dismiss="modal"value="Eliminar" onClick={eliminarProducto}/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}