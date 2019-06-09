import React, { Component, Fragment } from 'react'
import Modal from 'react-responsive-modal'
import moment from 'moment'
import { Map, Polyline, Marker, GoogleApiWrapper } from 'google-maps-react'
import { connect } from 'react-redux'
import styles from './Autocomplete.css'
// import { addPlacesRequest } from '../../modules/Travel/TravelActions'
import Mascotas from './images/mascota.png'
import NoMascotas from './images/nomascota.png'
import Equipaje from './images/equipaje.png'
import NoEquipaje from './images/noequipaje.png'
import Cigarrillo from './images/cigarro.png'
import NoCigarro from './images/nocigarro.png'
import Comida from './images/comida.png'
import NoComida from './images/nocomida.png'
import getConfig from 'next/config'
import Title from './images/titleAddTravel.png'

import { Button } from 'antd'
const { publicRuntimeConfig } = getConfig()
const { GOOGLE_MAPS } = publicRuntimeConfig

class Contents extends Component {
  state = {
    from: null,
    to: null,
    nameFrom: '',
    nameTo: '',
    routes: [],
    showBtn: true,
    error: '',
    confirmModal: true,
    date: moment(),
    petChecked: false,
    lugaggeChecked: false,
    cigarChecked: false,
    foodChecked: false,
  };

  componentDidMount() {
    this.renderAutoComplete();
  }

  componentDidUpdate(prevProps) {
    if (this.props !== prevProps.map) this.renderAutoComplete();
  }

