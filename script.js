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

/* 
o método abaixo tem como objetivo, impedir que o formulário de cadastro
de novas entidades, sejam enviado no caso de houver campos vazios, para isso
o mesmo armazena previamente em constantes os valores contidos no formulário e ao clicar no botão
com id "submit", checa o conteudo inserido. Assim, caso  alguma das constantes criadas 
não possua valor, o método retorna uma mensagem exigindo o preenchimento do campo vazio.
*/
document.getElementById('projectForm').addEventListener('submit', function(event) {
    const nome = document.querySelector('input[name="nome"]');
    const nomeProjeto = document.querySelector('input[name="nomeProjeto"]');
    const beneficiados = document.querySelector('select[name="beneficiados"]');
    const mensagem = document.querySelector('textarea[name="mensagem"]');

    if (!nome.value || !nomeProjeto.value || !beneficiados.value || !mensagem.value) {
        alert('Preencha todos os campos!');
        event.preventDefault();
    }
});

/*
o método abaixo, exibe uma tela de confirmação antes do usuario final enviar os dados para subimissão.
O mesmo funciona armazenando em constantes os valores previamente inseridos no formulário, e em seguida
insere os mesmos em um popup de confirmação.
Ao clicar no botão enviar, o método altera o campo display do css do popupa para "block", para fechar 
o método altera o mesmo campo para "none" ao clicar no "x" ou fora da tela.
*/
function confirmarSubimissao() {
    const nome = document.querySelector('input[name="nome"]').value;
    const nomeProjeto = document.querySelector('input[name="nomeProjeto"]').value;
    const beneficiados = document.querySelector('select[name="beneficiados"]').value;
    const mensagem = document.querySelector('textarea[name="mensagem"]').value;

    document.getElementById('confirmarNome').textContent = nome;
    document.getElementById('confirmarProjeto').textContent = nomeProjeto;
    document.getElementById('confirmarBeneficiados').textContent = beneficiados;
    document.getElementById('confirmarMensagem').textContent = mensagem;

    const modal = document.getElementById('confirmacao');
    modal.style.display = 'block';

    const closeBtn = document.getElementsByClassName('fechar')[0];
    closeBtn.onclick = function() {
        modal.style.display = 'none';
    }

    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = 'none';
        }
    }

    const confirmBtn = document.getElementById('confirmarEnvio');
    confirmBtn.onclick = function() {
        modal.style.display = 'none';
        document.getElementById('projectForm').submit();
    }
}



