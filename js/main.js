const pomodoro = {
    section: document.querySelector("#pomodoro-section"),
    water: document.querySelector(".deep-water"),
    emj: document.querySelector("#emj"),
    startbutton: document.querySelector("#startpomodoro"),
    breakbutton: document.querySelector("#breakpomodoro"),
    sandglass: document.querySelector("#pomodorosandglass"),
    minutes: document.querySelector("#minute > p"),
    second: document.querySelector("#pomodoro-section p"),
    allpomodoro: document.querySelector("#allpomodoro"),
    longbreak: document.querySelector("#longbreak"),
    historybtn: document.querySelector("#historybtn"),
    historyClose: document.querySelector("#history > button"),
    graphs: document.querySelectorAll("#history .skill .graph"),
    dayname: document.querySelectorAll(".name")
}
const sounds = {
    pomodoro: new Audio("sounds/pomodoroalert.mp3"),
    warning: new Audio("sounds/warning.mp3"),
    danger: new Audio("sounds/danger.mp3")
}
const todo = {
    form: document.querySelector("#todo-form"),
    input: document.querySelector("#todo"),
    list: document.querySelector("#todos"),
    filter: document.querySelector("#filter"),
    clear: document.querySelector("#clear-todos"),
}
const googlesearchform = document.querySelector("#google-search-form")
const searchInput = document.querySelector("#google-search-input")
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
    uploadLabel: document.querySelector("#settings-modal .custom-file-select p"),
    default: document.querySelector("#default-settings"),
    language: document.querySelector("#language")
}
const lang = {
    strt: {
        en: "Start",
        tr: "Başlat",
    },
    brk: {
        en: "Break",
        tr: "Mola",
    },
    longbrk: {
        en: "Long Break",
        tr: "Uzun Mola",
    },
    stp: {
        en: "Stop",
        tr: "Durdur",
    },
    alrt: {
        fnshpmdr: {
            en: "Pomodoro Done!|Time is a break time.",
            tr: "Pomodoro Bitti!|Vakit mola vaktidir."
        },
        fnsh4pmdr: {
            en: "4 Pomodoro Done!|You deserve a long break.",
            tr: "4 Pomodoro Bitti!|Uzun bir molayı hakk ettin."
        },
        fnshbrk: {
            en: "We're at the end of break. Back to work!",
            tr: "Molanın sonuna geldik.|İşin başına!"
        },
        fnshlgbrk: {
            en: "We're at the end of long break.|Back to work!",
            tr: "Uzun olan molanın sonuna geldik.|İşin başına!"
        }
    },
    ttlpmr: {
        en: "Total Pomodoro: ",
        tr: "Toplam Pomodoro: ",
    },
    tds: {
        en: "To-Do",
        tr: "Görevler",
    },
    entrtds: {
        en: "Enter A To-do",
        tr: "Bir Görev Girin",
    },
    addtds: {
        en: "Add To-do",
        tr: "Görev Ekleyin",
    },
    srchtds: {
        en: "Search A To-do",
        tr: "Bir Görev Arayın",
    },
    cmplttds: {
        en: "Complete All To-do",
        tr: "Tüm Görevleri Tamamla",
    },
    srch: {
        en: "Search",
        tr: "Arama Yapın",
    },
    addnt: {
        en: "Add Note",
        tr: "Not Ekleyin",
    },
    addbkmrktttl: {
        en: "Add Bookmark",
        tr: "Yer İmi Ekle",
    },
    ttlebkmrk: {
        en: "Title",
        tr: "Başlık",
    },
    addbkmrk: {
        en: "Add",
        tr: "Ekle",
    },
    edtbkmrk: {
        en: "Edit Bookmark",
        tr: "Yer İmini Düzenle",
    },
    dlt: {
        en: "Delete",
        tr: "Sil",
    },
    edt: {
        en: "Edit",
        tr: "Düzenle",
    },
    sttngs: {
        en: "Settings",
        tr: "Ayarlar",
    },
    pmdrtm: {
        en: "Work Time",
        tr: "Çalışma Süresi",
    },
    pmdrbrk: {
        en: "Break Time",
        tr: "Mola Süresi",
    },
    pmdrlngbrk: {
        en: "Long Break Time",
        tr: "Uzun Mola Süresi",
    },
    wllppr: {
        en: "Wallpaper",
        tr: "Duvar Kağıdı",
    },
    dlywllppr: {
        en: "Daily Wallpaper",
        tr: "Günlük Duvar Kağıdı",
    },
    dlywllpprct: {
        en: "Daily Wallpaper Category",
        tr: "Günlük Duvar Kağıdı Kategorisi",
    },
    ctgry: {
        0: {
            en: "Nature",
            tr: "Doğal"
        },
        1: {
            en: "Texture",
            tr: "Kaplamalar"
        },
        2: {
            en: "Architecture",
            tr: "Mimari"
        },
        3: {
            en: "Travel",
            tr: "Yolculuk"
        },
        4: {
            en: "Animals",
            tr: "Hayvanlar"
        },
        5: {
            en: "Art",
            tr: "Sanat"
        },
        6: {
            en: "Business",
            tr: "İş"
        },
    },
    cstmwllppr: {
        en: "Custom Wallpaper",
        tr: "Özel Duvar Kağıdı",
    },
    cstmwllpprbtn: {
        en: "Select File",
        tr: "Dosya Seç",
    },
    dflt: {
        en: "Default",
        tr: "Varsayılan",
    },
    sv: {
        en: "Save",
        tr: "Kaydet",
    },
    plsentrtodo: {
        en: "Please enter a to-do.",
        tr: "Lütfen bir görev girin."
    },
    alrdythr: {
        en: "The to-do is already upon list.",
        tr: "Görev listede zaten bulunuyor."
    },
    nwtdadd: {
        en: "New to-do added.",
        tr: "Yeni Görev eklendi."
    },
    cpltetd: {
        en: "To-do is complete.",
        tr: "Görev Tamamlandı."
    },
    nothrtd: {
        en: "There is nothing on the to-do list.",
        tr: "Herhangi bir görev bulunmuyor."
    },
    rusure: {
        en: "Are you sure you're all done?",
        tr: "Tümünü tamamladığından emin misin ?"
    },
    cmpldalltd: {
        en: "All to-do is complete.",
        tr: "Tüm görevler tamamlandı."
    },
    plsentrinpt: {
        en: "Please fill in the missing fields.",
        tr: "Lütfen eksik alanları doldurunuz."
    },
    addednt: {
        en: "Note paper has been added.",
        tr: "Not kağıdı eklendi."
    },
    entrnt: {
        en: "Enter a note.",
        tr: "Bir Not Girin."
    },
    dltdnt: {
        en: "Note has been deleted.",
        tr: "Notunuz silindi."
    },
    sttngssvd: {
        en: "Settings have been saved.",
        tr: "Ayarlar kaydedildi."
    },
    rdltr: {
        en: "Read Later",
        tr: "Daha Sonra Oku"
    },
    avrgpmdr: {
        en: "Avg. Pomodoro: ",
        tr: "Ort. Pomodoro: "
    },
    days: {
        en: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        tr: ["Pzt", "Sal", "Çar", "Per", "Cum", "Cmt", "Paz"]
    }
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
};
const request = new Request();

