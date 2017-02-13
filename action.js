$(document).ready(function() {
	    $('#report').click(function () {
        $('#myModal').modal('show');
    });
$.ajax({
   url: 'https://api.uwaterloo.ca/v2/resources/goosewatch.json?key=38b1c3c489d4d364e9fe24fba3d7c171',
   data: {
      format: 'json'
   },
   error: function() {
      console.log("An error has occurred");
   },
   dataType: 'jsonp',
   success: function(data) {
   	var coordinates = [];
     $.each(data["data"], function(key,value) {
     	coordinates.push({
     		latitude: value['latitude'],
     		longitude: value['longitude']
     	});
     })
   },
   type: 'GET'
	  });
});