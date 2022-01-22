const libraryContainer = document.querySelector(".library-container");
const addButton = document.querySelector("[book-add]");
const deleteButton = document.querySelector(".delete-btn");
let myLibrary = [];

class Book {
  constructor(title, author, pages, isRead) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isRead = isRead;
  }
}

function AddToLibrary(givenTitle, givenAuthor, givenPages, isRead) {
  const newBook = new Book(givenTitle, givenAuthor, givenPages, isRead);
  myLibrary.push(newBook);
  return newBook;
}

function renderLibrary(bookToFind) {
  const book = myLibrary.find((elem) => elem.title === bookToFind.title);
  console.log(book.title, book.pages);
  //make title and append title
  const card = document.createElement("div");
  card.classList.add("card");
  const bookTitle = document.createElement("h3");
  bookTitle.innerText = book.title;
  if (bookTitle.innerText.length > 16) {
    bookTitle.style.fontSize = "18px";
  }
  card.append(bookTitle);
  // make author and append author
  const authorSpan = document.createElement("span");
  const authorTag = document.createElement("p");
  const authorTagText = document.createTextNode(`${book.author}`);
  authorSpan.classList.add("Author");
  authorSpan.textContent = `Author: `;

  authorTag.appendChild(authorSpan);
  authorTag.appendChild(authorTagText);
  //authorTag.textContent = book.author;

  card.appendChild(authorTag);
  // pages and append pages
  const pagesTag = document.createElement("p");
  const pagesSpan = document.createElement("span");
  const pagesTagText = document.createTextNode(`${book.pages}`);

  pagesSpan.classList.add("pages");

  pagesSpan.innerText = "Pages: ";
  pagesTag.append(pagesSpan);
  pagesTag.appendChild(pagesTagText);

  card.append(pagesTag);
  // isRead and append isRead
  const isReadTag = document.createElement("p");
  isReadTag.classList.add("readyet");

  const isReadInput = document.createElement("input");
  if (book.isRead == "on") {
    isReadInput.checked = true;
  }
  //add correct attr to input
  isReadInput.setAttribute("type", "checkbox");
  isReadInput.setAttribute("name", "isRead");
  isReadInput.setAttribute("id", "checkbox");
  ////////////

  isReadTag.innerText = "Mark as Read";
  isReadTag.append(isReadInput);

  card.append(isReadTag);

  // add delete button
  const delButton = document.createElement("button");
  delButton.classList.add("delete-btn", "btn");
  delButton.textContent = "Delete";
  card.append(delButton);
  delButton.addEventListener("click", () => {
    const relatedCard = delButton.parentElement;

    for (let storedBook of myLibrary) {
      if (book == storedBook) {
        let indexOfBook = myLibrary.indexOf(book);
        myLibrary.splice(indexOfBook, 1);
        console.log("succesfully removed book!");
        console.log(myLibrary);
      }
    }
    console.log(relatedCard);
    libraryContainer.removeChild(relatedCard);
  });

  libraryContainer.appendChild(card);
}

const formContainer = document.querySelector(".form-container");
formContainer.style.visibility = "hidden";
const confirmBtn = document.querySelector(".confirm-btn");
const cancelBtn = document.querySelector(".btn-cancel");
addButton.addEventListener("click", () => {
  formContainer.style.visibility = "visible";
});

cancelBtn.addEventListener("click", (e) => {
  e.preventDefault();
  formContainer.style.visibility = "hidden";
});
libraryContainer.addEventListener("click", () => {
  formContainer.style.visibility = "hidden";
});

confirmBtn.addEventListener("click", (e) => {
  e.preventDefault();
  const userTitleInput = document.querySelector("#title");
  const userAuthorInput = document.querySelector("#author");
  const userPagesInput = document.querySelector("#pages");
  const hasReadYet = document.querySelector("#readYet");

  const userTitle = userTitleInput.value;
  const userAuthor = userAuthorInput.value;
  const userPages = userPagesInput.value;
  const userHasReadYet = hasReadYet.value;
  let newBook = AddToLibrary(userTitle, userAuthor, userPages, userHasReadYet);

  renderLibrary(newBook);
  userTitleInput.value = "";
  userAuthorInput.value = "";
  userPagesInput.value = "";
  hasReadYet.checked = false;
  formContainer.style.visibility = "hidden";
  console.log(myLibrary);
});
