$(document).ready(function() {
    $('button').on('click', function() {
        var hero = $(this).data('name');
    //queryURL for giphy API
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + hero + "&api_key=jMlslbYkjcB8skxqUjVUQUSq5yjZ34di";

    //AJAX Method for Gify API
        $.ajax({
                url: queryURL,
                method: 'GET'

            })
            .done(function(response) {
                console.log(response)
                var results = response.data;
                for (var i = 0; i < results.length; i++) {
                    var heroDiv = $('<div/>');
                    var p = $('<p/>');
                    p.text(results[i].rating);
                    var heroImage = $('<img/>');
                    heroImage.addClass('anImg')
                    heroImage.attr('src', results[i].images.fixed_height.url);
                    heroImage.attr('data-still', results[i].images.fixed_height_still.url)
                    heroImage.attr('data-animate', results[i].images.fixed_height.url)
                        .attr('data-state', 'still');
                    heroDiv.append(p);
                    heroDiv.append(heroImage);
                    heroDiv.prependTo($('#gifs'));
                }
    //Onclick function
                $('.anImg').on('click', function() {
                    var state = $(this).attr('data-state');
                    console.log(this);
                    if (state == 'still') {
                        $(this).attr('src', $(this).data('animate'));
                        $(this).attr('data-state', 'animate');
                    } else {
                        $(this).attr('src', $(this).data('still'));
                        $(this).attr('data-state', 'still');
                    }

                });
            });
    });
    var heroes = [''];
    
    //Click event on add button
    $('#addBtn').on('click', function() {
        var heroButton = $("#gif-input").val();
    //Adds the new comic book character
        var newButton = $("<button/>").addClass("btn btn-info hero").attr('data-name', heroButton).html(heroButton).css({ 'margin': '10px' });
        $("#hbutton").append(newButton);
        
        queryURL = "https://api.giphy.com/v1/gifs/search?q=" + heroButton + "&api_key=jMlslbYkjcB8skxqUjVUQUSq5yjZ34di";
        console.log(heroButton);
        $.ajax({
                url: queryURL,
                method: 'GET'
            })
            .done(function(response) {
                var results = response.data;
                for (var i = 0; i < results.length; i++) {
    //creates Div element
                    var heroDiv = $('<div/>');
    //creates P element 
                    var p = $('<p/>');
                    p.text(results[i].rating);
                    var heroImage = $('<img/>');
                    heroImage.addClass('anImg')
                    heroImage.attr('src', results[i].images.fixed_height_still.url);
                    heroImage.attr('data-still', results[i].images.fixed_height_still.url)
                    heroImage.attr('data-animate', results[i].images.fixed_height.url)
                        .attr('data-state', 'still');
                    heroDiv.append(p);
                    heroDiv.append(heroImage);
                    heroDiv.prependTo($('#gifs'));
                }
                $('.anImg').on('click', function() {
                    var state = $(this).attr('data-state');
                    console.log(this);
                    if (state == 'still') {
                        $(this).attr('src', $(this).data('animate'));
                        $(this).attr('data-state', 'animate');
                    } else {
                        $(this).attr('src', $(this).data('still'));
                        $(this).attr('data-state', 'still');
                    }
                });
            });
        $("#gif-input").val("");
        return false;
    })
});