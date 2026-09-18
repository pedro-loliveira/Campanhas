
/* =========================================================
   CAMPANHAS DO PERO
   SISTEMA DE BUSCA
   ========================================================= */


/* =========================================================
   CONFIGURAÇÃO
   ========================================================= */

const CONFIG_BUSCA = {

    /*
     * Arquivo padrão contendo os dados pesquisáveis.
     */
    arquivoDados:
        "data/campanhas.json",

    /*
     * Quantidade máxima de resultados exibidos.
     */
    limiteResultados: 10,

    /*
     * Quantidade mínima de caracteres para iniciar
     * a pesquisa.
     */
    minimoCaracteres: 2

};


/* =========================================================
   ESTADO DA BUSCA
   ========================================================= */

const estadoBusca = {

    dados: [],
    carregado: false,
    termoAtual: ""

};


/* =========================================================
   INICIALIZAÇÃO
   ========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        inicializarBusca();

    }
);


/* =========================================================
   INICIALIZAR
   ========================================================= */

async function inicializarBusca() {

    const campos =
        document.querySelectorAll(
            "[data-busca]"
        );

    /*
     * Se a página não possuir campo de busca,
     * não precisamos carregar os dados.
     */

    if (!campos.length) {
        return;
    }

    await carregarDadosBusca();

    campos.forEach((campo) => {

        campo.addEventListener(
            "input",
            () => {

                executarBusca(
                    campo.value
                );

            }
        );

        campo.addEventListener(
            "keydown",
            (evento) => {

                if (
                    evento.key === "Escape"
                ) {

                    campo.value = "";

                    executarBusca("");

                    campo.blur();

                }

            }
        );

    });

}


/* =========================================================
   CARREGAR JSON
   ========================================================= */

async function carregarDadosBusca() {

    try {

        const resposta =
            await fetch(
                CONFIG_BUSCA.arquivoDados
            );

        if (!resposta.ok) {

            throw new Error(
                `Erro HTTP ${resposta.status}`
            );

        }

        const dados =
            await resposta.json();

        estadoBusca.dados =
            normalizarDados(dados);

        estadoBusca.carregado =
            true;

    } catch (erro) {

        console.error(
            "Não foi possível carregar os dados da busca:",
            erro
        );

        estadoBusca.dados = [];

        estadoBusca.carregado = false;

    }

}


/* =========================================================
   NORMALIZAR DADOS
   ========================================================= */

function normalizarDados(dados) {

    /*
     * Permite que o JSON tenha os dados diretamente
     * em um array ou dentro de uma propriedade "campanhas".
     */

    if (Array.isArray(dados)) {
        return dados;
    }

    if (
        dados &&
        Array.isArray(dados.campanhas)
    ) {
        return dados.campanhas;
    }

    return [];

}


/* =========================================================
   EXECUTAR BUSCA
   ========================================================= */

function executarBusca(termo) {

    estadoBusca.termoAtual =
        termo.trim();

    const resultados =
        document.querySelector(
            "[data-resultados-busca]"
        );

    if (!resultados) {
        return;
    }

    /*
     * Limpa resultados quando o campo está vazio.
     */

    if (
        estadoBusca.termoAtual.length === 0
    ) {

        limparResultados(resultados);

        return;

    }


    /*
     * Evita buscas muito curtas.
     */

    if (
        estadoBusca.termoAtual.length <
        CONFIG_BUSCA.minimoCaracteres
    ) {

        limparResultados(resultados);

        return;

    }


    const encontrados =
        pesquisarDados(
            estadoBusca.termoAtual
        );

    renderizarResultados(
        encontrados,
        resultados
    );

}


/* =========================================================
   PESQUISAR DADOS
   ========================================================= */

function pesquisarDados(termo) {

    const termoNormalizado =
        normalizarTexto(termo);

    const resultados =
        estadoBusca.dados.filter(
            (item) => {

                const texto =
                    montarTextoPesquisa(item);

                return texto.includes(
                    termoNormalizado
                );

            }
        );

    return resultados.slice(
        0,
        CONFIG_BUSCA.limiteResultados
    );

}


/* =========================================================
   MONTAR TEXTO PESQUISÁVEL
   ========================================================= */

function montarTextoPesquisa(item) {

    if (!item) {
        return "";
    }

    /*
     * Campos mais comuns.
     *
     * Caso uma campanha precise de outros campos,
     * eles podem ser adicionados aqui sem alterar
     * o restante do sistema.
     */

    const campos = [

        item.titulo,
        item.nome,
        item.descricao,
        item.resumo,
        item.tipo,
        item.categoria,
        item.tags

    ];

    return normalizarTexto(
        campos
            .filter(Boolean)
            .join(" ")
    );

}


/* =========================================================
   NORMALIZAR TEXTO
   ========================================================= */

function normalizarTexto(texto) {

    return String(texto)
        .toLowerCase()
        .normalize("NFD")
        .replace(
            /[\u0300-\u036f]/g,
            ""
        );

}


/* =========================================================
   RENDERIZAR RESULTADOS
   ========================================================= */

function renderizarResultados(
    resultados,
    container
) {

    container.innerHTML = "";

    if (!resultados.length) {

        container.innerHTML = `
            <div class="estado-vazio">
                Nenhum resultado encontrado.
            </div>
        `;

        return;

    }


    resultados.forEach((item) => {

        const elemento =
            criarResultado(item);

        container.appendChild(
            elemento
        );

    });

}


/* =========================================================
   CRIAR RESULTADO
   ========================================================= */

function criarResultado(item) {

    const elemento =
        document.createElement("a");

    elemento.className =
        "lista-item";

    elemento.href =
        obterLinkItem(item);

    elemento.innerHTML = `

        <div class="lista-item-info">

            <div class="lista-item-titulo">
                ${escaparHTML(
                    item.titulo ||
                    item.nome ||
                    "Sem título"
                )}
            </div>

            <div class="lista-item-descricao">
                ${escaparHTML(
                    item.descricao ||
                    item.resumo ||
                    ""
                )}
            </div>

        </div>

        ${
            item.tipo
                ? `
                    <span class="badge">
                        ${escaparHTML(item.tipo)}
                    </span>
                `
                : ""
        }

    `;

    return elemento;

}


/* =========================================================
   OBTER LINK DO ITEM
   ========================================================= */

function obterLinkItem(item) {

    if (
        item &&
        typeof item.url === "string"
    ) {
        return item.url;
    }

    if (
        item &&
        typeof item.link === "string"
    ) {
        return item.link;
    }

    return "#";

}


/* =========================================================
   ESCAPAR HTML
   ========================================================= */

function escaparHTML(valor) {

    return String(valor)
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");

}


/* =========================================================
   LIMPAR RESULTADOS
   ========================================================= */

function limparResultados(container) {

    container.innerHTML = "";

}


/* =========================================================
   API PÚBLICA
   ========================================================= */

window.CampanhasSearch = {

    executarBusca,
    pesquisarDados,
    normalizarTexto

};