  onSubmit(e) {
    e.preventDefault();
  }
  onCloseModal = () => {
    this.setState({
      confirmModal: false,
    });
  };
  onChange = date => this.setState({ date })
  getDirections() {
    const { google, map } = this.props;
    const directionsService = new google.maps.DirectionsService;
    const directionsDisplay = new google.maps.DirectionsRenderer;
    directionsDisplay.setMap(map);
    const request = {
      origin: this.state.from ? this.state.from : '0',
      destination: this.state.to ? this.state.to : '1',
      travelMode: 'DRIVING',
    };
    directionsService.route(request, (result, status) => {
      if (status === 'OK') {
        directionsDisplay.setDirections(result);
        const route = result.routes[0];
        this.setState({ routes: route });
      }
      // eslint-disable-next-line
      else {
        this.setState({
          error: status,
        });
      }
    });
  }
  handleCalcular = () => {
    this.getDirections();
    this.setState({ showBtn: !this.state.showBtn });
  }
  handleCancelar = () => {
    this.autocompleteFrom.value = '';
    this.autocompleteTo.value = '';
    this.setState({
      showBtn: !this.state.showBtn,
    });
  }
  handleContinuar = () => {
    const { from, to, routes, nameTo, nameFrom, petChecked, lugaggeChecked, cigarChecked, foodChecked } = this.state;
    const places = {
      nameFrom,
      nameTo,
      latFrom: from.lat(),
      lngFrom: from.lng(),
      latTo: to.lat(),
      lngTo: to.lng(),
      polyline: routes.overview_polyline,
      pets: petChecked,
      lugagge: lugaggeChecked,
      smoke: cigarChecked,
      food: foodChecked,
    };
    this.props.handler();
    // this.props.dispatch(addPlacesRequest(places));
  }
  renderAutoComplete() {
    const { google, map } = this.props;
    const options = {
      componentRestrictions: { country: 'co' },
    };

    if (!google || !map) return;

    const autocompleteFrom = new google.maps.places.Autocomplete(this.autocompleteFrom, options);
    const autocompleteTo = new google.maps.places.Autocomplete(this.autocompleteTo, options);
    autocompleteFrom.bindTo('from', map);
    autocompleteTo.bindTo('to', map);

    autocompleteFrom.addListener('place_changed', () => {
      const from = autocompleteFrom.getPlace();

      if (!from.geometry) return;

      if (from.geometry.viewport) map.fitBounds(from.geometry.viewport);
      else {
        map.setCenter(from.geometry.location);
      }

      this.setState({
        from: from.geometry.location,
        nameFrom: from.name,
      });
    });
    autocompleteTo.addListener('place_changed', () => {
      const to = autocompleteTo.getPlace();

      if (!to.geometry) return;

      if (to.geometry.viewport) map.fitBounds(to.geometry.viewport);
      else {
        map.setZoom(17);
      }

      this.setState({
        to: to.geometry.location,
        nameTo: to.name,
      });
    });
  }
  handlePetChecked = () => {
    this.setState(prevState => ({
      petChecked: !prevState.petChecked,
    }));
  }
  handleLugaggeChecked = () => {
    this.setState(prevState => ({
      lugaggeChecked: !prevState.lugaggeChecked,
    }));
  }
  handleCigarChecked = () => {
    this.setState(prevState => ({
      cigarChecked: !prevState.cigarChecked,
    }));
  }
  handleFoodChecked = () => {
    this.setState(prevState => ({
      foodChecked: !prevState.foodChecked,
    }));
  }
  render() {
    const petChoice = (this.state.petChecked) ?
      <div>
        <img onClick={this.handlePetChecked} alt="Opciones de viaje" src={Mascotas} />
      </div>
    :
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <img onClick={this.handlePetChecked} alt="Opciones de viaje" src={NoMascotas} />
      </div>;
    const lugaggeChoice = (this.state.lugaggeChecked) ?
      <div>
        <img onClick={this.handleLugaggeChecked} alt="Opciones de viaje" src={Equipaje} />
      </div>
    :
      <div>
        <img onClick={this.handleLugaggeChecked} alt="Opciones de viaje" src={NoEquipaje} />
      </div>;
    const cigarChoice = (this.state.cigarChecked) ?
      <div>
        <img onClick={this.handleCigarChecked} alt="Opciones de viaje" src={Cigarrillo} />
      </div>
    :
      <div>
        <img onClick={this.handleCigarChecked} alt="Opciones de viaje" src={NoCigarro} />
      </div>;
    const foodChoice = (this.state.foodChecked) ?
      <div>
        <img onClick={this.handleFoodChecked} alt="Opciones de viaje" src={Comida} />
      </div>
       :
      <div>
        <img onClick={this.handleFoodChecked} alt="Opciones de viaje" src={NoComida} />
      </div>;
    const { from, to } = this.state;
    const pointstobound = [
      { lat: from ? from.lat() : 4.00, lng: from ? from.lng() : 72.00 },
      { lat: to ? to.lat() : 4.01, lng: to ? to.lng() : 72.01 },
    ];
    const bounds = new this.props.google.maps.LatLngBounds();
    for (let i = 0; i < pointstobound.length; i++) {
      bounds.extend(pointstobound[i]);
    }
    // (5000+(1100*km)+(107*min))/4 Local
    // (550*km)/4 Nacional
    // precio estimado por pasajero
    const data = this.state.routes && this.state.routes.legs;
    const DistanceText = data !== undefined && data.length && data[0].distance.text;
    const DurationText = data !== undefined && data.length && data[0].duration.text;
    // const localValue = (5000 + (1100 * DistanceText) + (107 * DurationText)) / 4;
    const distance = DistanceText && DistanceText.match(/\d/g);
    const duration = DurationText && DurationText.match(/\d/g);
    let valueNational;
    let valueLocal;
    // 
    // 
    if (duration.length > 0 && duration.length <= 2) {
      const totalminutes = duration.join('');
      const totaldistance = distance.join('') / 10;
      const valueLoc = (5000 + (1100 * totaldistance) + (107 * totalminutes)) / 4;
      valueLocal = valueLoc.toFixed().replace(/\d(?=(\d{3})+\.)/g, '$&,');
      // 
    }
    if (duration.length > 2) {
      const valueNal = (400 * distance.join('')) / 4;
      valueNational = valueNal.toFixed().replace(/\d(?=(\d{3})+\.)/g, '$&,');
      // 
    }
    const overviewPolyline = this.state.routes && this.state.routes.overview_polyline;
    const pointsline = overviewPolyline && this.props.google.maps.geometry.encoding.decodePath(overviewPolyline);
    return (
      <div className="add-travel-container">
        <div className="placesinput">
          <Modal open={this.state.error !== '' && this.state.confirmModal} onClose={this.onCloseModal} center>
            <h2>Al parecer hubo un error con tu busqueda, intenta de nuevo</h2>
          </Modal>
          <form onSubmit={this.onSubmit} className="addForm" >
            <img className="title-add-form" src={Title} alt="Publica tu viaje" />
            <div className="input-container">
              <input
                placeholder="Donde Empieza tu recorrido..."
                ref={ref => (this.autocompleteFrom = ref)}
                type="text"
              />
              <input
                placeholder="Hacia donde te diriges..."
                ref={ref => (this.autocompleteTo = ref)}
                type="text"
              />
            </div>
              <div className="datainfo">
                  {(overviewPolyline) && <div className="distance"><p>Distancia: <br />{DistanceText}</p></div>}
                  {(overviewPolyline) && <div className="duration"><p>Duracion: <br />{DurationText}</p></div>}
                  {(overviewPolyline) && <div className="value"><p>precio estimado por pasajero: <br />$ {valueLocal || valueNational}</p></div>}
              </div>
              {
                (!this.state.showBtn) &&
                  <div className="options">
                    <h4>Elije tus preferencias <br /> de viaje:</h4>
                    {petChoice}
                    {lugaggeChoice}
                    {cigarChoice}
                    {foodChoice}
                  </div>
              }
              <div className="btnroute">
                {to && this.state.showBtn && this.state.date !== null && <Button type="primary" className="calcularbtn" htmlType="button" onClick={this.handleCalcular} >Calcular</Button>}
                {!this.state.showBtn && <Button  type="primary"  htmlType="button" onClick={this.handleCancelar} >Cancelar</Button>}
                {!this.state.showBtn && <Button type="primary"  htmlType="button" onClick={this.handleContinuar} >Continuar</Button>}
              </div>
          </form>
        </div>

        <div className="right">
          <Map
            {...this.props}
            containerStyle={{
              position: 'relative',
              display: 'inline-block',
              height: '30vh',
              width: '80%',
            }}
            centerAroundCurrentLocation
            initialCenter={{
              lat: 4.570868,
              lng: -74.29733299999998,
            }}
            bounds={to && bounds && bounds}
            zoom={5}
          >
            {
              (overviewPolyline) &&
                <Polyline
                  path={pointsline}
                  strokeColor="#1e8c86"
                  strokeOpacity={0.8}
                  strokeWeight={2}
                />
            }
            <Marker
              position={from}
            />
            <Marker
              position={to}
            />
          </Map>
        </div>
        <style scoped>{`
          @media(max-width: 420px) {
            .title-add-form {
              width:  100%;
            }
            .datainfo,
            .options {
              width: 100%;
              text-align: -webkit-center;
              flex-wrap: wrap;
            }
            .btnroute {
              flex-direction: column;
            }
          }
          .distance,
          .duration,
          .value {
            color: rgb(42,168,154);
            font-weight: 800;
            border: 3px solid #8f8f8f;
            display: inline-block;
            font-size: .6rem;
            border-radius: 5px 5px 0px 5px;
            width: 83px;
            height: 77px;
            margin: 7px;
          } 
          .datainfo {
            display: inline-flex;
          }
           .input-container {
             margin: 10px;
           }          
           .input-container input {
             margin: 10px;
           }          
          
          .options {
            display: inline-flex;
            cursor: pointer;
          }
          .options h4,
          .options p {
            color: gray;
            width: 100px;
          }
          .options img{
            width: 40px;
          }
          .containermap {
            height: 200px;
            width: 200px;
            display: inline-block;
          }
          .calendar {
            background: black;
          }
          .datecontainer {
            display: inline-flex;
            flex-direction: column;
            text-align: center;
            display: inline-flex;
            color: grey;
            width: 142px;
            margin-bottom: 10px;
          }
          .btnroute {
            display: flex;
            justify-content: space-around;
            margin: 5px
          }
        `}</style>
      </div>
    );
  }
}

const MapWrapper = props => (
  <Map className="map" google={props.google} visible={false}>
    <Contents {...props} />
  </Map>
)

function mapStateToProps(store) {
  return {
    store,
  }
}
// eslint-disable-next-line
export default connect(mapStateToProps)(GoogleApiWrapper({
  apiKey: GOOGLE_MAPS,
  language: 'es',
  region: 'co',
  libraries: ['geometry', 'places'],
})(MapWrapper));
