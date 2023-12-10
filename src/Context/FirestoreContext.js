import React, { createContext, useContext, useState } from "react";
import { addDoc, collection, doc, deleteDoc, updateDoc, getDoc, getDocs } from "firebase/firestore";
import { fs } from "../Services/Firebase";
import Contexto from "./Contexto";

class FirestoreContextProvider extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            clientes: [],
        };
    }

    registro = async (NombreProduc, Cantidad, FotoProduct, Precio, Value) => {
        try {
            await addDoc(collection(fs, "Productos"), {
                NombreProduc: NombreProduc,
                Cantidad: Cantidad,
                FotoProduct: FotoProduct,
                Precio: Precio,
                Categoria: Value,
            });
        } catch (error) {
            console.error("Error al registrar el producto", error);
            throw error;
        }
    };

    modificar = async (identificador, NombreProduc, Cantidad, FotoProduct, Precio) => {
        await updateDoc(doc(fs, "Productos", identificador), {
            NombreProduc: NombreProduc,
            Cantidad: Cantidad,
            FotoProduct: FotoProduct,
            Precio: Precio,
        });
    };

    eliminar = (identificador) => {
        deleteDoc(doc(fs, "Productos", identificador));
    };

    lstClientes = async () => {
        const querySnapClientes = await getDocs(collection(fs, "usuario"));
        const docs = [];
        querySnapClientes.forEach((doc) => {
            docs.push({ ...doc.data(), id: doc.id });
        });
        this.setState({ clientes: docs });
    };

    EliminarCliente = async (clienteId) => {
        try {
            await deleteDoc(doc(fs, "usuario", clienteId));
            console.log("Cliente eliminado correctamente");
        } catch (error) {
            console.error("Error al eliminar el cliente", error);
        }
    };

    render() {
        const contextValue = {
            registro: this.registro,
            modificar: this.modificar,
            eliminar: this.eliminar,
            lstClientes: this.lstClientes,
            clientes: this.state.clientes,
            EliminarCliente: this.EliminarCliente,
        };

        return (
            <Contexto.Provider value={contextValue}>

                {this.props.children}
            </Contexto.Provider>
        );
    }
}

const useFirestoreContext = () => {
    const context = useContext(Contexto);
    if (!context) {
        throw new Error("useFirestoreContext debe ser utilizado dentro de un FirestoreContextProvider");
    }
    return context;
};

export { FirestoreContextProvider, useFirestoreContext };
