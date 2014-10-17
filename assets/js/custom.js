
var answer;
var result;

var gameSelected = false;
var answerSelected = false;
var newQuestion;

var questionList;

function initTheme() {

}

$(function() {
//    eraseCookie("aed");
//    eraseCookie("gameCount");
    initGame();
});

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
    $("#main-page").fadeIn();
    $("#play-mode-game").fadeOut();
    $("#gameResult").fadeOut();
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
            start(mode);
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
    $("#main-page").fadeOut();
    $("#game").fadeIn();
    newQuestion = true;
}

function showQuestion(mode) {
    var qid = parseInt($("#qid").text());
    $("#que_name").text("Question "+(parseInt($("#qid").text())+1));
    var question = questionList[qid];
    console.log(question);
    var id = "#q1"+(qid+1);
    $(id).css({'backgroundImage':"url('assets/image/1.png')"})
    console.log(id);
    if(mode == 1 || mode == 3) {
        $("#question-statement").text(question.statement);
        $("#opta").text(question.opta);
        $("#optb").text(question.optb);
        $("#optc").text(question.optc);
        $("#optd").text(question.optd);
    } else {
        $("#q-statement").text(question.statement);
        $("#a").text(question.opta);
        $("#b").text(question.optb);
        $("#c").text(question.optc);
        $("#d").text(question.optd);
    }


    bindAnswer(mode);
}

function startGame(mode) {
    if(mode == 1 || mode == 3) {
        $("#opta").css({background: 'linear-gradient(to right, rgba(0, 133, 201, 1) 0%, rgba(63, 75, 155, 1) 63%) repeat scroll 0 0 rgba(0, 0, 0, 0)'});
        $("#optb").css({background: 'linear-gradient(to right, rgba(0, 133, 201, 1) 0%, rgba(63, 75, 155, 1) 63%) repeat scroll 0 0 rgba(0, 0, 0, 0)'});
        $("#optc").css({background: 'linear-gradient(to right, rgba(0, 133, 201, 1) 0%, rgba(63, 75, 155, 1) 63%) repeat scroll 0 0 rgba(0, 0, 0, 0)'});
        $("#optd").css({background: 'linear-gradient(to right, rgba(0, 133, 201, 1) 0%, rgba(63, 75, 155, 1) 63%) repeat scroll 0 0 rgba(0, 0, 0, 0)'});
    } else {
        $("#a").css({background: 'linear-gradient(to right, rgba(0, 133, 201, 1) 0%, rgba(63, 75, 155, 1) 63%) repeat scroll 0 0 rgba(0, 0, 0, 0)'});
        $("#b").css({background: 'linear-gradient(to right, rgba(0, 133, 201, 1) 0%, rgba(63, 75, 155, 1) 63%) repeat scroll 0 0 rgba(0, 0, 0, 0)'});
        $("#c").css({background: 'linear-gradient(to right, rgba(0, 133, 201, 1) 0%, rgba(63, 75, 155, 1) 63%) repeat scroll 0 0 rgba(0, 0, 0, 0)'});
        $("#d").css({background: 'linear-gradient(to right, rgba(0, 133, 201, 1) 0%, rgba(63, 75, 155, 1) 63%) repeat scroll 0 0 rgba(0, 0, 0, 0)'});
    }

    var qid = parseInt($("#qid").text());
    showQuestion(mode);


}

