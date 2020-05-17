import React, {Component} from 'react'

class CreateComponent extends Component{


render(){
  const {books, onHandleChange} = this.props
  const currBooks = books.filter((book) => (
  book.shelf === "currentlyReading"
  ))
  const wantToReadBooks = books.filter((b) => (
  b.shelf === "wantToRead"
  ))

  const readBooks = books.filter((b) => (
  b.shelf === "read"
  ))
	
return(
  <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                <div className="bookshelf">
  					<h2 className="bookshelf-title">Currently Reading</h2>
          
                  <div className="bookshelf-books">
                    <ol className="books-grid">
  						{currBooks.map((book) => (
						<li key={book.id}> 
  						<div className='book'>
						<div className="book-top">
                            <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.thumbnail})` }}>
                            </div>
                            <div className="book-shelf-changer">
                              <select onChange={(event) => {onHandleChange(event.target.value, book)}} defaultValue="CurrentlyReading">
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

					<div className="bookshelf">
  					<h2 className="bookshelf-title">Want to Read</h2>
          
                  <div className="bookshelf-books">
                    <ol className="books-grid">
  						{wantToReadBooks.map((book) => (
						<li key={book.id}> 
  						<div className='book'>
						<div className="book-top">
                            <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.thumbnail})` }}>
                            </div>
                            <div className="book-shelf-changer">
                              <select onChange={(event) => {onHandleChange(event.target.value, book)}} defaultValue="wantToRead">
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

					<div className="bookshelf">
  					<h2 className="bookshelf-title">Read</h2>
           
                  <div className="bookshelf-books">
                    <ol className="books-grid">
  						{readBooks.map((book) => (
						<li key={book.id}> 
  						<div className='book'> 
						<div className="book-top">
                            <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.thumbnail})` }}>
                            </div>
                            <div className="book-shelf-changer">
                              <select onChange={(event) => {onHandleChange(event.target.value, book)}} defaultValue="read">
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
</div>

</div>
</div>
  
)
}
}

export default CreateComponent