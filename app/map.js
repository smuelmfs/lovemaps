import React from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Customização do ícone do marcador
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdn-icons-png.flaticon.com/512/10740/10740584.png',
  iconUrl: 'https://cdn-icons-png.flaticon.com/512/10740/10740584.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Componente para alterar o centro do mapa quando a posição mudar
function ChangeView({ center }) {
  const map = useMap();
  map.setView(center, map.getZoom());
  return null;
}

const Map = ({ position }) => {
  return (
    <MapContainer
      center={position}
      zoom={13}
      style={{ height: "333px", width: "100%", outlineStyle: "auto" }}
    >
      <TileLayer
        url="https://tile.thunderforest.com/atlas/{z}/{x}/{y}.png?apikey=b5c040bd148f48debf47cf0547664fc3"
      />
      <Marker position={position}>
        <Popup>
          Localização encontrada! <br /> By LoveMaps 💕.
        </Popup>
      </Marker>

      {/* Atualiza o centro do mapa quando a posição mudar */}
      <ChangeView center={position} />
    </MapContainer>
  );
};

export default Map;
