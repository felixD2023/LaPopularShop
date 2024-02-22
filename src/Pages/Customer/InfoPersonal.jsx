import React from 'react'
import {datosPersonales} from "./datosPersonales"

const InfoPersonal = () => {
    return (

        <>
            <label for="inputPassword5" class="form-label">Password</label>
            <input type="password" id="inputPassword5" class="form-control" aria-describedby="passwordHelpBlock" />
            <div id="passwordHelpBlock" class="form-text">
                Your password must be 8-20 characters long, contain letters and numbers, and must not contain spaces, special characters, or emoji.
            </div>


        </>
    )
}

export default InfoPersonal