eventListeners();

function eventListeners() {
    document.addEventListener("DOMContentLoaded", () => {
        setDefaultSettings();
        dailyControl();
        loadAllBookmarksToUI();
        loadAllTodosToUI();
        loadAllNotesToUI();
        getFromStorage("settings")
            .then(settings => {
                if (settings.length !== 0) {
                    loadExtension();
                    checkAlarm();
                    loadLangToUI();
                }
            })
        searchInput.focus();
        $('[data-toggle="popover"]').popover()
    });
    pomodoro.startbutton.addEventListener("click", () => pomodoroTime("toggle"));
    pomodoro.breakbutton.addEventListener("click", () => pomodoroTime("break"));
    pomodoro.historybtn.addEventListener("click", tooglePomodoroHistory);
    pomodoro.historyClose.addEventListener("click", tooglePomodoroHistory);
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
    setting.default.addEventListener("click", () => setDefaultSettings("save"));
    setting.upload.addEventListener("change", () => setting.uploadLabel.textContent = setting.upload.files[0].name);
    chrome.notifications.onClicked.addListener(() => {
        chrome.tabs.create({
            url: "chrome://newtab"
        });
    });

    chrome.browserAction.onClicked.addListener(() => pomodoroTime("toggle"));
};

/// Pomodoro

var notifications;

