$(document).ready(function () {

    initDataOnClick();

});

function initDataOnClick() {
    for (var i = 1; i <= 4; i++) {
        var targetDiv = document.getElementById(i);
        targetDiv.onclick = gameData(i);
    }
}
function gameData(id) {

    $("#" + id).click(function () {
        $("#game-select").hide();
        $("#game-play-div").show();
        for (var i = 1; i <= 4; i++) {
            console.log(i);
            $("#game-box-" + i).hide();
        }
        $("#game-box-" + id).show();
    });

}

function back(){
    $("#game-select").show();
    $("#game-play-div").hide();
}
