$(document).ready(function(){

    var madeButtons = ["Kylo Ren", "Luke Skywalker", "Darth Vader", "The Last Jedi"];

    function displayImg(){

        $("#display-images").empty();
        var input = $(this).attr("data-name");
        var limit = 10;
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + input + "&limit=" + limit + "&api_key=t73lFm9J1X29PMOd4GrZOHnlSP1QnUj9";   

        $.ajax({
            url: queryURL, 
            method: "GET"
        }).done(function(response) {

            for(var i = 0; i < limit; i++) {    

                var displayDiv = $("<div>");
                displayDiv.addClass("holder");
            
                var image = $("<img>");
                image.attr("src", response.data[i].images.original_still.url);
                image.attr("data-still", response.data[i].images.original_still.url);
                image.attr("data-animate", response.data[i].images.original.url);
                image.attr("data-state", "still");
                image.attr("class", "gif");
                displayDiv.append(image);

                var rating = response.data[i].rating;
                var pRating = $("<p>").text("Rating: " + rating);
                displayDiv.append(pRating)

                $("#display-images").append(displayDiv);
            }
        });
    }
	
	function pauseGif() {          

		var state = $(this).attr("data-state");
		var animateImage = $(this).attr("data-animate");
		var stillImage = $(this).attr("data-still");

		if(state == "still") {
			$(this).attr("src", animateImage);
			$(this).attr("data-state", "animate");
		}

		else if(state == "animate") {
			$(this).attr("src", stillImage);
			$(this).attr("data-state", "still");
		}   
	}

    function renderButtons(){ 

        $("#display-buttons").empty();

        for (var j = 0; j < madeButtons.length; j++){

            var newButton = $("<button>") 
            newButton.attr("class", "btn btn-default");
            newButton.attr("id", "input")  
            newButton.attr("data-name", madeButtons[j]); 
            newButton.text(madeButtons[j]); 
            $("#display-buttons").append(newButton); 
        }
    }


    $("#submitPress").on("click", function(){

        var input = $("#user-input").val().trim();
        form.reset();
        madeButtons.push(input);
                
        renderButtons();

        return false;
    })

    renderButtons();

    $(document).on("click", "#input", displayImg);
    $(document).on("click", ".gif", pauseGif);
});