function loadExtension() {
    getFromStorage("settings")
        .then(settings => {
            chrome.contextMenus.removeAll(() => {
                chrome.contextMenus.create({
                    type: "normal",
                    id: "pomodoro",
                    title: eval(`lang.strt.${settings.language}`),
                    contexts: ["browser_action"],
                    onclick: () => pomodoroTime("toggle")
                });
                chrome.contextMenus.create({
                    type: "normal",
                    id: "break",
                    title: eval(`lang.brk.${settings.language}`),
                    contexts: ["browser_action"],
                    onclick: () => pomodoroTime("break")
                });
                chrome.contextMenus.create({
                    type: "normal",
                    id: "longbreak",
                    title: eval(`lang.longbrk.${settings.language}`),
                    contexts: ["browser_action"],
                    onclick: () => pomodoroTime("longbreak")
                });
                chrome.contextMenus.create({
                    type: "normal",
                    id: "readlater",
                    title: eval(`lang.rdltr.${settings.language}`),
                    contexts: ["page"],
                    onclick: () => {
                        chrome.tabs.query({
                            active: true,
                            currentWindow: true
                        }, tabs => {
                            addReadLater({
                                name: tabs[0].title,
                                url: tabs[0].url
                            });
                        });
                    }
                });
                chrome.contextMenus.create({
                    type: "normal",
                    id: "addtodo",
                    title: eval(`lang.addtds.${settings.language}`),
                    contexts: ["selection"],
                    onclick: (todo) => addTodo(todo.selectionText)
                });
                chrome.contextMenus.create({
                    type: "normal",
                    id: "addnote",
                    title: eval(`lang.addnt.${settings.language}`),
                    contexts: ["selection"],
                    onclick: (note) => addNoteToStorage(note.selectionText)
                });
            });
            notifications = {
                fnshpmdr: {
                    type: 'basic',
                    iconUrl: '/images/soup.png',
                    title: eval(`lang.alrt.fnshpmdr.${settings.language}.split("|")[0]`),
                    message: eval(`lang.alrt.fnshpmdr.${settings.language}.split("|")[1]`),
                    contextMessage: 'Pomowork',
                },
                fnsh4pmdr: {
                    type: 'basic',
                    iconUrl: '/images/star.png',
                    title: eval(`lang.alrt.fnsh4pmdr.${settings.language}.split("|")[0]`),
                    message: eval(`lang.alrt.fnsh4pmdr.${settings.language}.split("|")[1]`),
                    contextMessage: 'Pomowork',
                },
                fnshbrk: {
                    type: 'basic',
                    iconUrl: '/images/tomato.png',
                    title: eval(`lang.alrt.fnshbrk.${settings.language}.split("|")[0]`),
                    message: eval(`lang.alrt.fnshbrk.${settings.language}.split("|")[1]`),
                    contextMessage: 'Pomowork',
                },
                fnshlgbrk: {
                    type: 'basic',
                    iconUrl: '/images/tomato.png',
                    title: eval(`lang.alrt.fnshlgbrk.${settings.language}.split("|")[0]`),
                    message: eval(`lang.alrt.fnshlgbrk.${settings.language}.split("|")[1]`),
                    contextMessage: 'Pomowork',
                },
            };
        });

    getFromStorage("pomodoro")
        .then(pomodoro => {
            if (pomodoro.length == 0) {
                const defaultPomodoro = {
                    "countdowntime": "",
                    "timeprocess": "",
                    "emj": "",
                    "allpomodorotimes": 0,
                    "pomodorotimes": 0,
                    "countdowntimepercent": "",
                    "history": {
                        "mo": 0,
                        "tu": 0,
                        "we": 0,
                        "th": 0,
                        "fr": 0,
                        "sa": 0,
                        "su": 0,
                    }
                }
                chrome.storage.local.set({
                    "pomodoro": JSON.stringify(defaultPomodoro)
                });
            }
        })
}

function pomodoroTime(process) {
    getFromStorage("settings")
        .then(settings => {
            getFromStorage("pomodoro")
                .then(p => {
                    if (process === "toggle") {
                        doToggleAlarm();
                        return pomodoroTime("focus")
                    } else if (process === "focus") {
                        p.countdowntime = settings.start;
                        pomodoro.minutes.innerText = settings.start;
                        pomodoro.water.style.height = "0";
                        p.timeprocess = process;
                        p.emj = "images/tomato.png";
                        pomodoro.emj.src = p.emj;
                    } else if (process === "break") {
                        p.countdowntime = settings.break;
                        pomodoro.minutes.innerText = settings.break;
                        pomodoro.water.style.height = "0";
                        p.timeprocess = process;
                        p.emj = "images/soup.png";
                        pomodoro.emj.src = p.emj;
                    } else if (process === "longbreak") {
                        p.countdowntime = settings.longbreak;
                        pomodoro.minutes.innerText = settings.longbreak;
                        pomodoro.water.style.height = "0";
                        p.timeprocess = process;
                        p.emj = "images/star.png";
                        pomodoro.emj.src = p.emj;
                    }
                    p.countdowntimepercent = p.countdowntime; // for water style
                    setBadge(`${p.countdowntime}`, `${p.timeprocess}`)
                    chrome.storage.local.set({
                        "pomodoro": JSON.stringify(p)
                    });
                    if (process === "break" || process === "longbreak") {
                        checkAlarm(hasAlarm => {
                            if (!hasAlarm) doToggleAlarm();
                        })
                    }
                })
        })
}

