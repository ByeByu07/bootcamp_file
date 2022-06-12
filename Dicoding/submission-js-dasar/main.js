const submitAdd = document.querySelector("#form");
const check = document.querySelector("#checkbox");
const outSemua = document.querySelector(".output-semua");
const outBelum = document.querySelector(".output-belum");
const outSudah = document.querySelector(".output-sudah");
const Search = document.querySelector("#search");

let allBook = [];
// allBook = new Set(...allBook);

document.addEventListener("DOMContentLoaded", function (e) {
  document.dispatchEvent(new Event("render_all"));
  submitAdd.addEventListener("submit", (e) => {
    e.preventDefault();
    addBook();
    hapusInput();
  });
  getLocalData();
});

//check storage
function checkStorage() {
  if (typeof Storage === undefined) {
    alert("Browser Kamu Belum Mendukung Local Storage!!!");
    return false;
  }
  return true;
}

function saveToLocal() {
  if (checkStorage()) {
    const postData = JSON.stringify(allBook);
    const e = localStorage.setItem("todo_data", postData);
  }
}

function getLocalData() {
  if (checkStorage()) {
    const getData = JSON.parse(localStorage.getItem("todo_data"));
    if (getData !== null && allBook.length == 0) {
      for (const inject of getData) {
        allBook.push(inject);
      }
      document.dispatchEvent(new Event("render_all"));
    }
    document.dispatchEvent(new Event("render_all"));
  }
}

const hapusInput = () => {
  document.querySelector("#judul").value = "";
  document.querySelector("#penulis").value = "";
  document.querySelector("#tahun").value = "";
};

check.addEventListener("change", () => {
  if (check.getAttribute("checked")) {
    check.removeAttribute("checked");
  } else {
    check.setAttribute("checked", true);
  }
});

const checkBox = () => {
  if (check.getAttribute("checked")) {
    return true;
  }
  return false;
};

const randomId = () => {
  return +new Date();
};

const addBook = () => {
  let title = document.querySelector("#judul").value;
  let author = document.querySelector("#penulis").value;
  let year = document.querySelector("#tahun").value;
  const Book = {
    id: randomId(),
    title,
    author,
    year,
    isComplete: checkBox(),
  };
  allBook.push(Book);
  document.dispatchEvent(new Event("render_all"));
  console.log(allBook);
  saveToLocal();
};

const BookUi = ({ id, title, author, year, isComplete }) => {
  const container = document.createElement("div");
  container.classList.add("item-book");
  const title2 = document.createElement("input");
  title2.classList.add("input");
  title2.classList.add(id);
  title2.classList.add(`input${id}`);
  title2.value = title;
  const year2 = document.createElement("h5");
  year2.innerText = year;
  const author2 = document.createElement("h4");
  author2.innerText = author;
  container.append(title2, year2, author2);
  if (isComplete) {
    const Undo = document.createElement("button");
    Undo.innerText = "Undo";
    Undo.classList.add("undo");
    Undo.classList.add(id);
    const Delete = document.createElement("button");
    Delete.innerText = "Delete";
    Delete.classList.add("delete");
    Delete.classList.add(id);
    container.append(Undo, Delete);
  } else {
    const Check = document.createElement("button");
    Check.innerText = "Check";
    Check.classList.add("check");
    Check.classList.add(id);
    const Delete = document.createElement("button");
    Delete.innerText = "Delete";
    Delete.classList.add("delete");
    Delete.classList.add(id);
    container.append(Check, Delete);
  }
  return container;
};

document.addEventListener("render_all", () => {
  outBelum.innerHTML = "";
  outSudah.innerHTML = "";
  for (all of allBook) {
    const make = BookUi(all);
    if (all.isComplete) {
      outSudah.append(make);
    } else {
      outBelum.append(make);
    }
  }
});

///search filter based on title
Search.addEventListener("keyup", () => {
  const valueSearch = Search.value;
  outBelum.innerHTML = "";
  outSudah.innerHTML = "";
  for (all of allBook) {
    const make = BookUi(all);
    if (all.title.search(valueSearch) != -1) {
      if (all.isComplete) {
        outSudah.append(make);
      } else {
        outBelum.append(make);
      }
    }
  }
  if (valueSearch === null) {
    document.dispatchEvent(new Event("render_all"));
  }
});

window.onclick = (e) => {
  let a;
  const class1 = e.target.classList[0];
  const id = e.target.classList[1];
  console.log({ class1, id });
  if (class1 == "check") {
    const find = allBook.find((book) => {
      return book.id == id;
    });
    find.isComplete = true;
    document.dispatchEvent(new Event("render_all"));
    saveToLocal();
  }
  if (class1 == "delete") {
    alert("Yakin mau dihapus ??");
    const index = allBook.forEach((book, i) => {
      if (book.id == id) {
        return i;
      }
    });
    allBook.splice(index, 1);
    document.dispatchEvent(new Event("render_all"));
    saveToLocal();
  }
  if (class1 == "undo") {
    const find = allBook.find((book) => {
      return book.id == id;
    });
    find.isComplete = false;
    document.dispatchEvent(new Event("render_all"));
    saveToLocal();
  }
  if (class1 == "input") {
    const find = allBook.find((book) => {
      return book.id == id;
    });
    const inputNya = document.querySelector(`.input${id}`);
    inputNya.addEventListener("change", () => {
      let chgValue = document.querySelector(`.input${id}`).value;
      find.title = chgValue;
      a = 1;
      saveToLocal();
    });
  }
  if (a == 1) {
    document.dispatchEvent(new Event("render_all"));
  }
};
