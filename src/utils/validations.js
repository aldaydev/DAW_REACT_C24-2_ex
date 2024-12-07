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

function validateName(nombre) {
    // Expresión regular para validar nombres con espacios y guiones permitidos
    const regex = /^[A-Z][a-zA-Z-]{2,}([ ][A-Z][a-zA-Z-]{2,})*$/;
    return regex.test(nombre);
}

export {validateEmail, validatePass, validateName};