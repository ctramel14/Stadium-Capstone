import "./StadiumCards.css"
import { useState, useEffect } from "react";
// import { fetchAllBooks } from "../API";
import { useNavigate } from "react-router-dom";

export default function Books({ stadiums, setStadiums }) {
  const [searchParam, setSearchParam] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    async function getAllStadiums() {
      const APIResponse = await fetchAllStadiums();
      setStadiums(APIResponse.stadiums);
    }
    getAllStadiums();
  }, []);

  const stadiumsToDisplay = searchParam
    ? stadiums.filter((book) => stadium.title.toLowerCase().includes(searchParam))
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
              <img
                src={stadium.imageURL}
                onClick={() => navigate(`/stadiums/${stadium.id}/`)}
              />
              <br />
              {stadium.title}
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


