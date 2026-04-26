import { uiPontosColeta } from "./ui/uiPontosColeta.js";
import { uiEquipes } from "./ui/uiEquipes.js";

document.addEventListener("DOMContentLoaded", () => {
  // -------- Troca de páginas --------
  // Links da Navbar
  const linkHome = document.querySelectorAll(".pagina-inicial");
  const linkPontos = document.querySelectorAll(".pagina-pontos");
  const linkEquipes = document.querySelectorAll(".pagina-equipes");
  // Mostragem de coleta e equipe
  const secaoPontos = document.querySelector("#pontos-coleta");
  const secaoEquipes = document.querySelector("#pontos-equipe");
  // Função para adicionar e remover a classe invisivel
  const mostrar = (elemento) => {
    if (elemento) {
      elemento.classList.remove("invisivel");
    }
  };
  const esconder = (elemento) => {
    if (elemento) {
      elemento.classList.add("invisivel");
    }
  };

  // Ouvintes de Evento
  linkHome.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      mostrar(secaoPontos);
      mostrar(secaoEquipes);
    });
  });
  // Links de Pontos
  linkPontos.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      mostrar(secaoPontos);
      esconder(secaoEquipes);
    });
  });
  // Links de Equipes
  linkEquipes.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      esconder(secaoPontos);
      mostrar(secaoEquipes);
    });
  });

  // -------- Abertura e fechamento de modais --------
  // Botão e modal de adicionar ponto de coleta
  const btnAdicionarColeta = document.querySelector(".btn-adicionar-coleta");
  const modalAdicionarColeta = document.querySelector("#adicionar-coleta");
  // Botão e modal de adicionar equipe
  const btnAdicionarEquipe = document.querySelector(".btn-adicionar-equipe");
  const btnAdicionarEquipePontos = document.querySelector(".btn-adicionar-equipe-pontos");
  const modalAdicionarEquipe = document.querySelector("#adicionar-equipe");
  const botoesFechar = document.querySelectorAll(".btn-fechar");

  // Abre o modal de adicionar ponto de coleta
  if (btnAdicionarColeta) {
    btnAdicionarColeta.addEventListener("click", async (e) => {
      e.preventDefault();
      // Limpa o formulario
      uiPontosColeta.limparFormulario();
      await uiEquipes.atualizarOpcoesEquipe(); // Atualiza as opções de equipe
      mostrar(modalAdicionarColeta);
    });
  }
  // Abre o modal de adicionar equipe
  if (btnAdicionarEquipe) {
    btnAdicionarEquipe.addEventListener("click", (e) => {
      e.preventDefault();
      // Limpa o formulario
      uiEquipes.limparFormulario();
      mostrar(modalAdicionarEquipe);
    });
  }
  // Adicionar equipe detro de adicionar ponto
  if (btnAdicionarEquipePontos) {
    btnAdicionarEquipePontos.addEventListener("click", async (e) => {
      e.preventDefault();
      // Limpa o formulario
      uiEquipes.limparFormulario();
      mostrar(modalAdicionarEquipe);
    });
  }
  // Fecha qualquer modal
  botoesFechar.forEach((btn) => {
    btn.addEventListener("click", () => {
      // Procura o modal pai mais próximo e o esconde
      const modal = btn.closest(".modal");
      esconder(modal);
    });
  });
});