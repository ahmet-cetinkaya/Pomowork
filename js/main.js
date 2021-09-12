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
    options: document.querySelector("#todo-options"),
    estimatedpomodoros: document.querySelectorAll("a.estimated-pomodoro"),
    estimatedpomodorosSelect: document.querySelector("#estimated-pomodoros > select"),
    filtercolor: document.querySelectorAll("#filters .filter-color"),
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
}
const login = {
    title: document.querySelector("#login-modal > div > div > div.modal-header > h4"),
    icon: document.querySelector("#login-button"),
    form: document.querySelector("#login-form"),
    name: document.querySelector("#UserName"),
    nameInpt: document.querySelector("#InputName"),
    mail: document.querySelector("#UserMail"),
    mailInpt: document.querySelector("#InputEmail"),
    pass: document.querySelector("#UserPass"),
    passInpt: document.querySelector("#InputPassword"),
    newUser: document.querySelector("#login-modal > div > div > div.modal-body > p"),
    btn: document.querySelector("#login-modal > div > div > div.modal-footer > button")
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
        recoveryUpdate();
        setDefaultSettings();
        dailyControl();
        loadAllTodosToUI();
        loadAllBookmarksToUI();
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
        // document.querySelector("#todosList").style.height = `${window.innerHeight*48/100}px`;
        $('[data-toggle="popover"]').popover()
    });
    chrome.notifications.onClicked.addListener(() => {
        chrome.tabs.create({
            url: "chrome://newtab"
        });
    });
    chrome.browserAction.onClicked.addListener(() => pomodoroTime("toggle"));
    pomodoro.startbutton.addEventListener("click", () => pomodoroTime("toggle"));
    pomodoro.breakbutton.addEventListener("click", () => pomodoroTime("break"));
    pomodoro.historybtn.addEventListener("click", tooglePomodoroHistory);
    pomodoro.historyClose.addEventListener("click", tooglePomodoroHistory);
    todo.form.addEventListener("submit", addTodo);
    todo.input.addEventListener("focus", () => {
        document.querySelector("#estimated-pomodoros").classList.add("show")
        document.querySelector("#estimated-pomodoros-bg").classList.add("show")
    })
    todo.input.addEventListener("blur", () => {
        setInterval(() => {
            let isFormHover = isHover(todo.form)
            let isOptnsHover = isHover(todo.options)
            if (isFormHover == false && isOptnsHover == false) setDefultTodosOptions()
        }, 15000);
    })
    todo.estimatedpomodoros.forEach(e => {
        e.addEventListener("mouseover", () => {
            todo.estimatedpomodoros.forEach(p => {
                if (Number(p.getAttribute("value")) <= Number(e.getAttribute("value"))) p.style.color = "#491911"
                else p.style.color = ""
            })
        })
        e.addEventListener("click", () => {
            todo.estimatedpomodoros.forEach(p => {
                if (Number(p.getAttribute("value")) <= Number(e.getAttribute("value"))) p.classList.add("selected")
                else p.classList.remove("selected")
                for (let i = 0; i < 6; i++) todo.estimatedpomodorosSelect.options[i].selected = false;
                todo.estimatedpomodorosSelect.removeAttribute("style")
            })
        })
    })
    todo.estimatedpomodorosSelect.addEventListener("change", (e) => {
        e.target.style.background = "#ca4f3a"
        todo.estimatedpomodoros.forEach(p => {
            p.classList.add("selected")
        })
    })

    todo.filtercolor.forEach(f => {
        f.addEventListener("click", () => {
            if (document.querySelector("#estimated-pomodoros-bg").classList[1] == "show") {
                todo.filtercolor.forEach(f => f.removeAttribute("value"))
                todo.input.setAttribute('style', `background:${f.style.color} !important; color:white`);
                f.setAttribute("value", "selected");
            } else if (f.classList.contains('fa-dot-circle')) {
                f.classList.replace("fa-dot-circle", "fa-circle")
                filterTagTodos(undefined)
            } else {
                todo.filtercolor.forEach(filter => {
                    if (!filter.classList.contains("fa-circle")) filter.classList.replace("fa-dot-circle", "fa-circle")
                })
                f.classList.replace("fa-circle", "fa-dot-circle")
                filterTagTodos(f)
            }
        })
    })
    $("#estimated-pomodoros > button.close").click(() => setDefultTodosOptions());
    todo.list.addEventListener("click", (e) => {
        if (e.target.className === "fas fa-check-circle") deletetodo(e)
        if (e.target.className === "fas fa-thumbtack") pinTodo(e.target)
    });
    todo.filter.addEventListener("keyup", filterTodos);
    todo.clear.addEventListener("click", clearAllTodos);
    googlesearchform.addEventListener("submit", googlesearch);
    bookmarkaddform.addEventListener("submit", addBookmark);
    bookmarkList.addEventListener("click", (e) => {
        if (e.target.className === "btn btn-dark edit-item") editBookmark("edit", e.target.parentElement.getAttribute("index"))
        else if (e.target.className === "fas fa-ellipsis-v") editBookmark("edit", e.target.parentElement.parentElement.getAttribute("index"))
    });
    bookmarkedit.form.addEventListener("submit", (e) => {
        e.preventDefault();
        editBookmark("save")
    });
    bookmarkedit.delete.addEventListener("click", () => deletebookmark(bookmarkedit.form.getAttribute("index")));
    note.form.addEventListener("click", addNote)
    note.list.addEventListener("keyup", (e) => {
        addNoteToStorage(e);
    });
    setting.button.addEventListener("click", editSettings);
    setting.form.addEventListener("submit", saveSettings);
    setting.default.addEventListener("click", () => setDefaultSettings("save"));
    setting.upload.addEventListener("change", () => setting.uploadLabel.textContent = setting.upload.files[0].name);
    // login.newUser.addEventListener("click", () => {
    //     login.name.style.display = 'block'
    //     login.nameInpt.required = true;
    //     login.newUser.style.display = 'none'
    //     login.form.setAttribute('name', 'register')
    //     login.btn.textContent = 'Üye ol'
    //     login.btn.classList.replace('btn-primary', 'btn-success')
    //     login.title.textContent = 'Üye ol'
    // })
    // login.form.addEventListener("submit", loginUser)
    // login.icon.addEventListener("click", () => {
    //     getFromStorage('login')
    //         .then(r => {
    //             if (r[0]) {
    //                 document.querySelector("#user-modal > div > div > div.modal-header > h4").textContent = r[1]
    //                 $('#user-modal').modal('show');
    //             } else $('#login-modal').modal('show');
    //         })
    // })
    // document.querySelector("#quit").addEventListener('click', () => {
    //     chrome.storage.local.set({
    //         'login': JSON.stringify([false])
    //     })
    //     chrome.storage.local.set({
    //         "todos": JSON.stringify([])
    //     });
    //     chrome.storage.local.set({
    //         "notes": JSON.stringify([])
    //     });
    //     chrome.storage.local.set({
    //         "bookmarks": JSON.stringify([])
    //     });
    //     loadAllTodosToUI();
    //     loadAllBookmarksToUI();
    //     loadAllNotesToUI();
    //     // chrome.storage.local.clear()
    // })
};

