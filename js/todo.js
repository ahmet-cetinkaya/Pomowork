const pomodoro = {
    section: document.querySelector("#pomodoro-section"),
    water: document.querySelector(".deep-water"),
    startbutton: document.querySelector("#startpomodoro"),
    breakbutton: document.querySelector("#breakpomodoro"),
    stopbutton: document.querySelector("#stoppomodoro"),
    sandglass: document.querySelector("#pomodorosandglass"),
    minutes: document.querySelector("#pomodoro-section h1"),
    second: document.querySelector("#pomodoro-section p"),
    allpomodoro: document.querySelector("#allpomodoro"),
    longbreak: document.querySelector("#longbreak")
}
const sounds = {
    pomodoro: document.querySelector("#pomodorosound"),
    warning: document.querySelector("#warningsound"),
    danger: document.querySelector("#dangersound")
}
const todo = {
    form: document.querySelector("#todo-form"),
    input: document.querySelector("#todo"),
    list: document.querySelector("#todos"),
    filter: document.querySelector("#filter"),
    clear: document.querySelector("#clear-todos"),
}
const googlesearchform = document.querySelector("#google-search-form")
const bookmarkaddform = document.querySelector("#bookmark-form")
const bookmarkedit = {
    form: document.querySelector("#bookmark-edit-form"),
    name: document.querySelector("#editurlnameInput"),
    url: document.querySelector("#editurleditInput"),
    delete: document.querySelector("#deletebookmark")
};
const urlnameInput = document.querySelector("#urlnameInput")
const urlInput = document.querySelector("#urlInput")
const bookmarkList = document.querySelector("#bookmarksList")
const note = {
    form: document.querySelector("#noteForm"),
    list: document.querySelector("#noteList")
}
const setting = {
    button: document.querySelector("#settings-button"),
    form: document.querySelector("#settings-form"),
    start: document.querySelector("#pomodoro-start-setting"),
    break: document.querySelector("#pomodoro-break-setting"),
    longbreak: document.querySelector("#pomodoro-longbreak-setting"),
    daily: document.querySelector("#daily-wallpaper"),
    category: document.querySelector("#daily-wallpaper-category"),
    custom: document.querySelector("#custom-wallpaper"),
    upload: document.querySelector("#upload-wallpaper"),
    default: document.querySelector("#default-settings")
}

eventListeners();

function eventListeners() {
    document.addEventListener("DOMContentLoaded", () => {
        loadAllBookmarksToUI();
        loadAllTodosToUI();
        loadAllNotesToUI();
        document.getElementById("google-search-input").focus();
        defaultSettings();
        setWallpaper();
        dailyWallpaper();
    });
    pomodoro.startbutton.addEventListener("click", () => pomodoroTime("start"));
    pomodoro.breakbutton.addEventListener("click", () => pomodoroTime("break"));
    pomodoro.stopbutton.addEventListener("click", () => pomodoroTime("stop"));
    todo.form.addEventListener("submit", addTodo);
    todo.list.addEventListener("click", deletetodo);
    todo.filter.addEventListener("keyup", filterTodos);
    todo.clear.addEventListener("click", clearAllTodos);
    googlesearchform.addEventListener("submit", googlesearch);
    bookmarkaddform.addEventListener("submit", addBookmark);
    bookmarkList.addEventListener("click", (e) => {
        if (e.target.className === "btn btn-dark edit-item") {
            editBookmark("edit", e.target.parentElement.getAttribute("index"))
        } else if (e.target.className === "fas fa-ellipsis-v") {
            editBookmark("edit", e.target.parentElement.parentElement.getAttribute("index"))
        }
    });
    bookmarkedit.form.addEventListener("submit", (e) => {
        e.preventDefault();
        editBookmark("save")
    });
    bookmarkedit.delete.addEventListener("click", () => deletebookmark(bookmarkedit.form.getAttribute("index")));
    note.form.addEventListener("click", addNote)
    note.list.addEventListener("keyup", (e) => {
        addNoteToStorage(e);
        if (e.key === "Delete" && e.target.value === "") {
            deletenote(e);
        }
    });
    setting.button.addEventListener("click", editSettings);
    setting.form.addEventListener("submit", saveSettings);
    setting.default.addEventListener("click", () => defaultSettings("save"))
}

/// XMLHttpRequest
class Request {
    constructor() {
        this.xhr = new XMLHttpRequest();
    };
    get(url, callback) {
        this.xhr.open("GET", url, true);
        this.xhr.onload = () => {
            if (this.xhr.status === 200) {
                callback(this.xhr.responseText);
            }
        };
        this.xhr.send();
    };
}

/// Pomodoro Timer
let countdowntime;
let interval;
let allpomodorotimes = 0;
let pomodorotimes = 0;

