let cardContainer = document.querySelector(".card-container");
let inputBusca = document.querySelector("header div input");
let botaoBusca = document.querySelector("#botao-busca"); // 1. Seleciona o botão
let dados = [];

function renderizarCards(dadosParaRenderizar) {
    cardContainer.innerHTML = ""; // Limpa os resultados anteriores antes de exibir os novos.
    for (let dado of dadosParaRenderizar) {
        let article = document.createElement("article");
        article.classList.add("card");
        article.innerHTML = `
        <h2>${dado.nome}</h2>
        <p><strong>Ano:</strong> ${dado.ano || 'N/A'}</p>
        <p>${dado.descricao || 'Descrição não disponível.'}</p>
        <a href="${dado.link}"target="_blank">Saiba mais</a>
        `
        cardContainer.appendChild(article);
    }
}

function filtrarDados() {
    const termoBusca = inputBusca.value.toLowerCase();

    // Filtra os dados com base no termo pesquisado no nome ou na descrição.
    const dadosFiltrados = dados.filter(dado => {
        return (dado.nome || '').toLowerCase().includes(termoBusca) ||
               (dado.descricao || '').toLowerCase().includes(termoBusca);
    });

    renderizarCards(dadosFiltrados);
}

async function carregarDadosIniciais() {
    let resposta = await fetch("data.json");
    dados = await resposta.json();
    renderizarCards(dados); // Exibe todos os cards inicialmente
}

// Adiciona um evento para filtrar os dados a cada nova letra digitada no campo de busca.
inputBusca.addEventListener('input', filtrarDados);

// 2. Adiciona um evento de clique ao botão para executar a busca.
botaoBusca.addEventListener('click', filtrarDados);

// Carrega e exibe os dados assim que a página é carregada.
document.addEventListener('DOMContentLoaded', carregarDadosIniciais);