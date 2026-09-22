// Configuração da campanha. Junto com css/campanha.css, é o que muda de uma campanha para outra.
window.CAMPANHA = {
    nome: "Out of the Abyss",
    abreviacao: "OOTA",
    apelido: "Rage of Demons",
    descricao: "",
    slogan: "Arquivo digital da campanha.",
    status: "Em criação",
    raiz: new URL(".", document.currentScript.src).href   // não mexer: descobre a pasta da campanha sozinho
    // menu: [...]  ← opcional, para mudar as seções (ver MENU_PADRAO em js/main.js)
};