chrome.alarms.onAlarm.addListener(() => {
    getFromStorage("settings")
        .then(settings => {
            getFromStorage("pomodoro")
                .then(p => {
                    p.countdowntime--;
                    pomodoro.minutes.innerText = p.countdowntime;
                    pomodoro.emj.innerText = p.emj;
                    setBadge(`${p.countdowntime}`)
                    smoothWave(235 - (235 * (p.countdowntime / p.countdowntimepercent)))
                    if (!p.countdowntime) {
                        sounds.pomodoro.play();
                        smoothWave(-252);
                        if (p.timeprocess === "focus") {
                            p.allpomodorotimes++;
                            p.pomodorotimes++;
                            pomodoro.allpomodoro.innerText = p.allpomodorotimes;
                            pomodoro.longbreak.innerText = p.pomodorotimes;
                            if (p.pomodorotimes / 4 !== 1) {
                                pomodoroTime("break");
                                chrome.notifications.create(getTimeNow("notification"), notifications.fnshpmdr);
                            } else {
                                pomodoroTime("longbreak");
                                chrome.notifications.create(getTimeNow("notification"), notifications.fnsh4pmdr);
                            }
                        } else if (p.timeprocess === "break") {
                            pomodoroTime("focus");
                            chrome.notifications.create(getTimeNow("notification"), notifications.fnshbrk);
                        } else if (p.timeprocess === "longbreak") {
                            p.pomodorotimes = 0;
                            pomodoro.longbreak.innerText = p.pomodorotimes;
                            pomodoroTime("focus");
                            chrome.notifications.create(getTimeNow("notification"), notifications.fnshlgbrk);
                        }
                    }
                    chrome.storage.local.set({
                        "pomodoro": JSON.stringify(p)
                    });
                })
        })
});

var badgeColor = [220, 53, 69, 1];

function setBadge(text, setColor) {
    if (setColor === "focus") badgeColor = [220, 53, 69, 1];
    else if (setColor === "break" || setColor === "longbreak") badgeColor = [194, 155, 0, 1];
    chrome.browserAction.setBadgeBackgroundColor({
        'color': badgeColor
    });
    chrome.browserAction.setBadgeText({
        'text': text
    });
}

/// Alarm

var alarmName = 'pomodoro';

function checkAlarm(callback) {
    chrome.alarms.getAll(alarms => {
        getFromStorage("settings")
            .then(settings => {
                getFromStorage("pomodoro")
                    .then(p => {
                        var hasAlarm = alarms.some(function (a) {
                            return a.name == alarmName;
                        });
                        var newLabel;
                        var newClass;
                        if (hasAlarm) { // alarm on
                            newLabel = eval(`lang.stp.${settings.language}`);
                            newClass = "btn btn-danger";
                            pomodoro.minutes.innerText = p.countdowntime;
                            pomodoro.emj.src = p.emj;
                            pomodoro.water.style.height = `${235 - (235 * (p.countdowntime / p.countdowntimepercent))}px`;
                            setBadge(`${p.countdowntime}`, `${p.timeprocess}`);
                            chrome.contextMenus.update('pomodoro', {
                                title: eval(`lang.stp.${settings.language}`)
                            });
                        } else { // alarm off
                            newLabel = eval(`lang.strt.${settings.language}`);
                            newClass = "btn btn-success";
                            pomodoro.minutes.innerText = settings.start;
                            pomodoro.emj.src = "";
                            setTimeout(() => smoothWave(-252), 1100);
                            setBadge("", "focus");
                            chrome.contextMenus.update('pomodoro', {
                                title: eval(`lang.strt.${settings.language}`)
                            });
                        }
                        pomodoro.startbutton.textContent = newLabel;
                        pomodoro.startbutton.className = newClass;
                        pomodoro.allpomodoro.innerText = p.allpomodorotimes;
                        pomodoro.longbreak.innerText = p.pomodorotimes;
                        if (callback) callback(hasAlarm);
                    })
            })
    })
}

function createAlarm() {
    chrome.alarms.create(alarmName, {
        delayInMinutes: 1,
        periodInMinutes: 1
    });
}

function cancelAlarm() {
    chrome.alarms.clear(alarmName);
}

function doToggleAlarm() {
    checkAlarm(function (hasAlarm) {
        if (hasAlarm) {
            cancelAlarm();
        } else {
            createAlarm();
        }
        checkAlarm();
    });
}

