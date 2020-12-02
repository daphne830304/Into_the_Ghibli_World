const key = "5ae2e3f221c38a28845f05b694b8d9d0c9581765cb4a04c73bcf867f";


var iconBase = 'https://maps.google.com/mapfiles/kml/shapes/';
var icons = {
  parking: {
    icon: iconBase + 'parking_lot_maps.png'
  },
  library: {
    icon: iconBase + 'library_maps.png'
  },
  info: {
    icon: iconBase + 'info-i_maps.png'
  },
  dining: {
    icon: iconBase + 'dining.png'
  },
  lodging: {
    icon: iconBase + 'lodging.png'
  }
};
function findnearbyaccomdations(lat, lng){
  
  $.get('https://api.opentripmap.com/0.1/en/places/radius',{'radius':2500,'lon':lng,'lat':lat,'kinds':'accomodations','limit':10,'apikey':key},
    (res) => {

      // const map = document.getElementById('map')
      console.log(res)
      for (const loc of res.features) {
        console.log(loc)
        const lat = loc.geometry.coordinates[1]
        const lng = loc.geometry.coordinates[0]
        console.log(lat)
        console.log(lng)

        const marker = new window.google.maps.Marker({
          position: {lat:lat, lng:lng},
          title: loc.properties.name,
          icon: icons['lodging'].icon,
          map: newmap,
        })
        
        const infoWindow = new google.maps.InfoWindow()
        // const infoWindow = new google.maps.InfoWindow({
        //   content: loc.properties.name,
        //   maxWidth: 300
        // });
        const markerInfoContent = (`
            <h3>${loc.properties.name}</h3>
            <div>${loc.properties.kinds}<div>
          `);
  
        marker.addListener('click', () => {
          infoWindow.close()
          infoWindow.setContent(markerInfoContent)
          infoWindow.open(newmap, marker)
        });
      }
      newmap.setZoom(15);
      newmap.setCenter({lat:Number(lat), lng:Number(lng)})

        console.log(res.features)
        for (const loc of res.features){
          console.log(loc.properties.kinds)
          console.log(loc.properties.name)
          console.log(loc.geometry.coordinates)
        }
    })
}

function findnearbyrestaurants(lat, lng){
  
  $.get('https://api.opentripmap.com/0.1/en/places/radius',{'radius':2500,'lon':lng,'lat':lat,'kinds':'restaurants','limit':10,'apikey':key},
    (res) => {

      // const map = document.getElementById('map')

      for (const loc of res.features) { //coords is a dictiiony that carry coords, location_id, address
        const lat = loc.geometry.coordinates[1]
        const lng = loc.geometry.coordinates[0]
        console.log(lat)
        console.log(lng)

        const marker = new window.google.maps.Marker({
          position: {lat:lat, lng:lng},
          title: loc.properties.name,
          icon: icons['dining'].icon,
          map: newmap,
        })

        const infoWindow = new google.maps.InfoWindow({
          content: loc.properties.name,
          maxWidth: 300
        });
  
        marker.addListener('click', () => {
          infoWindow.open(newmap, marker)
        });
      }
      newmap.setZoom(15);
      newmap.setCenter({lat:Number(lat), lng:Number(lng)})

        console.log(res.features)
        for (const loc of res.features){
          console.log(loc.properties.kinds)
          console.log(loc.properties.name)
          console.log(loc.geometry.coordinates)
        }
    })
}




// function test(lat, lng) {


//   console.log(lat)
//   console.log(lng)
// }
// function getnearbyplaces(lat, lng) {
//     $.get('https://api.opentripmap.com/0.1/en/places/radius',{'radius':2500,'lon':lng,'lat':lat,'kinds':'accomodations','limit':10,'apikey':key},
//     (res) => {
//         const map = document.getElementById('map')
//         console.log(map.style)
//         console.log(res.features)
//         for (const loc of res.features){
//           console.log(loc.properties.kinds)
//           console.log(loc.properties.name)
//           console.log(loc.geometry.coordinates)
//         }
//     })
//   }
