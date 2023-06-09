import { useState } from 'react'
import './App.css'
import Nav from './layouts/nav/nav'
import Home from './modules/home/home'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className='container'>

      <Nav />
      <Home />
      </div>
    </>
  )
}

export default App
