import { supabase } from "../supabase.js";

// API para os pontos de coleta
const pontosColetaApi = {
  // Procura os pontos de coleta registrados
  async getPontosColeta() {
    try {
      // Filtra direto no Supabase
      const { data, error } = await supabase.from("pontos_coleta").select("*");

      if (error) throw error;

      return data || [];
    } catch (error) {
      console.error("Erro técnico:", error.message);
      alert("Erro ao buscar os pontos de coleta");
      throw error;
    }
  },

  // Procura um ponto de coleta pelo Id
  async getPontoColetaById(id_ponto) {
    try {
      const { data, error } = await supabase
        .from("pontos_coleta")
        .select("*")
        .eq("id_ponto", id_ponto)
        .maybeSingle();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error("Erro técnico:", error.message);
      alert("Erro ao buscar ponto de coleta por ID");
      throw error;
    }
  },

  // Salva um ponto de coleta
  async createPontoColeta(pontoColeta) {
    try {
      const { data, error } = await supabase
        .from("pontos_coleta")
        .insert([pontoColeta])
        .select(); // Retorna o registro inserido

      if (error) {
        console.error("Erro ao salvar no Supabase:", error.message);
        throw error;
      }
      // Pega o item inserido
      return data[0];
    } catch (error) {
      console.error("Detalhe do erro:", error);
      alert("Erro ao criar ponto de coleta, verifique os dados e tente novamente");
      throw error;
    }
  },

  // Edita um ponto de coleta
  async updatePontoColeta(pontoColeta) {
    try {
      const { data, error } = await supabase
        .from("pontos_coleta")
        .update(pontoColeta)
        .eq("id_ponto", pontoColeta.id_ponto)
        .select(); // Retorna o registro editado

      // Caso não tenha editado
      if (!data || data.length === 0) {
        throw new Error("Nenhum registro foi encontrado para atualizar.");
      }
      if (error) throw error;
      // Pega o item editado
      return data[0];
    } catch (error) {
      console.error("Detalhe do erro:", error);
      alert("Erro ao editar ponto de coleta, verifique os dados e tente novamente");
      throw error;
    }
  },

  // Deleta um ponto de coleta
  async deletePontoColeta(id_ponto) {
    try {
      const { error } = await supabase
        .from("pontos_coleta")
        .delete()
        .eq("id_ponto", id_ponto);

      if (error) {
        throw error;
      }
      return true;
    } catch (error) {
      console.error("Detalhe do erro:", error);
      alert("Erro ao excluir um ponto de coleta");
      throw error;
    }
  },
};

export default pontosColetaApi;