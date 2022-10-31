const bookContainer = document.querySelector(".book-container");

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
    renderBooks();
}

// Add book to last index of myLibrary
function addBookToLibrary(book) {
    myLibrary.push(book);
    renderBooks();
}

// Remove book from myLibrary based on its index
function removeBookFromLibrary(index) {
    myLibrary.splice(index, 1);
    renderBooks();
}

// Render myLibrary on screen
function renderBooks() {
    bookContainer.innerHTML = '';
    myLibrary.forEach(displayBook);
}

// Append book HTML to book container
function displayBook(book) {
    bookContainer.appendChild(createBookHTML(book));
}

// Create book HTML
function createBookHTML(book) {
    const bookDiv = document.createElement("div");
    bookDiv.classList.add("book");
    bookDiv.setAttribute("data-index", myLibrary.indexOf(book));

    const titleHeader = document.createElement("h2");
    titleHeader.textContent = book.title;
    titleHeader.classList.add("title");
    bookDiv.appendChild(titleHeader);

    const authorPara = document.createElement("p");
    authorPara.classList.add("author");
    authorPara.textContent = book.author;
    bookDiv.appendChild(authorPara);


    const pagesPara = document.createElement("p");
    pagesPara.classList.add("pages");
    pagesPara.textContent = book.pages;
    bookDiv.appendChild(pagesPara);

    const isReadBtn = document.createElement("button");
    isReadBtn.classList.add("is-read-btn");
    if (book.isRead) {
        isReadBtn.classList.add("read");
        isReadBtn.textContent = "Completed";
    } else {
        isReadBtn.classList.add("not-read");
        isReadBtn.textContent = "Not completed yet"; 
    }
    bookDiv.appendChild(isReadBtn);

    const removeBtn = document.createElement("button");
    removeBtn.classList.add("remove-btn");
    removeBtn.textContent = "Remove book from library";
    bookDiv.appendChild(removeBtn);

    return bookDiv;
}

// Create a book and adding it to myLibrary
const book1 = new Book("Book1", "Book1", 1, false);
addBookToLibrary(book1);

const book2 = new Book("Book2", "Book2", 2, true);
addBookToLibrary(book2);

renderBooks();

// Event delegation for buttons in book
bookContainer.addEventListener("click", (e) => {
    const el = e.target;
    const classes = [...el.classList];

    if (classes.includes("remove-btn")) {
        removeBookFromLibrary(el.parentNode.getAttribute("data-index"));
    } else if (classes.includes("is-read-btn")) {
        let bookIndex = el.parentNode.getAttribute("data-index");
        myLibrary[bookIndex].changeRead();
    }
});