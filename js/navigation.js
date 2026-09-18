
/* =========================================================
   CAMPANHAS DO PERO
   NAVEGAÇÃO GLOBAL
   ========================================================= */


/* =========================================================
   INICIALIZAÇÃO
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    inicializarMenuMobile();
    inicializarLinkAtivo();
    inicializarVoltarTopo();

});


/* =========================================================
   MENU MOBILE
   ========================================================= */

function inicializarMenuMobile() {

    const botoes =
        document.querySelectorAll(
            "[data-menu-toggle]"
        );

    botoes.forEach((botao) => {

        const alvoSeletor =
            botao.getAttribute(
                "data-menu-toggle"
            );

        let menu;

        if (
            alvoSeletor &&
            alvoSeletor !== "true"
        ) {
            menu =
                document.querySelector(
                    alvoSeletor
                );
        }

        if (!menu) {
            menu =
                document.querySelector(
                    "[data-menu]"
                );
        }

        if (!menu) {
            return;
        }

        botao.addEventListener(
            "click",
            () => {

                const aberto =
                    menu.classList.toggle(
                        "menu-aberto"
                    );

                botao.setAttribute(
                    "aria-expanded",
                    String(aberto)
                );

            }
        );

    });

}


/* =========================================================
   FECHAR MENU AO CLICAR EM UM LINK
   ========================================================= */

function fecharMenuAoNavegar() {

    const menus =
        document.querySelectorAll(
            "[data-menu]"
        );

    menus.forEach((menu) => {

        menu.classList.remove(
            "menu-aberto"
        );

    });

    const botoes =
        document.querySelectorAll(
            "[data-menu-toggle]"
        );

    botoes.forEach((botao) => {

        botao.setAttribute(
            "aria-expanded",
            "false"
        );

    });

}


/* =========================================================
   LINKS DO MENU
   ========================================================= */

document.addEventListener(
    "click",
    (evento) => {

        const link =
            evento.target.closest(
                "[data-menu] a"
            );

        if (!link) {
            return;
        }

        fecharMenuAoNavegar();

    }
);


/* =========================================================
   LINK ATIVO
   ========================================================= */

function inicializarLinkAtivo() {

    const paginaAtual =
        obterPaginaAtual();

    const links =
        document.querySelectorAll(
            "nav a[href]"
        );

    links.forEach((link) => {

        const href =
            link.getAttribute("href");

        if (
            !href ||
            href.startsWith("#") ||
            href.startsWith("http") ||
            href.startsWith("mailto:")
        ) {
            return;
        }

        const paginaLink =
            obterPaginaDoLink(href);

        if (
            paginaLink === paginaAtual
        ) {

            link.classList.add("ativo");

            link.setAttribute(
                "aria-current",
                "page"
            );

        }

    });

}


/* =========================================================
   OBTER PÁGINA ATUAL
   ========================================================= */

function obterPaginaAtual() {

    let caminho =
        window.location.pathname;

    caminho =
        caminho.split("/").pop();

    if (
        !caminho ||
        caminho === ""
    ) {
        caminho = "index.html";
    }

    return caminho.toLowerCase();

}


/* =========================================================
   OBTER PÁGINA DE UM LINK
   ========================================================= */

function obterPaginaDoLink(href) {

    let caminho = href;

    /*
     * Remove parâmetros da URL.
     */

    caminho =
        caminho.split("?")[0];

    caminho =
        caminho.split("#")[0];

    /*
     * Remove barras finais.
     */

    caminho =
        caminho.replace(
            /\/+$/,
            ""
        );

    /*
     * Pega somente o nome do arquivo.
     */

    caminho =
        caminho.split("/").pop();

    if (!caminho) {
        caminho = "index.html";
    }

    return caminho.toLowerCase();

}


/* =========================================================
   VOLTAR AO TOPO
   ========================================================= */

function inicializarVoltarTopo() {

    const botoes =
        document.querySelectorAll(
            "[data-voltar-topo]"
        );

    if (!botoes.length) {
        return;
    }

    botoes.forEach((botao) => {

        botao.addEventListener(
            "click",
            (evento) => {

                evento.preventDefault();

                window.scrollTo({
                    top: 0,
                    behavior: "smooth"
                });

            }
        );

    });

}


/* =========================================================
   ESC FECHA MENU / MODAL
   ========================================================= */

document.addEventListener(
    "keydown",
    (evento) => {

        if (evento.key !== "Escape") {
            return;
        }

        fecharMenuAoNavegar();

        const modais =
            document.querySelectorAll(
                ".modal:not(.oculto)"
            );

        modais.forEach((modal) => {

            modal.classList.add("oculto");

        });

        document.body.classList.remove(
            "modal-aberto"
        );

    }
);


/* =========================================================
   EXPORTAÇÃO
   ========================================================= */

window.CampanhasNavigation = {

    fecharMenuAoNavegar,
    obterPaginaAtual,
    obterPaginaDoLink

};

