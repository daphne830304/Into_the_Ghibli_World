function UserFavs_movies(props) {

    return (
      <div  className="user-favs">
        <ReactBootstrap.Card className='location-card' border="none">  
            <ReactBootstrap.Card.Body >
                    {props.title}
            </ReactBootstrap.Card.Body>
        </ReactBootstrap.Card>
    
      </div>
    );
  }

function UserFavs_locations(props) {
  return (
    <div  className="user-favs">
      <ReactBootstrap.Card className='location-card' border="none">  
          <ReactBootstrap.Card.Body>
                  {props.location}
          </ReactBootstrap.Card.Body>
      </ReactBootstrap.Card>
    </div>
  );
}

function UserProfile() {
    $('#map')[0].style.display = 'none'
    const [userfavs, updateUserfav] = React.useState([]);

 

    React.useEffect(() => {
      fetch('/api/userprofile')
        .then((response) => response.json())
        .then((data) => updateUserfav(data.userfavs))
    }, [])

    const movie_list = []; // part of state
    const location_list = [];
    for (const userfav of userfavs) {
      if (userfav.title) {
        movie_list.push(
            < UserFavs_movies
              key={userfav.count}
              title={userfav.title}/>
          );}
      else if (userfav.location) {
        location_list.push(
          < UserFavs_locations
              key={userfav.count}
              location={userfav.location}/>
        )}
        
        }


    return (
      <div className='userfav-container'>
        <div className='userfav-left-div'>
          Saved movies
        {movie_list}
        </div>
         
        <div className='userfav-right-div'>
        Saved Locations
        {location_list}
        </div>
        
      </div>
    )
}