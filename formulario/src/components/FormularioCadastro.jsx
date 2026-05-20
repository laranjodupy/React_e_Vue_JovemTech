import InputField from "./InputField"
import BotaoEnviar from './BotaoEnviar.jsx'
import { useEffect, useState } from "react"

function FormularioCadastro() {
    const [validacao, setValidacao] = useState({ erro: '', sucesso: false })
    const [user, setUser] = useState({ nome: '', email: '', telefone: '' })
    const [coisaslegais, setCoisasLegais] = useState([]) //busca os registros, deixei coisas legais porque são coisas legais


    const buscarCoisasLegais = async () => {
        const resposta = await fetch('http://localhost:3000/registros')
        const dados = await resposta.json()
        setCoisasLegais(dados)
    }
    useEffect(() => { //useEffect serva para uma comunicação in-live
        buscarCoisasLegais() //busca os registros
    }, [])

    useEffect(() => {
        console.log(coisaslegais)
    }, [coisaslegais])

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            const resposta = await fetch('http://localhost:3000/registros', {
                method: 'POST', //método é o que vai fazer, nesse caso é o post
                headers: { 'Content-Type': 'application/json' }, //define ao servidor que esta sendo enviado um json para evitar erros.
                body: JSON.stringify(user) //como o estado já é um json, basta declará-lo.

            })
            const resultado = await resposta.json()
            console.log(resposta)
            const statusCode = resposta.status; 
            if (statusCode == 409) {
                setValidacao({erro: 'Deu erro de conflito ai' })
            }
    
        } catch (error) {
            //desafio 
            console.log('erroadouef', error)
            
            

        }
        
    }
    return (
        <form onSubmit={handleSubmit}>
            {validacao.erro && <p style={{ color: 'red' }}>{validacao.erro}</p>}
            {validacao.sucesso && <p style={{ color: 'green' }}>Cadastrado com Sucesso</p>}
            <InputField
                label={"Nome: "}
                type={"text"}
                name={"nome"}
                placeholder={"Digite seu nome"}
                value={user.nome}
                onChange={(e) => {
                    setUser((dados) => ({ ...dados, nome: e.target.value, telefone: user.telefone, email: user.email }))
                    setValidacao({erro: ''})
                }
            }
            />
            <InputField
                label={"Email: "}
                type={"email"}
                name={"email"}
                placeholder={"email@empresa.com"}
                value={user.email}
                onChange={(e) => setUser((dados) => ({ ...dados, nome: user.nome, telefone: user.telefone, email: e.target.value }))}
            />
            <InputField
                label={"Telefone: "}
                type={"number"}
                name={"numero"}
                placeholder={"Digite seu número: "}
                value={user.telefone}
                onChange={(e) => setUser((dados) => ({ ...dados, nome: user.nome, telefone: e.target.value, email: user.email }))}

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
                texto={"Cadastrar"} />
            <div>
                <p>
                    Nome do usuário:  {user.nome}
                </p>
                {coisaslegais.length > 0 && 
                    (<ul>
                        {coisaslegais.map((item, i) => (
                            <li key={i}>
                                {i}
                                <hr/>
                                {item.nome} - {item.email}
                            </li>
                        ))}
                    </ul>)
                }

            </div>
        </form>
    )
}

export default FormularioCadastro