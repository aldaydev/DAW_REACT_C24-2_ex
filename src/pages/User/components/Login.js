import { validateEmail, validatePass, validateName } from "../../../utils/validations";
import { DataContext } from "../../../context/DataContext";
import { useContext, useState } from "react";
import { signInFireStore, signUpFireStore } from "../../../utils/firestore";

const Login = ()=>{

    const {setLoggedIn, userId, setUserId} = useContext(DataContext);

    const [emailError, setEmailError] = useState([false, 'type', 'msg']);
    const [passError, setPassError] = useState([false, 'type', 'msg']);
    const [nameError, setNameError] = useState([false, 'type', 'msg']);

    const [signInError, setSignInError] = useState(null);

    //VALIDACIÓN DE SIGN IN (ACCESO)
    const validateSignIn = async (e)=>{
        e.preventDefault();
        const form = e.target;
        const signInEmail = form.querySelector('#signInEmail').value;
        const signInPass = form.querySelector('#signInPass').value;
        
        !validateEmail(signInEmail) 
                ? setEmailError([true, 'signIn', <p key='EmailError'>Formato de email incorrecto</p>])
                : setEmailError([false, null, '']);

        !validatePass(signInPass) 
                    ? setPassError([true, 'signIn', <p key='EmailError'>La contraseña debe tener al menos una letra, un número y un caracter especial</p>])
                    : setPassError([false, null, '']);

        if(validateEmail(signInEmail) && validatePass(signInPass)){
            
            const valueFireStore = await signInFireStore(signInEmail, signInPass);

            if(valueFireStore[0]){
                setLoggedIn(true);
                sessionStorage.loggedIn = true;
                sessionStorage.user = signInEmail;
                setSignInError(valueFireStore[1]);
            }else{
                setSignInError(valueFireStore[1]);
            }
        }
    }

    //VALIDACIÓN DE SIGN UP (REGISTRO)
    const validateSignUp = (e)=>{
        e.preventDefault();
        const form = e.target;
        const signUpName = form.querySelector('#signUpName').value;
        const signUpLastName = form.querySelector('#signUpLastName').value;
        const signUpEmail = form.querySelector('#signUpEmail').value;
        const signUpPass = form.querySelector('#signUpPass').value;

        const valName = validateName(signUpName);
        !valName
            ? setNameError([true, 'signUp', <p key='EmailError'>Nombre y Apellido deben empezar por mayúscula, contener al menos 3 letras y no puede tener caracteres especiales salvo " " y "-"</p>])
            : setNameError([false, null, '']);

        const valLastName = validateName(signUpLastName);
        !valLastName
                ? setNameError([true, 'signUp', <p key='EmailError'>Nombre y Apellido deben empezar por mayúscula, contener al menos 3 letras y no puede tener caracteres especiales salvo " " y "-"</p>])
                : setNameError([false, null, '']);

        const valEmail = validateEmail(signUpEmail) 
        !valEmail
                ? setEmailError([true, 'signUp', <p key='EmailError'>Formato de email incorrecto</p>])
                : setEmailError([false, null, '']);

        const valPass = validatePass(signUpPass) 
        valPass
                ? setPassError([true, 'signUp', <p key='EmailError'>La contraseña debe tener al menos una letra, un número y un caracter especial</p>])
                : setPassError([false, null, '']);


        console.log(valName && valLastName && valEmail && valPass);
        if(valName && valLastName && valEmail && valPass){
            if(signUpFireStore(signUpName, signUpLastName, signUpEmail, signUpPass)){
                setLoggedIn(true);
                setUserId(signUpEmail);
                sessionStorage.loggedIn = true;
                sessionStorage.user = signUpEmail;
            }
        }
    }

    return (
        <section className="main-sec">
            <h1 className="login-header">AREA DE RESGISTRO</h1>
            <div className="login-container">
                <article className="signIn-container">
                    <h2 className="signIn-header">ENTRA CON TU CUENTA</h2>
                    <form onSubmit={(e)=>validateSignIn(e)} className="signIn-form">
                        <label className="login-label">
                            <input type="text" placeholder="Email" id="signInEmail" className="login-labelInput"/>
                            <span className="login-labelText">Email</span>
                            {emailError[0] && emailError[1] === 'signIn' && emailError[2]}
                        </label>
                        <label className="login-label">
                            <input type="password" placeholder="Contraseña" id="signInPass" className="login-labelInput"/>
                            <span className="login-labelText">Contraseña</span>
                            {passError[0] && passError[1] === 'signIn' && passError[2]}
                        </label>
                        <input type="submit" value="Entrar" className="signIn-btn"/>
                    </form>
                    {signInError && <p>{signInError}</p>}
                </article>
                <article className="signUp-container">
                    <h2 className="signUp-header">... O CREA TU CUENTA AHORA</h2>
                    <form onSubmit={validateSignUp} className="signUp-form">
                        <label className="login-label">
                            <input type="text" placeholder="Nombre" id="signUpName" className="login-labelInput"/>
                            <span className="login-labelText">Nombre</span>
                        </label>
                        <label className="login-label">
                            <input type="text" placeholder="Apellido" id="signUpLastName" className="login-labelInput"/>
                            <span className="login-labelText">Apellido</span>
                        </label>
                        {nameError[0] && nameError[1] === 'signUp' && nameError[2]}
                        <label className="login-label">
                            <input type="text" placeholder="Email" id="signUpEmail" className="login-labelInput"/>
                            <span className="login-labelText">Email</span>
                            {emailError[0] && emailError[1] === 'signUp' && emailError[2]}
                        </label>
                        <label className="login-label">
                            <input type="password" placeholder="Contraseña" id="signUpPass" className="login-labelInput"/>
                            <span className="login-labelText">Contraseña</span>
                            {passError[0] && passError[1] === 'signUp' && passError[2]}
                        </label>
                        
                        <label>
                            <p>Acepto haber leído las condiciones</p>
                            <input type="checkbox" required={true}/>
                        </label>
                        <input type="submit" value="Registrarse" className="signIn-btn"/>
                    </form>
                </article>
            </div>
            
        </section>
    )
}

export default Login;