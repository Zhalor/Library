const myLibrary = [];

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

Book.prototype.addBooktoLibrary = function(book) {
  myLibrary.push(book);
}

const deleteBookBtn = document.getElementById('delete-button-btn');


const createCard = function() {
  const cardDiv = document.createElement('div');
  const titleParagraph = document.createElement('p');
  const authorParagraph = document.createElement('p');
  const pagesParagraph = document.createElement('p');
  const readBtn = document.createElement('button');
  const deleteBtn = document.createElement('button');

  cardDiv.className = "card";
  cardDiv.setAttribute('data', myLibrary.length - 1);

  const cardContainer = document.getElementById('card-container');

  cardContainer.append(cardDiv);
  cardDiv.append(titleParagraph);
  cardDiv.append(authorParagraph);
  cardDiv.append(pagesParagraph);
  cardDiv.append(readBtn);
  cardDiv.append(deleteBtn);

  titleParagraph.innerText = myLibrary[0].title;
  authorParagraph.innerText = myLibrary[0].author;
  pagesParagraph.innerText = myLibrary[0].pages;
  readBtn.innerText = "Read"
  deleteBtn.innerText = "Delete";
  deleteBtn.setAttribute('id', 'delete-button-btn')
}

addBook = function () {
  const popUpForm = document.querySelector(".form-container");
  const title = document.getElementById("title")
  const author = document.getElementById("author")
  const pages = document.getElementById("pages")
  const read = document.getElementById("read")
  const newBook = new Book(title.value, author.value, pages.value, read.checked);
  newBook.addBooktoLibrary(newBook);
  createCard();
  popUpForm.style.visibility = "hidden";
  title.value = "";
  author.value = "";
  pages.value = "";
  read.checked = false;
}

const addBookBtn = document.querySelector(".add-book");
addBookBtn.addEventListener('click', () => {
  const popUpForm = document.querySelector(".form-container");
  popUpForm.style.visibility = "visible";
})

const submitBookBtn = document.querySelector(".submit-book");
submitBookBtn.addEventListener('click', addBook);