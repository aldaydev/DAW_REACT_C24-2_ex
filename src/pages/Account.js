import { useContext } from "react";
import { DataContext } from "../context/DataContext";
import { deleteUser } from "../utils/firestore";

const Account = ()=>{

    const {setLoggedIn} = useContext(DataContext);

    const desconect = ()=>{
        setLoggedIn(false);
        sessionStorage.removeItem('loggedIn');
        sessionStorage.removeItem('user');
    }

    const deleteAccount = ()=>{
        deleteUser();
        setLoggedIn(false);
        sessionStorage.removeItem('loggedIn');
        sessionStorage.removeItem('user');
    }

    return(
        <section>
            ESTO ES LA PÁGINA DE TU CUENTA
            <button onClick={desconect}>DESCONECTARSE</button>
            <button onClick={deleteAccount}>ELIMINAR CUENTA</button>
        </section>
    )
}

export default Account;