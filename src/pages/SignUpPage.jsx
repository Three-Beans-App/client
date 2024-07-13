import "../styles/pages/SignUpPage.css"

export default function SignUpPage(){


    return(

        <>
            <form>
                <text>Sign Up email: </text>
                <input type="text" name="Login email" id="email" />
                <text>Sign Up Password: </text>
                <input type="password" name="formPassword" id="formPassword" />
                <button >
                Sign Up
                </button> 
            </form>    
        </>

    );
}