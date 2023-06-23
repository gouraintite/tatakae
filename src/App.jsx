import { useState } from 'react'
import './App.css'
import { HashRouter,  } from "react-router-dom";
import Router from './router/router'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <HashRouter>
        <Router />
      </HashRouter>
    </>
  )
}

export default App
