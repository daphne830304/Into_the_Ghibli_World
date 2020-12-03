let center_coord = {
    lat: 37.601773,
    lng: -122.202870
  };


function Addlocation() {
  $('#map')[0].style.display = 'block'

  // console.log('location map')


  const [map, updatemap] = React.useState('');

  React.useEffect(() => {
    newmap = new window.google.maps.Map(document.getElementById("map"), {
      center: center_coord,
      zoom: 5
    })
    updatemap(newmap)
  
    console.log('location map is updated')
  }, [center_coord])

  
  const [allValues, setAllValues] = React.useState({location:'',movie_scene:'',Description:'',dropdownmovies:''})
  function handleChange(event) {
          setAllValues({...allValues, [event.target.name]: event.target.value})
      }
  function handleSubmit(event) {
    
        event.preventDefault();
        // console.log(session)
        console.log(allValues)

        const name = $('#name').text()
        const lat = $('#lat').text()
        const lng = $('#lng').text()
        const address =$('#address').text()
        const imgURL = $('#addlocation-img').attr('src')
        const place_id = $('#googlemapplaceid').text()
        // console.log(imgURL)
        $.post('/api/add_location',{name:name,lat:lat, lng:lng, address:address, imgURL:imgURL,
          address:address, place_id:place_id,allvalues:allValues })
      }

  function lookuplocation(evt) {
      evt.preventDefault()
      console.log(allValues.location)

      var request = {
        query: allValues.location,
        fields: ['name', 'geometry','photos','formatted_address','types','place_id'],
      };
    
      var service = new window.google.maps.places.PlacesService(newmap);
      service.findPlaceFromQuery(request, function(results, status) {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
          console.log(results) 
          const result = results[0]
          $('#address').text(result.formatted_address)
          $("#lat").text(result.geometry.location.lat)
          $("#lng").text(result.geometry.location.lng)
          $("#name").text(result.name)
          $("#types").text(result.types)
          $("#googlemapplaceid").text(result.place_id)
          $('#addlocation-img').attr('src', result.photos[0].getUrl())
          const marker = new window.google.maps.Marker({
                          position:result.geometry.location,
                          map:newmap})
          newmap.setCenter(marker.getPosition())
          const infoWindow = new google.maps.InfoWindow()
          const markerInfoContent = (`
          <h3>${result.name}</h3>
        `);
      
          marker.addListener('click', () => {
    
            infoWindow.setContent(markerInfoContent)
            infoWindow.open(newmap, marker);
            newmap.setCenter(marker.getPosition());
          
          })
        }
        
        else if (status==='ZERO_RESULTS') {
          console.log('zero results')
        }

      })
  }




  return (
      <div class='addlocationform'>
        
          <form class="form-add-location" id='form-find-loc' onSubmit={handleSubmit}>
          <h2 class="add-location-heading">Add a Location</h2>
            <div class='left-div'>
              
              <div class="form-group">
                  <label htmlFor="location" class="sr-only">Location Name</label>
                  <input 
                      id = 'location_input_id'
                      value = {allValues.location}
                      onChange = {handleChange}
                      name= "location"
                      placeholder="enter location"
                      required
                      autofocus></input>
              </div>
              <button id='find-location' onClick= {lookuplocation}>find on map</button>

              <section id="display-coordinates" class='findmapsection'>
                <dl>
                  <dt>Address</dt>
                  <dd id="address">Unknown</dd>

                  <dt>Name</dt>
                  <dd id="name">Unknown</dd>

                  <dt>Lat</dt>
                  <dd id="lat">Unknown</dd>

                  <dt>Lng</dt>
                  <dd id="lng">Unknown</dd>

                  <dt>Types</dt>
                  <dd id="types">Unknown</dd>

                  <dt>Google Map place Id</dt>
                  <dd id="googlemapplaceid">Unknown</dd>
                </dl>

                <img id='addlocation-img'>
                </img>
              </section>
              </div>
              <div class='right-div'>
              <div class="form-group">
                  <h5 class="form-signin-heading">Add Movie Scene</h5>
                  <label htmlFor="movie_scene" class="sr-only"></label>
                  <input
                      class='long-input'
                      name= "movie_scene"
                      placeholder="movie scene"
                      onChange = {handleChange}
                      required
                      autofocus></input><br></br>
                  
                  <h5 class="form-signin-heading">Add Description</h5>
                  <label htmlFor="Description" class="sr-only"></label>
                  <input
                      class='long-input'
                      name= "Description"
                      placeholder="Description"
                      onChange = {handleChange}
                      required
                      autofocus></input>

                  <h5 class="form-signin-heading">Choose Movie</h5>
                  <label htmlFor="Description" class="sr-only"></label>

                  <select name="dropdownmovies" id="dropdownmovies" onChange = {handleChange}>
                    <option value=''>Choose a movie</option>
                    <option value='Castle in the Sky'>Castle in the Sky</option>
                    <option value='Grave of the Fireflies'>Grave of the Fireflies</option>
                    <option value='My Neighbor Totoro'>My Neighbor Totoro</option>
                    <option value="Kiki's Delivery Service">Kiki's Delivery Service</option>
                    <option value='Porco Rosso'>Porco Rosso</option>
                    <option value='Pom Poko'>Pom Poko</option>
                    <option value= 'Whisper of the Heart'>Whisper of the Heart</option>
                    <option value='Princess Mononoke'>Princess Mononoke</option>
                    <option value='Spirited Away'>Spirited Away</option>
                    <option value='The Cat Returns'>The Cat Returns</option>
                    <option value='Ponyo'>Ponyo</option>
                    <option value="Howl's Moving Castle">Howl's Moving Castle</option>
                    <option value="The Tale of the Princess Kaguya">The Tale of the Princess Kaguya</option>
                    <option value='My Neighbors the Yamadas'>My Neighbors the Yamadas</option>
                    <option value='Only Yesterday'>Only Yesterday</option>
                    <option value="Arrietty">Arrietty</option>
                    <option value="Tales from Earthsea">Tales from Earthsea</option>
                    <option value='From Up on Poppy Hill'>From Up on Poppy Hill</option>
                    <option value='When Marnie Was There'>When Marnie Was There</option>
                    <option value="The Wind Rises">The Wind Rises</option>
                  </select>

              </div>

              <button id='to-database' onClick={handleSubmit}>Submit</button>
              </div>
              </form>
        
          
        
      </div>
  )
}

