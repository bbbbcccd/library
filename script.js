let myLibrary = [];

// Book constructor and prototype
function Book(title, author, pages, isRead) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isRead = isRead;
}

// Toggle isRead property
Book.prototype.changeRead = function() {
    this.isRead = !this.isRead;
}

// Add book to last index of myLibrary
function addBookToLibrary(book) {
    myLibrary.push(book);
}

// Remove book from myLibrary based on its index
function removeBookFromLibrary(index) {
    myLibrary.splice(index, 1);
}

// Creating a book and adding it to myLibrary
const book1 = new Book("Book1", "Book1", 1, false);
addBookToLibrary(book1);
