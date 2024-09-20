import "./StadiumCards.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
// import { createStadiums } from "../../prisma/seed.js";

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

//fetching all stadiums
export default function StadiumCards({ stadiums, setStadiums }) {
  const [searchParam, setSearchParam] = useState("");
  const navigate = useNavigate();

  async function fetchAllStadiums() {
    try {
      const response = await fetch("http://localhost:3000/api/stadiums");
      const result = await response.json();
      // console.log(result);
      return result;
    } catch (error) {
      console.error(error);
    }
  }
  fetchAllStadiums();

  useEffect(() => {
    async function getAllStadiums() {
      const APIResponse = await fetchAllStadiums();
      // console.log(APIResponse);
      setStadiums(APIResponse);
    }
    getAllStadiums();
  }, []);

  //search functionality

  const stadiumsToDisplay = searchParam
    ? stadiums.filter((stadium) =>
        stadium.teamName.toLowerCase().includes(searchParam)
      )
    : stadiums;

  return (
    <div className="bg-wrapper">
      <div className="search">
        <label>
          <input
            id="searchfield"
            type="text"
            className="searchInput"
            placeholder="Search by Team"
            onChange={(e) => setSearchParam(e.target.value.toLowerCase())}
          />
        </label>
      </div>
      <h1>Will You Visit Every Stadium?</h1>
      <h3>Select 'Explore' to see more information, or 'Visited' to add it to your visited list.</h3>
      <div className="stadiums-grid-container">
        {stadiumsToDisplay.map((stadium) => (
          <div
            className="stadium-card"
            key={stadium.id}
            style={{ backgroundColor: stadiumColors[stadium.id] }}
          >
            <img
              src={stadium.imageOutsideURL}
              alt={`${stadium.name} outside view`}
            />
            <strong>
              <h2>{stadium.name}</h2>
            </strong>
            <p>{stadium.teamName}</p>
            <div className="stadium-card-buttons">
              <button onClick={() => navigate(`/stadiums/${stadium.id}/`)}>
                Explore
              </button>
              <button>Visited</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// export default function StadiumCards({
//   ballpark,
//   teamName,
//   division,
//   state,
//   style={},
//   url
// }) {
//   return (
//     <div className="stadium-card" style={{background: style.background || " "}}>
//       <div className="img" style={{backgroundImage: `url(${url})`}} ></div>
//       <h3>{ballpark}</h3>
//       <h4>{teamName}</h4>
//       <p>{division}</p>
//       <p>{state}</p>
//       <button>Find Out More</button>
//       <button>Already Visited</button>
//     </div>
//   );
// }
