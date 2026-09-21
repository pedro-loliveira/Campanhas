/* CAMPANHAS DO PERO — JS compartilhado (substitui main.js + navigation.js)
   - monta cabeçalho, menu e rodapé a partir de window.CAMPANHA (definido em <campanha>/campanha.js)
   - preenche [data-campanha="nome|slogan|status"] e [data-secoes]
   - tema claro/escuro, menu mobile e ano atual */
(() => {
    const $ = (seletor) => document.querySelector(seletor);
    const montar = (seletor, html) => { const el = $(seletor); if (el) el.innerHTML = html; };
    const ano = new Date().getFullYear();

    /* tema */
    const aplicarTema = (claro) => document.body.classList.toggle("light-theme", claro);
    aplicarTema(localStorage.getItem("tema") === "claro");

    /* campanha */
    const C = window.CAMPANHA;
    if (C) {
        // [rótulo, caminho, descrição]. Caminho terminado em "/" = pasta (abre o index.html dela).
        // Só itens com descrição viram card no "Explorar campanha".
        const MENU_PADRAO = [
            ["Início", "index.html"],
            ["Campanha", "resumo-da-campanha.html"],
            ["Sessões", "sessoes/", "Registro cronológico das sessões e acontecimentos da campanha."],
            ["Npcs", "Npcs/", "Npcs e figuras importantes."],
            ["Locais", "locais/", "Regiões, cidades, masmorras e outros locais."],
            ["Facções", "faccoes/", "Organizações, grupos, alianças e inimigos."],
            ["Criaturas", "criaturas/", "Criaturas encontradas, catalogadas ou relevantes para a campanha."],
            ["Regras", "regras/", "Regras especiais, sistemas e informações utilizadas na campanha."]
        ];

        const aqui = location.pathname.replace(/\/$/, "/index.html");
        const menu = (C.menu || MENU_PADRAO).map(([nome, caminho, desc]) => {
            const url = new URL(caminho, C.raiz);
            const pasta = caminho.endsWith("/");
            return {
                nome, desc,
                href: pasta ? url.href + "index.html" : url.href,
                // seção fica ativa em qualquer página dentro da pasta dela
                ativo: pasta ? aqui.startsWith(url.pathname) : aqui === url.pathname
            };
        });

        const links = menu.map((l) =>
            `<a href="${l.href}"${l.ativo ? ' class="ativo" aria-current="page"' : ""}>${l.nome}</a>`).join("");

        montar("[data-site-header]", `
            <div class="container header-content">
                <a href="${C.raiz}index.html" class="site-logo">${C.nome}</a>
                <nav class="main-nav" data-menu aria-label="Navegação da campanha">${links}</nav>
                <div class="header-acoes">
                    <button type="button" class="btn btn-pequeno" data-tema-toggle aria-label="Alternar tema">◐</button>
                    <a href="${new URL("../index.html", C.raiz).href}" class="btn btn-pequeno">Campanhas</a> 
                </div>
            </div>`);

        montar("[data-site-footer]", `
            <div class="container">
                <div class="footer-content">
                    <div><h3>${C.nome}</h3><p>${C.slogan || ""}</p></div>
                   
                    <div><h3>Campanhas do Pero</h3><p><a href="${new URL("../index.html", C.raiz).href}">Todas as campanhas</a></p></div>
                </div>
                <div class="footer-bottom"><p>© ${ano} ${C.nome}.</p></div>
            </div>`);

        montar("[data-secoes]", menu.filter((l) => l.desc).map((l) => `
            <a class="card" href="${l.href}">
                <div class="card-corpo">
                    <h3 class="card-titulo">${l.nome}</h3>
                    <p class="card-texto">${l.desc}</p>
                    <span class="card-link">Ver ${l.nome.toLowerCase()}</span>
                </div>
            </a>`).join(""));

        document.querySelectorAll("[data-campanha]").forEach((el) => { el.textContent = C[el.dataset.campanha] ?? ""; });
        document.title = document.title ? `${document.title} · ${C.nome}` : C.nome;
    }

    /* menu mobile */
    const botao = $("[data-menu-toggle]");
    const nav = $("[data-menu]");
    if (botao && nav) {
        const definir = (aberto) => {
            nav.classList.toggle("menu-aberto", aberto);
            botao.setAttribute("aria-expanded", String(aberto));
        };
        botao.addEventListener("click", () => definir(!nav.classList.contains("menu-aberto")));
        nav.addEventListener("click", (e) => { if (e.target.closest("a")) definir(false); });
        document.addEventListener("keydown", (e) => { if (e.key === "Escape") definir(false); });
    }

    /* alternar tema */
    document.querySelectorAll("[data-tema-toggle]").forEach((b) => b.addEventListener("click", () => {
        const claro = !document.body.classList.contains("light-theme");
        aplicarTema(claro);
        localStorage.setItem("tema", claro ? "claro" : "escuro");
    }));

    /* ano atual */
    document.querySelectorAll("[data-ano-atual]").forEach((el) => { el.textContent = ano; });
})();
