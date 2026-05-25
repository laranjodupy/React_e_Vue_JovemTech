import InputField from "./InputField"
import BotaoEnviar from './BotaoEnviar.jsx'
import { useEffect, useState, useRef } from "react" 
import {useRegistros} from './hooks/useRegistros.js'
import { use } from "react"

function FormularioCadastro() {
    const [validacao, setValidacao] = useState({ erro: '', sucesso: false })
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

        if (user.nome.trim() === "") {
            return setValidacao({erro: "Tem q ter nome filho", sucesso: false})
        }

        if (user.telefone.length !== 11) {
            return setValidacao({erro: "Compre um telefone pra colocar o numero", sucesso: false})
        }

        // o setpodeusar e o settimeout são do desafio para fazer com que o botao fique desabilitado apos ser clicado
    setPodeUsar({ pode: false, carregano: 'PeraiMf' })
    setTimeout(() => {
        setPodeUsar({ pode: true, carregano: 'EnvíSamerda' })
        }, 3000) }


    //     try {
    //         const uerriele = editandoi !== null ? 'http://localhost:3000/registros${editandoi}' : 'http://3000/registros'
    //         const method = editandoi !== null ? 'PUT': 'POST'
    //         const resposta = await fetch(uerriele, {
    //             method,
    //             headers: {'Content-Type': 'application/json'},
    //             body: JSON.stingfy(user)
    //         })


    //         const resultado = await resposta.json()
    //         console.log(resposta)
    //         const statusCode = resposta.status; //const que pega o codigo que retorna do servidor e armazena

    //         if (statusCode == 409) {
    //             setValidacao({erro: 'Deu erro de conflito ai' }) //como o statusCode é number, com ele é possivel fazer uma condição em cima do codigo para tratá-lo. Nesse caso, o setValidação é alterado na chave erro
    //         }

    //         if (statusCode == 201) {
    //             setAtualizar(!atualizar)
    //         }

    //         if (statusCode == 200) {
    //             setAtualizar(!atualizar)
    //         }

    //         if (statusCode == 201) {
    //             setAtualizar(!atualizar)
    //         }

    //         if (statusCode == 200) {
    //             setAtualizar(!atualizar)
    //         }

    //         setValidacao({erro: '', sucesso: true})
    //         setUser({nome: '', email: '', telefone: ''})

    //         setEditandoI(null) // essencial para voltar para omodo de criação
    //         buscarCoisasLegais()


    //     } catch (error) {
    //         //desafio 
    //         console.log('Táerradomizera', error) // da um catch no erro
            
            

    //     }
        
    // } 
    // const handleDeletar = async (index) => {
    //     console.log(index)
    //     const confirmou = window.confirm('Deseja remote este registro?') // forma nativa do navegador perguntar algo antes de fazer tlg
    //     if (!confirmou) return

    //     try{
    //         const resposta = await fetch('http//:3000/registros/${index}', {method: 'DELETE'})
    //         if (!resposta.ok) {
    //             const dados = await resposta.json()
    //             setErro(dados.erro)
    //             return
    //         }
    //         buscarCoisasLegais() // atualiza na tela
    //     } catch {
    //         setValidacao('Erro ao remover. Verifique o servidor')
    //     }
    // }

    // const handleEditar = (index) => {
    //     const registro = registros[index]

    //     //preenchendo os campos com os dados existentes
    //     setUser({nome: registro.nome, email: registro.nome, telefone: registro.telefone})
    //     setEditandoI(index)

    //     nomeRef.current.focus()
    // }
    
    /* -- return:
    - a validacao.erro abaixo pega o valor alterado no setValidacao(que altera ao mesmo tempo que o é trocado, mas não é um hook
    
    - observação, no onChange de nome, percebe-se que é possível adicionar varias funções numa arrow function. Nesse caso, o setUser e o setValidação trabalham ao mesmo tempo nessa função.*/
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