const form = document.querySelector("#todo-form");
const todoInput = document.querySelector("#todo");
const todoList = document.querySelector("#todos");
const firstCardBody = document.querySelectorAll(".card-body")[0];
const secondCardBody = document.querySelectorAll(".card-body")[1];
const filter = document.querySelector("#filter");
const clearButton = document.querySelector("#clear-todos");
const googlesearchform = document.querySelector("#google-search-form");
const bookmarkaddform = document.querySelector("#bookmark-form");
const urlnameInput = document.querySelector("#urlnameInput");
const urlInput = document.querySelector("#urlInput");
const bookmarkList = document.querySelector("#bookmarksList");
const noteForm = document.querySelector("#noteForm");
const noteList = document.querySelector("#noteList");

eventListeners();

function eventListeners() { // Tüm event listenerlar
    form.addEventListener("submit", addTodo);
    document.addEventListener("DOMContentLoaded", function () {
        loadAllBookmarksToUI();
        loadAllTodosToUI();
        loadAllNotesToUI();
    });
    document.addEventListener("DOMContentLoaded", function () {
        document.getElementById("google-search-input").focus();
    })
    secondCardBody.addEventListener("click", deletetodo);
    filter.addEventListener("keyup", filterTodos);
    clearButton.addEventListener("click", clearAllTodos);
    googlesearchform.addEventListener("submit", googlesearch);
    bookmarkaddform.addEventListener("submit", addBookmark);
    bookmarkList.addEventListener("click", deletebookmark);
    noteForm.addEventListener("submit", addNote);
    noteList.addEventListener("keyup", function (e) {
        addNoteToStorage(e);
        deletenote(e);
    });
}


function addNote(e) {
    addNoteToUI();
    showAlertinNotes("success", "Not kağıdı eklendi.");
    e.preventDefault();
}

function addNoteToUI(e) {
    //  <textarea class="alert alert-warning col" placeholder="Bir Not Girin"></textarea>
    // <div class="w-100"></div>   
    const newnotearena = document.createElement("textarea");
    const notetwocol = document.createElement("div");
    const notetextarena = document.querySelectorAll(".alert.alert-warning.col");
    newnotearena.id = notetextarena.length;
    newnotearena.className = "alert alert-warning col";
    newnotearena.placeholder = "Bir Not Girin";

    notetwocol.className = "w-100";
    if (e != undefined) {
        newnotearena.appendChild(document.createTextNode(e));
    }
    if (isEven(notetextarena.length) === true) {
        noteList.appendChild(notetwocol);
        noteList.appendChild(newnotearena);
    } else {
        noteList.appendChild(newnotearena);
    }
}

function getNotesFromStorage() { // Storage'dan Todoları Alma
    let notes;
    if (localStorage.getItem("notes") === null) {
        notes = [];
    } else {
        notes = JSON.parse(localStorage.getItem("notes"));
    }
    return notes;
}


function addNoteToStorage(e) {
    let notes = getNotesFromStorage();
    notes[e.target.id] = e.target.value;
    localStorage.setItem("notes", JSON.stringify(notes));
}

function isEven(value) {
    if (value % 2 == 0) {
        return true;
    } else {
        return false;
    }
}

function deletenote(e) {
    if (e.key === "Delete" && e.target.value === "") {
        const indexofnote = e.target.id;
        deleteNoteFromStorage(indexofnote);
        while (noteList.firstElementChild != null) {
            noteList.removeChild(noteList.firstElementChild);
        }
        loadAllNotesToUI();
    }
}

function deleteNoteFromStorage(indexofnote) {
    let notes = getNotesFromStorage();
    notes.splice(indexofnote, 1);
    localStorage.setItem("notes", JSON.stringify(notes));
    showAlertinNotes("danger", "Notunuz silindi.");
}

function addBookmark(e) {
    const newurlname = urlnameInput.value.trim();
    const newurl = urlInput.value.trim();
    if (newurlname === "" || newurl === "") {
        showAlertinModal("danger", "Lütfen eksik alanları doldur.");
    } else {
        addBookmarkToUI(newurlname, newurl);
        addBookmarkToStorage(newurlname, newurl);
        showAlertinModal("success", "Bookmark başarıyla eklendi.")
    }
    urlnameInput.value = "";
    urlInput.value = "";
    e.preventDefault();

}

