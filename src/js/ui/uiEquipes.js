import apiEquipes from "../api/apiEquipes.js";

export const uiEquipes = {
  // Variável pra armazenar o id que será editado
  idEquipeSendoEditada: null,

  //-------- Função para renderizar as equipes --------
  async renderizarEquipes() {
    const listaEquipes = document.querySelector(".grid-cards-equipe");
    try {
      const equipes = await apiEquipes.getEquipes();
      listaEquipes.innerHTML = ""; // Limpa a tela antes de desenhar
      // Se não tiver equipes, mostra mensagem
      if (equipes.length == 0) {
        listaEquipes.innerHTML = "<p>Nenhuma equipe registrada ainda.</p>";
        return;
      }
      // Percorre todas as equipes e mostra
      equipes.forEach(uiEquipes.adicionarEquipeNaLista);
    } catch (error) {
      console.error("Erro ao renderizar equipes", error);
    }
  },

  //-------- Função para adicionar um card de equipe --------
  adicionarEquipeNaLista(equipe) {
    const listaEquipes = document.querySelector(".grid-cards-equipe");

    // Cria o card principal
    const card = document.createElement("div");
    card.classList.add("card-equipe");
    card.setAttribute("data-id", equipe.id_equipe);

    // Cria a descrição
    const divDescricao = document.createElement("div");
    divDescricao.classList.add("descricao-grid");
    const h4Nome = document.createElement("h4");
    h4Nome.innerHTML = `<i class="fa-solid fa-group-arrows-rotate"></i> Equipe: ${equipe.nome_equipe}`;
    const h4Regiao = document.createElement("h4");
    h4Regiao.innerHTML = `<i class="fa-solid fa-map-location-dot"></i> Região: ${equipe.regiao_atuacao}`;

    // Cria os botões
    const divAcoes = document.createElement("div");
    divAcoes.classList.add("acoes-card-equipe");

    // Mostrar
    const botaoMostrar = document.createElement("button");
    botaoMostrar.classList.add("btn-acao", "btn-ver-coleta");
    botaoMostrar.innerHTML = '<i class="fa-solid fa-eye"></i>';

    // Se clicar em mostrar abre a visualização
    botaoMostrar.onclick = async () => {
      try {
        const dadosCompletos = await apiEquipes.getEquipeById(equipe.id_equipe);
        uiEquipes.abrirModalVisualizacao(dadosCompletos);
      } catch (error) {
        console.error("Erro ao carregar dados da equipe:", error);
        alert("Erro ao carregar dados da equipe.");
      }
    };

    // Editar
    const botaoEditar = document.createElement("button");
    botaoEditar.classList.add("btn-acao", "btn-editar");
    botaoEditar.innerHTML = '<i class="fa-solid fa-pen-to-square"></i>';

    // Se clicar em editar pergunta se tem certeza e exclui
    botaoEditar.onclick = async () => {
      try {
        const dadosCompletos = await apiEquipes.getEquipeById(equipe.id_equipe);
        uiEquipes.preencherFormulario(dadosCompletos);
      } catch (error) {
        console.error("Erro ao carregar dados para edição:", error);
        alert("Erro ao carregar dados para edição.");
      }
    };

    // Junta tudo
    divDescricao.appendChild(h4Nome);
    divDescricao.appendChild(h4Regiao);

    divAcoes.appendChild(botaoMostrar);
    divAcoes.appendChild(botaoEditar);

    card.appendChild(divDescricao);
    card.appendChild(divAcoes);

    // Adiciona na tela
    listaEquipes.appendChild(card);
  },

  //-------- Função para preencher o formulário de edição --------
  async preencherFormulario(equipe) {
    // Guardo o id para saber qual é
    this.idEquipeSendoEditada = equipe.id_equipe;

    document.querySelector("#input-nome-equipe").value = equipe.nome_equipe;
    document.querySelector("#input-integrantes").value =
      equipe.integrantes || "";
    document.querySelector("#input-contato").value = equipe.contato || "";
    document.querySelector("#input-regiao").value = equipe.regiao_atuacao || "";

    // Muda o texto do botão e título
    document.querySelector("#btn-salvar-equipe").textContent =
      "Salvar Alterações";
    document.querySelector("#adicionar-equipe h3").textContent =
      "Editar Equipe";

    // Abre o modal
    document.querySelector("#adicionar-equipe").classList.remove("invisivel");
  },

  //-------- Mostra todas as informações --------
  abrirModalVisualizacao(equipe) {
    const divDados = document.querySelector("#dados-visualizacao-equipe");
    // Pega todos os dados que tem
    divDados.innerHTML = `
      <p><strong>Nome:</strong> ${equipe.nome_equipe}</p>
      <p><strong>Integrantes:</strong> ${equipe.integrantes ? equipe.integrantes : "Não informados"}</p>
      <p><strong>Contato:</strong> ${equipe.contato ? equipe.contato : "Não informado"}</p>
      <p><strong>Região de Atuação:</strong> ${equipe.regiao_atuacao ? equipe.regiao_atuacao : "Não informada"}</p>
    `;

    // Botão editar dentro
    const btnEditar = document.querySelector("#btn-modal-ver-editar-equipe");
    btnEditar.onclick = () => {
      // Esconde
      document.querySelector("#modal-ver-equipe").classList.add("invisivel");
      // Chama para editar
      this.preencherFormulario(equipe);
    };

    // Botão de excluir
    const btnExcluir = document.querySelector("#btn-modal-ver-excluir-equipe");
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
          await apiEquipes.deleteEquipe(equipe.id_equipe);
          // Esconde a visualização
          document
            .querySelector("#modal-ver-equipe")
            .classList.add("invisivel");
          confirmarExclusao.classList.add("invisivel");
          // Atualiza a tela
          this.renderizarEquipes();
        } catch (error) {
          console.error("Erro ao excluir equipe:", error);
          alert("Erro ao excluir equipe.");
        }
      };
    };

    // Mostra na tela
    document.querySelector("#modal-ver-equipe").classList.remove("invisivel");
  },

  //-------- Função para limpar o formulário total --------
  limparFormulario() {
    this.idEquipeSendoEditada = null;
    const form = document.querySelector(".form-equipe");
    if (form) form.reset();
    document.querySelector("#btn-salvar-equipe").textContent =
      "Cadastrar Equipe";
    document.querySelector("#adicionar-equipe h3").textContent =
      "Cadastrar Nova Equipe";
  },

  //-------- Função para capturar os dados do formulário e transformar em objeto --------
  capturarDadosFormulario() {
    return {
      nome_equipe: document.querySelector("#input-nome-equipe").value,
      integrantes: document.querySelector("#input-integrantes").value || null,
      contato: document.querySelector("#input-contato").value || null,
      regiao_atuacao: document.querySelector("#input-regiao").value || null,
    };
  },

  //-------- Função para configurar os eventos do formulário --------
  configurarEventos() {
    const form = document.querySelector(".form-equipe");
    if (form) {
      form.addEventListener("submit", async (e) => {
        e.preventDefault();
        // Captura os dados
        const dados = this.capturarDadosFormulario();

        try {
          // Se tiver um id edita, senão cria
          if (this.idEquipeSendoEditada) {
            dados.id_equipe = this.idEquipeSendoEditada;
            await apiEquipes.updateEquipe(dados);
            this.mostrarNotificacao("Equipe atualizada com sucesso!");
          } else {
            await apiEquipes.createEquipe(dados);
            this.mostrarNotificacao("Equipe criada com sucesso!");
          }
          // Limpa o formulário e fecha
          this.limparFormulario();
          document
            .querySelector("#adicionar-equipe")
            .classList.add("invisivel");
          this.renderizarEquipes(); // Atualiza a tela com a nova
          this.configurarControles(); // Reconfigura os controles para atualizar a lista de equipes
        } catch (error) {
          console.error("Erro ao salvar", error);
        }
      });
    }
  },

  //-------- Função de pesquisa e ordenação --------
  async configurarControles() {
    const inputPesquisa = document.querySelector(".campo-busca-equipe");
    const selectOrdenacao = document.querySelector(".campo-ordenacao-equipe");
    let equipes = [];
    try {
      equipes = await apiEquipes.getEquipes();
    } catch (error) {
      console.error("Erro ao carregar equipes para a pesquisa", error);
    }
    // Filtra e depois ordena
    const aplicarFiltroEOrdenacao = () => {
      const termo = inputPesquisa.value.toLowerCase().trim();

      // Filtra pela pesquisa
      let resultado = equipes.filter((equipe) => {
        // Verifica o nome
        const nome = equipe.nome_equipe.toLowerCase();
        const nomeMatch = nome.includes(termo);
        // Verifica a região (se tiver)
        let regiaoMatch = false;
        if (equipe.regiao_atuacao) {
          regiaoMatch = equipe.regiao_atuacao.toLowerCase().includes(termo);
        }
        return nomeMatch || regiaoMatch;
      });
      // Ordena com o que está marcado
      const criterio = selectOrdenacao.value;
      // Ordenação
      resultado.sort((a, b) => {
        if (criterio === "nome") {
          return a.nome_equipe.localeCompare(b.nome_equipe);
        } else if (criterio === "regiao") {
          return (a.regiao_atuacao || "").localeCompare(b.regiao_atuacao || "");
        }
        return 0;
      });
      // Mostra na tela
      const gridCards = document.querySelector(".grid-cards-equipe");
      gridCards.innerHTML = ""; // Limpa a tela
      if (resultado.length === 0) {
        gridCards.innerHTML = "<p>Nenhuma equipe encontrada.</p>"; // Caso não encontre nada
      } else {
        resultado.forEach((equipe) => this.adicionarEquipeNaLista(equipe));
      }
    };
    // As funcionalidades, sempre que mudarem, chamam para filtrar e ordenar
    inputPesquisa.oninput = aplicarFiltroEOrdenacao;
    selectOrdenacao.onchange = aplicarFiltroEOrdenacao;
  },

  //-------- Mostrar aviso criar e editar --------
  mostrarNotificacao(mensagem) {
    const aviso = document.querySelector("#aviso-flutuante");
    const texto = document.querySelector("#aviso-texto");
    // Troca o texto
    texto.textContent = mensagem;
    aviso.classList.remove("invisivel");
    // Some em 2 segs
    setTimeout(() => {
      aviso.classList.add("invisivel");
    }, 2000);
  },
};