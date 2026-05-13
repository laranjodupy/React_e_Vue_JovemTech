import InputField from "./InputField"
import BotaoEnviar from './BotaoEnviar.jsx'
import { useState } from "react"

function FormularioCadastro() {
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [telefone, setTelefone] = useState('');
    const [erro, setErro] = useState('');
    const [sucesso, setSucesso] = useState(false);
    const handleSubmit = (e) => {
        e.preventDefault()

        if (nome.trim('') === '') {
            setErro('O campo nome está vazio. Preencha')
            return 
        }
        if (telefone.trim().length() !== 11) {
            setErro('O campo telefone deve conter 11 dígitos. Preencha corretamente')
            return
        }

        setSucesso(true);
        console.log({ nome, email, telefone })// Ele segura o comportamento padrão do formulário, que é recarregar a página, e permite que a gente faça o que quiser com os dados do formulário. Sem isso, a página recarregaria e perderíamos os dados que o usuário digitou.
    }

    return(
        <form onSubmit={handleSubmit}>
            {erro && <p style={{color: 'red'}}>{erro}</p>}
            {sucesso && <p style={{color: 'green'}}>Cadastrado com Sucesso</p>}
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