import apiPontosColeta from "../api/apiPontosColeta.js";

export const uiPontosColeta = {
  // Variável pra armazenar o id que será editado
  idPontoSendoEditado: null,

  // Função para renderizar os pontos de coleta
  async renderizarPontosColeta() {
    const listaPontos = document.querySelector(".grid-cards-coleta");

    try {
      const pontos = await apiPontosColeta.getPontosColeta();
      listaPontos.innerHTML = ""; // Limpa a tela antes de desenhar
      // Se não tiver pontos, mostra mensagem
      if (pontos.length == 0) {
        listaPontos.innerHTML =
          "<p>Nenhum ponto de coleta registrado ainda.</p>";
        return;
      }
      // Percorre todos os pontos e mostra
      pontos.forEach(uiPontosColeta.adicionarPontoNaLista);
    } catch (error) {
      console.error("Erro ao renderizar pontos", error);
    }
  },

  // Função para adicionar um card de ponto de coleta
  adicionarPontoNaLista(ponto) {
    const listaPontos = document.querySelector(".grid-cards-coleta");

    // Cria o card principal
    const card = document.createElement("div");
    card.classList.add("card-coleta");
    card.setAttribute("data-id", ponto.id_ponto);

    // Cria a descrição
    const divDescricao = document.createElement("div");
    divDescricao.classList.add("descricao-grid");
    const h4Tipo = document.createElement("h4");
    h4Tipo.innerHTML = `<i class="fa-solid fa-droplet"></i> Tipo: ${ponto.tipo_ponto}`;
    const h4Local = document.createElement("h4");
    h4Local.innerHTML = `<i class="fa-solid fa-map-location-dot"></i> Lat: ${ponto.latitude} / Long: ${ponto.longitude}`;

    // Cria os botões
    const divAcoes = document.createElement("div");
    divAcoes.classList.add("acoes-card-coleta");

    // Mostar
    const botaoMostrar = document.createElement("button");
    botaoMostrar.classList.add("btn-acao", "btn-ver-coleta");
    botaoMostrar.innerHTML = '<i class="fa-solid fa-eye"></i>';

    // Editar
    const botaoEditar = document.createElement("button");
    botaoEditar.classList.add("btn-acao", "btn-editar");
    botaoEditar.innerHTML = '<i class="fa-solid fa-pen-to-square"></i>';

    // Se clicar em editar pergunta se tem certeza e exclui
    botaoEditar.onclick = async () => {
      try {
        const dadosCompletos = await apiPontosColeta.getPontoColetaById(
          ponto.id_ponto,
        );
        uiPontosColeta.preencherFormulario(dadosCompletos);
      } catch (error) {
        console.error("Erro ao carregar dados para edição:", error);
        alert("Erro ao carregar dados para edição.");
      }
    };

    // Se clicar em mostrar abre a visualização
    botaoMostrar.onclick = async () => {
      try {
        const dadosCompletos = await apiPontosColeta.getPontoColetaById(
          ponto.id_ponto,
        );
        uiPontosColeta.abrirModalVisualizacao(dadosCompletos);
      } catch (error) {
        console.error("Erro ao carregar dados do ponto:", error);
        alert("Erro ao carregar dados do ponto.");
      }
    };

    // Junta tudo
    divDescricao.appendChild(h4Tipo);
    divDescricao.appendChild(h4Local);

    divAcoes.appendChild(botaoMostrar);
    divAcoes.appendChild(botaoEditar);

    card.appendChild(divDescricao);
    card.appendChild(divAcoes);

    // Adiciona na tela
    listaPontos.appendChild(card);
  },

  // Função para preencher o formulário de edição
  async preencherFormulario(ponto) {
    // Guardo o id para saber qual é
    this.idPontoSendoEditado = ponto.id_ponto;

    document.querySelector("#select-tipo").value = ponto.tipo_ponto;
    document.querySelector("#input-lat").value = ponto.latitude;
    document.querySelector("#input-lng").value = ponto.longitude;
    document.querySelector("#input-altitude").value = ponto.altitude || "";
    document.querySelector("#input-data").value = ponto.data_coleta || "";
    document.querySelector("#select-equipe").value = ponto.id_equipe || "";
    document.querySelector("#input-ph").value = ponto.ph || "";
    document.querySelector("#input-turbidez").value = ponto.turbidez || "";
    document.querySelector("#input-temp").value = ponto.temperatura || "";
    document.querySelector("#input-entorno").value = ponto.entorno || "";
    document.querySelector("#input-obs").value = ponto.observacoes || "";

    // Muda o texto do botão e título
    document.querySelector("#btn-salvar-coleta").textContent =
      "Salvar Alterações";
    document.querySelector("#adicionar-coleta h3").textContent =
      "Editar Ponto de Coleta";

    // Abre o modal
    document.querySelector("#adicionar-coleta").classList.remove("invisivel");
  },

  // Função para limpar o formulário total
  limparFormulario() {
    this.idPontoSendoEditado = null;
    const form = document.querySelector(".form-coleta");
    if (form) form.reset();
    document.querySelector("#btn-salvar-coleta").textContent =
      "Cadastrar Ponto";
    document.querySelector("#adicionar-coleta h3").textContent =
      "Cadastrar Novo Ponto de Coleta";
  },

  // Função para capturar os dados do formulário e transformar em objeto
  capturarDadosFormulario() {
    return {
      tipo_ponto: document.querySelector("#select-tipo").value,
      latitude: parseFloat(document.querySelector("#input-lat").value),
      longitude: parseFloat(document.querySelector("#input-lng").value),

      altitude:
        parseFloat(document.querySelector("#input-altitude").value) || null,
      data_coleta: document.querySelector("#input-data").value || null,
      id_equipe:
        parseInt(document.querySelector("#select-equipe").value) || null,
      ph: parseFloat(document.querySelector("#input-ph").value) || null,
      turbidez:
        parseFloat(document.querySelector("#input-turbidez").value) || null,
      temperatura:
        parseFloat(document.querySelector("#input-temp").value) || null,

      entorno: document.querySelector("#input-entorno").value,
      observacoes: document.querySelector("#input-obs").value,
    };
  },

  // Função para configurar os eventos do formulário
  configurarEventos() {
    const form = document.querySelector(".form-coleta");
    if (form) {
      form.addEventListener("submit", async (e) => {
        e.preventDefault();
        // Captura os dados
        const dados = this.capturarDadosFormulario();

        try {
          // Se tiver um id edita, senão cria
          if (this.idPontoSendoEditado) {
            dados.id_ponto = this.idPontoSendoEditado;
            await apiPontosColeta.updatePontoColeta(dados);
            this.mostrarNotificacao("Ponto atualizado com sucesso!");
          } else {
            await apiPontosColeta.createPontoColeta(dados);
            this.mostrarNotificacao("Ponto criado com sucesso!");
          }
          // Limpa o formulário e fecha
          this.limparFormulario();
          document
            .querySelector("#adicionar-coleta")
            .classList.add("invisivel");
          this.renderizarPontosColeta(); // Atualiza a tela com o novo
        } catch (error) {
          console.error("Erro ao salvar", error);
        }
      });
    }
  },
  // Mostrar aviso criar e editar
  mostrarNotificacao(mensagem) {
    const aviso = document.querySelector("#aviso-flutuante");
    const texto = document.querySelector("#aviso-texto");
    // Troca o texdto
    texto.textContent = mensagem;
    aviso.classList.remove("invisivel");
    // Some em 2 segs
    setTimeout(() => {
      aviso.classList.add("invisivel");
    }, 2000);
  },
  // Mostra todas as informações
  abrirModalVisualizacao(ponto) {
    const divDados = document.querySelector("#dados-visualizacao-coleta");
    // Pega todos os dados que tem
    divDados.innerHTML = `
      <p><strong>Tipo:</strong> ${ponto.tipo_ponto}</p>
      <p><strong>Coordenadas:</strong> Lat ${ponto.latitude} / Lng ${ponto.longitude}</p>
      <p><strong>Altitude:</strong> ${ponto.altitude ? ponto.altitude + " m" : "Não informada"}</p>
      <p><strong>Data da Coleta:</strong> ${ponto.data_coleta ? ponto.data_coleta : "Não informada"}</p>
      <p><strong>ID Equipe:</strong> ${ponto.id_equipe ? ponto.id_equipe : "Nenhuma"}</p>
      <p><strong>Qualidade da Água:</strong> pH: ${ponto.ph ? ponto.ph : "--"} | Turbidez: ${ponto.turbidez ? ponto.turbidez : "--"} | Temp: ${ponto.temperatura ? ponto.temperatura + "°C" : "--"}</p>
      <p><strong>Entorno:</strong> ${ponto.entorno ? ponto.entorno : "Sem observações do entorno."}</p>
      <p><strong>Observações Gerais:</strong> ${ponto.observacoes ? ponto.observacoes : "Nenhuma."}</p>
    `;

    // Botão editar dentro
    const btnEditar = document.querySelector("#btn-modal-ver-editar");
    btnEditar.onclick = () => {
      // Esconde
      document.querySelector("#modal-ver-coleta").classList.add("invisivel");
      // Chama para editar
      this.preencherFormulario(ponto);
    };

    // Botão de excluir
    const btnExcluir = document.querySelector("#btn-modal-ver-excluir");
    btnExcluir.onclick = async () => {
      const confirmarExclusao = document.querySelector("#alerta-excluir");
      confirmarExclusao.classList.remove("invisivel");
      const btnConfirmar = document.querySelector("#btn-confirmar-exclusao");
      const btnCancelar = document.querySelector("#btn-cancelar-exclusao");
      // Se cancelar sai
      btnCancelar.onclick = () => {
        // Apenas esconde o modal de confirmação
        confirmarExclusao.classList.add("invisivel");
      };
      // Se confirmar exclui
      btnConfirmar.onclick = async () => {
        try {
          await apiPontosColeta.deletePontoColeta(ponto.id_ponto);
          // Esconde a vizualização
          document
            .querySelector("#modal-ver-coleta")
            .classList.add("invisivel");
          confirmarExclusao.classList.add("invisivel");
          // Atualiza a tela
          this.renderizarPontosColeta();
        } catch (error) {
          console.error("Erro ao excluir ponto:", error);
          alert("Erro ao excluir ponto.");
        }
      };
    };

    // Mostra na tela
    document.querySelector("#modal-ver-coleta").classList.remove("invisivel");
  },
};
