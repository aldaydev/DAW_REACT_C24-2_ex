import { validateEmail, validatePass } from "../utils/validations";
import { DataContext } from "../context/DataContext";
import { useContext, useState } from "react";
import { signInFireStore, signUpFireStore } from "../utils/firestore";

const Login = ()=>{

    const {setLoggedIn} = useContext(DataContext);

    const [emailError, setEmailError] = useState(null);
    const [passError, setPassError] = useState(null);

    const validateSignIn = (e)=>{
        e.preventDefault();
        const form = e.target;
        const signInEmail = form.querySelector('#signInEmail').value;
        const signInPass = form.querySelector('#signInPass').value;
        
        !validateEmail(signInEmail) 
                    ? setEmailError(<p>Formato de email incorrecto</p>)
                    : setEmailError(null);

        !validatePass(signInPass) 
                    ? setPassError(<p>La contraseña debe tener al menos una letra, un número y un caracter especial</p>)
                    : setPassError(null);

        if(validateEmail(signInEmail) && validatePass(signInPass)){
            if(signInFireStore(signInEmail, signInPass)){
                setLoggedIn(true);
                sessionStorage.loggedIn = true;
                sessionStorage.user = signInEmail;
            }
        }
    }

    const validateSignUp = (e)=>{
        e.preventDefault();
        const form = e.target;
        const signUpName = form.querySelector('#signUpName').value;
        const signUpLastName = form.querySelector('#signUpLastName').value;
        const signUpEmail = form.querySelector('#signUpEmail').value;
        const signUpPass = form.querySelector('#signUpPass').value;

        if(signUpFireStore(signUpName, signUpLastName, signUpEmail, signUpPass)){
            setLoggedIn(true);
            sessionStorage.loggedIn = true;
            sessionStorage.user = signUpEmail;
        }
    }

    return (
        <section>
            <article>
                <h2>ENTRA CON TU CUENTA</h2>
                <form onSubmit={(e)=>validateSignIn(e)}>
                    <label>
                        <span>Email</span>
                        <input type="email" id="signInEmail"/>
                        {emailError}
                    </label>
                    <label>
                        <span>Contraseña</span>
                        <input type="password" id="signInPass"/>
                        {passError}
                    </label>
                    <input type="submit" value="Entrar"/>
                </form>
            </article>
            <article>
                <h2>... O CREA TU CUENTA AHORA</h2>
                <form onSubmit={validateSignUp}>
                    <label>
                        <span>Nombre</span>
                        <input type="text" id="signUpName"/>
                    </label>
                    <label>
                        <span>Apellido</span>
                        <input type="text" id="signUpLastName"/>
                    </label>
                    <label>
                        <span>Email</span>
                        <input type="text" id="signUpEmail"/>
                    </label>
                    <label>
                        <span>Contraseña</span>
                        <input type="password" id="signUpPass"/>
                    </label>
                    <input type="submit" value="Registrarse"/>
                </form>
            </article>
        </section>
    )
}

export default Login;