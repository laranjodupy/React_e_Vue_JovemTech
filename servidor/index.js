import cors from 'cors'
const express = require('express');
const bilola = express(); //é o servidor
bilola.use(cors())
bilola.use(express.json()); //middleware para interpretar o corpo da requisição como json



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
    registros.push(dados)
}) //comando para saber se o servidor esta funfando tranquilo a partir do get (requisição). Se sim, ele vai dar esse post la.

//rota post para criar um novo registro
bilola.post('/registros', (req, res) => {
    const dados = req.body // pega o corpo da requisição
    if (!dados.nome){
        req.status(400).json({
            erro:"Campo de nome é Obrigatório!"
        })
    }
    console.log(` Dados da requisição (o que há no corpo que o front enviou):
        ${dados}`) // mostra os dados da requisição
    registros.push(dados) // simulando salvar dados no banco

    res.status(201).json( {
        sucesso: true,
        mensagem: "Criou a bosta do registro ai man",
        dados: dados
    })// comando que vê o status de algum numero que indica a resposta do servidor, por exemplo: o 201 significa que houve um post com sucesso, ele se chama 'Created'.
})

bilola.listen(PORT, () => {
    console.log("fodase")
}); // ouve a porta e solta um consolelog se rodar