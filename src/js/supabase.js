// Importar do node_modules o método createClient do Supabase para criar uma instância do cliente Supabase
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://ctmrngutotvlcxmtupaz.supabase.co/rest/v1/";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im55emx1cWZvb3ZzdmJ1ZWR3c3dyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzIzODk4NjEsImV4cCI6MjA4Nzk2NTg2MX0.7fYCfKceDU62D1pYSKpSHijYX7TFzLoa_RTaIr23buU";

// Criar uma instância do cliente Supabase usando a URL e a chave de acesso
export const supabase = createClient(supabaseUrl, supabaseKey);