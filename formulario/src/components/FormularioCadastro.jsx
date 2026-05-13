import InputField from "./InputField"
import BotaoEnviar from './BotaoEnviar.jsx'
import { useState } from "react"

function FormularioCadastro() {
    const [nome, setNome] = useState('')
    const [email, setEmail] = useState('')
    const [telefone, setTelefone] = useState('')
    const handleSubmit = (e) => {
        e.preventDefault() // Trava o carregamento da página
    }

    return(
        <form onSubmit={handleSubmit}>
            <InputField 
                label={"Nome: "} 
                type={"text"} 
                name={"nome"} 
                placeholder={"Digite seu nome"}
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                />
            <InputField
                label={"Email: "} 
                type={"email"} 
                name={"email"} 
                placeholder={"email@empresa.com"}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                />
            <InputField 
                label={"Telefone: "} 
                type={"number"} 
                name={"numero"} 
                placeholder={"Digite seu número: "}
                value={telefone}
                onChange={(e) => setTelefone(e.target.value)}
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
                Nome do usuário:  {nome}
            </p>
        </div>
        </form>
    )   
}

export default FormularioCadastro