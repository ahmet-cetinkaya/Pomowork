var alarmName = 'pomodoro';

function checkAlarm(callback) {
    chrome.alarms.getAll(function (alarms) {
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
                            pomodoro.water.style.height = `${235 - (235 * (p.countdowntime / p.countdowntimepercent))}px`
                            setBadge(`${p.countdowntime}`, `${p.timeprocess}`)
                            chrome.contextMenus.update('pomodoro', {
                                title: eval(`lang.stp.${settings.language}`)
                            })
                        } else { // alarm off
                            newLabel = eval(`lang.strt.${settings.language}`);
                            newClass = "btn btn-success";
                            pomodoro.minutes.innerText = settings.start;
                            pomodoro.emj.src = ""
                            setTimeout(() => smoothWave(-235), 1100);
                            setBadge("", "focus")
                            chrome.contextMenus.update('pomodoro', {
                                title: eval(`lang.strt.${settings.language}`)
                            })
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
checkAlarm();