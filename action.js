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
    

    function initMap() {
      var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 16,
        center: new google.maps.LatLng(43.471,-80.547763)
      });
              var infoWindow = new google.maps.InfoWindow({map: map});

      // Try HTML5 geolocation.
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
          pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };

          infoWindow.setPosition(pos);
          infoWindow.setContent('Your Are Here');
          map.setCenter(pos);
        }, function() {
          handleLocationError(true, infoWindow, map.getCenter());
        });
      } 

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

        $('#all').click(function () {
         $.each(data["data"], function(key,value) {
          coordinates.push({
            latitude: value['latitude'],
            longitude: value['longitude']
          });
         })

      for(var i=0; i<coordinates.length; i++) {
        var uluru = {lat: coordinates[i].latitude, lng: coordinates[i].longitude};
        var marker = new google.maps.Marker({
          position: uluru,
          map: map,
          animation: google.maps.Animation.DROP,
          icon: new google.maps.MarkerImage( 'http://www.freeiconspng.com/uploads/goose-png-pictures-4.png', undefined, undefined, undefined, new google.maps.Size(30, 30))
        }); 
      }
      });

      $('#near').click(function() {
        $.each(data["data"], function(key,value) {
          coordinates.push({
            latitude: value['latitude'],
            longitude: value['longitude']
          });
         })

      for(var i=0; i<coordinates.length; i++) {
        var uluru = new google.maps.LatLng(coordinates[i].latitude, coordinates[i].longitude);
        var _pCord = new google.maps.LatLng(pos['lat'],pos['lng']);
        var dist = google.maps.geometry.spherical.computeDistanceBetween(uluru,_pCord);
        if(dist<=150) {
                    var marker = new google.maps.Marker({
          position: uluru,
          map: map,
          animation: google.maps.Animation.DROP,
          icon: new google.maps.MarkerImage( 'http://www.freeiconspng.com/uploads/goose-png-pictures-4.png', undefined, undefined, undefined, new google.maps.Size(30, 30))
        }); 
        }
      }
    });
       },
       type: 'GET'
        });
    }
});