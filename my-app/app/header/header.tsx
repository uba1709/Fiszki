export default function Header(){
    return(
        <header>
            <div className="flex">
                <div className="containerNav">
                    <div className="logo"></div>
                    {/* <div className="aboutWeb">
                        <div className="About website">
                            <a href="#">Website</a>
                        </div>
                    </div> */}
                    <div className="nav-actions">
                        <div className="nav_LogIn-Button">
                            <a href="#">Log in</a>
                        </div>
                        <div className="nav_SignUp-Button">
                            <a href="#">Sign up</a>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}
