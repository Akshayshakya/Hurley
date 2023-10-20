
export const EmailValidation=(text)=>{
    var pattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    return pattern.test(text); 
}

export const PasswordValidation=(text)=>{
    var pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;
    return pattern.test(text); 
}

export const PhoneNoValidation=(text)=>{
    var pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;
    return pattern.test(text); 
}

export const FirstValidation=(text)=>{
    var pattern = /[^a-z]/;
    return pattern.test(text); 
}