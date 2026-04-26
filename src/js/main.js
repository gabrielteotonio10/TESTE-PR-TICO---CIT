import { uiPontosColeta } from "./ui/uiPontosColeta.js";
import { uiEquipes } from "./ui/uiEquipes.js";

document.addEventListener("DOMContentLoaded", () => {
  console.log("CIT: Script carregado");
  // -------- Pontos de Coleta --------
  // Caso queira salvar, o ambiente é preparado
  uiPontosColeta.configurarEventos();
  // Mostra os pontos de coleta
  uiPontosColeta.renderizarPontosColeta();
  // Configura a pesquisa e ordenação
  uiPontosColeta.configurarControles();

  // -------- Equipes --------
  // Caso queira salvar, o ambiente é preparado
  uiEquipes.configurarEventos();
  // Mostra as equipes cadastradas
  uiEquipes.renderizarEquipes();
  // Configura a pesquisa e ordenação
  uiEquipes.configurarControles();
});
