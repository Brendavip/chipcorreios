

function initAutocomplete() {

	var map = new google.maps.Map(document.getElementById('map'), {
		center: {lat: -23.710960, lng: -46.700210},
		zoom: 14,
		//mapTypeId: 'roadmap'
        mapTypeControl: false
	});
        //-------------------------Get position------------------------
        function getLocation() {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(addPosition);

        }
      }
        function addPosition(position) {
        pos ={ lat: position.coords.latitude,
              lng: position.coords.longitude
         }
         map.setCenter(pos);
        }


        // -------------------------------------------------------------

        // Create the search box and link it to the UI element.
        var input = document.getElementById('buscador-p');
        var searchBox = new google.maps.places.SearchBox(input);
        map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

        // Bias the SearchBox results towards current map's viewport.
        map.addListener('bounds_changed', function() {
        	searchBox.setBounds(map.getBounds());
        });

        var markers = [];
        // Listen for the event fired when the user selects a prediction and retrieve
        // more details for that place.
        searchBox.addListener('places_changed', function() {
        	var places = searchBox.getPlaces();

        	if (places.length == 0) {
        		return;
        	}

          // Clear out the old markers.
          markers.forEach(function(marker) {
          	marker.setMap(null);
          });
          markers = [];

          // For each place, get the icon, name and location.
          var bounds = new google.maps.LatLngBounds();
          places.forEach(function(place) {
          	if (!place.geometry) {
          		console.log("Returned place contains no geometry");
          		return;
          	}
          	var icon = {
          		url: place.icon,
          		size: new google.maps.Size(700, 700),
          		origin: new google.maps.Point(0, 0),
          		anchor: new google.maps.Point(17, 34),
          		scaledSize: new google.maps.Size(25, 25)
          	};

            // Create a marker for each place.
            markers.push(new google.maps.Marker({
            	map: map,
            	icon: icon,
            	title: place.name,
            	position: place.geometry.location
            }));

            if (place.geometry.viewport) {
              // Only geocodes have viewport.
              bounds.union(place.geometry.viewport);
          } else {
          	bounds.extend(place.geometry.location);
          }
      });
          map.fitBounds(bounds);
      });
        var agencias =  listaAgencias;      
        var infowindow =  new google.maps.InfoWindow({});
        getLocation(infowindow);
       
        var marker, count;
        /*
        for (count = 0; count < locations.length; count++) {
          marker = new google.maps.Marker({
            position: new google.maps.LatLng(locations[count][1], locations[count][2]),
            map: map,
            title: locations[count][0]
          });
          google.maps.event.addListener(marker, 'click', (function (marker, count) {
            return function () {
              infowindow.setContent(locations[count][0]);
              infowindow.open(map, marker);
            }
          })(marker, count));

        }

        */
        for (count = 0; count < agencias.length; count++) {
        	marker = new google.maps.Marker({
        		position: new google.maps.LatLng(agencias[count][3], agencias[count][4]),
        		map: map,
        		title: agencias[count][0],
                icon: './icons/correios-marker-05.png'
        	});
        	google.maps.event.addListener(marker, 'click', (function (marker, count) {
        		return function () {
        			infowindow.setContent(agencias[count][0]);
        			infowindow.open(map, marker);
                    document.getElementById("nome").innerHTML =agencias[count][0];
                    document.getElementById("endereco").innerHTML =agencias[count][1];
                    document.getElementById("cep").innerHTML = "CEP: " + agencias[count][2];
                    $("#myModal").modal();
        		}
        	})(marker, count));
        }
    }

