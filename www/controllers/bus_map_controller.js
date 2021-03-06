var map;
var current_infowindow;
function initialize() {

    var locations = JSON.parse(localStorage.getItem("map_data"));
    var mapOptions = {
        zoom: 8,
        center: new google.maps.LatLng(7.8731, 80.7718),
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    map = new google.maps.Map(document.getElementById('map_canvas'),
        mapOptions);

    current_infowindow = new google.maps.InfoWindow;

    console.log(locations);
    $.each(locations, function (index, value) {

        var busno = value[0];
        var arrivalTime = value[3];
        var distance = value[4];
        var crowdDensity = "Medium";

        if (value[1] != 0.00000) {

            var infoWindow = new google.maps.InfoWindow({
                content: "<p>Bus No: "+ busno + "<br />" +
                    "Arrival Time: " + arrivalTime + "<br />" +
                    "Distance: " + distance + "<br />" +
                    "Crowd Density: " + crowdDensity + "</p>"
            });

            var marker = new google.maps.Marker({
                position: new google.maps.LatLng(value[1], value[2])
            });
            marker.addListener('click', function () {
                current_infowindow.close();
                infoWindow.open(map, marker);
                current_infowindow = infoWindow;
            });
            marker.setMap(map);
            marker.setIcon('../images/bus_icon.png');
        }
    });


}

google.maps.event.addDomListener(window, 'load', initialize);