import InputField from "./InputField"
import BotaoEnviar from './BotaoEnviar.jsx'
import { useEffect, useState } from "react"

function FormularioCadastro() {
    const [validacao, setValidacao] = useState({erro: '', sucesso: false})
    const [user, setUser] = useState({nome: '', email: '', telefone: ''})

     const handleSubmit = async(e) => {
        e.preventDefault()

    //     if (user.nome.trim() === '') {
    //         setValidacao((dados) => ({...dados, erro: 'Nome vazio, preencha fdp'}))
    //         console.log()
    //         return 
    //     }
    //     if (user.telefone.trim().length !== 11) {
    //         setValidacao((dados) => ({...dados, erro: 'Seu número não possui 11 caracteres '}))
    //         return
    //     }
    try{
        const resposta = await fetch('http://localhost:3000/registros', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(nome, email, telefone)
        })
        const resultado = await resposta.json()
        console.log(resultado)
    } catch(error) {'Deu erro ai', erro}
     }
     useEffect(() => {
        buscarCoisas()
     }, []
    )
    const buscarCoisas = async () => {
        const resposta = await fetch('http://localhost:3000/registros')
        const dados = await resposta.json()
        setRegistros(dados)
    }
    return(
        <form onSubmit={handleSubmit}>
            {validacao.erro && <p style={{color: 'red'}}>{validacao.erro}</p>}
            {validacao.sucesso && <p style={{color: 'green'}}>Cadastrado com Sucesso</p>}
            <InputField 
                label={"Nome: "} 
                type={"text"} 
                name={"nome"} 
                placeholder={"Digite seu nome"}
                value={user.nome}
                onChange={(e) => setUser((dados) => ({...dados, nome: e.target.value, telefone: user.telefone, email: user.email}))}
                />
            <InputField
                label={"Email: "} 
                type={"email"} 
                name={"email"} 
                placeholder={"email@empresa.com"}
                value={user.email}
                onChange={(e) => setUser((dados) => ({...dados, nome: user.nome, telefone: user.telefone, email: e.target.value}))}
                />
            <InputField 
                label={"Telefone: "} 
                type={"number"} 
                name={"numero"} 
                placeholder={"Digite seu número: "}
                value={user.telefone}
                onChange={(e) => setUser((dados) => ({...dados, nome: user.nome, telefone: e.target.value, email: user.email}))}

                />
            <InputField 
                label={"Nascimento: "} 
                type={"date"} 
                name={"data"}
                />
            <InputField 
                label={"Masculino: "} 
                type={"checkbox"} 
                name={"masculino"}
                />
            <InputField 
                label={"Feminino: "} 
                type={"checkbox"} 
                name={"feminino"}
                />
            <InputField 
                label={"Indeterminado: "} 
                type={"checkbox"} 
                name={"indeterminado"}
                />
            <BotaoEnviar 
                texto={"Cadastrar"}/>
            <div>
            <p>
                Nome do usuário:  {user.nome}
            </p>

        </div>
        </form>
    )   
}

export default FormularioCadastro