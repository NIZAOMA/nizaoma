function getQuestion() {
    $('#firstQuestion').css("display", "block");
    $('#firstQuestion1').css("display", "block");
}
$('#startAsk').click(function () {
    $('.js-add-question-splash.add-question-splash-page').css("display", "none");
    $('form.js-add-question-form').css("display", "block");
});

$('#cancelQuestion').click(function(){
    $('#firstQuestion').css("display", "none");
    $('#firstQuestion1').css("display", "none");
    $('.js-add-question-splash.add-question-splash-page').css("display", "block");
    $('form.js-add-question-form').css("display", "none");
});

$('#span-cancelQuestion').click(function () {
    $('#firstQuestion').css("display", "none");
    $('#firstQuestion1').css("display", "none");
    $('.js-add-question-splash.add-question-splash-page').css("display", "block");
    $('form.js-add-question-form').css("display", "none");
});
$('#zh-question-suggest-title-content').change(function (){
    var  s;
    s = $('#zh-question-suggest-title-content').val();
    if (s[s.length - 1] != '?' && s[s.length - 1] != '？')
        $('#zm-modal-dialog-warnmsg-wrapper').css("display", "block");
});
function editTopic() {
    $('#editTopic').css("display", "block");
}
function cancelChangeTopic() {
    $('#editTopic').css("display", "none");
}
function editQuestion() {
    $('#zh-question-title').css("display", "none");
    $('#edit-zh-question-title').css("display", "block");
}
function cancelChangeContent() {
    $('#zh-question-title').css("display", "block");
    $('#edit-zh-question-title').css("display", "none");
    $('#select-text-1').css("display", "none");
    var obj = document.getElementById('select-1');
    obj.options[0].selected = "true";
}
function editDescription() {
    $('#zm-editable-content').css("display", "none");
    $('#cancel-zm-editable-content').css("display", "block");
    $('#editDescription').css("display", "none");
}
function cancelChangeDescription() {
    $('#zm-editable-content').css("display", "block");
    $('#cancel-zm-editable-content').css("display", "none");
    $('#select-text-2').css("display", "none");
    $('#editDescription').css("display", "block");
    var obj = document.getElementById('select-2');
    obj.options[0].selected = "true";
}
function seclectReason() {
    var obj = document.getElementById('select-2');

    var index = obj.selectedIndex; 

    var val = obj.options[index].text;
    if (val == "4. 其他")
        $('#select-text-2').css("display", "block");
    else
        $('#select-text-2').css("display", "none");
}
function seclectReason2() {
    var obj = document.getElementById('select-1');

    var index = obj.selectedIndex;

    var val = obj.options[index].text;
    if (val == "4. 其他")
        $('#select-text-1').css("display", "block");
    else
        $('#select-text-1').css("display", "none");
    var s;
    s = $('#zh-question-suggest-title-content1').val();
    if (s[s.length - 1] != '?' && s[s.length - 1] != '？')
        $('#zm-modal-dialog-warnmsg-wrapper1').css("display", "block");
}
function editAnswer() {
    $('#zh-answer-title').css("display", "none");
    $('#edit-zh-answer-title').css("display", "block");
}
function cancelChangeAnswer(){
    $('#zh-answer-title').css("display", "block");
    $('#edit-zh-answer-title').css("display", "none");
}
function show(i) {
    var img = document.createElement('img');
    img.src = '/content/arclist/' + i + '.gif';
    var m = document.getElementById('saytext');
    m.appendChild(img);
    $('#facebox').css("display", "none");
}

function showQD(i) {
    var img = document.createElement('img');
    img.src = '/content/arclist/' + i + '.gif';
    var m = document.getElementById('saytext1');
    m.appendChild(img);
    $('#facebox-Q').css("display", "none");
}


$('#fileToUpload').change(function () {
    window.URL = window.URL || window.webkitURL;
    var imgFile = document.getElementById('fileToUpload');
    var img1 = document.createElement('img');
    img1.style.width = "100px";
    if (window.URL) {
        //File API
        img1.src = window.URL.createObjectURL(imgFile.files[0]); //创建一个object URL，并不是你的本地路径

        img1.onload = function (e) {
            window.URL.revokeObjectURL(this.src); //图片加载后，释放object URL
        }

    }
    var m = document.getElementById('saytext');
    m.appendChild(img1);

});
$('.emotion').click(function (){
    $('#facebox').css("display","block");
});
$('#Qemotion').click(function () {
    $('#facebox-Q').css("display", "block");
});
function text() {
    var text = $('#saytext')[0].innerHTML;
    $('#QDescription')[0].value= text;
}
function saveQDescription() {
    var text = $('#saytext1')[0].innerHTML;
    $('#editQDescription')[0].value = text;
}

//回答区表情函数

$('#Aemotion').click(function () {
    $('#facebox-A').css("display", "block");
});

function showAD(i) {
    var img = document.createElement('img');
    img.src = '/content/arclist/' + i + '.gif';
    var m = document.getElementById('saytext-A');
    m.appendChild(img);
    $('#facebox-A').css("display", "none");
}
function saveAnswer() {
    var text = $('#saytext-A')[0].innerHTML;
    $('#AContent')[0].value = text;
}




//修改回答函数
$('#editAemotion').click(function () {
    $('#facebox-editA').css("display", "block");
});
function showeditAD(i) {
    var img = document.createElement('img');
    img.src = '/content/arclist/' + i + '.gif';
    var m = document.getElementById('saytext-editA');
    m.appendChild(img);
    $('#facebox-editA').css("display", "none");
}
function saveEditAnswer() {
    var text = $('#saytext-editA')[0].innerHTML;
    $('#zh-answer-suggest-title-content1')[0].value = text;
}