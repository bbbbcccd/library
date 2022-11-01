const bookContainer = document.querySelector(".book-container");
const addBookBtn = document.querySelector("#add-book-btn");
const modal = document.querySelector(".modal");
const form = modal.querySelector("form");
const formBtn = document.querySelector("#form-btn");

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

// Render myLibrary on screen
function renderBooks() {
    bookContainer.innerHTML = '';
    myLibrary.forEach(displayBook);
}

renderBooks();

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

// Display form when add book button is clicked
addBookBtn.addEventListener("click", () => {
    modal.classList.add("active");
    modal.addEventListener("keydown", removeModal);
});

// Allow user to close modal using ESC key
function removeModal(e) {
    if (e.key === "Escape") {
        closeModal();
    }
}

// Close modal and reset form 
function closeModal() {
    form.reset();
    modal.classList.remove("active");
}

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

// On click, check validity of form
// Create new book from form data and add to myLibrary
// Reset the form and modal
formBtn.addEventListener("click", createBookfromForm);

function createBookfromForm(e) {
    e.preventDefault();
    if (!form.checkValidity()) {
        form.reportValidity();
    } else {
        let title = form.elements["title"].value;
        let author = form.elements["author"].value;
        let pages = form.elements["pages"].value;
        let isRead = form.elements["isRead"].checked;

        const newBook = new Book(title, author, pages, isRead);
        addBookToLibrary(newBook);
        
        closeModal();
    }
}