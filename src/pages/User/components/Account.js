import { useContext, useEffect, useState } from "react";
import { DataContext } from "../../../context/DataContext";
import { deleteUser, getUserData } from "../../../utils/firestore";
import userEdit_icon from "../../../assets/img/icons/userEdit_icon.svg"

const Account = ()=>{

    const {setLoggedIn, userId} = useContext(DataContext);
    const [userData, setUserData] = useState([]);

    useEffect(()=>{
        const handleAsync = async ()=>{
            const data = await getUserData();
            setUserData(data);
        }
        handleAsync();
    },[])

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
        <section className="main-sec">
            <hgroup>
                <h1>{`Bienvenido ${ userData.name !== undefined ? userData.name : ''}`}</h1>
                <h3>En esta página podrás gestionar tu cuenta</h3>
            </hgroup>
            <section>
                <article>
                    <button>
                        <img src={userEdit_icon} alt="User data edit icon"/>
                        <p>Editar información</p>
                    </button>
                    <button>
                        <img src={userEdit_icon} alt="User data edit icon"/>
                        <p>Información de envío</p>
                    </button>
                    <button>
                        <img src={userEdit_icon} alt="User data edit icon"/>
                        <p>Ver notificaciones</p>
                    </button>
                </article>
            </section>
            <button onClick={desconect}>DESCONECTARSE</button>
            <button onClick={deleteAccount}>ELIMINAR CUENTA</button>
        </section>
    )
}

export default Account;