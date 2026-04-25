-- Criação da tabela Equipes primeiro 
CREATE TABLE equipes (
    id_equipe SERIAL PRIMARY KEY,
    nome_equipe VARCHAR(100) NOT NULL,
    integrantes TEXT,  
    contato VARCHAR(50),
    regiao_atuacao VARCHAR(100)
);

-- Criação da tabela de Pontos de Coleta
CREATE TABLE pontos_coleta (
    id_ponto SERIAL PRIMARY KEY,
    tipo_ponto VARCHAR(50) NOT NULL,    -- Nascente, vereda e córrego
    latitude DECIMAL(10, 8) NOT NULL,   
    longitude DECIMAL(11, 8) NOT NULL,  
    altitude FLOAT,
    data_coleta DATE DEFAULT CURRENT_DATE,
    ph DECIMAL(4, 2),                   
    turbidez DECIMAL(5, 2),
    temperatura DECIMAL(4, 1),
    entorno TEXT,                       
    observacoes TEXT,
    id_equipe INT,                      
    
    -- Um ponto de coleta é monitorado por uma equipe
    CONSTRAINT fk_equipe 
        FOREIGN KEY (id_equipe) 
        REFERENCES equipes(id_equipe) 
        ON DELETE SET NULL
);