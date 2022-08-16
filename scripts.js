const test = new Book("test", "poopypants", "10000", true);
const test2 = new Book("test2", "poopypants", "10000", true);
const test3 = new Book("test3", "poopypants", "10000", true);
const test4 = new Book("test4", "poopypants", "10000", true);

const myLibrary = [test, test2, test3, test4];

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

function addBooktoLibrary(book) {
  myLibrary.push(book);
}

function displayBooks() {
  myLibrary.forEach((book) => {
    console.log(book.title);
  })
}

const addBook = document.querySelector(".add-book");
addBook.addEventListener('click', () => {
  const popUpForm = document.querySelector(".form-container");
  popUpForm.style.visibility = "visible";
})

const submitBook = document.querySelector(".submit-book");
submitBook.addEventListener('click', () => {
  const popUpForm = document.querySelector(".form-container");
  const titleValue = document.getElementById("title").value;
  console.log(titleValue);
  popUpForm.style.visibility = "hidden";
})