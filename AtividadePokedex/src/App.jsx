import './App.css'
import Pokedex from './components/Pokedex'
import Header from './components/Header'
import style from 'styled-components'
import { motion } from "framer-motion"


function App(){

  return(
    <>
    <Header />
    <Pokedex />
    </>
  )
}

export default App