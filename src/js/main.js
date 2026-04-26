import { uiPontosColeta } from "./ui/uiPontosColeta.js";

document.addEventListener("DOMContentLoaded", () => {
  console.log("CIT: Script carregado");
  // -------- Pontos de Coleta --------
  // Caso queira salvar, o ambiente é preparado
  uiPontosColeta.configurarEventos();
  // Mostra os pontos de coleta
  uiPontosColeta.renderizarPontosColeta();
});
