function AddedLocations(props) {

    return (
      <div id={props.location_id}  className="ghibililocation-card">

        <ReactBootstrap.Card  className='location-card' border="dark">  
        <ReactBootstrap.Card.Img variant="top" className='location-images' src={props.imgURL} />
        <ReactBootstrap.Accordion>
          <ReactBootstrap.Card.Body className='location-body'>
            <ReactBootstrap.Card.Title>{props.movie_scene}</ReactBootstrap.Card.Title>
            <ReactBootstrap.Card.Text className='location-body-text'>
                location in real life: {props.real_location}<br></br>
                movie:{props.title}<br></br>
                address:{props.address}
            </ReactBootstrap.Card.Text><br></br>
        
            <ReactBootstrap.Button className="nearby-buttons" onClick={ () => findnearbyaccomdations(props.lat, props.lng)}>
                find nearby hotels
            </ReactBootstrap.Button><br></br>
            <ReactBootstrap.Button className="nearby-buttons" onClick={ () => findnearbyrestaurants(props.lat, props.lng)}>
                find nearby restaurants
            </ReactBootstrap.Button><br></br>
            <ReactBootstrap.Button id={`button-${props.location_id}`} className="findonmap-button" onClick={ () =>  findonmap(props.lat, props.lng)}>
                find on map
            </ReactBootstrap.Button><br></br>
            <ReactBootstrap.Accordion.Toggle as={ReactBootstrap.Button} variant="secondary" eventKey="0" style={{ backgroundColor: 'black' }}>
                Click to see desciprtion
            </ReactBootstrap.Accordion.Toggle>
              <ReactBootstrap.Accordion.Collapse eventKey="0">
                <ReactBootstrap.Card.Body>
                  <ReactBootstrap.Card.Body>
                    <ReactBootstrap.Card.Text className='location-body-text'>
                            real_location: {props.real_location}<br></br>
                            address: {props.address}<br></br>
                            place_id: {props.place_id}
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



function AddlocationContainer() {
  function addtofav(evt) {
    console.log(evt.target.id)
    // const id = (evt.target.id)
    // $.post('/api/saved_location',{'location_id':id})
  }
    const [addedlocations, updateAddedLocations] = React.useState([]);
  
   
  
    React.useEffect(() => {
      $('#map')[0].style.display = 'block'
      fetch('/api/get_add_location.json')
        .then((response) => response.json())
        .then((data) => updateAddedLocations(data.addedlocations))
    }, [])
  
  
    const location_list = []; // part of state
    for (const addedlocation of addedlocations) {
      console.log(addedlocation.real_location)
      location_list.push(
        < AddedLocations
          key={addedlocation.place_id}
          real_location={addedlocation.real_location}
          movie_scene={addedlocation.movie_scene}
          description={addedlocation.description}
          imgURL={addedlocation.real_location_img}
          lat={addedlocation.lat}
          lng={addedlocation.lng}
          address = {addedlocation.address}
          location_id = {addedlocation.place_id}
          addtofav = {addtofav}
        />
      );
    }
    console.log('end loop')
    console.log(location_list)
    //update the state, will cause a re-render + your locations will appear
    const coords_dict = {}
    const map_list = []
  
    if (addedlocations.length) {
      for (const location of addedlocations) {
        const lat = Number(location.lat)
        const lng = Number(location.lng)
  
        const coords = {location_id: location.place_id,
                        coord: {
                                lat: lat,
                                lng: lng
                              }, 
                        lat:location.lat,
                        lng:location.lng,
                        address: location.address,
                        real_location_img: location.real_location_img
        }
        coords_dict[location.real_location] = coords
        console.log('this is the address',location.address)
      }
  
      map_list.push(
        <InitMap_0
          key={1}
          coords={coords_dict}
      ></InitMap_0>)
      console.log(coords_dict)
    }
  
  
    return (
      <React.Fragment>
    
         {map_list}
   

        {location_list}
       
     </React.Fragment>
    );
  }