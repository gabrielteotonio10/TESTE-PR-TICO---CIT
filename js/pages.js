document.addEventListener("DOMContentLoaded", () => {
  console.log("CIT: Script carregado");

  // -------- Troca de páginas --------
  // Links da Navbar
  const linkHome = document.querySelectorAll(".pagina-inicial");
  const linkPontos = document.querySelectorAll(".pagina-pontos");
  const linkEquipes = document.querySelectorAll(".pagina-equipes");
  // Mostragem de coletra e equipe
  const secaoPontos = document.querySelector("#pontos-coleta");
  const secaoEquipes = document.querySelector("#pontos-equipe");
  // Função para esconder tudo
  function esconderTodas() {
    secaoPontos.classList.add("invisivel");
    secaoEquipes.classList.add("invisivel");
  }
  // Ouvintes de Evento
  linkHome.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      secaoPontos.classList.remove("invisivel");
      secaoEquipes.classList.remove("invisivel");
    });
  });
  // Links de Pontos
  linkPontos.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      esconderTodas();
      secaoPontos.classList.remove("invisivel");
    });
  });
  // Links de Equipes
  linkEquipes.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      esconderTodas();
      secaoEquipes.classList.remove("invisivel");
    });
  });

  // -------- Abertura de modais --------
});
