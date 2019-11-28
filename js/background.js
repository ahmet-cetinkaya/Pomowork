var notifications;
var color;

loadExtension();

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
                    iconUrl: 'images/soup.png',
                    title: eval(`lang.alrt.fnshpmdr.${settings.language}.split("|")[0]`),
                    message: eval(`lang.alrt.fnshpmdr.${settings.language}.split("|")[1]`),
                    contextMessage: 'Pomowork',
                },
                fnsh4pmdr: {
                    type: 'basic',
                    iconUrl: 'images/star.png',
                    title: eval(`lang.alrt.fnsh4pmdr.${settings.language}.split("|")[0]`),
                    message: eval(`lang.alrt.fnsh4pmdr.${settings.language}.split("|")[1]`),
                    contextMessage: 'Pomowork',
                },
                fnshbrk: {
                    type: 'basic',
                    iconUrl: 'images/tomato.png',
                    title: eval(`lang.alrt.fnshbrk.${settings.language}.split("|")[0]`),
                    message: eval(`lang.alrt.fnshbrk.${settings.language}.split("|")[1]`),
                    contextMessage: 'Pomowork',
                },
                fnshlgbrk: {
                    type: 'basic',
                    iconUrl: 'images/tomato.png',
                    title: eval(`lang.alrt.fnshlgbrk.${settings.language}.split("|")[0]`),
                    message: eval(`lang.alrt.fnshlgbrk.${settings.language}.split("|")[1]`),
                    contextMessage: 'Pomowork',
                },
            };
        });

    chrome.notifications.onClicked.addListener(() => {
        chrome.tabs.create({
            url: "chrome://newtab"
        });
    });

    chrome.browserAction.onClicked.addListener(() => pomodoroTime("toggle"));

    getFromStorage("pomodoro")
        .then(pomodoro => {
            const defaultPomodoro = {
                "countdowntime": "",
                "timeprocess": "",
                "emj": "",
                "allpomodorotimes": 0,
                "pomodorotimes": 0,
                "countdowntimepercent": "",
            }
            if (pomodoro.length == 0) {
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
                        setTimeout(() => smoothWave(-235), 1100);
                        if (p.timeprocess === "focus") {
                            p.allpomodorotimes++;
                            p.pomodorotimes++;
                            pomodoro.allpomodoro.innerText = p.allpomodorotimes;
                            pomodoro.longbreak.innerText = p.pomodorotimes;
                            if (p.pomodorotimes % 4 !== 0) {
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

function setBadge(text, setColor) {
    if (setColor === "focus") color = [220, 53, 69, 1];
    else if (setColor === "break" || setColor === "longbreak") color = [194, 155, 0, 1];
    chrome.browserAction.setBadgeBackgroundColor({
        color: color
    });
    chrome.browserAction.setBadgeText({
        text: text
    });
}

//: daily pomodoro history backup, and total pomodoro default