let myLibrary = [];
let booksCreated = 0;
const libraryTable = document.getElementById('library')
const addBookRow = document.getElementById('addBookRow')
const addBookButton = document.getElementById("addBook")
const confirmBtn = document.getElementById("confirmBtn")


// Book prototype
function Book(title, author, pages, readBool) {
  this.id = booksCreated;
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.readBool = readBool;
  this.rendered = false;

  // Always increment to keep the ID of the books unique
  booksCreated += 1;
};

// Generate HTML template for a book
Book.prototype.generateTemplate = function() {
  return `
    <td>${this.title}</td>
    <td>${this.author}</td>
    <td>${this.pages}</td>
    <td>${this.readBool ? "Yes" : "No"}</td>
    <td><button data-id=${this.id}>Delete</button></td>`
};

// Add a book to the library
function addBookToLibrary(book) {
  myLibrary.push(book);
};


// Renders HTML in a defined node
function renderBook(template, node) {
  if (!node) return;
  node.innerHTML = template;
};


// Render the whole library
function renderLibrary() {
  // Create a new row for each book
  myLibrary.forEach(function (book, idx) {
    if (!book.rendered) {
      let row = libraryTable.insertRow(-1)
      renderBook(book.generateTemplate(), row)
      book.rendered = true
    }
  })
};

// Toggle the display of the row that contains the form
function toggleDisplayRow(rowElem) {
  if (rowElem.style.display === "none") {
    rowElem.style.display = "table-row"
  } else {
    rowElem.style.display = "none"
  }
};

// Show the form
addBookButton.addEventListener("click", function() {
    toggleDisplayRow(addBookRow)
  }
);

// Add new data
confirmBtn.addEventListener("click", function() {
  let form = document.querySelector("form")
  let newBook = new Book(form[0].value, form[1].value, form[2].value, form[3].checked)
  addBookToLibrary(newBook)
  toggleDisplayRow(addBookRow)
  form.reset()
  renderLibrary()
});


addBookToLibrary(new Book("Twilight","Somebody","300", true));

renderLibrary();