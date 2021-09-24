import React from 'react'

 const Book = ({book, updateShelf, shelfInfo}) => {
  return (
    
    <div className="book">
    <div className="book-top">
      <div className="book-cover"
        style={{
          width: 128,
          height: 188,
          backgroundImage: 
          `url(${book.imageLinks && book.imageLinks.thumbnail || ""})`
        }}></div>
      <div className="book-shelf-changer">
        <select
          value={shelfInfo}
          onChange={(event) => updateShelf(book, event.target.value) }

        >
          <option value="move" disabled>Move to...</option>
          <option value="currentlyReading">Currently Reading</option>
          <option value="wantToRead">Want to Read</option>
          <option value="read">Read</option>
          <option value="none">None</option>
        </select>
      </div>
    </div>
    <div className="book-title">{book.title ? book.title : 'No Title'}</div>
    <div className="book-authors">
      {
       book.authors ? book.authors : 'No Author'
      }
    </div>
  </div>
  )
}

export default Book