function tooglePomodoroHistory() {
    const history = document.querySelector("#history");
    if (history.className === "no-animation" || history.classList.length === 0) {
        history.classList.remove("no-animation");
        history.classList.add("show");
        getFromStorage("pomodoro")
            .then(p => {
                for (var i = 0; i < pomodoro.graphs.length; i++) {
                    smoothGraphs(pomodoro.graphs[i], 100 * (p.history[Object.keys(p.history)[i]] / 24));
                    pomodoro.graphs[i].setAttribute("data-content", pomodoro.graphs[i].getAttribute("data-content").concat(p.history[Object.keys(p.history)[i]]));
                }
            })
    } else if (history.className === "show") {
        history.classList.remove("show");
        for (var i = 0; i < pomodoro.graphs.length; i++) {
            pomodoro.graphs[i].setAttribute("data-content", `${pomodoro.graphs[i].getAttribute("data-content").split(":")[0]}: `);
        }
    }
}

function smoothGraphs(graph, distance) {
    const startPosition = graph.style.height;
    window.requestAnimationFrame(step);
    let start = null;

    function step(timestamp) {
        if (!start) start = timestamp;
        const currenttime = timestamp - start;
        graph.style.height = `${easeOutSine(currenttime, startPosition, distance, 1000)}%`
        if (currenttime < 1000) window.requestAnimationFrame(step);
    }
}

/// Todos
function loadAllTodosToUI() {
    getFromStorage("todos")
        .then(todos => todos.forEach(todo => addTodoToUI(todo)))
}

function addTodo(e) {
    let newTodo;
    if (typeof e === 'object') {
        newTodo = todo.input.value.trim();
        todo.input.value = "";
        e.preventDefault();
    } else if (typeof e === 'string') newTodo = e.trim();
    if (typeof e === 'object' && newTodo == "") {
        showAlert("alertInTodo", "danger", lang.plsentrtodo)
    } else {
        TodoChecker(newTodo).then(check => {
            if (check) showAlert("alertInTodo", "danger", lang.alrdythr)
            else {
                addTodoToUI(newTodo);
                addTodoToStorage(newTodo);
                showAlert("alertInTodo", "warning", lang.nwtdadd);
            }
        })
    }
}

function addReadLater(page) {
    TodoChecker(page).then(check => {
        if (check) showAlert("alertInTodo", "danger", lang.alrdythr)
        else {
            addTodoToUI(page);
            addTodoToStorage(page);
            showAlert("alertInTodo", "warning", lang.nwtdadd);
        }
    })
}

function addTodoToUI(InputTodo) {
    const listItem = document.createElement("li");
    const deleteLink = document.createElement("a");
    if (typeof InputTodo === 'object') {
        var readLaterLink = document.createElement("a");
        readLaterLink.href = InputTodo.url;
        readLaterLink.textContent = InputTodo.name;
        var readLaterIcon = document.createElement("i");
        readLaterIcon.className = "fas fa-book-open ml-2"
    }
    deleteLink.href = "#";
    deleteLink.className = "delete-item mr-2";
    deleteLink.innerHTML = "<i class='fas fa-check-circle'></i>";
    listItem.className = "list-group-item d-flex";
    listItem.appendChild(deleteLink);
    if (typeof InputTodo === 'object') {
        listItem.appendChild(readLaterLink);
        listItem.appendChild(readLaterIcon);
    } else listItem.appendChild(document.createTextNode(InputTodo));
    todo.list.appendChild(listItem);
}

function addTodoToStorage(newTodo) {
    getFromStorage("todos")
        .then(todos => {
            todos.push(newTodo);
            chrome.storage.local.set({
                "todos": JSON.stringify(todos)
            });
        })
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
    let checkTodo = [];
    return getFromStorage("todos")
        .then(todos => {
            todos.forEach(e => {
                if (typeof e === 'string') checkTodo.push(e.toLocaleLowerCase());
                else checkTodo.push(e.name); // typeof e == 'object'
            });
            if (typeof sameTodo === 'string' && checkTodo.includes(sameTodo.toLowerCase())) return true;
            else if (checkTodo.includes(sameTodo.name)) return true; // typeof sameTodo == 'object'
            return false;
        })
}

function deletetodo(e) {
    if (e.target.className === "fas fa-check-circle") {
        e.target.parentElement.parentElement.remove();
        deleteTodoFromStorage(e.target.parentElement.parentElement.textContent);
        showAlert("alertInTodo", "success", lang.cpltetd);
    }
}

function deleteTodoFromStorage(deteledtodo) {
    getFromStorage("todos")
        .then(todos => {
            todos.forEach((todo, index) => {
                if (todo === deteledtodo || todo.name === deteledtodo) todos.splice(index, 1);
            });
            chrome.storage.local.set({
                "todos": JSON.stringify(todos)
            });
        })
}

