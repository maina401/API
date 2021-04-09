let map;
let server="http://localhost:8090";
const TICK_X = 1;
const TICK_Y = 1;

async function getVehicles() {
    let data={}
    let url =server +"/api/status";
    console.log("Querying server "+url);
    let params = {
        headers: {
            "content-type": "application/json; charset=UTF-8"
        },
        method: "GET"
    };
    await fetch(url, params)
        .then(data => {
            return data.json()
        }).then(res => {

            data =JSON.stringify(res);

        }).catch(err => {
            console.log(err)
        });
    return data

}

async function initMap() {
    map = new google.maps.Map(document.getElementById("map"), {
        center: {lat: 51.5195786, lng: -0.0606907},
        zoom: 3,
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
    let vehicles = await getVehicles();
    let vehiclesArr = JSON.parse(vehicles);
    console.log(vehiclesArr['status'][0]['currentPosition']['x']);
    let x = vehiclesArr['status'][0]['currentPosition']['x'], y = vehiclesArr["status"][0]['currentPosition']['y'];
    let pan_to = new google.maps.LatLng(x, y);
    vehiclesArr['status'].forEach(vehicle => {
        let x = vehicle['currentPosition']['x'], y = vehicle['currentPosition']['y'];

        new google.maps.Marker({
            position: {lat: x, lng:y},
            icon: svgMarker,
            map: map,
        });


    });
    map.panTo(pan_to);

}

async function initialize() {
    var options = {
        componentRestrictions: {country: 'UK'}
    };
    var source = document.getElementById('searchLocation');
    var destination = document.getElementById('searchDestination');
    const autocompleteLocation = await new google.maps.places.SearchBox(source, options);
    const autocompleteDestination =await new google.maps.places.SearchBox(destination, options);
    autocompleteDestination.bindTo("bounds", map);
    autocompleteDestination.addListener("place_changed",()=>{
        console.log("We are Listening!")

        var destination = {x: going_to.geometry.location.lat(), y: going_to.geometry.location.lng()};
        console.log(destination)

    });
    autocompleteLocation.addListener("place_changed",()=>{
        var from = autocompleteLocation.getPlace();

        var source = {x: from.geometry.location.lat(), y: from.geometry.location.lng()};
        console.log(source)
    });


    return {"destination": autocompleteLocation, "source": autocompleteDestination};


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

    let url = server+"/api/vehicles";
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
            let closest = findNearestVehicle(source, res);
            let vehicle_id = closest['vehicle_id']
            console.log("Closest vehicle is :" + vehicle_id);
            let url = server+"/api/book";

            const booking = JSON.stringify({
                source,
                destination,
                    booking_id: "shjgu",
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
                    alert("You successfully booked vehicle "+json['vehicle_id']+"\n The vehicle will now be marked as unavailable");

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
    let url = server+"/api/tick/vehicle";
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


