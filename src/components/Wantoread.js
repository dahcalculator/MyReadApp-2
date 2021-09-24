import React, { Component } from 'react'
import Book from './Book'


class Wantoread extends Component {
  
  render() {
      return (                              
<div className="bookshelf">
                <h2 className="bookshelf-title">Want To Read</h2>
                <div className="bookshelf-books">
              <ol className="books-grid">
              {
                this.props.books
                  .filter((book) => book.shelf === 'wantToRead')
                  .map((book) => (
                    <li  key={book.id}>
                      <Book
                        book={book}
                        updateShelf={this.props.updateShelf}
                        shelfInfo={book.shelf}
                      
                      />
                      </li>
                ))
              }     
                   
                  </ol>
                </div>
              </div>
      )
  }
}
export default Wantoread