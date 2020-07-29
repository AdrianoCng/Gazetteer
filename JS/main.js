$(document).ready(() => {
    initialize();
    
    $("#show-position-button").click(() => {
        showCurrentLocation();
    });

    $("#neighboursList").on("click", "dd > button", function(event) {
        const country = $(event.target).html();

        getDataAndStore(country, country);
    });

    $("#input-form").change(event => {
        
        const inputValue = $("#input-form").val();
        const q = $("#form").serialize();

        if (!inputValue) {
            $("#error-message").html("Insert Country");
            setTimeout(() => {
                $("#error-message").html("");
            }, 3500);
            return;
        };

        getDataAndStore(q, inputValue);
    });
    
});