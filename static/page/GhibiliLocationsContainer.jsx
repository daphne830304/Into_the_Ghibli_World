function findonmap(lat, lng) {
  newmap.setZoom(8);
  newmap.setCenter({ lat: Number(lat), lng: Number(lng) })
}


function GhibiliLocations(props) {

  const history = ReactRouterDOM.useHistory()

  return (
    <div className="ghibililocation-card">
        <ReactBootstrap.Card id={props.location_id }className='location-card' border="dark">  
        <ReactBootstrap.Accordion>
          <ReactBootstrap.Card.Img variant="top" className='location-images' src={props.movie_scene_img} />
          <ReactBootstrap.Card.Body className='location-body-text'>
            <ReactBootstrap.Card.Title className='location-body-title'>{props.movie_scene}</ReactBootstrap.Card.Title>
            <ReactBootstrap.Button className='addtofav-button'id={props.location_id} onClick={props.addtofav}>
              Add to fav
            </ReactBootstrap.Button>
            <ReactBootstrap.Button id={`button-${props.location_id}`} className="findonmap-button" onClick={ () =>  findonmap(props.lat, props.lng)}>
                find on map
            </ReactBootstrap.Button>
            
            <ReactBootstrap.Card.Text className='location-body-text'>
                location in real life: {props.real_location}<br></br>
                movie:{props.title}<br></br>
                address:{props.address}
            </ReactBootstrap.Card.Text>        
            <ReactBootstrap.Button className="nearby-buttons"onClick={ () => findnearbyaccomdations(props.lat, props.lng)}>
                find nearby hotels
            </ReactBootstrap.Button>
            <ReactBootstrap.Button className="nearby-buttons"onClick={ () => findnearbyrestaurants(props.lat, props.lng)}>
                find nearby restaurants
            </ReactBootstrap.Button>
            <ReactBootstrap.Accordion.Toggle as={ReactBootstrap.Button} variant="secondary" eventKey="0" style={{ backgroundColor: 'black' }}>
                Click to see desciprtion
            </ReactBootstrap.Accordion.Toggle>
              <ReactBootstrap.Accordion.Collapse eventKey="0">
                <ReactBootstrap.Card.Body>
                  <ReactBootstrap.Card.Body>
                    <ReactBootstrap.Card.Text className='location-body-text' id={props.location_id}>
                            real_location: {props.real_location}<br></br>
                            description : {props.description}<br></br>
  
  
                    </ReactBootstrap.Card.Text>
                  </ReactBootstrap.Card.Body>
                </ReactBootstrap.Card.Body>
              </ReactBootstrap.Accordion.Collapse>
            
  
          </ReactBootstrap.Card.Body>
          </ReactBootstrap.Accordion>
        </ReactBootstrap.Card>
      </div>
  
  );
}

function LocationsDetails(props) {
  return (
  <React.Fragment>
    <tbody>
      <tr>
        <td>{props.title}</td>
        <td>{props.movie_scene}</td>
        <td>{props.real_location} </td>
        <ReactBootstrap.Button >Map</ReactBootstrap.Button>
        <ReactBootstrap.Button>See description</ReactBootstrap.Button>
        <ReactBootstrap.Button Onclick={props.addtofav}>Add to fav</ReactBootstrap.Button>
        <ReactBootstrap.Button onClick={() => findnearbyaccomdations(props.lat, props.lng)}>
          find nearby hotels
          </ReactBootstrap.Button>
        <ReactBootstrap.Button onClick={() => findnearbyrestaurants(props.lat, props.lng)}>
          find nearby restaurants
          </ReactBootstrap.Button>
        <ReactBootstrap.Button onClick={() => findonmap(props.lat, props.lng)}>
          find on map
          </ReactBootstrap.Button>
  
      </tr>
    </tbody>
  </React.Fragment>)
}

function Testlocationlocal(){
  return(<div>hello</div>)
}


function GhibiliLocationsContainer() {

  
  const [searchTerm, updateSearchTerm] = React.useState('');


  function filterTable() {
    const filterResults = locations.filter(location => location.title.toLowerCase().includes(searchTerm.toLowerCase()))
    updateLocations(filterResults)
  }

  function resetLocation(){
    updateLocations(allLocations)
    const obyect = document.getElementById('#myInput')
    obyect.scrollIntoView(alignToTop); 
  }



  function addtofav(evt) {
    // console.log(evt.target.id)
    const id = (evt.target.id)
    $.post('/api/saved_location', { 'location_id': id })
    $(this).find('span').toggleClass('glyphicon glyphicon-heart-empty');
  }

  const [locations, updateLocations] = React.useState([]);
  const [allLocations, updateAllLocations] = React.useState([]);


  React.useEffect(() => {
    $('#map')[0].style.display = 'block'
    fetch('/api/locations.json')
      .then((response) => response.json())
      .then((data) => {
        updateAllLocations(data.locations)
        updateLocations(data.locations)
      })
  }, [])

  const location_dict = {}
  const container_list = []
  const location_list = []; // part of state
  for (const location of locations) {
    if (!(location.title in location_dict)) {
      location_dict[location.title] = []
      location_dict[location.title].push(
        < GhibiliLocations
          key={location.location_id}
          real_location={location.real_location}
          movie_scene={location.movie_scene}
          description={location.description}
          imgURL={location.imgURL}
          lat={location.lat}
          lng={location.lng}
          location_id={location.location_id}
          movie_scene_img={location.movie_scene_img}
          address={location.address}
          place_id={location.place_id}
          addtofav={addtofav}
          title={location.title}
          container = {<Testlocationlocal/>}
        />)
    }
    else {
      location_dict[location.title].push(
        < GhibiliLocations
          key={location.location_id}
          real_location={location.real_location}
          movie_scene={location.movie_scene}
          description={location.description}
          imgURL={location.imgURL}
          lat={location.lat}
          lng={location.lng}
          location_id={location.location_id}
          movie_scene_img={location.movie_scene_img}
          address={location.address}
          place_id={location.place_id}
          addtofav={addtofav}
          title={location.title}
        />)
    }

  }
  for (const obj in location_dict) {
    // console.log(location_dict[obj])
    const obj_list = location_dict[obj]
    container_list.push(obj_list)
  }
  console.log(container_list)
  //update the state, will cause a re-render + your locations will appear
  const coords_dict = {}
  const map_list = []

  if (locations.length) {
    for (const location of locations) {
      const lat = Number(location.lat)
      const lng = Number(location.lng)

      const coords = {
        location_id: location.location_id,
        coord: {
          lat: lat,
          lng: lng
        },
        lat: location.lat,
        lng: location.lng,
        address: location.address,
        real_location_img: location.imgURL
      }
      coords_dict[location.real_location] = coords
      // console.log('this is the address',location.address)
    }

    map_list.push(
      <InitMap_0
        key={1}
        coords={coords_dict}
      ></InitMap_0>)
    // console.log(coords_dict)
  }


  return (
    <React.Fragment>

      {map_list}
      <div className='inputbutton'>
        <input  type="text" id="myInput" value={searchTerm} onChange={evt=>updateSearchTerm(evt.target.value)}placeholder="Search for Movie..."></input>
        <button className="findonmap-button" onClick={filterTable}>submit</button>
        <button className="addtofav-button" onClick={resetLocation}>Reset</button>
      </div>
        {container_list}


     
           

    </React.Fragment>
  );
}