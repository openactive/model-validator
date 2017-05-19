$( document ).ready(function() {
    $.getJSON( "https://raw.githubusercontent.com/openactive/model-validator/master/schemas/core-schema.json", function( data ) {
        SCHEMA=data;
    });

    $("#validate").on("click", function() {
       SCHEMA["$ref"] = "#/definitions/" + $("#type").val();
       $("#data-group").removeClass("has-success has-danger");
       $("#error-report").hide();
       config = {allErrors: true, verbose: true};
       if (!$("#mode").is(":checked")) {
           console.log("Adding removeAdditional, to use lax validation");
           config["removeAdditional"] = "all";
       }
       ajv = new Ajv(config);
       var validate = ajv.compile(SCHEMA);
       var valid = validate( JSON.parse( $("#data").val() ));
       if (valid) {
           $("#data-group").addClass("has-success");
       } else {
           $("#data-group").addClass("has-danger");
           $("#errors").html("");
           $("#num-errors").text( validate.errors.length > 1 ? validate.errors.length + " errors" : "1 error" );
           $.each(validate.errors, function(index, value) {
               if (value["keyword"] === "additionalProperties") {
                   $("#errors").append('<tr><td>' + value["dataPath"] + '</td><td>'
                       + value["message"] + '</td><td>' + value["params"]["additionalProperty"] + '</td></tr>');
               }
               else if (value["keyword"] === "enum") {
                       $("#errors").append('<tr><td>' + value["dataPath"] + '</td><td>'
                           + value["message"] + ' (' + value["params"]["allowedValues"] + ')</td><td>' + value["data"] + '</td></tr>');
               } else {
                   $("#errors").append('<tr><td>' + value["dataPath"] + '</td><td>'
                       + value["message"] + '</td><td>' + value["data"] + '</td></tr>');
               }
           });
           $("#error-report").show();
           console.log(validate.errors);
       }
       return false;
    });
});