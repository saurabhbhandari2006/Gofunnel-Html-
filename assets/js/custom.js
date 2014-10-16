
var answer;
var result;
var aed;

var gameSelected = false;
var answerSelected = false;
var newQuestion;

var questionList;

function initTheme() {

}

function initGame() {
    aed = initAED;
    gameSelect();
}




function gameSelect() {
    answer = [];
    result = [];
    $("#game").fadeOut();
    $("#message").fadeOut();
    $("#gameSelect").fadeIn();
    $("#endResult").fadeOut();
    $("#qid").text(0);
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
    setTimeout(function() {
        for(var i=0; i<5; i++){
            $("#endResult").append("<tr><td align='left'> Question " + (i+1) + "</td><td align='right'>"+ result[i] + "</td></tr>");
        }
    }, 1000);
}