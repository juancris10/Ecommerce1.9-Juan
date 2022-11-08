import ContextoFirestore from "./Contexto";
import { addDoc, collection, doc,deleteDoc,updateDoc,getDoc,getDocs }  from "firebase/firestore";
import { fs } from "../Services/Firebase";
import {useContext, useState } from "react";
import Contexto from "./Contexto";

export default function FirestoreContext(props){

    const { children } = props;
    const [ clientes, setClientes ] = useState([]);
    const CarritoCollection = collection(fs,"Carrito")
    const [Carrito,setCarrito] = useState([])

    const registro = async  (NombreProduc, Cantidad, FotoProduct, Precio, Value) => {
        await addDoc(collection(fs, "Productos"), {
          NombreProduc: NombreProduc,
          Cantidad: Cantidad,
          FotoProduct: FotoProduct,
          Precio: Precio,
          Categoria: Value,
        });
    };
    
    const modificar = async  (identificador,NombreProduc,Cantidad,FotoProduct,Precio) => {
        await updateDoc(doc(fs, "Productos",identificador), {
          NombreProduc: NombreProduc,
          Cantidad: Cantidad,
          FotoProduct: FotoProduct,
          Precio: Precio,
    
        });
    };

    const eliminar = (identificador) => {
        deleteDoc(doc(fs, "Productos", identificador));
    };


    const lstClientes = async () => {
        const querySnapClientes = await getDocs(collection(fs,"usuario"));
        const docs = [];
        querySnapClientes.forEach((doc) => {
            docs.push({ ...doc.data(),id: doc.id})
        });
        setClientes(docs);
    }


    const agregarCarrito= async(ProdId,quantity,Total,ProdPrecio,ProdFot,ProdNomb) =>{

        await addDoc(collection(fs,"Carrito"),{
            ProductoId:ProdId,
            Cantidad:quantity,
            Total:Total,
            Nombre:ProdNomb,
            Foto:ProdFot,
            PrecioUnitario:ProdPrecio

        })
    }

    const EliminarCarrito = async(id) =>{
        const CarritoDoc = doc(fs,"Carrito",id)
        await deleteDoc(CarritoDoc)

    }





    return(
        <>
            <ContextoFirestore.Provider value={{
                registro,
                modificar,
                eliminar,
                lstClientes,
                clientes,
                agregarCarrito,
                Carrito,
                EliminarCarrito
                
        
            }}>
                {children}
            </ContextoFirestore.Provider>
            


        
        </>
    )

}