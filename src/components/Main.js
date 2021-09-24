import React from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from '../BooksAPI'
import Wantoread from './Wantoread'
import Currentlyreading from './Currentlyreading'
import Read from './Read'




class Main extends React.Component {
  state = {
    books: [],
    error: false
  }
  componentDidMount() {
    BooksAPI.getAll() 
      .then((books) => {
        this.setState({
          books: books
        });
      })
        .catch((err) => {
          console.log(err);
          this.setState({ error: true });
        });
  }

  updateShelf = (book, shelf) => {
    BooksAPI.update(book, shelf)
      .then(response => { 
    if (book.shelf === "none") {
      this.setState((state) => ({
        book: state.books.filter((b) => b.id !== book.id),
      }));
    } else {
      book.shelf = shelf;
      this.setState((state) => ({
        books: state.books.filter((b) =>
          b.id !== book.id).concat(book, shelf),
      }));
  
    }   
      })
    
  .catch((err) => {
    console.log(err);
    this.setState({ error: true });
  });
 
    
  
  }




  render() {
    return (
      
      <div className="list-books">
      <div className="list-books-content">
        <div>
        <div>

              <Currentlyreading books={this.state.books} updateShelf={this.updateShelf} />
              <Wantoread books={this.state.books} updateShelf={this.updateShelf} />
              <Read books={this.state.books} updateShelf={this.updateShelf} />
</div>
       </div>
      </div>
  <div className="open-search">
    <Link to="/search">
    <button>Add a book</button>
    </Link>
      </div>
    </div>
    )
  }
}


export default Main;



