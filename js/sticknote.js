function addNote(e) {
    var uuId = uuidv4();
    $('.note').each(
      function () {
        if ($(this).find('textarea').val() === '') { $(this).remove(); }
      }
    );
  
  
    var note = $('<div class="note"><div class="close"></div><div class="save"></div> <div class="pin" style="display:none;"></div><textarea placeholder=""></textarea></div>');
  
    $(note).css('left', e.pageX - 50);
    $(note).css('top', e.pageY - 25);
    $(note).find('textarea').css('width', '250px');
    $(note).find('textarea').css('height', '250px');
    $(this).append(note);
    $(note).draggable();
    $(note).find('textarea').focus();
    $(note).find('.pin').css('display', 'block');
    $(note).click(function (e) { return false; });
    $(note).find(".close").click(
      function () {
        if (confirm("Xác nhận xóa note.!") == true) {
          deleteNote(uuId)
          $(note).remove();
        } else {
          return false;
        }
        return false;
      });
  
  
    $(note).find(".save").click(
      function () {
        var dataSave = { id: uuId, url: window.location.href, width: $(note).find('textarea').css("width"), height:$(note).find('textarea').css("height") , x: $(note).css("left"), y: $(note).css("top"), text: $(note).find('textarea').val() }
        saveNote(dataSave);
        return false;
      });
    $(note).find(".pin").click(
      function () {
        if (checkPin(uuId)) {
          removePin(uuId);
        } else {
          pinNote(uuId);
        }
        return false;
      });
  
  
  
    $(note).hover(
      function () {
        $(note).find(".close").toggle();
        $(note).find(".save").toggle();
        $(note).find(".pin").css('display', 'block');
      });
  
  
  }
  
  function saveNote(data) {
    var listData = [];
    try {
      listData = JSON.parse(localStorage.getItem("dataNote"));
    }
    catch (err) {
  
    }
  
    if (!listData) {
      listData = [];
    }
    listData = listData.filter(x => x.id != data.id);
    listData.push(data);
    localStorage.setItem("dataNote", JSON.stringify(listData));
    alert("lưu thành công")
  }
  
  function uuidv4() {
    return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
      (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
    );
  }
  
  function addNoteData(data) {
  
    var uuId = data.id;
    var note = $('<div class="note"><div class="close"></div><div class="save"></div> <div class="pin" style="display:none;"></div><textarea placeholder=""></textarea></div>');
  
    $(note).css('left', data.x);
    $(note).css('top', data.y);
    $(note).find('textarea').css('width', data.width);
    $(note).find('textarea').css('height', data.height);
  
    $(note).find('textarea').val(data.text);
    $('body').append(note);
    $(note).draggable();
    $(note).find('textarea').focus();
  
    if (checkPin(data?.id)) {
      $(note).find('.pin').css('display', 'block');
    }
  
  
    $(note).click(function (e) { return false; });
    $(note).find(".close").click(
      function () {
        if (confirm("Xác nhận xóa note.!") == true) {
          deleteNote(uuId)
          $(note).remove();
        } else {
          return false;
        }
  
        return false;
      });
  
  
    $(note).find(".save").click(
      function () {
        var dataSave = { id: uuId, url: window.location.href, width: $(note).find('textarea').css("width"), height:$(note).find('textarea').css("height") , x: $(note).css("left"), y: $(note).css("top"), text: $(note).find('textarea').val() }
        saveNote(dataSave);
        return false;
      });
  
    $(note).find(".pin").click(
      function () {
        if (checkPin(uuId)) {
          removePin(uuId);
        } else {
          pinNote(uuId);
        }
        return false;
      });
  
    $(note).hover(
      function () {
        $(note).find(".close").toggle();
        $(note).find(".save").toggle();
        if (checkPin(data?.id)) {
          $(note).find('.pin').css('display', 'block');
        } else {
          $(note).find(".pin").toggle();
        }
  
      });
  }
  
  function checkPin(id) {
    var listPin = [];
    try {
      var listPin = JSON.parse(localStorage.getItem("pinNote"));
    }
    catch (err) {
  
    }
  
    if (!listPin) {
      listPin = [];
    }
    return listPin.includes(id);
  }
  
  function pinNote(id) {
  
    var listPin = [];
    try {
      var listPin = JSON.parse(localStorage.getItem("pinNote"));
    }
    catch (err) {
  
    }
  
    if (!listPin) {
      listPin = [];
    }
    listPin.push(id);
    localStorage.setItem("pinNote", JSON.stringify(listPin));
    alert("pin thành công")
  }
  
  function removePin(id) {
  
    var listPin = [];
    try {
      var listPin = JSON.parse(localStorage.getItem("pinNote"));
    }
    catch (err) {
  
    }
  
    if (!listPin) {
      listPin = [];
    }
    listPin = listPin.filter(item => item != id);
    localStorage.setItem("pinNote", JSON.stringify(listPin));
    alert("Xóa pin thành công")
  }
  
  function getNote() {
    var listDataPin = JSON.parse(localStorage.getItem("pinNote"));
    var listData = JSON.parse(localStorage.getItem("dataNote"));
    if (!listData) {
      listData = [];
    }
    for (var i = 0; i < listData.length; i++) {
      if (window.location.href == listData[i].url || listDataPin.includes(listData[i].id))
        addNoteData(listData[i]);
    }
  
  }
  
  function deleteNote(uuId) {
    var listData = JSON.parse(localStorage.getItem("dataNote"));
    var listNew = listData.filter(x => {
      return x.id != uuId;
    })
  
    localStorage.setItem("dataNote", JSON.stringify(listNew));
  
  
  }
  
  
  $(document).ready(function () {
    debugger
    var key_setting_on_off = "sticknote-setting";
    if (localStorage.getItem(key_setting_on_off) == 'on') {
      // open comment when setting double click
      $('body').dblclick(addNote);
    }
  
    $('.note').hover();
  
    if (localStorage.getItem(key_setting_on_off) == 'on' || localStorage.getItem(key_setting_on_off) == 'on-not-add') {
      getNote();
    }
  
    $(".note").hover(function () {
      $('.flyout').show();
    }, function () {
      $('.flyout').hide();
    });
  
  });