function clearAllTodos() {
    getFromStorage("settings")
        .then(settings => {
            if (todo.list.firstElementChild === null) {
                showAlert("alertInTodo", "danger", lang.nothrtd)
            } else if (confirm(eval(`lang.rusure.${settings.language}`))) {
                while (todo.list.firstElementChild != null) { // delete UI
                    todo.list.removeChild(todo.list.firstElementChild);
                }
                chrome.storage.local.remove("todos")
                showAlert("alertInTodo", "success", lang.cmpldalltd)
            }
        })
}

/// Google Search
function googlesearch(e) {
    window.location.replace(`https://www.google.com/search?q=${document.querySelector("#google-search-input").value}`);
    e.preventDefault();
}

/// Boorkmark
function loadAllBookmarksToUI() {
    getFromStorage("bookmarks")
        .then(bookmarks => bookmarks.forEach((bookmark, index) => addBookmarkToUI(bookmark.name, bookmark.url, index)))
}

function addBookmark(e) {
    const newurlname = urlnameInput.value.trim();
    let newurl = urlInput.value.trim();
    if (!(newurlname === "" || newurl === "")) {
        getFromStorage("bookmarks")
            .then(bookmarks => {
                if (!(newurl.startsWith("http"))) {
                    newurl = "http://".concat(newurl);
                }
                addBookmarkToUI(newurlname, newurl, bookmarks.length);
                addBookmarkToStorage(newurlname, newurl);
            });
    } else {
        showAlert("alertInBookmark", "danger", lang.plsentrinpt);
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

function addBookmarkToStorage(newurlname, newurl) {
    let bookmark = {
        name: newurlname,
        url: newurl
    }
    getFromStorage("bookmarks")
        .then(bookmarks => {
            bookmarks.push(bookmark);
            chrome.storage.local.set({
                "bookmarks": JSON.stringify(bookmarks)
            })
        })
}

function editBookmark(process, index) {
    if (process === "edit") {
        let bookmarksInUI = document.querySelectorAll("#bookmarksList div.btn-group");
        bookmarksInUI.forEach(e => {
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
    let bookmarksInUI = document.querySelectorAll("#bookmarksList div.btn-group");
    bookmarksInUI.forEach(e => {
        if (e.getAttribute("index") == index) {
            e.firstChild.lastChild.textContent = bookmarkedit.name.value;
            if (!(bookmarkedit.url.value.startsWith("http"))) {
                bookmarkedit.url.value = "http://".concat(bookmarkedit.url.value);
            }
            let oldBookmarkUrl = e.firstChild.getAttribute("href");
            editbookmarkFromStorage(oldBookmarkUrl, bookmarkedit.name.value, bookmarkedit.url.value);
            e.firstChild.href = bookmarkedit.url.value;
        }
    });
}

function editbookmarkFromStorage(oldUrl, editedName, editedUrl) {
    getFromStorage("bookmarks")
        .then(bookmarks => {
            bookmarks.forEach((bookmark, index) => {
                if (bookmark.url === oldUrl) {
                    bookmark.name = editedName;
                    bookmark.url = editedUrl;
                    bookmarks.splice(index, 1, bookmark);
                }
            });
            chrome.storage.local.set({
                "bookmarks": JSON.stringify(bookmarks)
            });
        })
}

function deletebookmark(index) {
    let bookmarksInUI = document.querySelectorAll("#bookmarksList div.btn-group");
    bookmarksInUI.forEach(e => {
        if (e.getAttribute("index") == index) {
            e.remove()
            deletebookmarkFromStorage(index);
        }
    });
}

function deletebookmarkFromStorage(deletedindex) {
    getFromStorage("bookmarks")
        .then(bookmarks => {
            bookmarks.splice(deletedindex, 1);
            chrome.storage.local.set({
                "bookmarks": JSON.stringify(bookmarks)
            });
        })
}

/// Notes
function loadAllNotesToUI() {
    while (note.list.firstElementChild != null) {
        note.list.removeChild(note.list.firstElementChild);
    }
    getFromStorage("notes")
        .then(notes => notes.forEach(newnote => addNoteToUI(newnote)))
}

function addNote(e) {
    addNoteToUI();
    addNoteToStorage();
    showAlert("alertInNotes", "success", lang.addednt);
    e.preventDefault()
}

function addNoteToUI(e) {
    const newnotearena = document.createElement("textarea");
    const notetwocol = document.createElement("div");
    const notetextarena = document.querySelectorAll(".alert.alert-warning.col");
    newnotearena.id = notetextarena.length;
    newnotearena.className = "alert alert-warning col";
    newnotearena.setAttribute("spellcheck", "false");
    getFromStorage("settings")
        .then(settings => {
            newnotearena.placeholder = eval(`lang.entrnt.${settings.language}`);
        })
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

function addNoteToStorage(e) {
    getFromStorage("notes")
        .then(notes => {
            if (e == undefined) notes.push("");
            else if (typeof e === 'string') notes.push(e);
            else notes[e.target.id] = e.target.value;
            chrome.storage.local.set({
                "notes": JSON.stringify(notes)
            })
            if (typeof e === 'string') {
                showAlert("alertInNotes", "success", lang.addednt);
                loadAllNotesToUI();
            }
        })
}

function isEven(value) {
    if (value % 2 == 0) return true;
    else return false;
}

function deletenote(e) {
    e.target.remove();
    showAlert("alertInNotes", "danger", lang.dltdnt);
    deleteNoteFromStorage(e.target.id)
}

function deleteNoteFromStorage(index) {
    getFromStorage("notes")
        .then(notes => {
            notes.splice(index, 1);
            chrome.storage.local.set({
                "notes": JSON.stringify(notes)
            });
            loadAllNotesToUI()
        })
}

/// Settings
function loadLangToUI() {
    getFromStorage("settings")
        .then(settings => {
            document.querySelectorAll("button").forEach(btn => {
                if (btn.getAttribute("lang")) {
                    btn.textContent = eval(`lang.${btn.getAttribute("lang")}.${settings.language}`)
                }
            })
            document.querySelectorAll("h4").forEach(ttl => {
                if (ttl.getAttribute("lang")) {
                    ttl.textContent = eval(`lang.${ttl.getAttribute("lang")}.${settings.language}`)
                }
            })
            document.querySelectorAll("input").forEach(inpt => {
                if (inpt.getAttribute("lang")) {
                    inpt.placeholder = eval(`lang.${inpt.getAttribute("lang")}.${settings.language}`)
                }
            })
            document.querySelectorAll("p").forEach(p => {
                if (p.getAttribute("lang")) {
                    p.textContent = eval(`lang.${p.getAttribute("lang")}.${settings.language}`)
                }
            })
            const a = [...setting.category.options];
            a.forEach(optns => {
                if (optns.getAttribute("lang")) {
                    optns.textContent = eval(`lang.${optns.getAttribute("lang")}.${settings.language}`)
                }
            });
            pomodoro.minutes.innerText = settings.start;
            pomodoro.graphs.forEach(g => g.setAttribute("data-content", eval(`lang.avrgpmdr.${settings.language}`)));
            pomodoro.dayname.forEach((n, i) => {
                n.textContent = eval(`lang.days.${settings.language}[i]`)
            })
        })
}

function getBrowserLang() {
    let lang = (navigator.language || navigator.userLanguage)
    if (lang === "tr") return lang;
    else return "en"
}

function setDefaultSettings(process) {
    const defaultsettings = {
        start: 25,
        break: 5,
        longbreak: 30,
        wallpaper: "images/bg.jpg",
        daily: true,
        day: getTimeNow("calendar"),
        category: "nature",
        language: getBrowserLang()
    }
    getFromStorage("settings")
        .then(settings => {
            if (Object.entries(settings).length === 0) {
                chrome.storage.local.set({
                    "settings": JSON.stringify(defaultsettings)
                }, () => {
                    dailyControl();
                    setWallpaper();
                    loadExtension();
                    // checkAlarm();
                });
            } else if (process == "save") {
                chrome.storage.local.set({
                    "settings": JSON.stringify(defaultsettings)
                });
                showAlert("alertSettings", "success", lang.sttngssvd);
            }
            loadLangToUI();
            setTimeout(() => setWallpaper(settings.wallpaper), 10);
        })
}

function editSettings() {
    getFromStorage("settings")
        .then(settings => {
            setting.start.value = settings.start;
            setting.break.value = settings.break;
            setting.longbreak.value = settings.longbreak;
            setting.daily.checked = settings.daily;
            Object.keys(setting.category.options).forEach(e => {
                if (settings.category == setting.category.options[e].value) {
                    setting.category.selectedIndex = e;
                }
            });
            setting.upload.value = "";
            setting.uploadLabel.textContent = eval(`lang.${setting.uploadLabel.getAttribute("lang")}.${settings.language}`);
            setting.custom.value = "";
            Object.keys(setting.language.options).forEach(e => {
                if (settings.language == setting.language.options[e].value) {
                    setting.language.selectedIndex = e;
                }
            })
        })
}

function saveSettings(e) {
    getFromStorage("settings")
        .then(settings => {
            settings.start = setting.start.value;
            settings.break = setting.break.value;
            settings.longbreak = setting.longbreak.value;
            settings.daily = setting.daily.checked;
            if (settings.category != setting.category.value) settings.category = setting.category.value;
            let file = setting.upload.files[0];
            let reader = new FileReader();
            reader.onloadend = () => setWallpaper(reader.result);
            if (file) reader.readAsDataURL(file);
            if (!!setting.custom.value) setWallpaper(setting.custom.value);
            if (settings.language != setting.language.value) settings.language = setting.language.value;
            chrome.storage.local.set({
                "settings": JSON.stringify(settings)
            });
            loadLangToUI();
            checkAlarm();
            dailyControl("save");
            showAlert("alertSettings", "success", lang.sttngssvd);
            loadExtension();
        })
    e.preventDefault();
}

function dailyControl(process) {
    const today = getTimeNow("calendar");
    const day = getTimeNow("day");
    getFromStorage("settings")
        .then(settings => {
            if ((settings.daily == true) && (today != settings.day || process === "save")) {
                request.get(`https://api.unsplash.com/photos/random/?query=${settings.category}&orientation=landscape&client_id=9fd4588a6c1eb2b66e07cb6042fe609aa5c1e1697e593484b7906e33f21aa3ee`, response => {
                    const img = JSON.parse(response);
                    setWallpaper(img.urls.full); // Set UI and Storage
                });
            }
            getFromStorage("pomodoro")
                .then(pomodoro => {
                    if (today != settings.day && pomodoro.length !== 0) {
                        if (pomodoro.history[Object.keys(pomodoro.history)[day]] === 0) pomodoro.history[Object.keys(pomodoro.history)[day]] = pomodoro.allpomodorotimes;
                        else pomodoro.history[Object.keys(pomodoro.history)[day]] = (pomodoro.history[Object.keys(pomodoro.history)[day]] + pomodoro.allpomodorotimes) / 2;
                        pomodoro.allpomodorotimes = 0;
                        pomodoro.pomodorotimes = 0;
                        chrome.storage.local.set({
                            "pomodoro": JSON.stringify(pomodoro)
                        });
                        settings.day = today;
                        chrome.storage.local.set({
                            "settings": JSON.stringify(settings)
                        });
                    }
                })

        })
}

function setWallpaper(img) {
    getFromStorage("settings")
        .then(settings => {
            if (img !== undefined) {
                settings.wallpaper = img;
                chrome.storage.local.set({
                    "settings": JSON.stringify(settings)
                });
            }
            document.querySelector("body").style.background = `linear-gradient(rgba(0, 0, 0, .5) 100%, rgb(0, 0, 0, .5) 100%), url("${settings.wallpaper}")`
        })
}

/// Other
function getTimeNow(style) {
    const time = new Date()
    if (style === "calendar") return `${time.getDate()}/${time.getMonth() + 1}/${time.getFullYear()}`;
    else if (style === "notification") return `${time.getHours()}${time.getMinutes()}${time.getDate()}${time.getMonth() + 1}${time.getFullYear()}`;
    else if (style === "day") return time.getDay() - 1;
}

function getFromStorage(key) {
    return new Promise(resolve => {
        chrome.storage.local.get([key], result => {
            if (Object.entries(result).length !== 0) {
                result = JSON.parse(result[Object.keys(result)[0]]);
            } else {
                result = []
            }
            resolve(result);
        })
    })
}

function showAlert(alertid, type, message) {
    getFromStorage("settings")
        .then(settings => {
            if (type === "danger") {
                sounds.danger.play();
            } else {
                sounds.warning.play();
            }
            let alert = document.querySelector(`#${alertid}`);
            let notice = document.createElement("div");
            notice.className = `btn btn-${type} fade show`;
            notice.textContent = eval(`message.${settings.language}`);
            alert.appendChild(notice)
            setTimeout(function () {
                notice.className = `btn btn-${type} fade`;
            }, 2000);
            setTimeout(function () {
                alert.firstChild.remove();
            }, 2150);
        })
}

function smoothWave(distance) {
    let startPosition = parseInt(pomodoro.water.style.height);
    distance = distance - startPosition;

    window.requestAnimationFrame(step);
    let start = null;

    function step(timestamp) {
        if (!start) start = timestamp;
        const currenttime = timestamp - start;
        pomodoro.water.style.height = `${easeOutSine(currenttime, startPosition, distance, 1000)}px`
        if (currenttime < 1000) window.requestAnimationFrame(step);
    }
}

function easeOutSine(t, b, c, d) {
    return c * Math.sin(t / d * (Math.PI / 2)) + b;
};