var answer;
var result;
var gameSelected = false;
var answerSelected = false;
var newQuestion;
var questionList;

function initTheme() {
}

function initGame() {
    if(readCookie("aed") == null){
        var aed = initAED;
        createCookie("aed", aed, 30);
        createCookie("gameCount", 0, 30);
    }

    gameSelect();
}

function gameSelect() {
    answer = [];
    result = [];
    $("#endResult").empty();
    $("#game").fadeOut();
    $("#message").fadeOut();
    $("#gameSelect").fadeIn();
    $("#endResult").fadeOut();
    $("#qid").text(0);
    console.log("aed:" + readCookie("aed"));
    console.log("gameCount: " + readCookie("gameCount"));
    $(".games").on('click', function() {
        if(gameSelected == false) {
            gameSelected = true;
            var id = $(this).attr("id");
            var mode = ""+id.charAt(id.length-1);
            setQuestions(mode);
            showGame();
            setTimeout(function() {
                startGame(mode);
            }, 2000);
        }
    });
}

function setQuestions(mode) {
    questionList = $.grep(questions, function(element) {
        return element.mode_master == mode;
    });
    questionList = shuffle(questionList);
}

function showGame() {
    $("#gameSelect").fadeOut();
    $("#game").fadeIn();
    newQuestion = true;
}

function showQuestion(mode) {
    var qid = parseInt($("#qid").text());
    var question = questionList[qid];
    console.log(question);
    $("#question-statement").text(question.statement);
    $("#opta").text(question.opta);
    $("#optb").text(question.optb);
    $("#optc").text(question.optc);
    $("#optd").text(question.optd);

    bindAnswer(mode);
}

function startGame(mode) {
    var qid = parseInt($("#qid").text());
    if(qid < 5) {
        showQuestion(mode);
    } else {
        showEndResult();
    }
}

function bindAnswer(mode) {
    $(".answer").on('click', function() {
        if(answerSelected == false) {
            answerSelected = true;
            answer.push($(this).attr("id"));
            processAnswer($(this).attr("id"), mode);
        }
    });
}

function processAnswer(answer, mode) {
    var ans = ""+answer.charAt(answer.length-1)
    var qid = parseInt($("#qid").text());
    if(questionList[qid].correct == ans) {
        result.push("correct");
    } else {
        if(mode == 3 || mode == 4)
        {
            $("#message").fadeIn();
            $("#message").text("Uh-oh! You lost the client.");
            setTimeout(function() {
                addGame();
                gameSelected = false;
                gameSelect();
            }, 2000)
        } else {
            result.push("wrong");
        }

    }
    $("#result").text(result[qid]);
    qid++;
    $("#qid").text(qid);
    setTimeout(function() {
        answerSelected = false;
        $("#result").text("");
        startGame(mode);
    }, 2000);
}

function showEndResult() {
    $("#game").fadeOut();
    $("#endResult").fadeIn();
    addGame();
    addAED();
    setTimeout(function() {
        for(var i=0; i<5; i++){
            $("#endResult").append("<tr><td align='left'> Question " + (i+1) + "</td><td align='right'>"+ result[i] + "</td></tr>");
        }

        setTimeout(function() {
            gameSelected = false;
            gameSelect();
        }, 4000);

    }, 1000);
}

function addGame() {
    var count = parseInt(readCookie("gameCount"));
    count++;
    eraseCookie("gameCount");
    createCookie("gameCount", count, 30);
}

function addAED() {
    var gameCount = parseInt(readCookie("gameCount"));
    var conversion = (Math.floor(Math.random()*gameCount*100))%100;
    console.log(conversion);
    var aed = parseInt(readCookie("aed"));
    console.log("Current aed:" + aed);
    aed += conversion;
    eraseCookie("aed");
    createCookie("aed", aed, 30);
}

function createCookie(name,value,days) {
    if (days) {
        var date = new Date();
        date.setTime(date.getTime()+(days*24*60*60*1000));
        var expires = "; expires="+date.toGMTString();
    }
    else var expires = "";
    document.cookie = name+"="+value+expires+"; path=/";
}

function readCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
}

function eraseCookie(name) {
    createCookie(name,"",-1);
}