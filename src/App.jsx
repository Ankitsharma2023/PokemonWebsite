import { useState } from 'react'
import Pok from './Pok'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     <Pok/>
    </>
  )
}

export default App
