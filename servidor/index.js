const cors = require('cors')
const express = require('express');
const bilola = express(); //é o servidor
bilola.use(cors())
bilola.use(express.json()); //middleware para interpretar o corpo da requisição como json
const primeromausculu = (nome) => {
    return name.toLowerCase().split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1).join(' ')) //essa função vai: deixar o nome em lower -> separar os espaços por "," -> criar um map que tem uma arrow funtion que trata cada palavra separando as primeiras letras com o indice charat -> substitui as ',' por ' ', com o join. #Funcionalidade = fazer validação de duplicatas com letras maiusculas e minusculas
}

//homens peludos

const PORT = 3000;

const registros = []; // funciona como uma database que roda em tempo de execução

//rota get para obter registros
bilola.get('/registros', (req, res) => {
    //Lógica para obter os registros do banco de dados
    res.status(200).json(registros)
});

bilola.get('/   ', (req, res) => {
    const dados = req.body;
    res.status(200).json({
        sucesso: true,
        mensagem: 'ta de boa ai, funfando',
        dados: dados
    })
}) //comando para saber se o servidor esta funfando tranquilo a partir do get (requisição). Se sim, ele vai dar esse post la.

//rota post para criar um novo registro
bilola.post('/registros', (req, res) => {
    const dados = req.body // pega o corpo da requisição
    if (!dados.nome){
       return res.status(400).json({
            erro:"Campo de nome é Obrigatório!"
        })
    }

    //desafio 1 - evitando duplicatas -- desafio 1 - evitando duplicatas -- desafio 1 - evitando duplicatas -- desafio 1 - evitando duplicatas
    const nomedoMermo = registros.find(r=> r.email === dados.email)
    const telefonedoMermo = registros.find(r=> r.telefone === dados.telefone)
    if (nomedoMermo) {
        return res.status(409).json({
            erro: "Nome engual ai"
        }) 
    }
    if (telefonedoMermo) {
        return res.status(409).json({
            erro: 'Já existe essa merda'
        })
    }

   registros.push(dados) //adiciona os dados ao array de registros

    return res.status(201).json( {
        sucesso: true,
        mensagem: "Criou a bosta do registro ai man",
        dados: dados
    })// comando que vê o status de algum numero que indica a resposta do servidor, por exemplo: o 201 significa que houve um post com sucesso, ele se chama 'Created'.

})

bilola.listen(PORT, () => {
    console.log("fodase")
}); // ouve a porta e solta um consolelog se rodar