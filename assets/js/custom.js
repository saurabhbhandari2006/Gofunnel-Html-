function startQuestion () {

    $("#start-page").hide();
    $("#question-page").show();
};
$(".answer-block").click(function(){
$("#next-level").show();
});
$(".answer-block-2").click(function(){
$("#game2-next-level").show();
});
$("#start-game-1").click(function(){

$("#start-page-game2").hide();
$("#question-block").show();
});