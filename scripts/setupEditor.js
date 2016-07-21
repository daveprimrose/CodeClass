/**
 * Created by James on 03/12/2015.
 */
var editor = ace.edit("editor");
editor.setTheme("ace/theme/monokai");
editor.getSession().setMode("ace/mode/javascript");
session = editor.getSession();
session.setMode("ace/mode/javascript");

session.on('change', function(e) {
    getInput();
    updateUserIdentifier();
    upload = document.getElementById('run');
    if (document.getElementById('console').value != "The input is valid") {
        upload.disabled(true);
    } else
    {
        upload.disabled(false);
    }
});

editor.commands.addCommand({
    name:'addMove',
    bindKey: {win:'Ctrl-Alt-F', mac: 'Command-F'},
    exec: function (editor) {
        addForLoop();
    }
});
addMaxEditor();

function clearCode() {
    editor.value("");
}

function toggleFullScreen() {
    var editorID, consoleID;
    editorID = document.getElementById("editor");
    var console = document.getElementById("console");
    var buttonContainer = document.getElementById("console");
    if(editorID != null) {
        editorID.setAttribute('id', 'editorFullScreen');
        editor.resize(true);
        console.style.position = "absolute";
        console.style.bottom= "5%";
        console.style.zIndex = 5;
        console.style.width = "60%";
        console.style.height = "15%";
        console.style.minWidth = "585px";
        console.style.margin = "auto -21px";
        console.style.border = "1px solid black";
        document.getElementById("buttonContainer").setAttribute("id", "buttonContainerFullScreen");
    }
    else {
        editorID = document.getElementById("editorFullScreen");
        editorID.setAttribute('id', 'editor');
        editor.resize(true);
        console.removeAttribute("style");
        document.getElementById("buttonContainerFullScreen").setAttribute("id", "buttonContainer");
    }
}

function addMaxEditor() {
    var editorElement = document.getElementById("editor");
    var img = document.createElement("img");
    img.setAttribute("src", "images/max.png");
    img.setAttribute("id", "maxEditor");
    img.style.top = 0;
    img.style.right = "18px";
    img.style.width = "25px";
    img.style.height = "25px";
    img.style.zIndex = 5;
    img.style.position = "absolute";
    editorElement.appendChild(img);
    $("#maxEditor").click(function(){
       toggleFullScreen();
    });
}


