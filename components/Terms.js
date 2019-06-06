import TermsText from './TermsText';
import Fondo from '../static/fondo.png';
import Logo from '../static/logo.png';

function Terms() {
  return (
    <div className="policontainer">
      <div className="logocontainer">
        <img className="logo" src={Logo} alt="Tobcity Divide Tus gastos" />
      </div>
      <h1>TERMINOS Y CONDICIONES</h1>
      <img src={Fondo} className="bg" alt="Tobcity Terminos y Condiciones" />
      <div className="termcontainer">
        <div className="terms">{TermsText.text}</div>
      </div>
    </div>
  )
}

export default Terms;