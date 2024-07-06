import "../styles/LoginPage.css"

export default function LoginPage(){

    return(
        <>
            <form>
                <text>Login email: </text>
                <input type="text" name="Login email" id="email" />
                <text>Password: </text>
                <input type="password" name="formPassword" id="formPassword" />
                <button >
                Login
                </button> 
            </form>    
        </>
    )
}