import ContextoAuth from "./Contexto";
import { useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signOut,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  sendPasswordResetEmail,
  onAuthStateChanged,
  sendSignInLinkToEmail,
} from "firebase/auth";
import { auth } from "../Services/Firebase";

//No puedo hacerlo en el Firestore, Asi que lo hago aca.
import {
  addDoc,
  doc,
  collection,
  updateDoc,
  where,
  getDocs,
  query,
  deleteDoc,
} from "firebase/firestore";
import { fs } from "../Services/Firebase";

export default function AuthContext(props) {
  const { children } = props;
  const [estadoAdmin, setEstadoAdmin] = useState(false);
  const CarritoCollection = collection(fs, "Carrito");
  const [Carrito, setCarrito] = useState([]);
  //registrar

  const regUsuario = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };
  //logeo usuario y contraseña
  const loginUser = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };
  //login google
  const loginGoogle = () => {
    const googleProvider = new GoogleAuthProvider();
    return signInWithPopup(auth, googleProvider);
  };

  const restartPassword = async (email) => {
    return sendPasswordResetEmail(auth, email);
  };

  //desconectar
  const desconectar = () => {
    return signOut(auth);
  };

  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubsucribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubsucribe();
  }, []);

  //No puedo hacerlo en el Firestore, Asi que lo hago aca.
  const regUserDatos = async (
    nombre,
    email,
    numeroTel,
    fotoPerfil,
    estado,
    apellido
  ) => {
    if (!apellido) {
      apellido = "";
    }
    const q = query(collection(fs, "usuario"), where("Email", "==", email));
    const querySnapshot = await getDocs(q);
    if (querySnapshot.docChanges().length === 0) {
      addDoc(collection(fs, "usuario"), {
        Nombre: nombre,
        Apellido: apellido,
        Phone: numeroTel,
        Email: email,
        Photo: fotoPerfil,
        Conectado: estado,
      });
    }
    querySnapshot.forEach((document) => {
      if (document) {
        updateDoc(doc(fs, "usuario", document.id), {
          Conectado: estado,
        });
      }
    });
  };

  const actualizarEstado = async (email, estado) => {
    const q = query(collection(fs, "usuario"), where("Email", "==", email));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((document) => {
      const idDocumento = document.id;
      updateDoc(doc(fs, "usuario", idDocumento), {
        Conectado: estado,
      });
    });
  };

  const modoAdmin = async (email, estado) => {
    const qAdmin = query(collection(fs, "usuario"), where("Admin", "==", true));
    const querySnapAdmin = await getDocs(qAdmin);
    const qEmail = query(
      collection(fs, "usuario"),
      where("Email", "==", email)
    );
    const querySnapEmail = await getDocs(qEmail);
    querySnapAdmin.forEach((documentAdmin) => {
      querySnapEmail.forEach((documentEmail) => {
        if (documentAdmin.id == documentEmail.id) {
          setEstadoAdmin(estado);
        }
      });
    });
  };



  const agregarCarrito = async (
    ProdId,
    quantity,
    Total,
    ProdPrecio,
    ProdFot,
    ProdNomb,
    usuario
  ) => {
    const q = query(collection(fs, "usuario"), where("Email", "==", usuario));
    const querySnapshot = await getDocs(q);
  
    const products = [];
  
    querySnapshot.forEach((document) => {
      const carritoRef = collection(fs, "usuario", document.id, "Carrito");
      const qProducto = query(
        carritoRef,
        where("ProductoId", "==", ProdId)
      );
  
      // Agregar la promesa a la lista
      products.push(getDocs(qProducto));
    });
  
    // Esperar a que todas las consultas se completen
    Promise.all(products).then(async (queryResults) => {
      for (let i = 0; i < queryResults.length; i++) {
        const queryProducto = queryResults[i];
        const carritoRef = collection(fs, "usuario", querySnapshot.docs[i].id, "Carrito");
    
        if (queryProducto && queryProducto.size > 0) {
          // Resto del código si el producto ya existe en el carrito...
          queryProducto.forEach((productoDoc) => {
            const cantidadActual = productoDoc.data().Cantidad;
            const totalActual = productoDoc.data().Total;
            const nuevoTotal = totalActual + Total;
            updateDoc(productoDoc.ref, {
              Cantidad: cantidadActual + quantity,
              Total: nuevoTotal,
            });
          });
        } else {
          // Resto del código si el producto no existe en el carrito...
          // Asegúrate de que carritoRef sea una colección válida
          console.log("Tipo de carritoRef:", typeof carritoRef);
    
          // Necesitas await aquí para asegurar que add() termine antes de pasar al siguiente ciclo
          await addDoc(carritoRef, {
            ProductoId: ProdId,
            Cantidad: quantity,
            Total: Total,
            Nombre: ProdNomb,
            Foto: ProdFot,
            PrecioUnitario: ProdPrecio,
          });
        }
      }
    });
  };
  
  
  

  const EliminarCarrito = async (id, usuario) => {
    const q = query(collection(fs, "usuario"), where("Email", "==", usuario));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((document) => {
      const CarritoDoc = doc(fs, "usuario", document.id, "Carrito", id);
      deleteDoc(CarritoDoc);
    });
  };

  const lstCarritoUser = async (email) => {
    const qCarrito = query(
      collection(fs, "usuario"),
      where("Email", "==", email)
    );
    const querySnapChat = await getDocs(qCarrito);
    querySnapChat.forEach((document) => {
      const LstCarrito = async () => {
        const querySnapshot = await getDocs(
          collection(fs, "usuario", document.id, "Carrito")
        );
        const docs = [];
        querySnapshot.forEach((doc) => {
          docs.push({ ...doc.data(), id: doc.id });
        });
        setCarrito(docs);
      };
      LstCarrito();
    });
  };

  return (
    <>
      <ContextoAuth.Provider
        value={{
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
          EliminarCarrito,
          agregarCarrito,
          Carrito,
          lstCarritoUser,
        }}
      >
        {children}
      </ContextoAuth.Provider>
    </>
  );
}
