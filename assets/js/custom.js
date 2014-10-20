
var answer;
var result;

var gameSelected = false;
var answerSelected = false;
var newQuestion;

var questionList;

var reward;

function initTheme() {

}

$(function() {
//    eraseCookie("aed");
//    eraseCookie("gameCount");
//    eraseCookie("gameWin");
    initGame();
});

function initGame() {
    if(readCookie("aed") == null || readCookie("gameCount") == null || readCookie("gameWin") == null){
        var aed = initAED;
        createCookie("aed", aed, 30);
        createCookie("gameCount", 0, 30);
        createCookie("gameWin", 0, 30);
    }
    checkLock();
    gameSelect()
}

function checkLock() {
    if(parseInt(readCookie("aed")) < 100) {
        document.getElementById("lock").src = "assets/image/cross.png";
    } else {
        document.getElementById("lock").src = "assets/image/check.png";
    }
}

function gameSelect() {
    $("#main-page").fadeIn();
    $("#play-mode-game").fadeOut();
    $("#gameResult").fadeOut();
    $("#qid").text("0");
    console.log("aed:" + readCookie("aed"));
    console.log("gameWin: " + readCookie("gameWin"));
    console.log("gameCount: " + readCookie("gameCount"));
    $(".games").on('click', function() {
        if(gameSelected == false) {
            if($(this).attr("id") != "game4") {
                executeSelect($(this).attr("id"));
            } else {
                if(parseInt(readCookie("aed")) >= 100) {
                    var aed = parseInt(readCookie("aed")) - 100;
                    eraseCookie("aed");
                    createCookie("aed", aed, 30);
                    executeSelect($(this).attr("id"));
                }
            }
        }
    });
}

function executeSelect(id) {
    gameSelected = true;
    var mode = ""+id.charAt(id.length-1);
    $("#mode").val(mode);
    console.log("mode: " + mode);
    showGame();

    if(id == "game2" || id == "game4") {
        addGame();
        var win = parseInt(readCookie("gameWin"));
        var count = parseInt(readCookie("gameCount"));
        var ratio;
        var random1;
        var random2;

        ratio = Math.floor(win/count)*100;

        if(ratio <= 50) {
            random1 = getRandom(10, 100);
            random2 = Math.floor(random1*1.67);
        } else if (ratio > 50 && ratio <= 70) {
            random1 = Math.floor(getRandom(10, 100)*1.5);
            random2 = Math.floor(random1*1.67);
        } else if (ratio > 70 && ratio <= 80) {
            random1 = Math.floor(getRandom(10, 100)*2);
            random2 = Math.floor(random1*1.67);
        } else if (ratio > 80 && ratio <= 90) {
            random1 = Math.floor(getRandom(10, 100)*3);
            random2 = Math.floor(random1*1.67);
        } else if (ratio > 90 && ratio <= 100) {
            random1 = Math.floor(getRandom(10, 100)*2);
            random2 = Math.floor(random1*1.67);
        }

        $("#random1").text(random1+"k");
        $("#random2").text(random2+"k");

    }

    start();
}

function getRandom(min, max) {
    var n = Math.floor(Math.random() * (max-min) + min);
    return n;
}

function setQuestions() {
    var mode = $("#mode").val();
    if(mode != 4) {
        questionList = $.grep(questions, function(element) {
            return element.mode_master == mode;
        });
    } else {
        questionList = $.grep(questions, function(element) {
            return element.mode_master == 2;
        });
    }

    questionList = shuffle(questionList);
}

function showGame() {
    $("#main-page").fadeOut();
    newQuestion = true;
}

