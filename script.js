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
