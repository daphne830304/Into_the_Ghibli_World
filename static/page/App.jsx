
function App() {
  return (
    <React.Fragment>

      <ReactRouterDOM.BrowserRouter>
        <div id='navbar-font'>
        <ReactBootstrap.Navbar id='homepage-nav-bar' className='navbarcolor' fixed="top" variant="light" bg="dark">
          <img id='logo-pic' src='/static/img/studio_logo.png'/>
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
            {/* <ReactBootstrap.Nav.Link> */}
              <ReactRouterDOM.Link className='navbarlink' to='/addlocation'>
                    </ReactRouterDOM.Link>
            {/* </ReactBootstrap.Nav.Link> */}
            {/* <ReactBootstrap.Nav.Link> */}
              <ReactRouterDOM.Link className='navbarlink' to='/login'>
                    </ReactRouterDOM.Link>
            {/* </ReactBootstrap.Nav.Link> */}
            {/* <ReactBootstrap.Nav.Link> */}
              <ReactRouterDOM.Link className='navbarlink' to='/userprofile'>
                    </ReactRouterDOM.Link>
            {/* </ReactBootstrap.Nav.Link> */}
            {/* <ReactBootstrap.Nav.Link> */}
              <ReactRouterDOM.Link className='navbarlink' to='/addedlocation'>
            </ReactRouterDOM.Link>
              {/* </ReactBootstrap.Nav.Link> */}
            </ReactBootstrap.Nav>
          
        </ReactBootstrap.Navbar>
        </div>
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
            <Login />
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
          {/* <ReactRouterDOM.Route path='/test'>
            <Testlocation />
          </ReactRouterDOM.Route> */}
        </ReactRouterDOM.Switch>

      </ReactRouterDOM.BrowserRouter>
 

      {/* <MakeTabs></MakeTabs> */}

    </React.Fragment>
   
  );
}

ReactDOM.render(
  <App />,
  document.getElementById('root'))


    //react async issue-- fixed by adding a conditional in the TestMap component 

