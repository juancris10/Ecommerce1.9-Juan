import ContextoAuth from "./Contexto";
import { useEffect,useState } from "react";
import { createUserWithEmailAndPassword,signOut,signInWithEmailAndPassword,GoogleAuthProvider,signInWithPopup, sendPasswordResetEmail, onAuthStateChanged,sendSignInLinkToEmail } from "firebase/auth";
import { auth } from "../Services/Firebase";

//No puedo hacerlo en el Firestore, Asi que lo hago aca.
import { addDoc,doc, collection,updateDoc,where,getDocs,query,deleteDoc}  from "firebase/firestore";
import { fs } from "../Services/Firebase";


export default function AuthContext(props){

    const {children} = props;
    const [estadoAdmin, setEstadoAdmin] = useState(false);
    //registrar

    const regUsuario = (email,password) => {
        return createUserWithEmailAndPassword(auth,email,password)
    };
    //logeo usuario y contraseña
    const loginUser = (email, password) => {
        return signInWithEmailAndPassword(auth,email,password)
    };
    //login google
    const loginGoogle = () => {
        const googleProvider = new GoogleAuthProvider();
        return signInWithPopup(auth,googleProvider);
    };

    const restartPassword = async (email) => {
        return sendPasswordResetEmail(auth,email);
    };

    //desconectar
    const desconectar = () => {
        return signOut(auth);
    };


    const [user,setUser] = useState(null);

    

    useEffect(() => {
        const unsubsucribe = onAuthStateChanged(auth,(currentUser) =>{
            setUser(currentUser);
        })
        return () => unsubsucribe();
    },[]);

    //No puedo hacerlo en el Firestore, Asi que lo hago aca.
    const regUserDatos = async (nombre,email,numeroTel,fotoPerfil,estado,apellido) => {
        if (!apellido){
            apellido = "";
        }
        const q = query(collection(fs, "usuario"), where("Email", "==", email));
        const querySnapshot = await getDocs(q);
        if(querySnapshot.docChanges().length === 0){
            addDoc(collection(fs,"usuario"),{
                Nombre: nombre,
                Apellido: apellido,
                Phone: numeroTel,
                Email: email,
                Photo: fotoPerfil,
                Conectado: estado
            });
        }
        querySnapshot.forEach((document) => {  
            if(document){
                updateDoc(doc(fs,"usuario",document.id),{
                    Conectado: estado
                })
            }
        });
    }

    const actualizarEstado = async (email,estado) => {
        const q = query(collection(fs, "usuario"), where("Email", "==", email));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((document) => {
            const idDocumento = document.id;
            updateDoc(doc(fs,"usuario",idDocumento),{
                Conectado: estado
            })
        
        });
    }

    const modoAdmin = async (email,estado) => {
        const qAdmin = query(collection(fs, "usuario"), where("Admin", "==", true));
        const querySnapAdmin = await getDocs(qAdmin);
        const qEmail = query(collection(fs, "usuario"), where("Email", "==", email));
        const querySnapEmail = await getDocs(qEmail);
        querySnapAdmin.forEach((documentAdmin) => {
            querySnapEmail.forEach((documentEmail) => {
                if (documentAdmin.id == documentEmail.id ){
                    setEstadoAdmin(estado);
                }
            });
        });
    }

    const EliminarCarrito = async (id) =>{
        const CarritoDoc = doc(fs,"Carrito",id)
        await deleteDoc(CarritoDoc)

    }



    return(
        <>
            <ContextoAuth.Provider value={{
                regUsuario,
                loginUser,
                loginGoogle,
                restartPassword,
                desconectar,
                regUserDatos,
                actualizarEstado,
                modoAdmin,
                estadoAdmin,
                user,
                EliminarCarrito

                
            }}>
                {children}
            </ContextoAuth.Provider>
        
        
        
        </>
    )





}