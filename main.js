import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, signOut, GoogleAuthProvider } from "firebase/auth";
import { getFirestore, collection, doc, getDocs, setDoc, deleteDoc, updateDoc } from "firebase/firestore"; 

const firebaseConfig = {
  apiKey: "AIzaSyCLOoXYDY8ALBLTlkOKjkZTbzNyCC3I96g",
  authDomain: "library-df92e.firebaseapp.com",
  projectId: "library-df92e",
  storageBucket: "library-df92e.appspot.com",
  messagingSenderId: "74238405847",
  appId: "1:74238405847:web:ffe4e3f7eedd8111685492"
};

const myLibrary = [];

class Book {
  constructor (title, author, pages, read){
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
  }

  addBookToLibrary(book) {
    myLibrary.push(book);
  }

  deleteBook(card) {
    let bookIndex = myLibrary.indexOf(this);
    deleteBookFromFirebase(myLibrary[bookIndex].title);
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

  toggleRead() {
    let bookIndex = myLibrary.indexOf(this);
    const readBtn = document.querySelector(`button[data-btn-number="${bookIndex}"]`)
    if(this.read) {
      toggleReadFirebase(false, this.title);
      this.read = false;
      readBtn.classList.remove('read');
      readBtn.classList.add('not-read');
      readBtn.innerText = "Not Read"
    } else {
      toggleReadFirebase(true, this.title);
      this.read = true;
      readBtn.classList.add('read');
      readBtn.classList.remove('not-read');
      readBtn.innerText = "Read"
    }
  }
}

const addBookBtn = document.querySelector(".add-book");
const signInBtn = document.querySelector(".sign-in");
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
    addBook([]);
  }
});

closeFormBtn.addEventListener('click', () => {
  const popUpForm = document.querySelector(".form-container");
  const title = document.getElementById("title");
  const author = document.getElementById("author");
  const pages = document.getElementById("pages");
  const read = document.getElementById("read");
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

function addBook(arrFromFirebase) {
  const popUpForm = document.querySelector(".form-container");
  const title = document.getElementById("title");
  const author = document.getElementById("author");
  const pages = document.getElementById("pages");
  const read = document.getElementById("read");
  let newBook = null;
  if(arrFromFirebase.length > 0) {
    newBook = new Book(arrFromFirebase[0], arrFromFirebase[1], arrFromFirebase[2], arrFromFirebase[3]);
  } else {
    newBook = new Book(title.value, author.value, pages.value, read.checked);
  }
  newBook.addBookToLibrary(newBook);
  addBookToFirebase(newBook);
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
    book.deleteBook(cardDiv)
  });
}

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const provider = new GoogleAuthProvider();
const auth = getAuth();

signInBtn.addEventListener('click', async () => {
  if(auth.currentUser) {  
    try {
      await signOut(auth);
      signInBtn.innerText = "Sign In";
    } catch (e) {
      console.log(e);
    }
  } else {
    try {
      await signInWithPopup(auth, provider);
      signInBtn.innerText = `${auth.currentUser.displayName} Sign Out`;
      getBooks();
    } catch (e) {
      console.log(e);
    }
  }
});

async function getBooks() {
  const snapshot = await getDocs(collection(db, auth.currentUser.uid));
  snapshot.docs.forEach((book) => {
    const bookObj = book.data();
    addBook([bookObj.title, bookObj.author, bookObj.pages, bookObj.read]);
  });
}

async function addBookToFirebase(book) {
  if(auth.currentUser) {
    try {
      await setDoc(doc(db, auth.currentUser.uid, book.title), {
        title: book.title,
        author: book.author,
        pages: book.pages,
        read: book.read,
      });
      console.log("Document written");
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }
}

async function deleteBookFromFirebase(title) {
  await deleteDoc(doc(db, auth.currentUser.uid, title));
}

async function toggleReadFirebase(read, title) {
  await updateDoc(doc(db, auth.currentUser.uid, title), {
    read: read,
  })
}