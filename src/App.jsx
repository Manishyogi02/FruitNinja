import { useState } from 'react'
import './App.css'
import { FruitCuttingGame } from './FruitCuttingGame/fruitCuttinggame'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <FruitCuttingGame/>
    </>
  )
}

export default App
