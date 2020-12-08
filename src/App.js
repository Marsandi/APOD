import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import './index.css'
import HomeScreen from './screens/HomeScreen'
import Header from './components/Header'
import Footer from './components/Footer'

const App = () => {
  return (
    <Router>
      <Header />
      <main className='py-3'>
        <Route path='/' component={HomeScreen} exact />
      </main>
      <Footer />
    </Router>
  )
}

export default App