function start() {
    console.log("start starts, mode: "+$("#mode").val());

    checkLock()

    answer = [];
    result = [];
    var mode = $("#mode").val();
    for(var i = 1; i <= 5; i++) {
        var id = "#q1"+i;
        $(id).css({'backgroundImage':"url('assets/image/image6.png')"});
    }
    setQuestions();
    $("#qid").text("0");
    setTimeout(function() {
        $("#result-table").empty();
        $("#end-message").empty();
        $("#responser").text("");
        $("#play-mode-game").hide();
        $("#play-mode-game").fadeIn();
        $("#gameA").hide();
        $("#gameB").hide();

        if(mode == 1 || mode == 3){
            $("#gameA").css({opacity:"1"}).fadeIn();
            $("#question-page").hide();
            $("#start-page").fadeIn();
        } else {
            $("#gameB").css({opacity:"1"}).fadeIn();
            $("#question-block").hide();
            $("#start-page-game2").fadeIn();
            if(mode == 4)
                $("#start-game-2").hide();
        }

        $("#gameResult").hide();

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

    if(mode == 1 || mode == 3) {
        $("#start-game").on('click', function() {
            $("#start-page").fadeOut();
            setTimeout(function() {
                $("#question-page").fadeIn();
            }, 500);
            console.log("start-game calling startGame");
            startGame();
        });
    } else if(mode == 2) {
        $("#start-game-1").on('click', function() {
            $("#start-page-game2").fadeOut();
            setTimeout(function() {
                $("#question-block").fadeIn();
            }, 500);
            console.log("start-game-1 calling startGame");
            reward = "#random1";
            startGame();
        });

        $("#start-game-2").on('click', function() {
            $("#start-page-game2").fadeOut();
            setTimeout(function() {
                $("#question-block").fadeIn();
            }, 500);
            console.log("start-game-2 calling startGame");
            reward = "#random2";
            startGame();
        });
    } else if(mode == 4) {
        $("#start-game-1").on('click', function() {
            $("#start-page-game2").fadeOut();
            setTimeout(function() {
                $("#question-block").fadeIn();
            }, 500);
            console.log("start-game-1 calling startGame");
            reward = "#random1";
            startGame();
        });
    }

    console.log("start ends");
}

function startGame() {
    console.log("startGame starts");
    var mode = $("#mode").val();
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
    showQuestion();
    console.log("startGame ends");
}

function showQuestion() {
    var qid = parseInt($("#qid").text());
    var mode = $("#mode").val();
    $("#que_name").text("Question "+(parseInt($("#qid").text())+1));
    var question = questionList[qid];
    console.log(question);
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
    console.log("showQuestion mode: "+mode);

    bindAnswer();
}

function bindAnswer() {
    console.log("bindAnswer outside onClick mode: ");
    $(".answer").on('click', function() {
        if(answerSelected == false) {
            var id = "#q1"+(parseInt($("#qid").text())+1);
            $(id).css({'backgroundImage':"url('assets/image/1.png')"});

            var mode = $("#mode").val();
            answerSelected = true;
            answer.push($(this).attr("id"));
            console.log("bindAnswer inside onClick mode: "+mode);
            processAnswer($(this).attr("id"));
        }
    });
}

function processAnswer(answer) {
    console.log("processAnswer starts");
    var mode = $("#mode").val();
    if(mode == 1 || mode == 3) {
        var ans = ""+answer.charAt(answer.length-1);
        $("#default-msg").hide();
    } else {
        var ans = ""+answer;
        $("#default-msg2").hide();
    }

    var qid = parseInt($("#qid").text());
    if(questionList[qid].correct == ans) {
        console.log("Correct answer");
        $("#"+answer).css({background: 'none repeat scroll 0% 0% green'});
        if(mode == 1 || mode == 3) {
            $("#responser").text("Correct!");
            $("#responser").hide();
            $("#responser").fadeIn();

        } else {
            $("#responser2").text("Correct!");
            $("#responser2").hide();
            $("#responser2").fadeIn();
        }

        result.push("Correct");
        qid++;
        $("#qid").text(qid);
        console.log("qid: "+$("#qid").text());
        if(qid < 5) {
            if(mode == 1 || mode == 3) {
                $("#next-level").fadeIn();
            } else {
                $("#next-level2").fadeIn();
            }

            nextQuestion();
        } else {
            setTimeout(function() {
                showEndResult();
            }, 1000);
        }

        if(mode == 1 || mode == 3)
            $("#responser").fadeIn();
        else
            $("#responser2").fadeIn();

        if(mode == 2 || mode == 4)
            if(qid == 5) {
                addAED();
                addWin();
            }


    } else {
        console.log("Wrong answer, mode: "+mode);
        if(mode == 1 || mode == 3)
        {
            $("#"+answer).css({background: 'none repeat scroll 0% 0% red'});
            result.push("Wrong");
            $("#responser").text("Wrong!");
            $("#responser").hide();
            $("#responser").fadeIn();

            qid++;
            $("#qid").text(qid);
            if(qid < 5) {
                $("#next-level").fadeIn();
                nextQuestion();
            } else {
                setTimeout(function() {
                    showEndResult();
                }, 1000);
            }

        } else {
            $("#"+answer).css({background: 'none repeat scroll 0% 0% red'});
            $("#responser2").text("Wrong!");
            $("#responser2").hide();
            $("#responser2").fadeIn();
            setTimeout(function() {
                showEndResult();
            }, 1000);
        }
    }
    console.log("processAnswer ends");
}

function nextQuestion() {
    $("#next-level").on('click', function() {
        if(answerSelected == true) {
            answerSelected = false;
            $("#next-level").fadeOut();
            $("#responser").fadeOut();
            setTimeout(function () {
                $("#default-msg").fadeIn();
                startGame();
            }, 500);
        }
    });

    $("#next-level2").on('click', function() {
        if(answerSelected == true) {
            answerSelected = false;
            $("#next-level2").fadeOut();
            $("#responser2").fadeOut();
            setTimeout(function () {
                $("#default-msg2").fadeIn();
                startGame();
            }, 500);
        }
    });
}

function showEndResult() {
    console.log($("#qid").text());
    var mode = $("#mode").val();
    setTimeout(function() {
        $("#gameResult").css({opacity:"1"}).hide();
        $("#gameResult").fadeIn();
        $("#gameA").css({opacity:"0.3"});
        $("#gameB").css({opacity:"0.3"});
    }, 600);
    setTimeout(function() {
        if(mode == 1 || mode == 3) {
            addAED();
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
        } else {
            if(mode == 4)
                $("#restart-game").hide();

            if($("#qid").text() == "5")
                $("#end-message").append("<h2> You got the client! </h2>");
            else
                $("#end-message").append("<h2> Uh-oh! You lost the client. </h2>");
        }

        $("#restart-game").on('click', function() {
            answerSelected = false;
            start();
        });

        $("#back-to-home").on('click', function() {
            answerSelected = false;
            gameSelected = false;
            initGame();
        });
    }, 500);
}

function addGame() {
    var count = parseInt(readCookie("gameCount"));
    count++;
    eraseCookie("gameCount");
    createCookie("gameCount", count, 30);
}

function addWin() {
    var count = parseInt(readCookie("gameWin"));
    count++;
    eraseCookie("gameWin");
    createCookie("gameWin", count, 30);
}

function addAED() {
    console.log("*****************************************************************************************");
    console.log("in addAED()");
    if(parseInt($("#mode").val()) == 1 || parseInt($("#mode").val()) == 3) {
        var count = 0;
        for(var i = 0; i < 5; i++) {
            if(result[i] == "Correct")
                count++;
        }

        var aed = parseInt(readCookie("aed"));
        console.log("count: "+count);
        console.log("initial aed: "+aed);
        aed += count;
        console.log("aed after addition: "+aed);
        eraseCookie("aed");
        createCookie("aed", aed, 30);
    } else {
        var random = $(reward).text();
        random = random.substring(0, (random.length-1));
        random = parseInt(random);
        var aed = parseInt(readCookie("aed"));
        aed += random;
        eraseCookie("aed");
        createCookie("aed", aed, 30);
    }
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