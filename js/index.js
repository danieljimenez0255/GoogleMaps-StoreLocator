window.onload = () => {
  /* another why of typing this function out is windows.onload = function (){script goes here}*/
};

var map;
var markers = [];
var infoWindow;
var gmarkers = [];
function initMap() {
  var losAngeles = { lat: 34.06338, lng: -118.35808 };
  map = new google.maps.Map(document.getElementById("map"), {
    center: losAngeles,
    zoom: 11,
    mapTypeId: "roadmap",
    mapTypeControlOptions: {
      style: google.maps.MapTypeControlStyle.DROPDOWN_MENU,
    },
    styles:  [
      {elementType: 'geometry', stylers: [{color: '#ebe3cd'}]},
      {elementType: 'labels.text.fill', stylers: [{color: '#523735'}]},
      {elementType: 'labels.text.stroke', stylers: [{color: '#f5f1e6'}]},
      {
        featureType: 'administrative',
        elementType: 'geometry.stroke',
        stylers: [{color: '#c9b2a6'}]
      },
      {
        featureType: 'administrative.land_parcel',
        elementType: 'geometry.stroke',
        stylers: [{color: '#dcd2be'}]
      },
      {
        featureType: 'administrative.land_parcel',
        elementType: 'labels.text.fill',
        stylers: [{color: '#ae9e90'}]
      },
      {
        featureType: 'landscape.natural',
        elementType: 'geometry',
        stylers: [{color: '#dfd2ae'}]
      },
      {
        featureType: 'poi',
        elementType: 'geometry',
        stylers: [{color: '#dfd2ae'}]
      },
      {
        featureType: 'poi',
        elementType: 'labels.text.fill',
        stylers: [{color: '#93817c'}]
      },
      {
        featureType: 'poi.park',
        elementType: 'geometry.fill',
        stylers: [{color: '#a5b076'}]
      },
      {
        featureType: 'poi.park',
        elementType: 'labels.text.fill',
        stylers: [{color: '#447530'}]
      },
      {
        featureType: 'road',
        elementType: 'geometry',
        stylers: [{color: '#f5f1e6'}]
      },
      {
        featureType: 'road.arterial',
        elementType: 'geometry',
        stylers: [{color: '#fdfcf8'}]
      },
      {
        featureType: 'road.highway',
        elementType: 'geometry',
        stylers: [{color: '#f8c967'}]
      },
      {
        featureType: 'road.highway',
        elementType: 'geometry.stroke',
        stylers: [{color: '#e9bc62'}]
      },
      {
        featureType: 'road.highway.controlled_access',
        elementType: 'geometry',
        stylers: [{color: '#e98d58'}]
      },
      {
        featureType: 'road.highway.controlled_access',
        elementType: 'geometry.stroke',
        stylers: [{color: '#db8555'}]
      },
      {
        featureType: 'road.local',
        elementType: 'labels.text.fill',
        stylers: [{color: '#806b63'}]
      },
      {
        featureType: 'transit.line',
        elementType: 'geometry',
        stylers: [{color: '#dfd2ae'}]
      },
      {
        featureType: 'transit.line',
        elementType: 'labels.text.fill',
        stylers: [{color: '#8f7d77'}]
      },
      {
        featureType: 'transit.line',
        elementType: 'labels.text.stroke',
        stylers: [{color: '#ebe3cd'}]
      },
      {
        featureType: 'transit.station',
        elementType: 'geometry',
        stylers: [{color: '#dfd2ae'}]
      },
      {
        featureType: 'water',
        elementType: 'geometry.fill',
        stylers: [{color: '#b9d3c2'}]
      },
      {
        featureType: 'water',
        elementType: 'labels.text.fill',
        stylers: [{color: '#92998d'}]
      }
    ]
  });
 
  infoWindow = new google.maps.InfoWindow();
  searchStores();
}

function clearLocations() {
  infoWindow.close();
  for (var i = 0; i < markers.length; i++) {
    markers[i].setMap(null);
  }
  markers.length = 0;
}

function searchStores() {
  var foundStores = [];
  var zipStore = document.getElementById("zip-Code-input").value;
  console.log(zipStore);
  if (zipStore) {
    for (var store of stores) {
      var postal = store["address"]["postalCode"].substring(0, 5);
      if (postal == zipStore) {
        foundStores.push(store);
      }
    }
  } else {
    foundStores = stores;
  }
  clearLocations();
  displayStores(foundStores);
  showStoresMarkers(foundStores);
  setOnClickListener();
}

