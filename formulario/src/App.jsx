import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import Cabecalho from './components/Cabecalho.jsx'
import Rodape from './components/Rodape.jsx'
import InputField from './components/inputField.jsx'
import FormularioCadastro from './components/FormularioCadastro.jsx'

function App() {
  return ( 
    <div> 
      <Cabecalho />
      <h1> Olá, Mundo!</h1>
      <Rodape />
      <FormularioCadastro />

    </div>

   )
}

export default App
