

function GhibiliMovies(props) {

  return (
    <div className="movie-wrapper">
      <ReactBootstrap.Card className='movie-card' >
          <ReactBootstrap.Card.Img className='movie-img'variant="top" src={props.poster_path} />

          <ReactBootstrap.Card.Body className='movie-info'>
          
            <ReactBootstrap.Card.Title>{props.title}</ReactBootstrap.Card.Title>
            <ReactBootstrap.Card.Text>
                          Release date: {props.release_date}<br></br>
                          Rating: {props.rt_score}<br></br>
                          Producer: {props.producer}<br></br>
                          Director: {props.director}<br></br>
                          Description : {props.description}<br></br>

            </ReactBootstrap.Card.Text>
          <ReactBootstrap.Button id={props.id} onClick={props.addtofav}>
              Add to fav
            </ReactBootstrap.Button><br></br>
            {/* <ReactBootstrap.Button id={props.id} onClick={props.find_associated_locations}>
              See locations
            </ReactBootstrap.Button> */}
          </ReactBootstrap.Card.Body>
      </ReactBootstrap.Card>
    
  </div>


  );
}



function GhibiliMoviesContainer() {

  const [movies, updateMovies] = React.useState([]);

  React.useEffect(() => {
    $('#map')[0].style.display = 'none'
    fetch('/api/movies.json')
      .then((response) => response.json())
      .then((data) => updateMovies(data.movies))
  }, [])

  function addtofav(evt) {
    console.log(evt.target.id)
    const id = (evt.target.id)
    $.post('/api/saved_movie',{'movie_id':id})
  }

  function find_associated_locations(evt) {
    console.log(evt.target.id)
    const id = (evt.target.id)
    $.post('/api/associated_locations',{'movie_id':id}, function(response) {
      console.log(response)  
      // console.log(response.associated_location_list[0].real_location)
      // const res1 = response.associated_location_list[0]
      window.location.href="/locations";
    })
  }

  const movie_list = []; // part of state
  for (const movie of movies) {
    // console.log(movie.title)
    movie_list.push(
      < GhibiliMovies
        key={movie.id}
        addtofav = {addtofav}
        find_associated_locations = {find_associated_locations}
        id={movie.id}
        title={movie.title}
        description={movie.description}
        producer={movie.producer}
        director={movie.director}
        release_date={movie.release_date}
        rt_score={movie.rt_score}
        poster_path={movie.poster_path} />
    );

  }
  console.log('end loop')
  console.log(movie_list)
  //update the state, will cause a re-render + your movies will appear

  return (
    <ReactBootstrap.CardDeck  className="ghibilimovie-card">
      {movie_list}
    </ReactBootstrap.CardDeck>
  );
}

