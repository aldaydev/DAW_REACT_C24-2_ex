import { validateEmail, validatePass, validateName } from "../../../utils/validations";
import { DataContext } from "../../../context/DataContext";
import { useContext, useState } from "react";
import { signInFireStore, signUpFireStore } from "../../../utils/firestore";

const Login = ()=>{

    const {setLoggedIn} = useContext(DataContext);

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
                sessionStorage.loggedIn = true;
                sessionStorage.user = signUpEmail;
            }
        }
    }

    return (
        <section className="main-sec">
            <article>
                <h2>ENTRA CON TU CUENTA</h2>
                <form onSubmit={(e)=>validateSignIn(e)}>
                    <label>
                        <span>Email</span>
                        <input type="text" id="signInEmail"/>
                        {emailError[0] && emailError[1] === 'signIn' && emailError[2]}
                    </label>
                    <label>
                        <span>Contraseña</span>
                        <input type="password" id="signInPass"/>
                        {passError[0] && passError[1] === 'signIn' && passError[2]}
                    </label>
                    <input type="submit" value="Entrar"/>
                </form>
                {signInError && <p>{signInError}</p>}
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
                    {nameError[0] && nameError[1] === 'signUp' && nameError[2]}
                    <label>
                        <span>Email</span>
                        <input type="text" id="signUpEmail"/>
                        {emailError[0] && emailError[1] === 'signUp' && emailError[2]}
                    </label>
                    <label>
                        <span>Contraseña</span>
                        <input type="password" id="signUpPass"/>
                        {passError[0] && passError[1] === 'signUp' && passError[2]}
                    </label>
                    
                    <label>
                        <p>Acepto haber leído las condiciones</p>
                        <input type="checkbox" required={true}/>
                    </label>
                    <input type="submit" value="Registrarse"/>
                </form>
            </article>
        </section>
    )
}

export default Login;