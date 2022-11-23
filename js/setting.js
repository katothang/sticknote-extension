var key_setting_on_off = "on_stick";
var dataSetting = "off";
chrome.storage.onChanged.addListener(function (changes, namespace) {
    for (let [key, { oldValue, newValue }] of Object.entries(changes)) {
      console.log(
        `Storage key "${key}" in namespace "${namespace}" changed.`,
        `Old value was "${oldValue}", new value is "${newValue}".`
      );
    }
  });
$(document).ready(function () {

    dataSetting = getData(key_setting_on_off);
    if (dataSetting == "on") {
        document.getElementById("on").checked = true;
        document.getElementById("off").checked = false;
        document.getElementById("on-not-create").checked = false;
        chrome.storage.local.set({key_setting_on_off: "on" }, function () {
            console.log('Saved');
        });
    }
    else if (dataSetting == "on-not-create") {
        chrome.storage.local.set({key_setting_on_off: "on-not-create" }, function () {
            console.log('Saved');
        });
        
        document.getElementById("on").checked = false;
        document.getElementById("off").checked = false;
        document.getElementById("on-not-create").checked = true;
        

    } else {
        chrome.storage.local.set({key_setting_on_off: "off" }, function () {
            console.log('Saved');
        });
        document.getElementById("on").checked = false;
        document.getElementById("off").checked = true;
        document.getElementById("on-not-create").checked = false;
    }



});

function getData(key) {
    return localStorage[key];
}

function saveData(key, data) {
    
    chrome.storage.sync.set({ key: data });
    localStorage[key] = data;
}

function settingApp() {

    if (document.getElementById("on").checked) {
        saveData(key_setting_on_off, "on");
    } else if(document.getElementById("on-not-create").checked) {
        saveData(key_setting_on_off, "on-not-create");

    } else {
        saveData(key_setting_on_off, "off");
    }

}

document.getElementById("on").addEventListener("click", settingApp);
document.getElementById("off").addEventListener("click", settingApp);
document.getElementById("on-not-create").addEventListener("click", settingApp);