// function loginUser(e) {
//     e.preventDefault();
//     getFromStorage('users')
//         .then(async (users) => {
//             if (e.target.getAttribute('name') === 'login') {
//                 if (users[login.mailInpt.value.trim()] !== undefined) {
//                     if (login.passInpt.value === users[login.mailInpt.value.trim()].pass) {
//                         $('#login-modal').modal('hide');
//                         const usersStorage = JSON.parse(users[login.mailInpt.value.trim()].storage);
//                         chrome.storage.local.set({
//                             "pomodoro": usersStorage.pomodoro
//                         });
//                         chrome.storage.local.set({
//                             "settings": usersStorage.settings
//                         });
//                         chrome.storage.local.set({
//                             "todos": usersStorage.todos
//                         });
//                         chrome.storage.local.set({
//                             "notes": usersStorage.notes
//                         });
//                         chrome.storage.local.set({
//                             "bookmarks": usersStorage.bookmarks
//                         });
//                         chrome.storage.local.set({
//                             "login": JSON.stringify(['true', users[login.mailInpt.value.trim()].name])
//                         });
//                         loadAllTodosToUI();
//                         loadAllBookmarksToUI();
//                         loadAllNotesToUI();
//                         showAlert("alertSettings", "success", "sccsslgn")
//                     } else showAlert("alertInLogin", "danger", "wrngpss")
//                 } else showAlert("alertInLogin", "danger", "ntfnduser")
//             } else {
//                 if (users[login.mailInpt.value.trim()] == undefined) {
//                     let storage = await getFromStorage('all')
//                     if (storage.todos === undefined) storage.todos = "[]"
//                     if (storage.bookmarks === undefined) storage.bookmarks = "[]"
//                     if (storage.notes === undefined) storage.notes = "[]"
//                     users[login.mailInpt.value.trim()] = {
//                         'pass': login.passInpt.value,
//                         'name': login.nameInpt.value,
//                         'storage': JSON.stringify(storage)
//                     }
//                     chrome.storage.local.set({
//                         "users": JSON.stringify(users)
//                     });
//                     chrome.storage.local.set({
//                         "login": JSON.stringify(['true', users[login.mailInpt.value.trim()].name])
//                     });
//                     showAlert("alertInLogin", "success", "scssrgstr")
//                     setTimeout(() => {
//                         $('#login-modal').modal('hide');
//                     }, 1000);
//                 } else showAlert("alertInLogin", "danger", "thrisuser")
//             }
//         });
// }
/// Pomodoro