function pomodoroTime(process) {
    let settings = JSON.parse(localStorage.getItem("settings"));
    let second60 = 60;
    if (process != "stop") {
        if (process === "start") {
            clearInterval(interval);
            countdowntime = settings.start * 60
        } else if (process === "break") {
            clearInterval(interval);
            countdowntime = settings.break * 60;
        } else if (process === "longbreak") {
            clearInterval(interval);
            countdowntime = settings.longbreak * 60;
        }
        countdowntimepercent = countdowntime;
        interval = setInterval(function () {
            countdowntime--;
            second60--;
            pomodoro.minutes.innerText = Math.floor(countdowntime / 60);
            pomodoro.second.innerText = second60;
            pomodoro.water.style.height = `${235-(235*(countdowntime / countdowntimepercent))}px`;
            if (!second60) {
                second60 = 60;
            }
            if (!countdowntime) {
                clearInterval(interval);
                sounds.pomodoro.play();
                if (process === "start") {
                    allpomodorotimes++;
                    pomodorotimes++;
                    pomodoro.allpomodoro.innerText = allpomodorotimes;
                    pomodoro.longbreak.innerText = pomodorotimes;
                    if (pomodorotimes !== 4) {
                        setTimeout(
                            alert("⏲️ Pomodoro Bitti ! 🤸 Vakit mola vaktidir."), 1500);
                        return pomodoroTime("break");
                    } else {
                        setTimeout(
                            alert("🌟 4 Pomodoro Bitti ! 🤸 Uzun bir molayı hakkettin."), 1500);
                        return pomodoroTime("longbreak");
                    }
                } else if (process === "break") {
                    setTimeout(
                        alert("🧍 Molanın sonuna geldik. ⏲️ İşin başına !"), 1500);
                    return pomodoroTime("start");
                } else if (process === "longbreak") {
                    pomodorotimes = 0;
                    pomodoro.longbreak.innerText = pomodorotimes;
                    setTimeout(
                        alert("🧍 Uzun olan molanın sonuna geldik. ⏲️ İşin başına !"), 1500);
                    return pomodoroTime("start");
                }
            }
        }, 1000)
    } else {
        clearInterval(interval);
    }
}

/// Todos
function loadAllTodosToUI() {
    let todos = getTodosFromStorage();
    todos.forEach(function (todo) {
        addTodoToUI(todo);
    });
}

function addTodo(e) {
    const newTodo = todo.input.value.trim();
    if (newTodo == "") {
        showAlert("alertInTodo", "right", "danger", "Lütfen bir görev girin.");
    } else if (TodoChecker(newTodo) === false) {
        showAlert("alertInTodo", "right", "danger", "Görev listede zaten bulunuyor.")
    } else {
        addTodoToUI(newTodo);
        addTodoToStorage(newTodo);
        showAlert("alertInTodo", "right", "warning", "Yeni Görev eklendi.")
    }
    todo.input.value = "";
    e.preventDefault();
}

function addTodoToUI(InputTodo) {
    const listItem = document.createElement("li");
    const link = document.createElement("a");
    link.href = "#";
    link.className = "delete-item mr-2";
    link.innerHTML = "<i class='fas fa-check-circle'></i>";
    listItem.className = "list-group-item d-flex";
    listItem.appendChild(link);
    listItem.appendChild(document.createTextNode(InputTodo));
    todo.list.appendChild(listItem);
}

