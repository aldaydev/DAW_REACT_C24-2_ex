function validateEmail(email) {
    // Expresión regular para validar un email
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

function validatePass(pass) {
    // Expresión regular para validar la contraseña
    const regex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!-_%*?&])[A-Za-z\d@$!-_%*?&]+$/;
    return regex.test(pass);
}

export {validateEmail, validatePass}