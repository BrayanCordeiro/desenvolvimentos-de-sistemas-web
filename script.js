function logar() {
    try {
        var email = document.getElementById("emailLogin").value;
        var senha = document.getElementById("senhaLogin").value;

        if (email === "" || senha === "") {
            throw "Todos os campos devem ser preenchidos.";
        }

        if (email === "admin@gmail.com" && senha === "admin123") {
            alert("Login realizado com sucesso!");
        } else {
            alert("Email ou Senha incorretos.");
        }

    } catch (e) {
        alert(e);
    }
};

const form = document.getElementById("formCad");
const campos = document.querySelectorAll(".required");
const spans = document.querySelectorAll(".span-required");
const telefoneRegex = /^\(\d{2}\) \d{5}-\d{4}$/;
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
var telefone = document.getElementById("telefone");


form.addEventListener("submit", function(event) {
    event.preventDefault();
    validarNome();
    validarEmail();
    validarTelefone();
    validarSenhaPrincipal();
    compararSenha();

    let nomeValido = validarNome();
    let emailValido = validarEmail();
    let telefoneValido = validarTelefone();
    let senhaValida = validarSenhaPrincipal();
    let senhasCorrespondem = compararSenha();

    if (nomeValido && emailValido && telefoneValido && senhaValida && senhasCorrespondem) {
        alert("Cadastro realizado com sucesso!");
        form.reset();
    }
});

function setError(index){
    campos[index].style.border = "2px solid #ff0000";
    spans[index].style.display = "block";
}

function removeError(index){
    campos[index].style.border = "";
    spans[index].style.display = "none";
}

function validarNome(){
    if(campos[0].value.length < 3) {
        setError(0);
        return false;
    }else {
        removeError(0);
        return true;
    }
}

function validarEmail() {
    if(!emailRegex.test(campos[1].value)){
        setError(1);
        return false;
    } else {
        removeError(1);
        return true;
    }
}

telefone.addEventListener("input", function(){
    var limparValor = telefone.value.replace(/\D/g, "").substring(0,11);

    var numerosArray = limparValor.split("");
    var numFormat = "";

    if(numerosArray.length > 0){
        numFormat += `(${numerosArray.slice(0,2).join("")})`;
    } 

    if(numerosArray.length > 2){
        numFormat += ` ${numerosArray.slice(2,7).join("")}`;
    }

    if(numerosArray.length > 7){
        numFormat += `-${numerosArray.slice(7,11).join("")}`;
    }

    telefone.value = numFormat;
});

function validarTelefone(){
    if(!telefoneRegex.test(campos[2].value)){
        setError(2);
        return false;
    } else {
        removeError(2);
        return true;
    }
}

function validarSenhaPrincipal() {
    if(campos[3].value.length < 8){
        setError(3);
        return false;
    } else {
        removeError(3);
        compararSenha();
        return true;
    }
}

function compararSenha() {
    if (campos[3].value === campos[4].value && campos[4].value.length >= 8) {
        removeError(4);
        return true;
    } else {
        setError(4);
        return false;
    }
    
}




