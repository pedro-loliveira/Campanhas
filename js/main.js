/* =========================================================
   CAMPANHAS DO PERO
   JavaScript global
   ========================================================= */


/* =========================================================
   INICIALIZAÇÃO
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    inicializarMenu();
    inicializarLinksInternos();
    inicializarAnoAtual();

});


/* =========================================================
   MENU MOBILE
   ========================================================= */

function inicializarMenu() {

    const botaoMenu = document.querySelector("[data-menu-toggle]");
    const menu = document.querySelector("[data-menu]");

    if (!botaoMenu || !menu) {
        return;
    }

    botaoMenu.addEventListener("click", () => {

        const aberto =
            menu.classList.toggle("menu-aberto");

        botaoMenu.setAttribute(
            "aria-expanded",
            aberto
        );

    });

}


/* =========================================================
   LINKS INTERNOS
   ========================================================= */

function inicializarLinksInternos() {

    const links = document.querySelectorAll(
        'a[href^="#"]'
    );

    links.forEach((link) => {

        link.addEventListener("click", (evento) => {

            const destinoId =
                link.getAttribute("href");

            if (
                !destinoId ||
                destinoId === "#"
            ) {
                return;
            }

            const destino =
                document.querySelector(destinoId);

            if (!destino) {
                return;
            }

            evento.preventDefault();

            destino.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        });

    });

}


/* =========================================================
   ANO AUTOMÁTICO
   ========================================================= */

function inicializarAnoAtual() {

    const elementos =
        document.querySelectorAll(
            "[data-ano-atual]"
        );

    const ano =
        new Date().getFullYear();

    elementos.forEach((elemento) => {

        elemento.textContent = ano;

    });

}


/* =========================================================
   UTILITÁRIOS
   ========================================================= */


/**
 * Exibe um elemento.
 */
function mostrar(elemento) {

    if (!elemento) {
        return;
    }

    elemento.classList.remove("oculto");

}


/**
 * Oculta um elemento.
 */
function ocultar(elemento) {

    if (!elemento) {
        return;
    }

    elemento.classList.add("oculto");

}


/**
 * Alterna a visibilidade de um elemento.
 */
function alternarVisibilidade(elemento) {

    if (!elemento) {
        return;
    }

    elemento.classList.toggle("oculto");

}


/**
 * Busca um elemento pelo seletor.
 */
function selecionar(seletor) {

    return document.querySelector(seletor);

}


/**
 * Busca vários elementos pelo seletor.
 */
function selecionarTodos(seletor) {

    return document.querySelectorAll(seletor);

}


/* =========================================================
   MODAL GENÉRICO
   ========================================================= */

function abrirModal(id) {

    const modal =
        document.getElementById(id);

    if (!modal) {
        return;
    }

    modal.classList.remove("oculto");

    document.body.classList.add(
        "modal-aberto"
    );

}


function fecharModal(id) {

    const modal =
        document.getElementById(id);

    if (!modal) {
        return;
    }

    modal.classList.add("oculto");

    document.body.classList.remove(
        "modal-aberto"
    );

}


/* =========================================================
   ALERTA GENÉRICO
   ========================================================= */

function mostrarAlerta(
    mensagem,
    tipo = "info"
) {

    const alerta =
        document.createElement("div");

    alerta.className =
        `alerta alerta-${tipo}`;

    alerta.textContent =
        mensagem;

    document.body.appendChild(alerta);

    setTimeout(() => {

        alerta.remove();

    }, 4000);

}


/* =========================================================
   CONFIRMAÇÃO
   ========================================================= */

function confirmarAcao(
    mensagem,
    callback
) {

    const confirmado =
        window.confirm(mensagem);

    if (!confirmado) {
        return;
    }

    if (typeof callback === "function") {
        callback();
    }

}


/* =========================================================
   EXPORTAÇÃO GLOBAL
   ========================================================= */

window.Campanhas = {

    mostrar,
    ocultar,
    alternarVisibilidade,

    selecionar,
    selecionarTodos,

    abrirModal,
    fecharModal,

    mostrarAlerta,
    confirmarAcao

};