function start(mode) {
    $("#qid").text("0");
    setTimeout(function() {
        $("#play-mode-game").fadeOut();
        $("#gameA").css({opacity:"1"});
        $("#gameB").css({opacity:"1"});
        $("#play-mode-game").fadeIn();

        if(mode == 1 || mode == 3){
            $("#gameA").fadeIn();
            $("#gameB").fadeOut();
        } else {
            $("#gameA").fadeOut();
            $("#gameB").fadeIn();
        }


        $("#start-page").fadeIn();
        $("#question-page").fadeOut();
        $("#gameResult").fadeOut();
        $("#result-table").empty();
        $("#responser").text("");
    }, 500);

    switch(mode) {
        case "1":
            $("#que_name").text("Prove your UAB Product Knowledge");
            break;

        case "2":
            $("#que_name").text("Prove your Sales Funnel Knowledge");
            break;

        case "3":
            $("#que_name").text("Prove your Market and Competitive Knowledge");
            break;

        case "4":
            $("#que_name").text("Prove your Hidden Level Knowledge");
            break;
    }

    $("#start-game").on('click', function() {
        $("#start-page").fadeOut();
        setTimeout(function() {
            $("#question-page").fadeIn();
        }, 500);

        startGame(mode);
    });

    $("#start-game-1").on('click', function() {
        $("#start-page-game2").fadeOut();
        setTimeout(function() {
            $("#question-block").fadeIn();
        }, 500);

        startGame(mode);
    });

    $("#start-game-2").on('click', function() {
        $("#start-page-game2").fadeOut();
        setTimeout(function() {
            $("#question-block").fadeIn();
        }, 500);

        startGame(mode);
    });

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

    if(mode == 1 || mode == 3) {
        var ans = ""+answer.charAt(answer.length-1);
    } else {
        var ans = ""+answer
    }

    var qid = parseInt($("#qid").text());
    if(questionList[qid].correct == ans) {
        $("#"+answer).css({background: 'none repeat scroll 0% 0% green'});
        $("#responser").text("Correct!");
        result.push("Correct");
    } else {
        if(mode == 2 || mode == 4)
        {
            $("#"+answer).css({background: 'none repeat scroll 0% 0% red'});
            $("#gameResult").css({opacity:'1'}).show();
            $("#gameB").css({opacity:"0.3"});
            $("#end-message").append("<h2> Uh-oh! You lost the client. </h2>");
            setTimeout(function() {
                showEndResult(mode);
            }, 1000);
        } else {
            $("#responser").text("Wrong!");
            $("#"+answer).css({background: 'none repeat scroll 0% 0% red'});
            result.push("Wrong");
        }
    }
    qid++;
    $("#qid").text(qid);
    $("#default-msg").fadeOut();
    setTimeout(function() {
        if(qid < 5)
            $("#next-level").fadeIn();

        $("#responser").fadeIn();
    }, 500);


    if(qid < 5) {
        nextQuestion(mode);
    } else {
        setTimeout(function() {
            showEndResult(mode);
        }, 1000);

    }


}

function nextQuestion(mode) {
    $("#next-level").on('click', function() {
        if(answerSelected == true) {
            answerSelected = false;
            $("#default-msg").fadeIn();
            $("#next-level").fadeOut();
            $("#responser").fadeOut();
            $("#responser").text("");
            startGame(mode);
        }
    });
}

function showEndResult(mode) {
    setTimeout(function() {
        $("#gameResult").css({opacity:"1"}).show();
        $("#gameA").css({opacity:"0.3"});
        $("#gameB").css({opacity:"0.3"});
    }, 500);
    addGame();
    addAED();
    setTimeout(function() {
        if(mode == 1 || mode == 3) {
            $("#result-table").append(
                "<tr>" +
                    "<th style='text-align: center'>Level</th>" +
                    "<th style='text-align: center'>Correct</th>" +
                    "<th style='text-align: center'></th>" +
                    "</tr>"
            );
            for(var i=0; i<5; i++){
                $("#result-table").append(
                    "<tr align='center'>" +
                        "<td> Question " + (i+1) + "</td>" +
                        "<td>"+ result[i] + "</td>" +
                        "<td> <a target='blank' href='#'>Read More</a> </td>"  +
                        "</tr>"
                );
            }
        }

        $("#restart-game").on('click', function() {
            answerSelected = false;
            start(mode);
        });

        $("#back-to-home").on('click', function() {
            answerSelected = false;
            gameSelected = false;
            gameSelect();
        });

//        setTimeout(function() {
//            gameSelected = false;
//            gameSelect();
//        }, 4000);

    }, 500);
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