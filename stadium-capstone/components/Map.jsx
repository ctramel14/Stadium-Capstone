import { useState, useEffect } from "react";
import "./map.css"
import "leaflet/dist/leaflet.css"
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import { Icon, divIcon, icon } from "leaflet";
import MarkerClusterGroup from "react-leaflet-cluster"
import { apiUrl } from "../apiUrl";
import markerImg from "../src/assets/marker.png"
import markerEx from "../src/assets/marker2.png"

const stadiumColors = {
  1: "rgb(156,41,59)",
  2: "rgb(27,57,99)",
  3: "rgb(233,124,77)",
  4: "rgb(189,48,57)",
  5: "rgb(40,67,138)",
  6: "rgb(0,0,0)",
  7: "rgb(195,56,55)",
  8: "rgb(33,53,77)",
  9: "rgb(65,22,122)",
  10: "rgb(22,46,81)",
  11: "rgb(227,131,72)",
  12: "rgb(41,86,147)",
  13: "rgb(184,53,57)",
  14: "rgb(49,105,163)",
  15: "rgb(80,171,223)",
  16: "rgb(33,53,88)",
  17: "rgb(28,59,103)",
  18: "rgb(236,101,48)",
  19: "rgb(40,54,87)",
  20: "rgb(41,130,75)",
  21: "rgb(216,70,67)",
  22: "rgb(249,204,92)",
  23: "rgb(63,54,48)",
  24: "rgb(240,135,64)",
  25: "rgb(50,107,108)",
  26: "rgb(206,65,89)",
  27: "rgb(36,62,105)",
  28: "rgb(31,64,131)",
  29: "rgb(51,90,150)",
  30: "rgb(172,50,38)",
};

