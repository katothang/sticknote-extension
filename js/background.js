

chrome.contextMenus.create({
    id: "on",
    title: "Mở StickNote",
    contexts: ["all"]
});

chrome.contextMenus.create({
    id: "off",
    title: "Tắt StickNote",
    contexts: ["all"]
});

chrome.contextMenus.create({
    id: "on-not-add",
    title: "Tắt add StickNote",
    contexts: ["all"]
});

chrome.contextMenus.create({
    id: "remove-all-with-page",
    title: "Xóa tất cả StickNote trong page",
    contexts: ["all"]
});

chrome.contextMenus.create({
    id: "remove-all",
    title: "Xóa tất cả StickNote",
    contexts: ["all"]
});


chrome.contextMenus.onClicked.addListener(function(info, tab) {
    if (tab) {
       
        if (info.menuItemId === "on"){
            
            var code = ' localStorage.setItem("sticknote-setting", "on"); alert("Đã mở stickNote"); location.reload();';
            chrome.tabs.executeScript(tab.id, { code: code });
        }
        if (info.menuItemId === "off"){
            var code = 'localStorage.setItem("sticknote-setting", "off"); alert("Đã tắt stickNote"); location.reload();';
            chrome.tabs.executeScript(tab.id, { code: code });
        }
        if (info.menuItemId === "on-not-add"){
            var code = 'localStorage.setItem("sticknote-setting", "on-not-add"); alert("Đã tắt thêm stickNote"); location.reload();';
            chrome.tabs.executeScript(tab.id, { code: code });
        }

        if (info.menuItemId === "remove-all-with-page"){
            var code = 'var listData = JSON.parse(localStorage.getItem("dataNote")); var listNew = listData.filter(x => {return x.url != window.location.href;}); localStorage.removeItem("dataNote"); localStorage.setItem("dataNote", JSON.stringify(listNew)); alert("đã xóa tất cả stickNote"); location.reload();';
            chrome.tabs.executeScript(tab.id, { code: code });
        }

        if (info.menuItemId === "remove-all"){
            var code = 'localStorage.removeItem("dataNote"); location.reload();';
            chrome.tabs.executeScript(tab.id, { code: code });
        }
    }
});