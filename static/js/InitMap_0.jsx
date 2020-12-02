// function locationinfo(id) {
//   const card = document.getElementById(id)
//   card.setAttribute('class','infocards')
// }


const japan = {
    lat: 48.0196,
    lng: 66.9237
  };
  
var newmap;
  
function InitMap_0(props) {
  
    console.log('map')
  
    const [map, updatemap] = React.useState('');
  
    React.useEffect(() => {
  
      newmap = new window.google.maps.Map(document.getElementById("map"), {
        center: japan,
        zoom: 2,
        gestureHandling: "cooperative"
      })
      updatemap(newmap)
  
      console.log('map is updated')
  
      const marker_list = []
      for (const key in props.coords) { //coords is a dictiiony that carry coords, location_id, address
        const marker = new window.google.maps.Marker({
          position: props.coords[key]['coord'],
          title: key,
          address: props.coords[key]['address'],
          map: newmap,
          location_id: props.coords[key]['location_id'],
          lat:props.coords[key]['lat'],
          lng:props.coords[key]['lng'],
          real_location_img:props.coords[key]['real_location_img']
        })
        marker_list.push(marker)
      }

      const infoWindow = new google.maps.InfoWindow()
      let bounds = new google.maps.LatLngBounds();
      for (const marker of marker_list) { //making a info window for each marker in the list
        const markerInfoContent = (`
            <h3>${marker.title}</h3>
            <img class='infowindow-img' src=${marker.real_location_img}>
          `);

        marker.addListener('click', () => {
          infoWindow.close();
          marker.setIcon("http://maps.google.com/mapfiles/ms/icons/blue.png");
          infoWindow.setContent(markerInfoContent)
          infoWindow.open(newmap, marker);
          console.log(marker.location_id)
          // newmap.setZoom(10);
          newmap.setCenter(marker.getPosition());
          const obj = document.getElementById(marker.location_id)
          if (obj) {
				  obj.scrollIntoView({behavior: 'smooth',block: "end", inline: "nearest"});}
        });
        const testobj = document.getElementById(`button-${marker.location_id}`)
        if (testobj){
        testobj.addEventListener('click', ()=> {
          marker.setIcon("null");
          infoWindow.close();
          console.log('hwllo')
          marker.setIcon("http://maps.google.com/mapfiles/ms/icons/blue.png");
          infoWindow.setContent(markerInfoContent)
          infoWindow.open(newmap, marker);
        })}
      }
     
     
  
      console.log('marker is updated')
    }, [japan])
  
  
  
    return (
      <div id='placeholder_0'></div>
    )
  
    }

