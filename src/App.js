/**
@author: Abhishek Reddy
@date: 17/May/2020
*/

import React from 'react'
import './App.css'
import {Route, Link} from 'react-router-dom'
import CreateComponent from './CreateComponent'
import SearchComponent from './SearchComponent'
import * as BooksAPI from './BooksAPI'

class BooksApp extends React.Component {

  state={
  books: []
  }

componentDidMount(){
  BooksAPI.getAll()
	.then((newBooks) => { 
    this.setState(() => ({
    books: newBooks
    }))
    })
}

updateBooks = (book, bookStatus) => {
  const {books} = this.state 
  const index = books.findIndex((b) => (
  	b.id === book.id
  ))
  books[index].shelf = bookStatus
  this.setState(() => ({
  books
  }))
}

handleChangeFromSearch = (book, shelf) => {
  book.shelf=shelf
  const index = this.state.books.findIndex((b) => (
  	b.id === book.id
  ))
  if(index === -1){
  this.setState((currentState) => ({
  books: currentState.books.concat([book])
  }))
  BooksAPI.update(book, shelf)
  }
}

handleChange = (status, book) => {
	const bookStatus = status
    this.updateBooks(book, bookStatus)
    BooksAPI.update(book, bookStatus)
}

  render() {
    const bStatus = this.state.books.map((b) => (
      {'id': b.id,
       'shelf': b.shelf
      }
    ))
    return (
      <div className="app">
       <Route exact path='/' render={() => (
    	<div className="list-books">
          <CreateComponent
    		books={this.state.books}
			onHandleChange={(shelf, book) => {
            this.handleChange(shelf, book)
            }}
    	  />
            <div className="open-search">
          	  <Link
          	  to='/search'
          	  className="open-search">
          	  Add book
          	  </Link>
            </div>
          </div>
    
    	)} 
       />
		<Route path='/search' render={() => (
        <SearchComponent
			onHandleChangeFromSearch={(book, shelf) => {
            this.handleChangeFromSearch(book, shelf)
            }}
			bStatus={bStatus}
        />
        )}
		/>
      </div>
    )
  }
}

export default BooksApp