function addBookmarkToUI(newurlname, newurl) {
    const buttondiv = document.createElement("div");
    const bookmarkItem = document.createElement("a");
    const link = document.createElement("button");
    link.className = "btn btn-dark delete-item fa fa-remove";
    link.innerHTML = "<i></i>";
    bookmarkItem.className = "btn btn-dark";
    bookmarkItem.href = newurl;
    bookmarkItem.appendChild(document.createTextNode(newurlname));
    bookmarkItem.appendChild(link);
    buttondiv.className = "btn-group butonmargin";
    buttondiv.appendChild(bookmarkItem);
    buttondiv.appendChild(link);
    bookmarkList.appendChild(buttondiv);
}

function getBookmarknameFromStorage() {
    let bookmarkname;
    if (localStorage.getItem("bookmarkname") === null) {
        bookmarkname = [];
    } else {
        bookmarkname = JSON.parse(localStorage.getItem("bookmarkname"));
    }
    return bookmarkname;
}

function getBookmarkurlFromStorage() {
    let bookmarkurl;
    if (localStorage.getItem("bookmarkurl") === null) {
        bookmarkurl = [];
    } else {
        bookmarkurl = JSON.parse(localStorage.getItem("bookmarkurl"));
    }
    return bookmarkurl;
}


function addBookmarkToStorage(newurlname, newurl) {
    let bookmarkname = getBookmarknameFromStorage();
    let bookmarkurl = getBookmarkurlFromStorage();

    bookmarkname.push(newurlname);
    bookmarkurl.push(newurl);

    localStorage.setItem("bookmarkname", JSON.stringify(bookmarkname));
    localStorage.setItem("bookmarkurl", JSON.stringify(bookmarkurl));
}

function googlesearch(e) {
    window.location.replace(`https://www.google.com/search?q=${document.querySelector("#google-search-input").value}`);
    e.preventDefault();
}

function clearAllTodos() { // Tüm todoları arayüzden storage'dan temizlemek
    if (todoList.firstElementChild === null) {
        showAlert("danger", "Herhangi bir görev bulunmuyor.")
    } else if (confirm("Tümünü tamamladığından emin misin ?")) {
        // Arayüzden todoları temizleme
        // todoList.innerHTML = ""; // Hız olarak yavaş kalır
        while (todoList.firstElementChild != null) {
            todoList.removeChild(todoList.firstElementChild);
        }
        localStorage.removeItem("todos");
        showAlert("success", "Tüm görevler tamamlandı.")
    }
}

function filterTodos(e) { // Todo araması yapmak
    const filterValue = e.target.value.toLowerCase();
    const listItems = document.querySelectorAll(".list-group-item");

    listItems.forEach(function (listItem) {
        const text = listItem.textContent.toLocaleLowerCase();
        if (text.indexOf(filterValue) === -1) {
            // Bulamadı
            listItem.setAttribute("style", "display : none !important");
        } else {
            listItem.setAttribute("style", "display : block");
        }
    });
}

function deletebookmark(e) {
    if (e.target.className === "btn btn-dark delete-item fa fa-remove") {
        e.target.parentElement.remove();
        deletebookmarkFromStorage(e.target.parentElement.firstElementChild.textContent);
    }
}

function deletetodo(e) { // Todo arayüzden silmek
    if (e.target.className === "far fa-circle") {
        e.target.parentElement.parentElement.remove();
        deleteTodoFromStorage(e.target.parentElement.parentElement.textContent);
        showAlert("success", "Görev Tamamlandı.");
    }
}

function deletebookmarkFromStorage(deteledbookmark) { // Todo storage'den silme
    let bookmarks = getBookmarknameFromStorage();
    let bookmarksurl = getBookmarkurlFromStorage();
    bookmarks.forEach(function (bookmark, index) {
        if (bookmark === deteledbookmark) {
            bookmarks.splice(index, 1); // Arrayden değeri siler.
            bookmarksurl.splice(index, 1);
        }
    });

    localStorage.setItem("bookmarkname", JSON.stringify(bookmarks));
    localStorage.setItem("bookmarkurl", JSON.stringify(bookmarksurl));

}


function deleteTodoFromStorage(deteledtodo) { // Todo storage'den silme
    let todos = getTodosFromStorage();
    todos.forEach(function (todo, index) {
        if (todo === deteledtodo) {
            todos.splice(index, 1); // Arrayden değeri siler.
        }
    });

    localStorage.setItem("todos", JSON.stringify(todos));
}

