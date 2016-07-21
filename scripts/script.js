/**
 * Created by James on 03/12/2015.
 */

var myInput;
var userIdentifier = "person";
var characters = [];
var lesson;
var evalStatement;

function runUser() {
    evalStatement = "";

    for (var i = 0; i < myInput.length; i++) {
        var charResult = myInput[i].indexOf("//");

        if (charResult != -1) {
            evalStatement = evalStatement + myInput[i].substr(0, charResult);
        }
        else {
            evalStatement = evalStatement + myInput[i];
        }

        document.getElementById("console").value = "The input is valid";
        eval(evalStatement);
        checkLessonComplete();
    }
}

function toggleHelp() {
    $("#help").animate({width: 'toggle'});
    var text = document.getElementById("toggleHelpButton").value;

    if (text === "Show Help") {
        document.getElementById("toggleHelpButton").value = "Hide Help";
    }
    else {
        document.getElementById("toggleHelpButton").value = "Show Help";
    }
}

function toggleInstructions() {
    $("#instructions").animate({width: 'toggle'});
    var text = document.getElementById("toggleInstructionsButton").value;

    if (text === "Show Instructions") {
        document.getElementById("toggleInstructionsButton").value = "Hide Instructions";
    }
    else {
        document.getElementById("toggleInstructionsButton").value = "Show Instructions";
    }
}



function getInput() {
    document.getElementById('console').innerHTML = "";
    var lines = editor.getValue().split('\n');
    myInput = [];

    myInput.push("/*jslint sloppy: true, newcap: true, plusplus: true, white:true, devel: true, eqeq: true, sub:true,*/");
    myInput.push("/*global log, character:true, createCharacter:true, drawToCanvas, canvas, editor, requestAnimFrame, Rect, Circle, SemiCircle, Text, FillColour, update:true*/");

    for (var i =0; i < lines.length; i++) {
        if (lines[i] !== "") {
            isInput = true;
        }
    }
    if (isInput === true) {
        validate(myInput);
    }
}

function validate(myInput) {
    var result = JSLINT(myInput);
    errorReport = JSLINT.data(result);
    if(errorReport.errors.length !== 0) {
        myReport = "At line " + (errorReport.errors[0].line - 2) + " character " + errorReport.errors[0].character + ":\n" + errorReport.errors[0].reason;
        document.getElementById('console').value = myReport;
    }
    else {
        document.getElementById('console').value = "The input is valid";
    }
}

function updateUserIdentifier()
{
    var i;
    userIdentifier = "";
    characters = [];
    for (i = 0; i < myInput[i].length; i++)
    {
        var charResult = myInput[i].indexOf("= new Character");
        if(charResult != -1) {
            var varResult = myInput[i].indexOf("var")
            if(varResult != -1){
                userIdentifier = (myInput[i].substr(4, charResult - 5));
            }
            else{
                userIdentifier = (myInput[i].substr(0, charResult - 1));
                characters.push(userIdentifier)
            }
        }
    }
    var insertsionButtons = document.getElementsByClassName("hButton");
    if (typeof insertsionButtons ==="undefined") {
        if (userIdentifier === "") {
            for (var i = 0; i < insertsionButtons.length; i++) {
                insertsionButtons[i].disabled = true;
            }
            insertsionButtons[insertsionButtons.length - 1].disabled = false;
        }
        else {
            for (var i = 0; i < insertsionButtons.length; i++) {
                insertsionButtons[i].disabled = false;
            }
        }
    }
}

function log(msg){
    if(document.getElementById('console').value === "The input is valid") {
        document.getElementById('console').value = msg;
    }
    else {
        document.getElementById('console').value = document.getElementById('console').value + "\n" + msg;
    }
}

function sprompt(msg){
    var userInput;
    $.msgBox({
        type : "prompt",
        title: "Prompt",
        inputs: [
            {header: msg, type: "text", name: "userInput"},
        ],
        buttons: [
            {value: "Confirm"},
            {value: "Cancel"}
        ],
        success: function(result, values) {
            if(result === "Confirm"){
                var v;
                $(values).each(function (index, input) {
                    if(input.name === "userInput") {
                        userInput = input.value;
                    }
                });
                alert(userInput);
                return userInput;
            }
        }
    });
}

function salert(aTitle, aContent){
    $.msgbox()({
        title: aTitle,
        aContent: aContent,
        type: "info"
    });
}

function sleep(milliseconds)
{
    var start = new Date().getTime();
    for (var i = 0;i<1e7;i++) {
        if((new Date().getTime() - start) > milliseconds){
            break;
        }
    }
}