const urlViaCep = "https://viacep.com.br/ws/[[cep]]/json/";

function limpar() {
    document.getElementsByClassName("inputCEP")[0].value = "";
    document.getElementsByClassName("inputLogradouro")[0].value = "";
    document.getElementsByClassName("inputComplemento")[0].value = "";
    document.getElementsByClassName("inputNumero")[0].value = "";
    document.getElementsByClassName("inputBairro")[0].value = "";
    document.getElementsByClassName("inputLocalidade")[0].value = "";
    document.getElementsByClassName("inputUF")[0].value = "";

    document.getElementsByClassName("inputCEP")[0].focus();
}

function buscaCepXHR(cep){
    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;

    xhr.addEventListener("readystatechange", function() {
    if(this.readyState === 4) {
        console.log(this.responseText);
    }
    });

    xhr.open("GET", urlViaCep.replace("[[cep]]", cep));

    xhr.send();
}

function buscaCepFetch(){
    const requestOptions = {
        method: "GET",
        redirect: "follow"
      };
      
    fetch(urlViaCep.replace("[[cep]]", cep), requestOptions)
    .then((response) => response.text())
    .then((result) => console.log(result))
    .catch((error) => console.error(error));
}