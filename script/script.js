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
    <td>
      <a class="toggle-read" href="#">${this.readBool ? "Yes" : "No"}</a>
    </td>
    <td>
      <button class="delete-btn">Delete</button>
    </td>`
};

addBookToLibrary(new Book("Twilight","Somebody","300", true));

renderLibrary();

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
      row.setAttribute("data-id", book.id)
      renderBook(book.generateTemplate(), row)
      book.rendered = true

      // Add eventlistener for delete button
      row.querySelector("td .delete-btn").addEventListener("click", function() {
        deleteBook(this)
      })

      // Add event listener for read status toggle
      row.querySelector("td .toggle-read").addEventListener("click", function() {
        toggleRead(this)
      })
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


// Delete a book
function deleteBook(deleteBtn) {
  // Get bookID from DOM node
  let currRow = deleteBtn.parentNode.parentNode;
  let bookID = currRow.dataset.id;

  // Find and remove book from list
  let book = myLibrary.find(book => book.id == bookID);
  for (let i = 0; i < myLibrary.length; i++) {
    if (myLibrary[i].id == book.id) {
      myLibrary.splice(i, 1);
    }
  };

  // Find and remove row from table
  libraryTable.tBodies[0].removeChild(currRow);
};

// Toggle read status
function toggleRead(toggle){
  let currRow = toggle.parentNode.parentNode;
  let bookID = currRow.dataset.id;
  let book = myLibrary.find(book => book.id == bookID);
  book.readBool = !book.readBool;

  if (book.readBool) {
    toggle.innerHTML = "Yes"
  } else {
    toggle.innerHTML = "No"
  };
};