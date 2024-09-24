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
export default function StadiumCards({ token, stadiums, setStadiums, userId }) {
  const [searchParam, setSearchParam] = useState("");
  const [success, setSuccess] = useState("");
  const [isVisited, setIsVisited] = useState([]);
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
    async function fetchUserData() {
      if (!token) return;
      try {
        const response = await fetch(
          `http://localhost:3000/api/users/${userId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const result = await response.json();
        const stads = result.visitedStadiums.map((v) => v.stadiumId); 
        const iterator = stads.values();
        for (const value of iterator) {
            let elements = document.getElementById(value);
            elements.style.backgroundColor = stadiumColors[value];
        }
        setIsVisited(result.visitedStadiums.map((v) => v.stadiumId));
      } catch (error) {
        console.error(error);
      }
    }
    fetchUserData();
  }, [token, userId])

  useEffect(() => {
    async function getAllStadiums() {
      const APIResponse = await fetchAllStadiums();
      // console.log(APIResponse);
      setStadiums(APIResponse);
    }
    getAllStadiums();
  }, []);

  async function visited(id) {
    try {
      const response = await fetch(
        `http://localhost:3000/api/users/${userId}/visitedstadiums/${id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ visited: true }),
        }
      );
      const json = await response.json();
      console.log(userId, id);
      let element = document.getElementById(id);
      element.style.backgroundColor = stadiumColors[id];

      // setIsVisited(true);
      // setIsVisited(json.visitedStadiums.map((v) => v.stadium));
      setSuccess(`Visited!`);
    } catch (error) {
      console.error(error);
    }
  }

  //search functionality

  const stadiumsToDisplay = searchParam
    ? stadiums.filter((stadium) =>
        stadium.teamName.toLowerCase().includes(searchParam)
      )
    : stadiums;

  return (
    <div className="bg-wrapper">
      <header className="stadiums-page-header">
        <h1>Will You Visit Every Ballpark?</h1>
        <h3>
          Select any ballpark for more information, or 'Visited' to add it to
          your visited list.
          <div className="search">
            <label>
              <input
                id="searchfield"
                type="text"
                className="searchInput"
                placeholder="Filter by Team..."
                onChange={(e) => setSearchParam(e.target.value.toLowerCase())}
              />
            </label>
          </div>
        </h3>
      </header>
      <div className="stadiums-grid-container">
        {stadiumsToDisplay.map((stadium) => (
          <div
            className="stadium-card"
            name={stadium.id}
            id={stadium.id}
            key={stadium.id}
            style={{ backgroundColor: "grey" }}
          >
            <img
              src={stadium.imageOutsideURL}
              alt={`${stadium.name} outside view`}
              onClick={() => navigate(`/stadiums/${stadium.id}/`)}
            />
            <strong>
              <h2 onClick={() => navigate(`/stadiums/${stadium.id}/`)}>
                {stadium.name}
              </h2>
            </strong>
            <p onClick={() => navigate(`/stadiums/${stadium.id}/`)}>
              {stadium.teamName}
            </p>
              <div className="stadium-card-buttons">
                <button onClick={() => visited(stadium.id)}>Visited</button>
              </div>
          </div>
        ))}
      </div>
    </div>
  );
}