function loadExtension() {
            chrome.contextMenus.removeAll(() => {
                chrome.contextMenus.create({
                    type: "normal",
                    id: "pomodoro",
                    title: chrome.i18n.getMessage('strt'),
                    contexts: ["browser_action"],
                    onclick: () => pomodoroTime("toggle")
                });
                chrome.contextMenus.create({
                    type: "normal",
                    id: "break",
                    title: chrome.i18n.getMessage('brk'),
                    contexts: ["browser_action"],
                    onclick: () => pomodoroTime("break")
                });
                chrome.contextMenus.create({
                    type: "normal",
                    id: "longbreak",
                    title: chrome.i18n.getMessage('longbrk'),
                    contexts: ["browser_action"],
                    onclick: () => pomodoroTime("longbreak")
                });
                chrome.contextMenus.create({
                    type: "normal",
                    id: "readlater",
                    title: chrome.i18n.getMessage('rdltr'),
                    contexts: ["page"],
                    onclick: () => {
                        chrome.tabs.query({
                            active: true,
                            currentWindow: true
                        }, tabs => {
                            addReadLater({
                                todo: tabs[0].title,
                                url: tabs[0].url,
                                estimation: 1,
                                tag: null
                            });
                        });
                    }
                });
                chrome.contextMenus.create({
                    type: "normal",
                    id: "addtodo",
                    title: chrome.i18n.getMessage('addtds'),
                    contexts: ["selection"],
                    onclick: (todo) => addTodo(todo.selectionText)
                });
                chrome.contextMenus.create({
                    type: "normal",
                    id: "addnote",
                    title: chrome.i18n.getMessage('addnt'),
                    contexts: ["selection"],
                    onclick: (note) => addNoteToStorage(note.selectionText)
                });
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
                    },
                    "hours": {
                        0: 4,
                        1: 4,
                        2: 3,
                        3: 2,
                        4: 3,
                        5: 4,
                        6: 4.5,
                        7: 7.5,
                        8: 8.5,
                        9: 8.5,
                        10: 8.5,
                        11: 8.5,
                        12: 6.5,
                        13: 6.5,
                        14: 6,
                        15: 5,
                        16: 6.5,
                        17: 7,
                        18: 7,
                        19: 6,
                        20: 6,
                        21: 6,
                        22: 6,
                        23: 5,
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

// Pomodoro
chrome.alarms.onAlarm.addListener(() => {
    getFromStorage("pomodoro")
        .then(p => {
            p.countdowntime--;
            pomodoro.minutes.innerText = p.countdowntime;
            pomodoro.emj.innerText = p.emj;
            setBadge(`${p.countdowntime}`)
            smoothWave(235 - (235 * (p.countdowntime / p.countdowntimepercent)))
            if (p.countdowntime === 0) {
                sounds.pomodoro.play();
                setTimeout(() =>smoothWave(-252), 1000);
                if (p.timeprocess === "focus") {
                    p.allpomodorotimes++;
                    p.pomodorotimes++;
                    pomodoro.allpomodoro.innerText = p.allpomodorotimes;
                    pomodoro.longbreak.innerText = p.pomodorotimes;
                    const pinnedTodo = document.querySelector("#todos > li:nth-child(1) > i.estimated-pomodoro.fas.fa-circle > span")
                    if (pinnedTodo && +pinnedTodo.textContent > 1) {
                        pinnedTodo.textContent--
                        getFromStorage("todos").then(todo => {
                            todo[0].estimation--
                            chrome.storage.local.set({
                                "todos": JSON.stringify(todo)
                            });
                        })
                    }
                    for (h in p.hours) p.hours[h] -= .1
                    p.hours[getTimeNow('hour')] += .2;
                    if (p.pomodorotimes / 4 !== 1) {
                        pomodoroTime("break");
                        chrome.notifications.create(getTimeNow("notification"), { //+ use String((new Date).getTime()) in background module
                            iconUrl: './images/soup.png',
                            type: 'basic',
                            title: chrome.i18n.getMessage('fnshpmdr').split("|")[0],
                            message: chrome.i18n.getMessage('fnshpmdr').split("|")[1],
                            contextMessage: 'Pomowork',
                        });
                    } else {
                        pomodoroTime("longbreak");
                        chrome.notifications.create(getTimeNow("notification"), {
                            iconUrl: './images/star.png',
                            type: 'basic',
                            title: chrome.i18n.getMessage('fnsh4pmdr').split("|")[0],
                            message: chrome.i18n.getMessage('fnsh4pmdr').split("|")[1],
                            contextMessage: 'Pomowork',
                        });
                    }
                } else if (p.timeprocess === "break") {
                    pomodoroTime("focus");
                    chrome.notifications.create(getTimeNow("notification"), {
                        iconUrl: './images/tomato.png',
                        type: 'basic',
                        title: chrome.i18n.getMessage('fnshbrk').split("|")[0],
                        message: chrome.i18n.getMessage('fnshbrk').split("|")[1],
                        contextMessage: 'Pomowork',
                    });
                } else if (p.timeprocess === "longbreak") {
                    p.pomodorotimes = 0;
                    pomodoro.longbreak.innerText = p.pomodorotimes;
                    pomodoroTime("focus");
                    chrome.notifications.create(getTimeNow("notification"), {
                        iconUrl: './images/tomato.png',
                        type: 'basic',
                        title: chrome.i18n.getMessage('fnshlgbrk').split("|")[0],
                        message: chrome.i18n.getMessage('fnshlgbrk').split("|")[1],
                        contextMessage: 'Pomowork',
                    });
                }
            }
            chrome.storage.local.set({
                "pomodoro": JSON.stringify(p)
            });
        })
});

const notifications = {
    fnshpmdr: {
        iconUrl: './images/soup.png',
        type: 'basic',
        title: chrome.i18n.getMessage('fnshpmdr').split("|")[0],
        message: chrome.i18n.getMessage('fnshpmdr').split("|")[1],
        contextMessage: 'Pomowork',
    },
    fnsh4pmdr: {
        iconUrl: './images/star.png',
        type: 'basic',
        title: chrome.i18n.getMessage('fnsh4pmdr').split("|")[0],
        message: chrome.i18n.getMessage('fnsh4pmdr').split("|")[1],
        contextMessage: 'Pomowork',
    },
    fnshbrk: {
        iconUrl: './images/tomato.png',
        type: 'basic',
        title: chrome.i18n.getMessage('fnshbrk').split("|")[0],
        message: chrome.i18n.getMessage('fnshbrk').split("|")[1],
        contextMessage: 'Pomowork',
    },
    fnshlgbrk: {
        iconUrl: './images/tomato.png',
        type: 'basic',
        title: chrome.i18n.getMessage('fnshlgbrk').split("|")[0],
        message: chrome.i18n.getMessage('fnshlgbrk').split("|")[1],
        contextMessage: 'Pomowork',
    }
};


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
                            newLabel = chrome.i18n.getMessage('stp');
                            newClass = "btn btn-danger";
                            pomodoro.minutes.innerText = p.countdowntime;
                            pomodoro.emj.src = p.emj;
                            pomodoro.water.style.height = `${235 - (235 * (p.countdowntime / p.countdowntimepercent))}px`;
                            setBadge(`${p.countdowntime}`, `${p.timeprocess}`);
                            chrome.contextMenus.update('pomodoro', {
                                title: chrome.i18n.getMessage('stp')
                            });
                        } else { // alarm off
                            newLabel = chrome.i18n.getMessage('strt');
                            newClass = "btn btn-success";
                            pomodoro.minutes.innerText = settings.start;
                            pomodoro.emj.src = "";
                            setTimeout(() => smoothWave(-252), 1100);
                            setBadge("", "focus");
                            chrome.contextMenus.update('pomodoro', {
                                title: chrome.i18n.getMessage('strt')
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
    if (document.querySelectorAll("#todos > li").length > 0) document.querySelectorAll("#todos > li").forEach(r => r.remove())
    getFromStorage("todos")
        .then(todos => todos.forEach(todo => addTodoToUI(todo)))
}

function addTodo(e) {
    let newTodo;
    let estimation;
    let tag = null
    if (typeof e === 'object') {
        if (todo.estimatedpomodorosSelect.value == "") estimation = document.querySelectorAll(".estimated-pomodoro.selected").length
        else estimation = todo.estimatedpomodorosSelect.value
        todo.filtercolor.forEach(e => {
            if (e.getAttribute("value") === "selected") tag = e.getAttribute("tag")
        })
        newTodo = {
            todo: todo.input.value.trim(),
            estimation: estimation,
            tag: tag
        }
        todo.input.value = "";
        e.preventDefault();
    } else if (typeof e === 'string') newTodo = {
        todo: e.trim(),
        estimation: 1,
        tag: tag
    }
    if (e.type === 'submit' && newTodo.todo == "") showAlert("alertInTodo", "danger", "plsentrtodo")
    else {
        TodoChecker(newTodo).then(check => {
            if (check) showAlert("alertInTodo", "danger", "alrdythr")
            else {
                addTodoToUI(newTodo);
                addTodoToStorage(newTodo);
                showAlert("alertInTodo", "warning", "nwtdadd");
            }
            setDefultTodosOptions();
        })
    }
}

function addReadLater(page) {
    TodoChecker(page).then(check => {
        if (check) showAlert("alertInTodo", "danger", "alrdythr")
        else {
            addTodoToUI(page);
            addTodoToStorage(page);
            showAlert("alertInTodo", "warning", "nwtdadd");
        }
    })
}

function addTodoToUI(InputTodo) {
    const listItem = document.createElement("li");
    const todoName = document.createElement("p")
    const deleteLink = document.createElement("a");
    const estimation = document.createElement("i");
    const pomodorocount = document.createElement("span");
    const pin = document.createElement("i")
    deleteLink.href = "#";
    deleteLink.className = "delete-item mr-2";
    deleteLink.innerHTML = "<i class='fas fa-check-circle'></i>";
    listItem.className = "list-group-item d-flex";
    listItem.classList.add(InputTodo.tag)
    listItem.setAttribute("tag", InputTodo.tag)
    listItem.appendChild(deleteLink);
    estimation.className = "estimated-pomodoro fas fa-circle"
    pomodorocount.textContent = InputTodo.estimation
    estimation.appendChild(pomodorocount)
    if (todo.list.children.length == 0) pin.className = "fas fa-thumbtack pinned"
    else pin.className = "fas fa-thumbtack"
    if (InputTodo.url !== undefined) {
        var readLaterLink = document.createElement("a");
        readLaterLink.href = InputTodo.url;
        readLaterLink.textContent = InputTodo.todo;
        var readLaterIcon = document.createElement("i");
        readLaterIcon.className = "fas fa-book-open ml-2"
        listItem.appendChild(readLaterLink);
        listItem.appendChild(readLaterIcon);
        listItem.appendChild(estimation)
        listItem.appendChild(pin);

    } else {
        todoName.textContent = InputTodo.todo;
        listItem.appendChild(todoName);
        listItem.appendChild(estimation);
        listItem.appendChild(pin);
    }
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
    listItems.forEach(listItem => {
        const text = listItem.children[1].textContent.toLocaleLowerCase()
        if (text.indexOf(filterValue) === -1) listItem.setAttribute("style", "display : none !important");
        else listItem.setAttribute("style", "display : block");
    });
}

function TodoChecker(sameTodo) {
    let checkTodo = [];
    return getFromStorage("todos")
        .then(todos => {
            todos.forEach(e => checkTodo.push(e.todo));
            if (checkTodo.includes(sameTodo.todo)) return true;
            return false;
        })
}

function deletetodo(e) {
    e.target.parentElement.parentElement.remove();
    deleteTodoFromStorage(e.target.parentElement.parentElement.children[1].textContent);
    proposedTodo(e.target.parentElement.parentElement);
    showAlert("alertInTodo", "success", "cpltetd");
}

function deleteTodoFromStorage(deteledtodo) {
    getFromStorage("todos")
        .then(todos => {
            todos.forEach((todo, index) => {
                if (todo.todo === deteledtodo) todos.splice(index, 1);
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
                showAlert("alertInTodo", "danger", "nothrtd")
            } else if (confirm(chrome.i18n.getMessage('rusure'))) {
                while (todo.list.firstElementChild != null) { // delete UI
                    todo.list.removeChild(todo.list.firstElementChild);
                }
                chrome.storage.local.remove("todos")
                showAlert("alertInTodo", "success", "cmpldalltd")
            }
        })
}

function pinTodo(e) {
    document.querySelectorAll("#todos li i.fas.fa-thumbtack").forEach(p => p.classList.remove("pinned"))
    e.classList.add("pinned")
    $("#todos").prepend(e.parentElement);
    getFromStorage("todos")
        .then(todos => {
            todos.forEach((t, i) => {
                if (t.todo == e.parentElement.children[1].textContent) {
                    todos.splice(i, 1)
                    todos.unshift(t)
                }
            });
            chrome.storage.local.set({
                "todos": JSON.stringify(todos)
            });
        })

}

function isHover(e) {
    return (e.parentElement.querySelector(':hover') === e);
}

function setDefultTodosOptions() {
    if (document.activeElement.className != "form-control") {
        document.querySelector("#estimated-pomodoros").classList.remove("show");
        document.querySelector("#estimated-pomodoros-bg").classList.remove("show");
    }
    todo.estimatedpomodoros.forEach(p => {
        if (Number(p.getAttribute("value")) > 1) {
            p.style.color = "";
            p.classList.remove("selected");
        }
    });
    todo.input.removeAttribute("style");
    todo.filtercolor.forEach(f => f.removeAttribute("value"));
    todo.estimatedpomodorosSelect.removeAttribute("style")
    for (let i = 0; i < 6; i++) todo.estimatedpomodorosSelect.options[i].selected = false;
}

function filterTagTodos(f) {
    document.querySelectorAll("#todos li.list-group-item.d-flex").forEach(todo => {
        if (f == undefined) todo.removeAttribute('style');
        else if (todo.getAttribute("tag") == f.getAttribute("tag")) todo.removeAttribute('style');
        else todo.setAttribute('style', 'display:none !important;')
    });
}

function proposedTodo(pinned) {
    let sameTag = []
    let otherTag = []
    let score;
    let averange = 0
    const todos = document.querySelectorAll("#todos li.list-group-item.d-flex")
    getFromStorage('pomodoro').then(p => {
        score = (p.history[Object.keys(p.history)[getTimeNow('day')]] + p.hours[getTimeNow('hour')]) / 2
        for (h in p.hours) averange += p.hours[h]
        for (d in p.history) averange += p.history[d]
        averange /= 31
        score -= p.allpomodorotimes * .02
        return
    }).then(() => {
        todos.forEach(todo => {
            if (todo.getAttribute('tag') == pinned.getAttribute('tag')) sameTag.push({
                'todo': todo,
                'possibility': score
            });
            else otherTag.push({
                'todo': todo,
                'possibility': score
            });
        });
        if (sameTag.length === 0) sameTag = otherTag;
        sameTag.forEach(todo => {
            if (score > averange) todo.possibility += Number(todo.todo.querySelector("i.estimated-pomodoro.fas.fa-circle > span").textContent)
            else todo.possibility -= Number(todo.todo.querySelector("i.estimated-pomodoro.fas.fa-circle > span").textContent)
        });
        let highProbability = sameTag.find(o => o.possibility == Math.max.apply(Math, sameTag.map(t => t.possibility)))
        if (sameTag.length > 0) pinTodo(highProbability.todo.querySelector("i.fas.fa-thumbtack"));
    })
}
/// Google Search
function googlesearch(e) {
    window.location.replace(`https://www.google.com/search?q=${document.querySelector("#google-search-input").value}`);
    e.preventDefault();
}

/// Boorkmark
function loadAllBookmarksToUI() {
    if (document.querySelectorAll("#bookmarksList div.btn-group").length > 0) document.querySelectorAll("#bookmarksList div.btn-group").forEach(r => r.remove())
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
        showAlert("alertInBookmark", "danger", "plsentrinpt");
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
    showAlert("alertInNotes", "success", "addednt");
    e.preventDefault()
}

function addNoteToUI(e) {
    const newNoteDiv = document.createElement("div");
    const newnotearena = document.createElement("textarea");
    const notetwocol = document.createElement("div");
    const notetextarena = document.querySelectorAll(".alert.alert-warning.col");
    const deleteButton = document.createElement("button");
    const deleteButtonIcon = document.createElement("i");
    deleteButtonIcon.className="fas fa-trash";
    newNoteDiv.className="note m-1"
    newnotearena.id = notetextarena.length;
    newnotearena.className = "alert alert-warning col";
    newnotearena.setAttribute("spellcheck", "false");
            newnotearena.placeholder = chrome.i18n.getMessage('entrnt');
    notetwocol.className = "w-100";
    deleteButton.className = "btn note-delete";
    deleteButton.appendChild(deleteButtonIcon);
    deleteButton.addEventListener("click", (e)=> {
        e.preventDefault();
        deletenote(e)
    })
    newNoteDiv.appendChild(newnotearena);
    newNoteDiv.appendChild(deleteButton);
    if (e != undefined) {
        newnotearena.appendChild(document.createTextNode(e));
    }
    if (isEven(notetextarena.length) === true) {
        note.list.appendChild(notetwocol);
        note.list.appendChild(newNoteDiv);
    } else {
        note.list.appendChild(newNoteDiv);
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
                showAlert("alertInNotes", "success", "addednt");
                loadAllNotesToUI();
            }
        })
}

function isEven(value) {
    if (value % 2 == 0) return true;
    else return false;
}

function deletenote(e) {
    let element = e.target.parentElement.tagName !== "BUTTON" ?  e.target.parentElement : e.target.parentElement.parentElement;
    element.remove();
    showAlert("alertInNotes", "danger", "dltdnt");
    deleteNoteFromStorage(element.children[0].id)
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
function loadLangToUI            () {
    getFromStorage("settings")
        .then(settings => {
            document.querySelectorAll("button").forEach(btn => {
                if (btn.getAttribute("lang")) btn.textContent = chrome.i18n.getMessage(`${btn.getAttribute("lang")}`)
            })
            document.querySelectorAll("h4").forEach(ttl => {
                if (ttl.getAttribute("lang")) ttl.textContent = chrome.i18n.getMessage(`${ttl.getAttribute("lang")}`)

            })
            document.querySelectorAll("input").forEach(inpt => {
                if (inpt.getAttribute("lang")) inpt.placeholder = chrome.i18n.getMessage(`${inpt.getAttribute("lang")}`)
            })
            document.querySelectorAll("p").forEach(p => {
                if (p.getAttribute("lang")) p.textContent = chrome.i18n.getMessage(`${p.getAttribute("lang")}`)
            })
            const a = [...setting.category.options];
            a.forEach(optns => {
                if (optns.getAttribute("lang")) optns.textContent = chrome.i18n.getMessage(`${optns.getAttribute("lang")}`)
            });
            pomodoro.minutes.innerText = settings.start;
            pomodoro.graphs.forEach(g => g.setAttribute("data-content", chrome.i18n.getMessage("avrgpmdr")));
        })
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
                });
            } else if (process == "save") {
                chrome.storage.local.set({
                    "settings": JSON.stringify(defaultsettings)
                });
                showAlert("alertSettings", "success", "sttngssvd");
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
            setting.uploadLabel.textContent = chrome.i18n.getMessage('cstmwllpprbtn');
            setting.custom.value = "";
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
            chrome.storage.local.set({
                "settings": JSON.stringify(settings)
            });
            loadLangToUI();
            checkAlarm();
            dailyControl("save");
            showAlert("alertSettings", "success", "sttngssvd");
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
    switch (style) {
        case 'calendar':
            return `${time.getDate()}/${time.getMonth() + 1}/${time.getFullYear()}`
        case 'notification':
            return `${time.getHours()}${time.getMinutes()}${time.getDate()}${time.getMonth() + 1}${time.getFullYear()}`
        case 'day':
            return time.getDay() - 1
        case 'hour':
            return time.getHours()
    }
}

function getFromStorage(key) {
    if (key === 'all') {
        return new Promise(resolve => {
            chrome.storage.local.get(result => resolve(result))
        })
    } else {
        return new Promise(resolve => {
            chrome.storage.local.get([key], result => {
                if (Object.entries(result).length !== 0) result = JSON.parse(result[Object.keys(result)[0]]);
                else result = [];
                resolve(result);
            })
        })
    }
}

function showAlert(alertid, type, message) {

    if (!document.documentElement.clientWidth){ // only extension browser action button //+ background module
if (type === "danger") sounds.danger.play();
else sounds.warning.play();     
            }
            let alert = document.querySelector(`#${alertid}`);
            let notice = document.createElement("div");
            notice.className = `btn btn-${type} fade show`;
            notice.textContent = chrome.i18n.getMessage(`${message}`);
            alert.appendChild(notice);
            setTimeout(function () {
                notice.className = `btn btn-${type} fade`;
            }, 2000);
            setTimeout(function () {
                alert.firstChild.remove();
            }, 2150);
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

function recoveryUpdate() {
    getFromStorage("todos").then(todos => {
        todos.forEach((todo, i) => {
            if (typeof todo == 'string') {
                todos[i] = {
                    "todo": todo,
                    "estimation": 1,
                    "tag": null
                }
            } else if (todo.url !== undefined && todo.tag === undefined) {
                todos[i] = {
                    "todo": todo.name,
                    "url": todo.url,
                    "estimation": 1,
                    "tag": null
                }
            }
        })
        chrome.storage.local.set({
            "todos": JSON.stringify(todos)
        });
    })
    getFromStorage("pomodoro").then(p => {
        if (p.hours === undefined) p.hours = {
            0: 40,
            1: 40,
            2: 30,
            3: 20,
            4: 30,
            5: 40,
            6: 45,
            7: 75,
            8: 85,
            9: 85,
            10: 85,
            11: 85,
            12: 65,
            13: 65,
            14: 60,
            15: 50,
            16: 65,
            17: 70,
            18: 70,
            19: 60,
            20: 60,
            21: 60,
            22: 60,
            23: 50,
        }
        chrome.storage.local.set({
            "pomodoro": JSON.stringify(p)
        });
    });

    getFromStorage("users").then(users => {
        if (users.length === 0) users = {}
        chrome.storage.local.set({
            "users": JSON.stringify(users)
        });
    }); // temporal
}