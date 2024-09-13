import "./StadiumCards.css"
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
// import { createStadiums } from "../../prisma/seed.js";

export default function StadiumCards({stadiums, setStadiums}) {
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
  fetchAllStadiums()

  useEffect(() => {
    async function getAllStadiums() {
      const APIResponse = await fetchAllStadiums();
      // console.log(APIResponse);
      setStadiums(APIResponse)
    }
    getAllStadiums();
  }, []);

  const stadiumsToDisplay = searchParam
    ? stadiums.filter((stadium) => stadium.title.toLowerCase().includes(searchParam))
    : stadiums;

  return (
    <>
      <div className="search">
        <label>
          <input
            id="searchfield"
            type="text"
            className="searchInput"
            placeholder="Search by Stadium"
            onChange={(e) => setSearchParam(e.target.value.toLowerCase())}
          />
        </label>
      </div>
      <div className="stadium-card">
        {stadiumsToDisplay.map((stadium) => {
          return (
            <h3 key={stadium.id}>
              {/* <img
                src={stadium.imageOutsideURL}
                onClick={() => navigate(`/stadiums/${stadium.id}/`)}
              /> */}
              <br />
              {stadium.name}
              {stadium.teamName}
              {stadium.state}
            </h3>
          );
        })}
      </div>
    </>
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