function getTodosFromStorage() {
    let todos;
    if (localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    return todos;
}

function addTodoToStorage(newTodo) {
    let todos = getTodosFromStorage();
    todos.push(newTodo);
    localStorage.setItem("todos", JSON.stringify(todos));
}

function filterTodos(e) {
    const filterValue = e.target.value.toLowerCase();
    const listItems = document.querySelectorAll(".list-group-item");
    listItems.forEach(function (listItem) {
        const text = listItem.textContent.toLocaleLowerCase();
        if (text.indexOf(filterValue) === -1) {
            listItem.setAttribute("style", "display : none !important");
        } else {
            listItem.setAttribute("style", "display : block");
        }
    });
}

function TodoChecker(sameTodo) {
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

function deletetodo(e) {
    if (e.target.className === "fas fa-check-circle") {
        e.target.parentElement.parentElement.remove();
        deleteTodoFromStorage(e.target.parentElement.parentElement.textContent);
        showAlert("alertInTodo", "right", "success", "Görev Tamamlandı.");
    }
}

function deleteTodoFromStorage(deteledtodo) {
    let todos = getTodosFromStorage();
    todos.forEach(function (todo, index) {
        if (todo === deteledtodo) {
            todos.splice(index, 1);
        }
    });
    localStorage.setItem("todos", JSON.stringify(todos));
}

function clearAllTodos() {
    if (todo.list.firstElementChild === null) {
        showAlert("alertInTodo", "right", "danger", "Herhangi bir görev bulunmuyor.")
    } else if (confirm("Tümünü tamamladığından emin misin ?")) {
        while (todo.list.firstElementChild != null) {
            todo.list.removeChild(todo.list.firstElementChild);
        }
        localStorage.removeItem("todos");
        showAlert("alertInTodo", "right", "success", "Tüm görevler tamamlandı.")
    }
}

/// Google Search
function googlesearch(e) {
    window.location.replace(`https://www.google.com/search?q=${document.querySelector("#google-search-input").value}`);
    e.preventDefault();
}


/// Boorkmark
function loadAllBookmarksToUI() {
    let bookmarkname = getBookmarknameFromStorage();
    let bookmarkurl = getBookmarkurlFromStorage();
    bookmarkname.forEach(function (newurlname, index) {
        addBookmarkToUI(newurlname, bookmarkurl[index], index);
    });
}

function addBookmark(e) {
    const newurlname = urlnameInput.value.trim();
    const newurl = urlInput.value.trim();
    let bookmarks = getBookmarknameFromStorage();
    if (newurlname === "" || newurl === "") {
        showAlert("alertInBookmark", "center", "danger", "Lütfen eksik alanları doldurunuz.");
    } else {
        addBookmarkToUI(newurlname, newurl, bookmarks.length);
        addBookmarkToStorage(newurlname, newurl);
    }
    urlnameInput.value = "";
    urlInput.value = "";
    e.preventDefault();
}

function addBookmarkToUI(newurlname, newurl, newindex) {
    const btnGroup = document.createElement("div");
    const bookmarkItem = document.createElement("a");
    const bookmarkIcon = document.createElement("img");
    const editItem = document.createElement("a");
    const editIcon = document.createElement("i");
    const textSpan = document.createElement("span");
    bookmarkIcon.src = `https://www.google.com/s2/favicons?domain=${newurl}`
    bookmarkItem.className = "btn btn-dark";
    bookmarkItem.href = newurl;
    bookmarkItem.appendChild(bookmarkIcon);
    textSpan.appendChild(document.createTextNode(newurlname));
    bookmarkItem.appendChild(textSpan);
    editItem.className = "btn btn-dark edit-item";
    editItem.dataset.toggle = "modal";
    editItem.dataset.target = "#bookmarkmodaledit";
    editIcon.className = "fas fa-ellipsis-v";
    editItem.appendChild(editIcon);
    bookmarkItem.appendChild(editItem);
    btnGroup.className = "btn-group";
    btnGroup.setAttribute("index", newindex);
    btnGroup.appendChild(bookmarkItem);
    btnGroup.appendChild(editItem);
    bookmarkList.appendChild(btnGroup);
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

function editBookmark(process, index) {
    if (process === "edit") {
        let bookmark = document.querySelectorAll("#bookmarksList div.btn-group");
        bookmark.forEach(e => {
            if (e.getAttribute("index") == index) {
                bookmarkedit.form.setAttribute("index", index);
                bookmarkedit.name.value = e.firstChild.textContent;
                bookmarkedit.url.value = e.firstChild.getAttribute("href");
            }
        });
    } else if (process === "save") {
        let index = bookmarkedit.form.getAttribute("index")
        editbookmarkFromUI(index)
    }
}

function editbookmarkFromUI(index) {
    let bookmark = document.querySelectorAll("#bookmarksList div.btn-group");
    bookmark.forEach(e => {
        if (e.getAttribute("index") == index) {
            let oldBookmarkUrl = e.firstChild.getAttribute("href");
            editbookmarkFromStorage(oldBookmarkUrl, bookmarkedit.name.value, bookmarkedit.url.value);
            e.firstChild.lastChild.textContent = bookmarkedit.name.value;
            e.firstChild.href = bookmarkedit.url.value;
        }
    });
}

function editbookmarkFromStorage(oldUrl, editedName, editedUrl) {
    let bookmarks = getBookmarknameFromStorage();
    let bookmarksurl = getBookmarkurlFromStorage();
    bookmarksurl.forEach((url, index) => {
        if (url === oldUrl) {
            bookmarks.splice(index, 1, editedName);
            bookmarksurl.splice(index, 1, editedUrl);
        }
    });
    localStorage.setItem("bookmarkname", JSON.stringify(bookmarks));
    localStorage.setItem("bookmarkurl", JSON.stringify(bookmarksurl));
}

function deletebookmark(index) {
    let bookmark = document.querySelectorAll("#bookmarksList div.btn-group");
    bookmark.forEach(e => {
        if (e.getAttribute("index") == index) {
            e.remove()
            deletebookmarkFromStorage(e.firstChild.getAttribute("href"));
        }
    });
}

function deletebookmarkFromStorage(deletedUrl) {
    let bookmarks = getBookmarknameFromStorage();
    let bookmarksurl = getBookmarkurlFromStorage();
    bookmarksurl.forEach((url, index) => {
        if (url === deletedUrl) {
            bookmarks.splice(index, 1);
            bookmarksurl.splice(index, 1);
        }
    });
    localStorage.setItem("bookmarkname", JSON.stringify(bookmarks));
    localStorage.setItem("bookmarkurl", JSON.stringify(bookmarksurl));
}

/// Notes
function loadAllNotesToUI() {
    let notes = getNotesFromStorage();
    notes.forEach(function (newnote) {
        addNoteToUI(newnote);
    });
}

function addNote(e) {
    addNoteToUI();
    showAlert("alertInNotes", "right", "success", "Not kağıdı eklendi.");
    e.preventDefault();
}

function addNoteToUI(e) {
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
        note.list.appendChild(notetwocol);
        note.list.appendChild(newnotearena);
    } else {
        note.list.appendChild(newnotearena);
    }
}

function getNotesFromStorage() {
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
    const indexofnote = e.target.id;
    deleteNoteFromStorage(indexofnote);
    while (note.list.firstElementChild != null) {
        note.list.removeChild(note.list.firstElementChild);
    }
    loadAllNotesToUI();
}

function deleteNoteFromStorage(indexofnote) {
    let notes = getNotesFromStorage();
    notes.splice(indexofnote, 1);
    localStorage.setItem("notes", JSON.stringify(notes));
    showAlert("alertInNotes", "right", "danger", "Notunuz silindi.");
}

/// Settings
function getSettings() {
    return JSON.parse(localStorage.getItem("settings"));
}

function getTimeNow() {
    const now = new Date()
    return `${now.getDate()}/${now.getMonth()+1}/${now.getFullYear()}`
}

function defaultSettings(process) {
    const settings = {
        start: 25,
        break: 5,
        longbreak: 30,
        daily: true,
        day: getTimeNow(),
        category: "nature",
    }
    if (localStorage.getItem("settings") === null) {
        localStorage.setItem("settings", JSON.stringify(settings));
        localStorage.setItem("wallpaper", "images/bg.jpg");
    } else if (process == "save") {
        localStorage.setItem("settings", JSON.stringify(settings));
        localStorage.setItem("wallpaper", "images/bg.jpg");
        setWallpaper(localStorage.getItem("wallpaper"));
    }
}

function editSettings() {
    const settings = getSettings();
    setting.start.value = settings.start;
    setting.break.value = settings.break;
    setting.longbreak.value = settings.longbreak;
    setting.daily.checked = settings.daily;
    Object.keys(setting.category.options).forEach(e => {
        if (settings.category == setting.category.options[e].value) {
            setting.category.selectedIndex = e;
        }
    });
    setting.upload.value = ""
    setting.custom.value = ""
}

function saveSettings(e) {
    e.preventDefault();
    let settings = getSettings();
    settings.start = setting.start.value;
    settings.break = setting.break.value;
    settings.longbreak = setting.longbreak.value;
    settings.daily = setting.daily.checked;
    if (settings.category != setting.category.value) {
        settings.category = setting.category.value;
    }
    let file = setting.upload.files[0];
    let reader = new FileReader();
    reader.onloadend = function () {
        setWallpaper(reader.result);
    }
    if (file) {
        reader.readAsDataURL(file);
    }
    if (!!setting.custom.value) {
        setWallpaper(setting.custom.value);
    }
    localStorage.setItem("settings", JSON.stringify(settings));
    dailyWallpaper("save");
}

function dailyWallpaper(process) {
    const today = getTimeNow();
    const settings = getSettings()
    if ((today != settings.day && settings.daily == true) || settings.daily == true && process === "save") {
        const request = new Request();
        request.get(`https://api.unsplash.com/photos/random/?query=${settings.category}&orientation=landscape&client_id=9fd4588a6c1eb2b66e07cb6042fe609aa5c1e1697e593484b7906e33f21aa3ee`, function (response) {
            const img = JSON.parse(response);
            setWallpaper(img.urls.full);
            settings.day = today;
            localStorage.setItem("settings", JSON.stringify(settings));
        });
    }
}

function setWallpaper(img) {
    if (img !== undefined) {
        localStorage.setItem("wallpaper", `${img}`)
    }
    document.querySelector("body").style.background = `linear-gradient(rgba(0, 0, 0, .5) 100%, rgb(0, 0, 0, .5) 100%), url("${localStorage.getItem("wallpaper")}")`
}

/// Other
function showAlert(alertid, position, type, message) {
    if (type === "danger") {
        sounds.danger.play();
    } else {
        sounds.warning.play();
    }
    let alert = document.querySelector(`#${alertid}`);
    alert.className = `float-${position} btn btn-${type} fade show`;
    alert.textContent = message;
    setTimeout(function () {
        alert.className = `fade`;
        alert.textContent = ""
    }, 2000);
}