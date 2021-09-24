import React from 'react'
import './App.css'
import { Route } from 'react-router'
import Main from './components/Main'
import SearchPage from './components/SearchPage'
import Nav from './components/Nav'



class BooksApp extends React.Component {
  

  render() {
    return (
      <div className="app">
      <Nav />
        <Route exact path='/' component={Main}></Route>
        <Route exact path='/Search' component={SearchPage}></Route>

        </div>
        
    )
  }
}

export default BooksApp
