import './App.css'
import { HashRouter } from "react-router-dom";
import Router from './router/router'

function App() {

  return (
    <>
      <HashRouter basename="/">
        <Router />
      </HashRouter>
    </>
  )
}

export default App
