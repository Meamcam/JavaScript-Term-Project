$(document).ready(function() {
    $(".cryptid").draggable({
        revert: "invalid",
        cursor: "grabbing",
    });

    $(".habitat").droppable({
        drop: function(event, ui) {
            var cryptid = ui.draggable.attr("data-cryptid");
            var habitat = $(this).attr("data-habitat");

            if (cryptid === habitat) {
                $(ui.draggable).css("background-color", "green");
                $(this).css("background-color", "green");
                $(ui.draggable).draggable("disable");
                $(this).droppable("disable");
            } else {
                $(ui.draggable).effect("shake");
            }
        }
    });
});