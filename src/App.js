import React, {useEffect, useState} from "react";
import { LineChart, XAxis, Tooltip, CartesianGrid, Line } from "recharts";
import { MapContainer, TileLayer, Marker, Popup, SVGOverlay } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'

import ValueList from "./components/ValueList/ValueList";
import MenuHeader from "./components/MenuHeader/MenuHeader";
import ExcelDate from "./components/ExcelDate/ExcelDate";

import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

import io from 'socket.io-client';

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png')
});

const colorDrop = (color) => {
  return `<svg fill="${color}" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="-26.46 -26.46 317.48 317.48" xml:space="preserve" stroke="#26c04c"><g id="SVGRepo_bgCarrier" stroke-width="0" transform="translate(0,0), scale(1)"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <g> <path d="M132.281,264.564c51.24,0,92.931-41.681,92.931-92.918c0-50.18-87.094-164.069-90.803-168.891L132.281,0l-2.128,2.773 c-3.704,4.813-90.802,118.71-90.802,168.882C39.352,222.883,81.042,264.564,132.281,264.564z"></path> </g> </g> </g></svg>`
}
const GreenDrop = '#26C04C';
const OrangeDrop = '#F08700';
const RedDrop = '#FF3D3D';
const GrayDrop = '#7D7C7A';

const CustomIcon = ({html, iconSize, iconAnchor}) => L.divIcon({
  className: 'custom-icon',
  html: html,
  iconSize: iconSize || [40, 40],
  iconAnchor: iconAnchor || [20, 40],
});

const evaluateMarkerColor = (data) => {
  let color;
  console.log('evaluate data', data, typeof data);
  if (data === null) {
    color = GrayDrop;
    return colorDrop(color);
  }

  const {ph, tds, turbidity} = JSON.parse(data); 
  if ((ph > 8.5 || ph < 6.5) || tds > 1000 || turbidity > 4.0) {
    color = RedDrop;
  } else if ((ph == 8.5 || ph == 6.5) || tds == 1000 || turbidity == 4) {
    color = OrangeDrop;
  } else {
    color = GreenDrop;
  }

  return colorDrop(color);
};

function MapWithMarker({ latitude, longitude, data}) {
  const position = [latitude, longitude];

  const maxBounds = [
    [20.6, -103.4],
    [20.7, -103.3],
  ];
  
  let coloredIcon = evaluateMarkerColor(data);
  let icon = CustomIcon({'html': coloredIcon});

  return (
    <MapContainer center={position} maxBoundsViscosity={1.0} maxBounds={maxBounds} zoom={11} scrollWheelZoom={false} style={{ height: '500px', width: '90%', margin: '0 auto', backgroundColor:'#0E3356', boxShadow: '10px 10px 29px -7px rgba(0,0,0,0.75)'}}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />

      <Marker position={position} icon={icon}  eventHandlers={{
        mouseover: (event) => event.target.openPopup(),
        mouseout: (event) => event.target.closePopup()
      }}>
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
    <>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <div className="App">
          <MenuHeader />
          <h2>Monitoreo</h2>
          <MapWithMarker latitude={latitude} longitude={longitude} data={periodicData}/>
          <h2>Eventos</h2>
          <ExcelDate />
        </div>
      </LocalizationProvider>  
    </>
  );
}

export default App;