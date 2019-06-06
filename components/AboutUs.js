import React, { PureComponent, Fragment } from 'react';
import Fondo from '../static/fondoabout.png';
import Logo from '../static/logo.png';

class About extends PureComponent {
  render() {
    return (
      <Fragment>
        <div>
          <img src={Logo} alt="Tobcity Divide Tus gastos" />
        </div>
        <img src={Fondo} alt="Tobcity Terminos y Condiciones" />
        <div>
          <h1>QUIENES SOMOS?</h1>
          <small>
            TOBCITY es una plataforma comunitaria de MOVILIDAD SOSTENIBLE que tiene como propósito enlazar a personas,
            ya sea el dueño del vehículo denominado CONDUCTOR o la persona que necesita el transporte denominado PASAJERO,
            para realizar viajes por todo COLOMBIA y dentro de tu ciudad.
            El objetivo es masificar la práctica de “carpooling” viaje en carro compartido e incentivar el uso eficiente y
            racional de tu automóvil como modo de transporte.
          </small>
          <h1>VENTAJAS</h1>
          <small>
            <ul>
              <li><em>Ahorro</em> de dinero y tiempo</li>
              <li>Se logra disminuir:</li>
              <li>Emisiones de CO2 en la atmosfera</li>
              <li>Consumo de combustibles fósiles que son recursos NO renovables</li>
              <li>Congestión de tránsito, ¡muchas personas viajan solas!</li>
            </ul>
          </small>
          <h1>TOBCITY ES UNA COMUNIDAD DE CONFIANZA</h1>
          <small>
            tobcity cuenta con cientos de miembros los cuales hemos verificado uno por uno.
            “Los pasajeros" contribuyen con los gastos del viaje en ningún caso el conductor gana dinero extra, ya que este iba a realizar un viaje hacia el destino sí o sí.
          </small>
          <h1>NOSOTROS SUPERVISAMOS LOS PERFILES</h1>
          <small>
            Para más seguridad, cada perfil, foto, comentario y anuncio es objeto
            de una revisión para garantizar la confianza y el respeto.
          </small>
          <h1>¿COMO IMPACTA COMPARTIR CARRO EN TU VIDA?</h1>
          <small>
          En primer lugar, reforzara tus lazos sociales, al compartir un viaje puedes generar charlas a través de un viaje, surgiendo con esto posibilidades de trabajo
          y nuevos contactos, intercambiar puntos de vista entre personas generando confianza, y así logrando un cambio cultural frente a las personas desconocidas.
          Impacto ambiental positivo, cuando personas con un mismo destino que viajan solas todos los días, deciden compartir su viaje en un mismo automóvil,
          estas personas podrían reducir el número de carros que circulan en la ciudad o el país, ahorrando tiempo y dinero, disminuyendo la emisión de gases
          contaminantes entre otros beneficios. El uso compartido del carro tiene muchos impactos positivos sobre la sociedad, motiva la sociabilización entre
          desconocidos, disminuye la cantidad de carros circulantes con los beneficios que esto significa y representa un beneficio económico para los usuarios.
          Por eso creemos importante promover esta práctica y concientizar a las personas para que hagan un uso más racional del automóvil.
          </small>
        </div>
      </Fragment>
    );
  }

}

export default About;