function loadAllNotesToUI() { // Sayfa yüklendiğinde storage'daki todoları da yüklemek.
    let notes = getNotesFromStorage();
    notes.forEach(function (newnote) {
        addNoteToUI(newnote);
    });
}

function loadAllBookmarksToUI() { // Sayfa yüklendiğinde storage'daki todoları da yüklemek.
    let bookmarkname = getBookmarknameFromStorage();
    let bookmarkurl = getBookmarkurlFromStorage();
    bookmarkname.forEach(function (newurlname, index) {
        addBookmarkToUI(newurlname, bookmarkurl[index]);
    });
}

function loadAllTodosToUI() { // Sayfa yüklendiğinde storage'daki todoları da yüklemek.
    let todos = getTodosFromStorage();
    todos.forEach(function (todo) {
        addTodoToUI(todo);
    });
}


function TodoChecker(sameTodo) { // Aynı todoları tespit etmek
    let todos = getTodosFromStorage();
    const checkValue = sameTodo.toLowerCase();
    let checkTodo = [];
    todos.forEach(function (e) {
        let lowerTodo = e.toLocaleLowerCase();
        checkTodo.push(lowerTodo);
    });
    if (checkTodo.includes(checkValue)) {
        return false;
    } else {
        return true;
    }
}

function addTodo(e) { // Todo Input almak ve yönlendirmek
    const newTodo = todoInput.value.trim(); // trim: baştaki sondaki boşlukları siler.
    if (newTodo == "") {
        // bootstrap 4 alerts'in div özelliklerini ekliyoruz
        showAlert("danger", "Lütfen bir görev girin.");
    } else if (TodoChecker(newTodo) === false) {
        showAlert("danger", "Görev listede zaten bulunuyor.")
    } else {
        addTodoToUI(newTodo);
        addTodoToStorage(newTodo);
        showAlert("warning", "Yeni Görev eklendi.")
    }
    todoInput.value = "";
    e.preventDefault();
}

function getTodosFromStorage() { // Storage'dan Todoları Alma
    let todos;

    if (localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    return todos;
}

function addTodoToStorage(newTodo) { // Storage'e ekleme
    let todos = getTodosFromStorage();

    todos.push(newTodo);
    localStorage.setItem("todos", JSON.stringify(todos));
}

function showAlert(type, message) { // Bilgilendirme Mesajları
    const alert = document.querySelector("#alert");
    // const alert = document.createElement("div"); // Yeni oluşturmak alt alta sıralanmasına sebep oldu. Onun yerine boş bir div'i düzenliyoruz.
    alert.className = `float-right btn btn-${type}`;
    alert.textContent = message;
    // firstCardBody.appendChild(alert);  
    // setTimeout
    setTimeout(function () {
        // alert.remove();
        alert.className = "float-right";
        alert.textContent = "";
    }, 2000);
}

function showAlertinModal(type, message) { // Bilgilendirme Mesajları
    const alertinmodal = document.querySelector("#alertinmodal");
    alertinmodal.className = `alert alert-${type}`;
    alertinmodal.textContent = message;
    setTimeout(function () {
        alertinmodal.className = "";
        alertinmodal.textContent = "";
    }, 2000);
}

function showAlertinNotes(type, message) { // Bilgilendirme Mesajları
    const alertinNotes = document.querySelector("#alertinNotes");
    alertinNotes.className = `float-right btn btn-${type}`;
    alertinNotes.textContent = message;
    setTimeout(function () {
        alertinNotes.className = "float-right";
        alertinNotes.textContent = "";
    }, 2000);
}



function addTodoToUI(InputTodo) { // String değerini list item olarak UI'ya ekleyecek.
    // List Item oluşturma
    const listItem = document.createElement("li");
    // Link oluşturma
    const link = document.createElement("a");
    link.href = "#";
    link.className = "delete-item mr-1";
    link.innerHTML = "<i class='far fa-circle'></i>";
    listItem.className = "list-group-item d-flex";
    // Text Node Ekleme
    listItem.appendChild(link);
    listItem.appendChild(document.createTextNode(InputTodo));

    // Todo list'e listitem ekleme
    todoList.appendChild(listItem);
}