function setOnClickListener() {
  var storeElements = document.querySelectorAll(".stores-container");
  storeElements.forEach(function (elem, index) {
    elem.addEventListener("click", function () {
      new google.maps.event.trigger(markers[index], "click");
    });
  });
}
// back ticks are string literals that allow for easy use of html and js
function displayStores(stores) {
  var storesHtml = "";

  for (var [index, store] of stores.entries()) {
    var address = store["addressLines"];
    var phone = store["phoneNumber"];
    storesHtml += `
    <div class="stores-container">
    <div class = "store-containerBg">
    <div class="store-info-container">
      <div class="store-address">
        <span>${address[0]}</span>
        <span>${address[1]}</span>
      </div>
      <div class="store-number">${phone}</div>
    </div>
    <div class="store-number-container">
      <div class="dot">${index + 1}</div>
    </div>
    </div>
  </div>
    
    
    
    `;
    document.querySelector(".stores-list").innerHTML = storesHtml;
  }
}

function showStoresMarkers(stores) {
  var arrayImageNums = [
    "1",
    "1",
    "5",
    "6",
    "6",
    "7",
    "3",
    "9",
    "8",
    "8",
    "1",
    "2",
    "3",
    "7",
    "5",
    "3",
    "7",
    "3",
    "3",
    "6",
    "6",
    "3",
    "5",
    "4",
    "8",
    "8",
    "5",
    "2",
    "7",
    "2",
    "2",
    "3",
    "2",
    "6",
    "8",
    "8",
    "7",
    "1",
    "2",
    "3",
    "3",
    "9",
    "2",
    "4",
    "5",
    "5",
    "4",
    "2",
    "3",
    "1",
    "8",
  ];

  var counter = 0;
  var bounds = new google.maps.LatLngBounds();
  for (var [index, store] of stores.entries()) {
    counter++;

    var myLatlng = new google.maps.LatLng(
      store["coordinates"]["latitude"],
      store["coordinates"]["longitude"]
    );
    /*  var mapType = store["features"];
    var mapTypeMain = mapType.forEach(({ code }) => console.log("cool", `${code}`)); */
    var name = store["name"];
    var openStatus = store["openStatusText"];
    var address = store["addressLines"][0];
    var addressMain = store["addressLines"];
    var phone = store["phoneNumber"];
    var locations = [
      {
        position: {
          lat: store["coordinates"]["latitude"],
          lng: store["coordinates"]["longitude"],
        },
        icon: {
          url: "image" + arrayImageNums[counter] + ".png",
          scaledSize: new google.maps.Size(44, 44),
        },
      },
    ];

    createMarker(
      name,
      address,
      phone,
      openStatus,
      locations,
      addressMain,
      index + 1
    );
    bounds.extend(myLatlng);
  }
  // gives me value of name of object in array features

  map.fitBounds(bounds);
}

function createMarker(
  name,
  address,
  phone,
  openStatus,
  locations,
  addressMain,
  index
) {
  //add in store info as designed
  //then research how to change the style of markers and style google map
  //add functionality that allows user when they click on store, info window pops up
  //allow for user to link to specific address

  var html =
    "<b>" +
    name +
    "</b> <br/>" +
    "<div id = 'StatusStyle'>" +
    openStatus +
    "</div>" +
    "<div class = 'LinkSpace'>" +
    "<div class = 'dotMarker'>" +
    "<i class='fas fa-location-arrow'></i>" +
    "</div>" +
    "</div>" +
    "<div class = 'addressLink'>" +
    "<a href = 'https://www.google.com/maps/dir/?api=1&destination=" +
    escape(addressMain) +
    "' target = '_blank'>" +
    address +
    "</a>" +
    "</div>" +
    "<div  class ='dotMarker'>" +
    "<i class='fas fa-phone-alt'></i>" +
    "</div>" +
    "<div class = 'addressLink'>" +
    "<a href = ''>" +
    phone +
    "</a>" +
    "</div>";
  /*  var marker = new google.maps.Marker({
    map: map,
    position: latlng,
    label: index.toString(),
  });

  google.maps.event.addListener(marker, "click", function () {
    infoWindow.setContent(html);
    infoWindow.open(map, marker);
  });

  markers.push(marker); */

  locations.forEach(function (element) {
    var marker = new google.maps.Marker({
      position: element.position,
      map: map,
      icon: element.icon,
      label: index.toString(),
    });
    google.maps.event.addListener(marker, "click", function () {
      infoWindow.setContent(html);
      infoWindow.open(map, marker);
    });

    markers.push(marker);
  });
}
