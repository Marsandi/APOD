import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import './index.css'
import HomeScreen from './screens/HomeScreen'
import Header from './components/Header'

const App = () => {
  return (
    <Router>
      <Header />
      <main className='py-3'>
        <Route path='/' component={HomeScreen} exact />
      </main>
    </Router>
  )
}

export default App
