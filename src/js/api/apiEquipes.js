import { supabase } from "../supabase.js";

// API para as equipes de monitoramento
const equipesApi = {
  // Busca todas as equipes cadastradas
  async getEquipes() {
    try {
      const { data, error } = await supabase
        .from("equipes")
        .select("*")
        .order("nome_equipe", { ascending: true }); // Traz em ordem alfabética crescente

      if (error) throw error;

      return data || [];
    } catch (error) {
      console.error("Erro técnico:", error.message);
      alert("Erro ao buscar as equipes");
      throw error;
    }
  },

  // Busca uma equipe específica pelo Id
  async getEquipeById(id_equipe) {
    try {
      const { data, error } = await supabase
        .from("equipes")
        .select("*")
        .eq("id_equipe", id_equipe)
        .maybeSingle();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error("Erro técnico:", error.message);
      alert("Erro ao buscar equipe por ID");
      throw error;
    }
  },

  // Cadastra uma nova equipe
  async createEquipe(equipe) {
    try {
      const { data, error } = await supabase
        .from("equipes")
        .insert([equipe])
        .select(); // Retorna o registro inserido

      if (error) {
        console.error("Erro ao salvar no Supabase:", error.message);
        throw error;
      }
      // Pega o item inserido
      return data[0];
    } catch (error) {
      console.error("Detalhe do erro:", error);
      alert("Erro ao criar nova equipe");
      throw error;
    }
  },

  // Edita os dados de uma equipe
  async updateEquipe(equipe) {
    try {
      const { data, error } = await supabase
        .from("equipes")
        .update(equipe)
        .eq("id_equipe", equipe.id_equipe)
        .select(); // Retorna o registro inserido
      // Caso não tenha editado
      if (!data || data.length === 0) {
        throw new Error("Nenhuma equipe encontrada para atualizar.");
      }
      if (error) throw error;

      // Pega o item editado
      return data[0];
    } catch (error) {
      console.error("Detalhe do erro:", error);
      alert("Erro ao editar dados da equipe");
      throw error;
    }
  },

  // Deleta uma equipe
  async deleteEquipe(id_equipe) {
    try {
      const { error } = await supabase
        .from("equipes")
        .delete()
        .eq("id_equipe", id_equipe);

      if (error) {
        throw error;
      }
      return true;
    } catch (error) {
      console.error("Detalhe do erro:", error);
      alert("Erro ao excluir equipe. Verifique se ela possui pontos de coleta vinculados.");
      throw error;
    }
  },
};

export default equipesApi;
