import React from 'react'
import {Link} from 'react-router-dom'
import * as BooksAPI from './BooksAPI'

class SearchComponent extends React.Component{
  
  state={
    query: '', 
    books: []
  } 

updateBooks = (query) => {
 const regex = /^[A-Z a-z0-9]+$/i //RegEx to check for valid input
 if(regex.test(query)){
 BooksAPI.search(query, 20)
  .then((books) => {
	this.setState(() => ({
    books 
    }))
 })
 }
}
 
searchBooks = (e) => {
  const q = e.target.value
  this.setState(() => ({
  query: q
  }))
}

getBookStatus = (book, bStatus) => { 
  const index = bStatus.findIndex((b) => (
    b.id === book.id
  ))
  if(index !== -1){
  return bStatus[index].shelf
  }
  
  return 'none'
}
   
render(){ 
  const {onHandleChangeFromSearch, bStatus} = this.props
  const query = this.state.query
  query !== '' && (
  this.updateBooks(this.state.query))
  if(query === '' && this.state.books.length !== 0){this.setState(() => ({books: []}))}
return(

          <div className="search-books">
            <div className="search-books-bar">
       		  <Link
       		  to='/'
       		  className="close-search">
       		  Close
       		  </Link>
              <div className="search-books-input-wrapper">
				{
                  /*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */} 
                <input 
  				type="text" 
  				placeholder="Search by title or author"
  				onChange={this.searchBooks}
  				/>
				
              </div>
            </div>
			
            <div className="search-books-results">
              <ol className="books-grid">
				{this.state.books.map((book) => (
                <li key={book.id}>
                  <div className='book'> 
						<div className="book-top"> 
                            <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.thumbnail})` }}>
                            </div>
                            <div className="book-shelf-changer">
                              <select onChange={(e) => {onHandleChangeFromSearch(book, e.target.value)}} defaultValue={this.getBookStatus(book, bStatus)}>
                                <option value="move" disabled>Move to...</option>
                                <option value="currentlyReading">Currently Reading</option>
                                <option value="wantToRead">Want to Read</option>
                                <option value="read">Read</option>
                                <option value="none">None</option> 
                              </select>
                            </div>
                          </div>
							<p className='book-title'>{book.title}</p>
						</div>
                </li>
                ))}

			  </ol>
            </div>
          </div>

)
}
}

export default SearchComponent