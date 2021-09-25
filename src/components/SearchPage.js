import React, { Component } from 'react'
import * as BooksAPI from '../BooksAPI'
import { Link } from 'react-router-dom'
import Book from './Book'

export class SearchPage extends Component {
    state = {
      books: [],
      searchedBook: [],
      error: false,
      query: "",
      shelf: []
    }
  
  componentDidMount() {
    BooksAPI.getAll()
      .then((books) => {
        this.setState({ books: books });
      })
      .catch((err) => {
        console.log(err);
        this.setState({
          error: true
        });
      });
  }

  updateSearchQuery(query) {
    this.setState({ query: query },
      this.onSubmitSearchQuery);
  }

  onSubmitSearchQuery() {
    if (this.state.query) {
      BooksAPI.search(this.state.query.trimStart())
        .then((searchedBook) => {
          if (!searchedBook || searchedBook.error) {
            this.setState({
              searchedBook: [],
              error: true
            });
          } else {
            this.setState({ searchedBook: searchedBook });
          } 
        });
    } else {
      this.setState({searchedBook: []})
    }
   }
   
  updateShelf = (book, shelf) => {
    BooksAPI.update(book, shelf)
      .then(response => {
        book.shelf = shelf;
        this.setState((state) => ({
          books: state.books.filter((b) =>
            b.id !== book.id).concat(book, shelf),
        }));
      });
    if (shelf === "none") {
      this.setState((state) => ({
        book: state.books.filter((b) => b.id !== book.id),
      }));
    } 
  }

  render() {
  
  
    return (
      <div>
        <div className="search-books">
          <div className="search-books-bar">
            <Link to="/">
              <button className="close-search" > Close </button>
            </Link>
            <div className="search-books-input-wrapper">
               
              <input type="text" placeholder="Search by title or author"
                value={this.state.query}
                onChange={(event) => this.updateSearchQuery(event.target.value)}
              />

            </div>
          </div>
          <div className="search-books-results">
            <ol className="books-grid"
            
            >
              {this.state.searchedBook.map((book) => {
                let shelf = "none"
                this.state.books.map((b) => 
                   (book.id === b.id) ?
                  (shelf = b.shelf) :
                    ""  
                );
                 return (
                  <li key={book.id}>
                  <Book
                    book={book}
                    updateShelf={this.updateShelf}
                    shelfInfo={shelf}
                   
                    />
                    </li>
                )
              })}
            </ol>
          </div>
        </div>
      </div>
    )
  }
}
export default SearchPage
