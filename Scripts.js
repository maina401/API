let map;
let server="http://localhost:8090";
const TICK_X = 1;
const TICK_Y = 1;
const data = JSON.stringify({
    booking: {
        source:
            {x: 51.5090562, y: -0.05},
        destination:
            {x: 50.5090562, y: -0.1304571},
        booking_id: "testid",
        vehicle_id: "vehicletest"
    }
});

function initMap() {
    const map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: 40.749933, lng: -73.98633 },
        zoom: 13,
    });
    const card = document.getElementById("pac-card");
    const input = document.getElementById("pac-input");
    const input1 = document.getElementById("pac-input_destination");
    const biasInputElement = document.getElementById("use-location-bias");
    const strictBoundsInputElement = document.getElementById("use-strict-bounds");
    const options = {
        componentRestrictions: { country: "uk" },
        fields: ["formatted_address", "geometry", "name"],
        origin: map.getCenter(),
        strictBounds: false,
        types: ["establishment"],
    };
    map.controls[google.maps.ControlPosition.TOP_RIGHT].push(card);
    const autocomplete = new google.maps.places.Autocomplete(input, options);
    const autocomplete1 = new google.maps.places.Autocomplete(input1, options);
    // Bind the map's bounds (viewport) property to the autocomplete object,
    // so that the autocomplete requests use the current map bounds for the
    // bounds option in the request.
    autocomplete.bindTo("bounds", map);
    autocomplete1.bindTo("bounds", map);
    const infowindow = new google.maps.InfoWindow();
    const infowindowContent = document.getElementById("infowindow-content");
    infowindow.setContent(infowindowContent);
    const marker = new google.maps.Marker({
        map,
        anchorPoint: new google.maps.Point(0, -29),
    });
    autocomplete.addListener("place_changed", () => {
        infowindow.close();
        marker.setVisible(false);
        const place = autocomplete.getPlace();

        if (!place.geometry || !place.geometry.location) {
            // User entered the name of a Place that was not suggested and
            // pressed the Enter key, or the Place Details request failed.
            window.alert("No details available for input: '" + place.name + "'");
            return;
        }
        let json={x:place.geometry.location.lat(),y:place.geometry.location.lng()};
        document.getElementById('destination').innerHTML=JSON.stringify(json);

        // If the place has a geometry, then present it on a map.
        if (place.geometry.viewport) {
            map.fitBounds(place.geometry.viewport);
        } else {
            map.setCenter(place.geometry.location);
            map.setZoom(17);
        }
        marker.setPosition(place.geometry.location);
        marker.setVisible(true);
        infowindowContent.children["place-name"].textContent = place.name;
        infowindowContent.children["place-address"].textContent =
            place.formatted_address;
        infowindow.open(map, marker);
    });
    autocomplete1.addListener("place_changed", () => {
        infowindow.close();
        marker.setVisible(false);
        const place = autocomplete1.getPlace();

        if (!place.geometry || !place.geometry.location) {
            // User entered the name of a Place that was not suggested and
            // pressed the Enter key, or the Place Details request failed.
            window.alert("No details available for input: '" + place.name + "'");
            return;
        }

        // If the place has a geometry, then present it on a map.
        if (place.geometry.viewport) {
            map.fitBounds(place.geometry.viewport);
        } else {
            map.setCenter(place.geometry.location);
            map.setZoom(17);
        }
        let json={x:place.geometry.location.lat(),y:place.geometry.location.lng()};
        document.getElementById('source').innerHTML=JSON.stringify(json);
        marker.setPosition(place.geometry.location);
        marker.setVisible(true);
        infowindowContent.children["place-name"].textContent = place.name;
        infowindowContent.children["place-address"].textContent =
            place.formatted_address;
        infowindow.open(map, marker);
    });

    // Sets a listener on a radio button to change the filter type on Places
    // Autocomplete.
    function setupClickListener(id, types) {
        const radioButton = document.getElementById(id);
        radioButton.addEventListener("click", () => {
            autocomplete.setTypes(types);
            input.value = "";
        });
    }
    setupClickListener("changetype-all", []);
    setupClickListener("changetype-address", ["address"]);
    setupClickListener("changetype-establishment", ["establishment"]);
    setupClickListener("changetype-geocode", ["geocode"]);
    biasInputElement.addEventListener("change", () => {
        if (biasInputElement.checked) {
            autocomplete.bindTo("bounds", map);
        } else {
            // User wants to turn off location bias, so three things need to happen:
            // 1. Unbind from map
            // 2. Reset the bounds to whole world
            // 3. Uncheck the strict bounds checkbox UI (which also disables strict bounds)
            autocomplete.unbind("bounds");
            autocomplete.setBounds({ east: 180, west: -180, north: 90, south: -90 });
            strictBoundsInputElement.checked = biasInputElement.checked;
        }
        input.value = "";
    });
    strictBoundsInputElement.addEventListener("change", () => {
        autocomplete.setOptions({
            strictBounds: strictBoundsInputElement.checked,
        });

        if (strictBoundsInputElement.checked) {
            biasInputElement.checked = strictBoundsInputElement.checked;
            autocomplete.bindTo("bounds", map);
        }
        input.value = "";
    });
}

