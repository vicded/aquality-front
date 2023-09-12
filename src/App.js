import React, {useEffect, useState} from "react";
import { MapContainer, TileLayer, Marker, Popup, SVGOverlay } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

import ValueList from "./components/ValueList/ValueList";
import MenuHeader from "./components/MenuHeader/MenuHeader";

import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

import io from 'socket.io-client';

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png')
});

const GreenDrop = '<svg fill="#26c04c" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="-26.46 -26.46 317.48 317.48" xml:space="preserve" stroke="#26c04c"><g id="SVGRepo_bgCarrier" stroke-width="0" transform="translate(0,0), scale(1)"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <g> <path d="M132.281,264.564c51.24,0,92.931-41.681,92.931-92.918c0-50.18-87.094-164.069-90.803-168.891L132.281,0l-2.128,2.773 c-3.704,4.813-90.802,118.71-90.802,168.882C39.352,222.883,81.042,264.564,132.281,264.564z"></path> </g> </g> </g></svg>';
const YellowDrop = '<svg fill="#f2ff3d" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="-26.46 -26.46 317.48 317.48" xml:space="preserve" stroke="#f2ff3d"><g id="SVGRepo_bgCarrier" stroke-width="0" transform="translate(0,0), scale(1)"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <g> <path d="M132.281,264.564c51.24,0,92.931-41.681,92.931-92.918c0-50.18-87.094-164.069-90.803-168.891L132.281,0l-2.128,2.773 c-3.704,4.813-90.802,118.71-90.802,168.882C39.352,222.883,81.042,264.564,132.281,264.564z"></path> </g> </g> </g></svg>';
const RedDrop = '<svg fill="#ff3d3d" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="-26.46 -26.46 317.48 317.48" xml:space="preserve" stroke="#ff3d3d"><g id="SVGRepo_bgCarrier" stroke-width="0" transform="translate(0,0), scale(1)"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <g> <path d="M132.281,264.564c51.24,0,92.931-41.681,92.931-92.918c0-50.18-87.094-164.069-90.803-168.891L132.281,0l-2.128,2.773 c-3.704,4.813-90.802,118.71-90.802,168.882C39.352,222.883,81.042,264.564,132.281,264.564z"></path> </g> </g> </g></svg>';
const PurpleDrop = '<svg fill="#cb3dff" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="-26.46 -26.46 317.48 317.48" xml:space="preserve" stroke="#cb3dff"><g id="SVGRepo_bgCarrier" stroke-width="0" transform="translate(0,0), scale(1)"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <g> <path d="M132.281,264.564c51.24,0,92.931-41.681,92.931-92.918c0-50.18-87.094-164.069-90.803-168.891L132.281,0l-2.128,2.773 c-3.704,4.813-90.802,118.71-90.802,168.882C39.352,222.883,81.042,264.564,132.281,264.564z"></path> </g> </g> </g></svg>';

const CustomIcon = L.divIcon({
  className: 'custom-icon',
  html:  `${GreenDrop}`,
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

function MapWithMarker({ latitude, longitude, data}) {
  const position = [latitude, longitude];

  const maxBounds = [
    [20.6, -103.4],
    [20.7, -103.3],
  ];

  return (
    <MapContainer center={position} maxBoundsViscosity={1.0} maxBounds={maxBounds} zoom={11} scrollWheelZoom={false} style={{ height: '500px', width: '90%', margin: '0 auto', backgroundColor:'#0E3356', boxShadow: '10px 10px 29px -7px rgba(0,0,0,0.75)'}}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />

      <Marker position={position} icon={CustomIcon}>
        <Popup offset={[0, -30]}>
          <ValueList data={data}></ValueList>
        </Popup>
      </Marker>
    </MapContainer>
  );
}

function App() {  
  const latitude = 20.655144105; 
  // Replace with your desired latitude  
  const longitude = -103.327096405; 
  // Replace with your desired longitude  
  const [periodicData, setPeriodicData] = useState(null);  
  useEffect(() => {    
    const socket = io.connect('http://localhost:3001');    
    socket.on('periodicData', 
    (data) => {      
      setPeriodicData(data);    
    });    
    return() => {      
      socket.disconnect();    
    }  
  });
  
  return (    
    <div className="App">
      <MenuHeader />
      <MapWithMarker latitude={latitude} longitude={longitude} data={periodicData}/>
    </div>  
  );
}

export default App;