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

const addBookBtn = document.querySelector(".add-book");
const submitBookBtn = document.querySelector(".submit-book");
const closeFormBtn = document.getElementById('close-popup-form');

const titleInput = document.getElementById('title');
const authorInput = document.getElementById('author');
const pagesInput = document.getElementById('pages');

const titleLabel = document.querySelector('label[for="title"]');
const authorLabel = document.querySelector('label[for="author"]');
const pagesLabel = document.querySelector('label[for="pages"]');

titleInput.addEventListener('keyup', () => {
  if(titleInput.value == "" || titleInput.value == null){
    titleLabel.classList.add('error');
    submitBookBtn.disabled = true;
  } else {
    titleLabel.classList.remove('error');
    submitBookBtn.disabled = false;
  }
})

authorInput.addEventListener('keyup', () => {
  if(authorInput.value == "" || authorInput.value == null){
    authorLabel.classList.add('error');
    submitBookBtn.disabled = true;
  } else {
    authorLabel.classList.remove('error');
    submitBookBtn.disabled = false;
  }
})

pagesInput.addEventListener('keyup', () => {
  if(pagesInput.value == "" || pagesInput.value == null){
    pagesLabel.classList.add('error');
    submitBookBtn.disabled = true;
  } else {
    pagesLabel.classList.remove('error');
    submitBookBtn.disabled = false;
  }
})

addBookBtn.addEventListener('click', () => {
  const popUpForm = document.querySelector(".form-container");
  popUpForm.style.visibility = "visible";
})

closeFormBtn.addEventListener('click', () => {
  const popUpForm = document.querySelector(".form-container");
  const title = document.getElementById("title")
  const author = document.getElementById("author")
  const pages = document.getElementById("pages")
  const read = document.getElementById("read")
  popUpForm.style.visibility = "hidden";
  title.value = "";
  author.value = "";
  pages.value = "";
  read.checked = false;
})

function addBook() {
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

submitBookBtn.addEventListener('click', addBook);

function createCard() {
  const cardDiv = document.createElement('div');
  const titleParagraph = document.createElement('p');
  const authorParagraph = document.createElement('p');
  const pagesParagraph = document.createElement('p');
  const readBtn = document.createElement('button');
  const deleteBtn = document.createElement('button');

  let bookIndex = myLibrary.length - 1;

  cardDiv.className = "card";
  cardDiv.setAttribute('data-index-number', bookIndex);

  const cardContainer = document.getElementById('card-container');

  cardContainer.append(cardDiv);
  cardDiv.append(titleParagraph);
  cardDiv.append(authorParagraph);
  cardDiv.append(pagesParagraph);
  cardDiv.append(readBtn);
  cardDiv.append(deleteBtn);

  titleParagraph.innerText = myLibrary[bookIndex].title;
  authorParagraph.innerText = myLibrary[bookIndex].author;
  pagesParagraph.innerText = myLibrary[bookIndex].pages;
  if (myLibrary[bookIndex].read){
    readBtn.innerText = "Read"
    readBtn.classList.add('read');
  } else {
    readBtn.innerText = "Not Read"
    readBtn.classList.add('not-read');
  }
  readBtn.classList.add("read-book-btn");
  readBtn.addEventListener('click', toggleRead)
  deleteBtn.innerText = "Delete";
  deleteBtn.className = "delete-book-btn";
  deleteBtn.addEventListener('click', deleteBook)
}

function toggleRead() {
  let card = this.parentElement;
  let cardIndex = card.dataset.indexNumber;
  if(myLibrary[cardIndex].read) {
    myLibrary[cardIndex].read = false;
    this.classList.toggle('read');
    this.classList.toggle('not-read');
    this.innerText = "Not Read"
  } else {
    myLibrary[cardIndex].read = true;
    this.classList.toggle('read');
    this.classList.toggle('not-read');
    this.innerText = "Read"
  }
}

function deleteBook() {
  let card = this.parentElement;
  let cardIndex = card.dataset.indexNumber;
  myLibrary.splice(cardIndex, 1);
  card.remove();
  const cards = document.getElementsByClassName('card');
  for(let i = 0; i < cards.length; i++){
    cards[i].setAttribute('data-index-number', i);
  }
}

