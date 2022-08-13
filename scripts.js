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

const addBtn = document.getElementById('addBtn');
addBtn.addEventListener('click', () => {
  addBooktoLibrary(test);
  } 
)

const showBtn = document.getElementById('showBtn');
showBtn.addEventListener('click', () => {
  displayBooks();
  } 
)


const test = new Book("test", "poopypants", "10000", true);
const test2 = new Book("test2", "poopypants", "10000", true);
const test3 = new Book("test3", "poopypants", "10000", true);
const test4 = new Book("test4", "poopypants", "10000", true);