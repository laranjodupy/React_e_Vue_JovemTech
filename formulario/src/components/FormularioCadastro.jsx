import InputField from "./InputField"
import BotaoEnviar from './BotaoEnviar.jsx'
import { useEffect, useState, useRef } from "react" 
import {useRegistros} from './hooks/useRegistros.js'
import { use } from "react"

function FormularioCadastro() {
    const [erroFormulario, setErroFormulario] = useState ('') // criando um hook para evitar conflito com o erro do api
    const [sucessoFormulario, setSucessoFormulario] = useState(false)
    const [user, setUser] = useState({ nome: '', email: '', telefone: '' })
    const [coisaslegais, setCoisasLegais] = useState([]) //busca os registros, deixei coisas legais porque são coisas legais
    const [atualizar, setAtualizar] = useState(false)
    const [podeusar, setPodeUsar] = useState({pode: true, carregano: editandoi !== null ? 'Evísamerda' : 'Peraiporra'})
    const [editandoi, setEditandoI] = useState(null)
    const nomeRef = useRef(null)
    const [nome, setNome] = useState('')
    const [email, setEmail] = useState('')

    const {registros, carregando, criar, atualizar, deletar} = useRegistros()
    const handleSubmit = async (e) => {
        e.preventDefault()

        try{
            if (editandoi !== null) {
                await atualizar(editandoi, {nome,email,telefone})
            } else {
                await criar({nome,email,telefone})
            }
            setErroFormulario('') //limpa o erro
        } catch (e){
            setErroFormulario(e.message) //mostra o erro que o hook jogou
            
        }

        if (user.nome.trim() === "") {
            return setErroFormulario('Põe o nome ai carai')
        }

        if (user.telefone.length !== 11) {
            return setErroFormulario('compre um telefone diferente ai')
        }

        // o setpodeusar e o settimeout são do desafio para fazer com que o botao fique desabilitado apos ser clicado
    setPodeUsar({ pode: false, carregano: 'PeraiMf' })
    setTimeout(() => {
        setPodeUsar({ pode: true, carregano: 'EnvíSamerda' })
        }, 3000) }
    
    /* -- return:
    - a validacao.erro abaixo pega o valor alterado no setValidacao(que altera ao mesmo tempo que o é trocado, mas não é um hook
    
    - observação, no onChange de nome, percebe-se que é possível adicionar varias funções numa arrow function. Nesse caso, o setUser e o setValidação trabalham ao mesmo tempo nessa função.*/
    return (
        <form onSubmit={handleSubmit}>
            {erroFormulario && <p style={{ color: 'red' }}>{erroFormulario}</p>}
            {sucessoFormulario && <p style={{ color: 'green' }}>Cadastrado com Sucesso</p>}
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
                qualReferencia={nomeRef}
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
                texto={podeusar.carregano} 
                disabled={!podeusar.pode}
            />     
            {editandoi !== null && (
                <button type='button' onClick={() => {
                    setEditandoI(null) // desliga a edissaum
                    setUser({nome: '', email: '', telefone:''})
                }}>
                    Cancelar edissaum
                </button>
            )}
            <div id= "registros">
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
                                <div style={{border:    '2px solid #F4FF5B',
                                    borderRadius:'4px', padding:'4px',
                                    boxShadow:"0 0 10px #F4FF5B"
                                }} >
                                    <button onClick={() => handleDeletar(i)}>
                                        Deletar
                                    </button>
                                    <button onClick={() => handleEditar(i)}> Editar </button>
                                </div>
                            </li>
                        ))}
                    </ul>)
                }

            </div>
            
        </form>
    )
}

export default FormularioCadastro