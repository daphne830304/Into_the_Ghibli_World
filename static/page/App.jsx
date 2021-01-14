const AuthContext = React.createContext(null);
function App() {

  const [loggedIn, setLoggedIn] = React.useState(null);
  const [alert, showAlert] = React.useState(false);
  const [message, setMessage] = React.useState('');

  const VARIANTS = {
    true: 'success',
    false: 'danger'
  };

  React.useEffect(() => {
    fetch('/api/check_session')
      .then(res => res.json())
      .then(data => {
        setLoggedIn(data.session) 
        showAlert(true)
        console.log(data.session)
        console.log(loggedIn)})
  }, [loggedIn]);

  const NavLinks = {
    true: (
      <div id='homepage-login' class='h1-homepage'>
        <ReactBootstrap.Navbar id='homepage-nav-bar' className='navbarcolor' fixed="top" variant="light" bg="dark">
          <img id='logo-pic' src='/static/img/studio_logo.png' />
          <ReactBootstrap.Navbar.Brand className='home-navbarlink' href="/">HOME</ReactBootstrap.Navbar.Brand>
          <ReactBootstrap.Nav >
            <ReactBootstrap.Nav.Link >
              <ReactRouterDOM.Link className='navbarlink' to='/movies'>FILMS
            </ReactRouterDOM.Link>
            </ReactBootstrap.Nav.Link>
            <ReactBootstrap.Nav.Link >
              <ReactRouterDOM.Link className='navbarlink' to='/locations'>LOCATIONS
                </ReactRouterDOM.Link>
            </ReactBootstrap.Nav.Link>
            <ReactBootstrap.Nav.Link >
              <ReactRouterDOM.Link className='navbarlink' to='/logout'>Logout
                </ReactRouterDOM.Link>
              <ProcessLogout />
            </ReactBootstrap.Nav.Link>

            <ReactBootstrap.Nav.Link>
              <ReactRouterDOM.Link className='navbarlink' to='/addlocation'>Add Location
                </ReactRouterDOM.Link>
            </ReactBootstrap.Nav.Link>
            <ReactBootstrap.Nav.Link>
              <ReactRouterDOM.Link className='navbarlink' to='/login'>
              </ReactRouterDOM.Link>
            </ReactBootstrap.Nav.Link>
            <ReactBootstrap.Nav.Link>
              <ReactRouterDOM.Link className='navbarlink' to='/userprofile'>User Profile
                </ReactRouterDOM.Link>
            </ReactBootstrap.Nav.Link>
            <ReactBootstrap.Nav.Link>
              <ReactRouterDOM.Link className='navbarlink' to='/addedlocation'>Added Location
        </ReactRouterDOM.Link>
            </ReactBootstrap.Nav.Link>
          </ReactBootstrap.Nav>

        </ReactBootstrap.Navbar>
      </div>
    ),

    false: (
      <div id='homepage-login' class='h1-homepage'>
        <ReactBootstrap.Navbar id='homepage-nav-bar' className='navbarcolor' fixed="top" variant="light" bg="dark">
          <img id='logo-pic' src='/static/img/studio_logo.png' />
          <ReactBootstrap.Navbar.Brand className='home-navbarlink' href="/">HOME
        </ReactBootstrap.Navbar.Brand>
          <ReactBootstrap.Nav >
            <ReactBootstrap.Nav.Link >
              <ReactRouterDOM.Link className='navbarlink' to='/movies'>FILMS
              </ReactRouterDOM.Link><br></br>
            </ReactBootstrap.Nav.Link>
            <ReactBootstrap.Nav.Link >
              <ReactRouterDOM.Link className='navbarlink' to='/locations'>LOCATIONS
                  </ReactRouterDOM.Link>
            </ReactBootstrap.Nav.Link>
            <ReactBootstrap.Nav.Link >
              <ReactRouterDOM.Link className='navbarlink' to='/processlogin'>LOGIN
          </ReactRouterDOM.Link>
            </ReactBootstrap.Nav.Link>
          </ReactBootstrap.Nav>

        </ReactBootstrap.Navbar>
      </div>

    )
  };
  return (
    <AuthContext.Provider value={{loggedIn, setLoggedIn}}>

      <ReactRouterDOM.BrowserRouter>
        
        {NavLinks[loggedIn]}
        
        <ReactRouterDOM.Switch>
          <ReactRouterDOM.Route path='/movies'>
            <GhibiliMoviesContainer />
          </ReactRouterDOM.Route>
          <ReactRouterDOM.Route path='/locations'>
            <GhibiliLocationsContainer />
          </ReactRouterDOM.Route>
          <ReactRouterDOM.Route path='/addlocation'>
            <Addlocation />
          </ReactRouterDOM.Route>
          <ReactRouterDOM.Route path='/login'>
            <Login/>
          </ReactRouterDOM.Route>
          <ReactRouterDOM.Route path='/' exact>
            <IndexPage />
          </ReactRouterDOM.Route>
          <ReactRouterDOM.Route path='/userprofile'>
           <UserProfile />
          </ReactRouterDOM.Route>
          <ReactRouterDOM.Route path='/addedlocation'>
           <AddlocationContainer />
          </ReactRouterDOM.Route>
          <ReactRouterDOM.Route path='/processlogin'>
            <ProcessLogin setMessage={setMessage} showAlert={showAlert}/>
            <ReactBootstrap.Alert variant={VARIANTS[loggedIn]} show={alert} onClose={() => {showAlert(false)}} dismissible>
              {message}
            </ReactBootstrap.Alert>
          </ReactRouterDOM.Route>
          <ReactRouterDOM.Route path='/test-2'>
           <Testlocationlocal />
          </ReactRouterDOM.Route>
        </ReactRouterDOM.Switch>

      </ReactRouterDOM.BrowserRouter>
 


  </AuthContext.Provider>
   
  );
}

ReactDOM.render(
  <App />,
  document.getElementById('root'))


    //react async issue-- fixed by adding a conditional in the TestMap component 

