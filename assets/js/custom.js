var answer = [];
var result = [];
var aed;
var questionnum;

var questionList;

var gameSelected = false;

function initTheme() {

}

function initGame() {
    aed = initAED;
}




function gameSelect() {
    $("#gamePlay").fadeOut();
    $("#gameSelect").fadeIn();
    $(".games").on('click', function() {
        if(gameSelected == false) {
            gameSelected = true;
            switch(this.attr("id")) {
                case "1":
                    showGame(1);
                    game1(this.attr("id"));
                    break;

                case "2":
                    showGame(2);
                    game2(this.attr("id"));
                    break;

                case "3":
                    showGame(3);
                    game3(this.attr("id"));
                    break;

                case "4":
                    showGame(4);
                    game4(this.attr("id"));
                    break;
            }
        }
    });
}

function showGame(id) {
    $("#gameSelect").fadeOut();
    $("#gamePlay").fadeIn();
    $("#game1").fadeOut();
    $("#game2").fadeOut();
    $("#game3").fadeOut();
    $("#game4").fadeOut();

    var div = "#game"+id;
    $(div).fadeIn();

}

function game1(id) {

    setQuestions(id);




}

function game2(id) {
    setQuestions(id);
}

function game3(id) {
    setQuestions(id);
}

function game4(id) {
    setQuestions(id);
}
function init() {

    setQuestions(1);
    var question = showQuestion();

    $("#question-statement").append(question.statement);
    $("#opta").append(question.opta);
    $("#optb").append(question.optb);
    $("#optc").append(question.optc);
    $("#optd").append(question.optd);
}


function setQuestions(mode) {
  questionList = $.grep(questions, function(element) {
      return element.mode_master == mode;
  });
    questionList = shuffle(questionList);
}

function showQuestion(pos) {
    var question = questionList[pos];
    console.log(question);
    return question;
}

function processAnswer() {

}