import React from "react"
import "./homepage.css"

const Homepage = ({setLoginUser}) => {
    return (
        <div className="homepage">
            <h1>Login Successfull !! This is Homepage</h1>
            <div className="button" onClick={ () => setLoginUser({})} >Logout</div>
        </div>

    )
}

export default Homepage