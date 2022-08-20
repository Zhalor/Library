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

Book.prototype.deleteBook = function(bookIndex, card) {
  myLibrary.splice(bookIndex, 1);
  card.remove();
  const cards = document.getElementsByClassName('card');
  for(let i = 0; i < cards.length; i++){
    cards[i].setAttribute('data-card-number', i);
  }
  const readBtns = document.getElementsByClassName('read-book-btn');
  for(let i = 0; i < readBtns.length; i++){
    readBtns[i].setAttribute('data-btn-number', i);
  }
}

Book.prototype.toggleRead = function() {
  let bookIndex = myLibrary.indexOf(this);
  const readBtn = document.querySelector(`button[data-btn-number="${bookIndex}"]`)
  if(this.read) {
    this.read = false;
    readBtn.classList.remove('read');
    readBtn.classList.add('not-read');
    readBtn.innerText = "Not Read"
  } else {
    this.read = true;
    readBtn.classList.add('read');
    readBtn.classList.remove('not-read');
    readBtn.innerText = "Read"
  }
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
  if(pagesInput.value == "NaN" || pagesInput.value == null){
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

submitBookBtn.addEventListener('click', () => {
  if(titleInput.value == "") {
    titleLabel.classList.add('error');
    submitBookBtn.disabled = true;
  } else if(authorInput.value == ""){
    authorLabel.classList.add('error');
    submitBookBtn.disabled = true;
  } else if(pagesInput.value == ""){
    pagesLabel.classList.add('error');
    submitBookBtn.disabled = true;
  } else {
    addBook();
  }
});

closeFormBtn.addEventListener('click', () => {
  const popUpForm = document.querySelector(".form-container");
  const title = document.getElementById("title")
  const author = document.getElementById("author")
  const pages = document.getElementById("pages")
  const read = document.getElementById("read")
  popUpForm.style.visibility = "hidden";
  titleLabel.classList.remove('error');
  authorLabel.classList.remove('error');
  pagesLabel.classList.remove('error');
  submitBookBtn.disabled = false;
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
  createCard(newBook);
  popUpForm.style.visibility = "hidden";
  title.value = "";
  author.value = "";
  pages.value = "";
  read.checked = false;
}

function createCard(book) {
  const cardDiv = document.createElement('div');
  const titleParagraph = document.createElement('p');
  const authorParagraph = document.createElement('p');
  const pagesParagraph = document.createElement('p');
  const readBtn = document.createElement('button');
  const deleteBtn = document.createElement('button');

  let bookIndex = myLibrary.length - 1;

  cardDiv.className = "card";
  cardDiv.setAttribute('data-card-number', bookIndex);

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
  readBtn.classList.add('read-book-btn');
  readBtn.setAttribute('data-btn-number', bookIndex);
  readBtn.addEventListener('click', () => {
    book.toggleRead();
  })
  deleteBtn.innerText = "Delete";
  deleteBtn.className = "delete-book-btn";
  deleteBtn.addEventListener('click', () => {
    book.deleteBook(bookIndex, cardDiv)
  });
}