function createVehicles() {
    let url = server+"/api/create/vehicle";
    let vehicles = [
        ["mXfkjrFw", 51.5090562, -0.1304571],
        ["nZXB8ZHz", 51.5080898, -0.07620836346036469],
        ["Tkwu74WC", 51.5425649, -0.00693080308689057],
        ["5KWpnAJN", 51.519821199999996, -0.09397523701275332],
        ["uf5ZrXYw", 51.5133798, -0.0889552],
        ["VMerzMH8", 51.5253378, -0.033435],
        ["8efT67Xd", 51.54458615, -0.0161905117168855]

    ];
    vehiclesArray = {};
    vehicles.forEach(vehicle => {

        vehicle = {
            vehicle: {
                geo:
                    {x: vehicle[1], y: vehicle[2]},
                vehicle_id: vehicle[0]
            }
        };
        params = parameters(JSON.stringify(vehicle), "POST");


    });


}


function parameters(params, method) {
    if (method === "POST") {
        return {
            headers: {
                "content-type": "application/json; charset=UTF-8"
            },
            body: params,
            method: method
        };
    } else {
        return {
            headers: {
                "content-type": "application/json; charset=UTF-8"
            },
            method: method
        };
    }
}

async function makeRequest() {
   let source=document.getElementById('source').innerText;
   let destination=document.getElementById('destination').innerText;
    console.log("moving from "+source+" to "+destination);
    makeBooking(source,destination);


}


function findNearestVehicle(myPosition = {}, vehicles = {}) {
    const distance = (coor1, coor2) => {
        const x = coor2.x - coor1.x;
        const y = coor2.y - coor1.y;
        return Math.sqrt((x * x) + (y * y));
    };
    const sortByDistance = (vehicles, point) => {
        const sorter = (a, b) => distance(a, point) - distance(b, point);
        vehicles.sort(sorter);
    };
    sortByDistance(vehicles, myPosition);

    return vehicles[0];
}

function makeBooking(source,destination) {
    let json_data = JSON.parse(data);
    let url = server+"/api/status";
    let params = {
        headers: {
            "content-type": "application/json; charset=UTF-8"
        },
        method: "GET"
    };
    fetch(url, params)
        .then(data => {
            return data.json()
        })
        .then(res => {
            returned_vehicles=res['status'];
            let closest = findNearestVehicle(source, returned_vehicles);
            let vehicle_id = closest['vehicle_id']
            console.log("Closest vehicle is :" + vehicle_id);
            let url = server+"/api/book";

            const booking = JSON.stringify({
                source,
                destination,
                    booking_id: null,
                    vehicle_id: vehicle_id

            });
            params = parameters(booking, "POST");
            console.log("Picked Up params" + JSON.stringify(params));
            fetch(url, params)
                .then(data => {
                    return data.text()
                })
                .then(res => {
                    console.log("Booking Response: " + res);
                    json=JSON.parse(res);
                    alert("You successfully booked vehicle "+json['car_id']+"\n The vehicle will now be marked as unavailable");

                })
                .catch(err => {
                    console.log(err);
                })
        })
        .catch(error => {
            alert('Could Not complete Booking\n Probably no vehicle is unavailable\n Reset the vehicles by /api/reset/vehices');
            console.log(error)
        });


}

function tickVehicle() {
    let url = server+"/api/tick";
    let tick = {
        tick: {x: TICK_X, y: TICK_Y}
    }


    let params = parameters(JSON.stringify(tick), 'POST');

    console.log("Using paramas:" + JSON.stringify(params))

    fetch(url, params)
        .then(data => {
                return data.text()
            }
        )
        .then(res => {
            console.log("Ticklind: " + res);
        })

}


