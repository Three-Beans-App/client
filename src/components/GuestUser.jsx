import React from "react"
import "../styles/components/GuestUser.css";

export default function GuestUser({name, contact, onNameChange, onContactChange}){

    return(

        <div id="guest-checkout-container">
            <div id="guest-checkout-content">
                <div id="guest-checkout-title"> Guest Checkout Details </div>
                <form>
                    <label> Your name:</label>
                    <input 
                        type="text" name="name" id="name"
                        value={name} onChange={(event)=> onNameChange(event.target.value)}
                        />
                     <label> Your contact number:</label>
                    <input 
                        type="text" name="contact" id="contact"
                        value={contact} onChange={(event)=> onContactChange(event.target.value)}
                        />
                </form>
            </div>
        </div>
    )
}