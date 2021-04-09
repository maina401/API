let map;

function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 51.5195786, lng: -0.0606907 },
    zoom: 12,
  });
    const svgMarker = {
    path:
      "M10.453 14.016l6.563-6.609-1.406-1.406-5.156 5.203-2.063-2.109-1.406 1.406zM12 2.016q2.906 0 4.945 2.039t2.039 4.945q0 1.453-0.727 3.328t-1.758 3.516-2.039 3.070-1.711 2.273l-0.75 0.797q-0.281-0.328-0.75-0.867t-1.688-2.156-2.133-3.141-1.664-3.445-0.75-3.375q0-2.906 2.039-4.945t4.945-2.039z",
    fillColor: "blue",
    fillOpacity: 0.6,
    strokeWeight: 0,
    rotation: 0,
    scale: 2,
    anchor: new google.maps.Point(15, 30),
  };
let vehicles=[
["mXfkjrFw",51.5090562,-0.1304571],
["nZXB8ZHz",51.5080898,-0.07620836346036469],
["Tkwu74WC",51.5425649,-0.00693080308689057],
["5KWpnAJN",51.519821199999996,-0.09397523701275332],
["uf5ZrXYw",51.5133798,-0.0889552],
["VMerzMH8",51.5253378,-0.033435],
["8efT67Xd",51.54458615,-0.0161905117168855]

];
vehicles.forEach(vehicle =>{
  new google.maps.Marker({
    position: { lat: vehicle[1], lng: vehicle[2] },
    icon: svgMarker,
    map: map,
  });

});

}
