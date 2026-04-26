// Importar do node_modules o método createClient do Supabase para criar uma instância do cliente Supabase
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://ctmrngutotvlcxmtupaz.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN0bXJuZ3V0b3R2bGN4bXR1cGF6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzY5NzM2NjMsImV4cCI6MjA5MjU0OTY2M30.m6VulcUr8d7az3zsCamzAaP9Z2Y84STRJELLe8TbBbs";
// Criar uma instância do cliente Supabase usando a URL e a chave de acesso
export const supabase = createClient(supabaseUrl, supabaseKey);