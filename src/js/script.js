function login(){
    let login = document.getElementsByName("login")[0].value;
    let senha = document.getElementsByName("senha")[0].value;

    if((login == "" || senha == "") || (login == undefined || senha == undefined))
        alert("Não deixe os campos em branco");
    else if(login == "admin" && senha == "123456")
        window.location.href = './paginas/principal.html';
    else
        alert("login ou senha incorretos");
}

function limparLogin()
{
    let login = document.getElementsByName("login").value = "";
    let senha = document.getElementsByName("senha").value = "";
}