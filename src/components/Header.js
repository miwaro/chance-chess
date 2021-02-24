import logo from '../images/chessLogo5.png';
import '../style/components/header.scss';

function Header() {

    return (
        <div className="header">
            <img src={logo} alt="logo" className="logo" />
            <h1>Chance Chess</h1>
        </div>
    )
}

export default Header;
