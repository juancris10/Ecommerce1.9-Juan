import { useContext } from "react";
import Contexto from "../Context/Contexto";
import { useNavigate } from "react-router-dom";
import { Navigate } from "react-router-dom";



export default function ProtetecRoute(props){

    const { children } = props;
    const {user,regUserDatos,modoAdmin,estadoUsuario} = useContext(Contexto);
    const navigate = useNavigate(); 
    //Cambiar al firestoreContext

    if (user){
        console.log("conectado?")
        const estado = true;
        const email = user.email;
        const nombre = user.displayName;
        const numeroTel = user.phoneNumber;
        const fotoPerfil = user.photoURL;
        regUserDatos(nombre,email,numeroTel,fotoPerfil,estado)
        modoAdmin(email,estado);
    }

    return(
        <>
            {children}

        </>
    )
}