// Importar do node_modules o método createClient do Supabase para criar uma instância do cliente Supabase
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;
// Criar uma instância do cliente Supabase usando a URL e a chave de acesso
export const supabase = createClient(supabaseUrl, supabaseKey);