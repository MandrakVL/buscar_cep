const btnBuscar = document.getElementById("bscCep");
const carregamento = document.getElementById("carregamento")
const result = document.getElementById('result')
const thRespost = document.getElementById('thresposta');
const tdRespost = document.getElementById('tdresposta');
const erroClass = document.querySelector('.err');
const resetarCep = document.getElementById('resetClick');
let contador = 1;

btnBuscar.addEventListener('click', function() {
    const inputCepUser = document.getElementById("cepUser").value;
    requisicao(inputCepUser)
})

resetarCep.addEventListener('click', function() {
    resetar()
})

function resetar() {
    result.classList.add('hide')
}

function limpar() {
    result.classList.add('hide')
    
    document.querySelectorAll('.cepResult').forEach(function (elemento) {
        elemento.remove();
    });
}

function requisicao(cep) {
    fetch(`https://viacep.com.br/ws/${cep}/json/`)
    .then(response => {
        return response.json()
    })
    .then(dados => {
        carregar(dados, 1)
    })
    .catch(err => {
        console.log("Algo deu errado..." + " " + err)
        carregar(err, 2)
    })
}

function carregar(dados, tip) {
    if (dados.erro == true) {
        erro()
    } else if (contador === 1) {
        if (tip === 1) {
            // Ocorreu tudo certo
            if (carregamento.classList.contains('hide')) {
                carregamento.classList.remove('hide')
                setTimeout(() => {
                    carregamento.classList.add('hide')
    
                    contador++;
                    mostrarEnderecoCep(dados)
                }, 2000)
            }

        } else if (tip === 2) {
            erro()
        }
    } else {
        result.classList.add('hide')
        limpar()

        if (tip === 1) {
            // Ocorreu tudo certo
            if (carregamento.classList.contains('hide')) {
                carregamento.classList.remove('hide')
                setTimeout(() => {
                    carregamento.classList.add('hide')

                    contador++;
                    mostrarEnderecoCep(dados)
                }, 2000)
            }

        } else if (tip === 2) {
            erro()
        }
    }
    
}

function erro() {
    erroClass.innerHTML = "Cep não encontrado..."
    erroClass.style.color = "red"
    result.classList.add('hide')
    setTimeout(() => {
        erroClass.innerHTML = "";
    }, 3000)
}

function mostrarEnderecoCep(dados) {
    if (result.classList.contains('hide')) {
        result.classList.remove('hide');

        let thTitleUmLogradouro = document.createElement('th');
        thTitleUmLogradouro.classList.add('cepResult');
        thTitleUmLogradouro.innerText = "Logradouro";
        
        let thTitleDoisBairro = document.createElement('th');
        thTitleDoisBairro.classList.add('cepResult');
        thTitleDoisBairro.innerText = "Bairro";
        
        let thTitleTresLocalidade = document.createElement('th');
        thTitleTresLocalidade.classList.add('cepResult');
        thTitleTresLocalidade.innerText = "Localidade";
        
        let thTitleQuatroCep = document.createElement('th');
        thTitleQuatroCep.classList.add('cepResult');
        thTitleQuatroCep.innerText = "Cep";
        
        // Mostrar endereço do usuário
        
        
        let tdBodyLogradouro = document.createElement('td');
        tdBodyLogradouro.classList.add('cepResult');
        tdBodyLogradouro.innerText = dados.logradouro;
        
        let tdBodyBairro = document.createElement('td');
        tdBodyBairro.classList.add('cepResult');
        tdBodyBairro.innerText = dados.bairro;
        
        let tdBodyLocalidade = document.createElement('td');
        tdBodyLocalidade.classList.add('cepResult');
        tdBodyLocalidade.innerText = dados.localidade;
        
        let tdBodyCep = document.createElement('td');
        tdBodyCep.classList.add('cepResult');
        tdBodyCep.innerText = dados.cep;

        // Adicionar na tag TR

        thRespost.appendChild(thTitleUmLogradouro)
        thRespost.appendChild(thTitleDoisBairro)
        thRespost.appendChild(thTitleTresLocalidade)
        thRespost.appendChild(thTitleQuatroCep)

        tdRespost.appendChild(tdBodyLogradouro)
        tdRespost.appendChild(tdBodyBairro)
        tdRespost.appendChild(tdBodyLocalidade)
        tdRespost.appendChild(tdBodyCep)
    }
}