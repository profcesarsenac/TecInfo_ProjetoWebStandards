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

function buscaCEP(tipo){   
    hideOrShowLoading("show");
    
    let cep = document.getElementsByClassName("inputCEP")[0].value;
    if(tipo == "JSON")
        buscaCepFetch(cep);
    else
    buscaCepXMLHttpRequest(cep);
    
    setTimeout(function() {
        hideOrShowLoading("hide");
    }, 1000);
}

function buscaCepXMLHttpRequest(cep) {
    const url = urlViaCep.replace("[[cep]]", cep);

    const xhr = new XMLHttpRequest();
    xhr.open("GET", url, true); // Configura a solicitação HTTP como assíncrona (true)

    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 || xhr.status === 200) { // Verifica se a solicitação está concluída e Código 200 indica sucesso
            const result = JSON.parse(xhr.responseText); // Converte o JSON da resposta em objeto
            
            document.getElementsByClassName("inputLogradouro")[0].value = result.logradouro || "";
            document.getElementsByClassName("inputComplemento")[0].value = result.complemento || "";
            document.getElementsByClassName("inputBairro")[0].value = result.bairro || "";
            document.getElementsByClassName("inputLocalidade")[0].value = result.localidade || "";
            document.getElementsByClassName("inputUF")[0].value = result.uf || "";

            const inputs = ["inputLogradouro", "inputComplemento", "inputBairro", "inputLocalidade", "inputUF"];
            inputs.forEach((inputClass) => {
                document.getElementsByClassName(inputClass)[0].disabled = true;
            });

            document.getElementsByClassName("inputNumero")[0].focus();
        } else {
            console.error("Erro ao buscar o CEP: Status HTTP", xhr.status);
        }
    };

    xhr.onerror = function () {
        console.error("Erro na solicitação HTTP.");
    };

    xhr.send(); // Envia a solicitação
}


function buscaCepFetch(cep) {
    const requestOptions = {
        method: "GET",
        redirect: "follow"
    };

    let url = urlViaCep.replace("[[cep]]", cep);

    fetch(url, requestOptions)
        .then((response) => {
            if (!response.ok) {
                throw new Error(`Erro: HTTP ${response.status}`);
            }
            return response.json(); // Convertendo resposta para JSON
        })
        .then((result) => {
            document.getElementsByClassName("inputLogradouro")[0].value = result.logradouro || "";
            document.getElementsByClassName("inputComplemento")[0].value = result.complemento || "";
            document.getElementsByClassName("inputBairro")[0].value = result.bairro || "";
            document.getElementsByClassName("inputLocalidade")[0].value = result.localidade || "";
            document.getElementsByClassName("inputUF")[0].value = result.uf || "";

            const inputs = ["inputLogradouro", "inputComplemento", "inputBairro", "inputLocalidade", "inputUF"];
            inputs.forEach((inputClass) => {
                document.getElementsByClassName(inputClass)[0].disabled = true;
            });

            document.getElementsByClassName("inputNumero")[0].focus();
        })
        .catch((error) => console.error("Erro ao buscar CEP:", error));
}

document.getElementsByClassName("inputCEP")[0].addEventListener('change', function() {
    buscaCEP("XHR");
});

function hideOrShowLoading(tipo){
    if(tipo == "hide")
        document.getElementById("loading").style.display = "none";
    else if(tipo == "show")
    document.getElementById("loading").style.display = "block";
}