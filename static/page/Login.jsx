
function Login() {
    $('#map')[0].style.display = 'none'
    // const [allValues, setAllValues] = React.useState({email:"",password:""})

    // function handleChange(event) {
    //         setAllValues({...allValues, [event.target.name]: event.target.value})
    //      }

    // function handleSubmit(event) {

    //     event.preventDefault();
    //     // console.log(session)
    //     console.log(allValues)
    //     console.log('json_stringyy',JSON.stringify(allValues))
    //     fetch('/api/login',{ 
    //         method: 'POST',
    //         headers: {
    //             Accept: 'application/json',
    //             'Content-Type': 'application/json'
    //           },
    //         body: JSON.stringify(allValues),

    //     })
    //     .then((response) => response.json())
    //     .then((data) => console.log(data))
    // }

    return (
        <React.Fragment>
            <div id='main-login-container'>
                <div>
                    <form class="form-signin" method="POST" action='/login'>

                        <h2>Please Sign In</h2>

                        <div class="form-group">
                            <label for="email-field" class="sr-only">Email Address</label>
                            <input type="email"
                                name="email"
                                // value = {formvalue}
                                // onChange = {handleChange}
                                class="form-control input-lg"
                                placeholder="Email Address"
                                required
                                autofocus></input>
                        </div>

                        <div class="form-group">
                            <label for="password-field" class="sr-only">Password</label>
                            <input type="password"
                                name="password"
                                // value = {formvalue}
                                // onChange = {handleChange}
                                class="form-control input-lg"
                                placeholder="Password"
                                required></input>
                        </div>

                        <button class="login-button" type="submit">Sign In</button>
                    </form>
                </div>
                {/* <h1 style='float:left;'>Or</h1> */}
                <div>
                    
                    <form class="form-signin-right" method="POST" action='/register'>
                        <h2 class="form-signin-heading">Register</h2>

                        <div class="form-group">
                            <input type="email" id="email" name="email" placeholder="Email" class="form-control input-lg" />
                        </div>

                        <div class="form-group">
                            <input type="password" id="password" name="password" class="form-control input-lg" placeholder="Password" />
                        </div>
                        <button class="register-button" type="submit">Register</button>
                    </form>
                </div>
            </div>
            <img class='login-page-photo' src='/static/img/totoro-logo-438-cf0b73.png'></img>
            
        </React.Fragment>
    )
}