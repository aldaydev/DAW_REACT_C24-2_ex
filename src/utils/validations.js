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
    // Expresión regular para validar nombres con acentos, espacios y guiones permitidos
    const regex = /^[A-ZÁÉÍÓÚÑ][a-záéíóúñA-ZÁÉÍÓÚÑ-]{2,}([ ][A-ZÁÉÍÓÚÑ][a-záéíóúñA-ZÁÉÍÓÚÑ-]{2,})*$/;
    return regex.test(nombre);
}

export {validateEmail, validatePass, validateName};