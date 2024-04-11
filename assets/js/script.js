$(document).ready(function() {
    // Use Bootstrap's modal method to show/hide the modal
    $("#add-task-btn").click(function() {
        $("#taskModal").modal('show');
    });

    // Function to refresh draggable and droppable behaviors
    function refreshDragAndDrop() {
        // Making the new task draggable
        $(".task-card").draggable({
            containment: "#taskContainer",
            cursor: "move",
            revert: "invalid",
            start: function(event, ui) {
                $(this).css("z-index", 1000); // Increase z-index when dragging starts
            },
            stop: function(event, ui) {
                $(this).css("z-index", "auto"); // Reset z-index when dragging stops
            }
        });

        // Making the lanes droppable
        $(".lane .card-body").droppable({
            accept: ".task-card",
            drop: function(event, ui) {
                ui.draggable.detach().css({top: 0, left: 0}).appendTo($(this)); // Reset position and move to new container
            }
        });
    }

    // Adjusting the form submission to create a task with Bootstrap styling
    $("#task-form").submit(function(e) {
        e.preventDefault(); // Prevent the form from submitting in the traditional way

        var title = $("#task-title").val();
        var description = $("#task-description").val();
        var deadline = $("#task-deadline").val();

        // Creating a new Bootstrap styled task card
        var taskCard = $(`
            <div class="card draggable task-card mt-2" style="cursor: grab;">
                <div class="card-body">
                    <h5 class="card-title">${title}</h5>
                    <p class="card-text">${description}</p>
                    <p class="card-text"><small class="text-muted">Due: ${deadline}</small></p>
                </div>
            </div>
        `);

        // Append the new card to the "To Do" column
        $("#todo-cards").append(taskCard);

        // Refresh draggable and droppable for all elements
        refreshDragAndDrop();

        $("#taskModal").modal('hide'); // Hide the modal after adding the task
    });

    // Initial call to make existing and future elements draggable and droppable
    refreshDragAndDrop();
});