export default function Map ({
  token,
  username,
  setUsername,
  userId,
  stadiums,
  setStadiums
}) {

  const [stadiumsVisited, setStadiumsVisited] = useState([]);

  useEffect(() => {
    async function fetchUserData() {
      if (!token || !userId) return;
      try {
        const response = await fetch(`${apiUrl}/api/users/${userId}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        const result = await response.json();
        const stads = result.visitedStadiums.map((v) => v.stadiumId);
        const iterator = stads.values();
        setStadiumsVisited(stads);
        for (const value of iterator) {
          let elements = document.getElementById(value);
          elements.style.backgroundColor = stadiumColors[value];
        }
 
        if (!username) {
          setUsername(result.username);
        }
      } catch (error) {
        console.error(error);
      }
    }
    fetchUserData();
  }, [token, userId]);

  useEffect(() => {
    async function getAllStadiums() {
      //used to set State of stadiums to display
      const APIResponse = await fetchAllStadiums();
      setStadiums(APIResponse);
    }
    getAllStadiums();
  }, []);

  async function visited(id) {
    // used to add new visited stadiums

    try {
      await fetch(
        `${apiUrl}/api/users/${userId}/visitedstadiums/${id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ visited: true }),
        }
      );
      setStadiumsVisited([...stadiumsVisited, id]);
      let element = document.getElementById(id); //sets the colors of newly visited stadiums
      element.style.backgroundColor = stadiumColors[id];
    } catch (error) {
      console.error(error);
    }
  }

  const markers = [
    {
      geocode: [33.4453, -112.0667],
      popUp: "Welcome to Chase Field!",
      id: 1
    },
    {
      geocode: [33.8911, -84.4684],
      popUp: "Welcome to Truist Park!",
      id: 2
    },
    {
      geocode: [39.2838, -76.6217],
      popUp: "Welcome to Camden Yards!",
      id: 3
    },
    {
      geocode: [42.3467, -71.0972],
      popUp: "Welcome to Fenway Park!",
      id: 4
    },
    {
      geocode: [41.9484, -87.6553],
      popUp: "Welcome to Wrigley Field!",
      id: 5
    },
    {
      geocode: [41.8299, -87.6337],
      popUp: "Welcome to Guaranteed Rate Field!",
      id: 6
    },
    {
      geocode: [39.0974, -84.5071],
      popUp: "Welcome to the Great American Ball Park!",
      id: 7
    },
    {
      geocode: [41.4959, -81.6853],
      popUp: "Welcome to Progressive Field!",
      id: 8
    },
    {
      geocode: [39.7561, -104.9942],
      popUp: "Welcome to Coors Field!",
      id: 9
    },
    {
      geocode: [42.3390, -83.0485],
      popUp: "Welcome to Comerica Park!",
      id: 10
    },
    {
      geocode: [29.7572, -95.3552],
      popUp: "Welcome to Minute Maid Park!",
      id: 11
    },
    {
      geocode: [39.0517, -94.4803],
      popUp: "Welcome to Kaufmann Stadium!",
      id: 12
    },
    {
      geocode: [33.7998, -117.8824],
      popUp: "Welcome to Angel Stadium!",
      id: 13
    },
    {
      geocode: [34.0739, -118.2400],
      popUp: "Welcome to Dodger Stadium!",
      id: 14
    },
    {
      geocode: [25.7781, -80.2196],
      popUp: "Welcome to LoanDepot Park!",
      id: 15
    },
    {
      geocode: [43.0282, -87.9713],
      popUp: "Welcome to American Family Field!",
      id: 16
    },
    {
      geocode: [44.9817, -93.2776],
      popUp: "Welcome to Target Field!",
      id: 17
    },
    {
      geocode: [40.7571, -73.8458],
      popUp: "Welcome to Citi Field!",
      id: 18
    },
    {
      geocode: [40.8296, -73.9262],
      popUp: "Welcome to Yankee Stadium!",
      id: 19
    },
    {
      geocode: [37.7514, -122.2009],
      popUp: "Welcome to the Oakland-Alameda County Coliseum!",
      id: 20
    },
    {
      geocode: [39.9061, -75.1665],
      popUp: "Welcome to Citizens Bank Park!",
      id: 21
    },
    {
      geocode: [40.4475, -80.0072],
      popUp: "Welcome to PNC Park!",
      id: 22
    },
    {
      geocode: [32,7076, -117.1570],
      popUp: "Welcome to Petco Park!",
      id: 23
    },
    {
      geocode: [37.7784, -122.3892],
      popUp: "Welcome to Oracle Park!",
      id: 24
    },
    {
      geocode: [47.5915, -122.3326],
      popUp: "Welcome to T-Mobile Park!",
      id: 25
    },
    {
      geocode: [38.6226, -90.1928],
      popUp: "Welcome to Busch Stadium!",
      id: 26
    },
    {
      geocode: [27.7682, -82.6534],
      popUp: "Welcome to Tropicana Field!",
      id: 27
    },
    {
      geocode: [32.7469, -97.0832],
      popUp: "Welcome to Globe Life Field!",
      id: 28
    },
    {
      geocode: [43.6416, -79.3894],
      popUp: "Welcome to Rogers Centre!",
      id: 29
    },
    {
      geocode: [38.8730, -77.0074],
      popUp: "Welcome to Nationals Park!",
      id: 30
    }
  ]

  // const myCustomColour = '#583470'
  // const markerHtmlStyles = `
  // background-color: ${myCustomColour};
  // width: 3rem;
  // height: 3rem;
  // display: block;
  // left: -1.5rem;
  // top: -1.5rem;
  // position: relative;
  // border-radius: 3rem 3rem 0;
  // transform: rotate(45deg);
  // border: 1px solid #FFFFFF`


  const notVisited = new Icon({
    iconSize: [38, 38],
    iconUrl: markerImg
    // className: "not-visited",
    // color: '#ffa500'
  })

  const visitedPark = new Icon({
    iconSize: [44, 44],
    iconUrl: markerEx
  })

  const createCustomClusterIcon = (cluster) => {
    return new divIcon({
      html: `<span>${cluster.getChildCount()}</span>`,
      iconSize: point(40, 40, true),
      className: "custom-marker-cluster"
    });
  }

return (
    <MapContainer center={[38.1, -99]} zoom={5} >
  <TileLayer
    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
  />
  <MarkerClusterGroup
  chunkedLoading
  // iconCreateFunction={createCustomClusterIcon}
  >
   {markers.map(marker => (
    <Marker position={marker.geocode} 
      icon={notVisited}
    >
    <Popup><h2>{marker.popUp}</h2>
    {!stadiumsVisited.includes(marker.id) && token && (
                  <button onClick={() => visited(marker.id)}>
                    Mark as Visited
                  </button>
    )}
    </Popup>
    </Marker>
  ))}
  </MarkerClusterGroup>
</MapContainer>
)
}