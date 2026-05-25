import { useState, useEffect } from "react";

// ponto único de verdade (ssot) - ajuda na atomicidade e na validade do uso das coisas e tals

const BASE_URL = 'http://localhost:3000/registros'

export function useRegistros() {
    const [registros, setRegistros] = useState([])
    const [carregando, setCarregando] = useState(false)
    const [erro, setErro] = useState('')

    //as funções entram aqui abaixo
    const buscar = async () => {
        setCarregando(true)
        try {
            const res = await fetch(BASE_URL)
            const dados =  await res.json()
            setRegistros(dados)
        } catch {
            setErro('erro ao carregar registros.')
        } finally {
            setCarregando(false)
        }

        //o hook que é o encarregado de buscar ao iniciar:
        useEffect(() => {
            buscar()
        }, [])
    }

    const criar = async (dados) => {
        try {
            const res = await fetch(BASE_URL, {
                method: 'POST', 
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(dados)
            })
            if (!res.ok) {
                const err = await res.json()
                throw new Error(err.erro)
            }
            await buscar() // atualiza a lista depois de criar
        } catch (e) {
            setErro(e.message)
            throw e //lança o erro para o componente tratar visualmente
        }
    }

    const atualizar = async (id, dados) => {
        try {
             const res = await fetch('${BASE_URL}/${id}', {
                method: 'PUT',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(dados)
             })
             if (!res.ok) {
                const err = await res.json()
                throw new Error(err.erro)
            }
            await buscar() // atualiza a lista depois de criar
        } catch (e) {
            setErro(e.message)
            throw e //lança o erro para o componente tratar visualmente
        }
    }

    const deletar = async (id) => {
        try {
             const res = await fetch('${BASE_URL}/${id}', {
                method: 'DELETE'
             })
             if (!res.ok) {
                const err = await res.json()
                throw new Error(err.erro)
            }
            await buscar() // atualiza a lista depois de criar
        } catch (e) {
            setErro(e.message)
            throw e //lança o erro para o componente tratar visualmente
        }
    }

    //as funções vão entrar aqui
    return {registros, carregando, erro, buscar, criar, atualizar, deletar}
}