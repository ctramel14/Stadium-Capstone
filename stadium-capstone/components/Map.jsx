import "./map.css"
import "leaflet/dist/leaflet.css"
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import { Icon, divIcon } from "leaflet";
import MarkerClusterGroup from "react-leaflet-cluster"

const apiUrl = "https://stadium-capstone.onrender.com"



export default function Map () {

  const markers = [
    {
      geocode: [37.7784, -122.3892],
      popUp: "Welcome to Oracle Park!"
    },
    {
      geocode: [42.3467, -71.0972],
      popUp: "Welcome to Fenway Park!"
    },
    {
      geocode: [40.8296, -73.9262],
      popUp: "Welcome to Yankee Stadium!"
    }
  ]

  const customIcon = new Icon({
    iconUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT5Xptzt5BlvH0Mo9MyUs1-6hpXMTIIwQOfOA&s",
    iconSize: [38, 38]
  })

  const createCustomClusterIcon = (cluster) => {
    return new divIcon({
      html: `<span>${cluster.getChildCount()}</span>`,
      iconSize: point(40, 40, true),
      className: "custom-marker-cluster"
    });
  }

return (
    <MapContainer center={[38.1, -99]} zoom={6} >
  <TileLayer
    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
  />
  <MarkerClusterGroup
  chunkedLoading
  iconCreateFunction={createCustomClusterIcon}
  >
  {markers.map(marker => (
    <Marker position={marker.geocode} icon={customIcon}>
    <Popup><h2>{marker.popUp}</h2></Popup>
    </Marker>
  ))}
  </MarkerClusterGroup>
</MapContainer>
)
}