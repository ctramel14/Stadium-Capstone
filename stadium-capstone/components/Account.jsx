import { useState, useEffect } from "react";


export default function Account({ token, email, firstName }) {
  const [visited, setVisited] = useState([]);
  const message = `Please log in to see visited stadiums`;
  const noStadium = `No stadiums visited yet`;

  
//fetch token
  useEffect(() => {
    async function getToken() {
      try {
        const response = await fetch(`http://localhost:3000/api/users`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        await response.json();
      } catch (error) {
        console.error(error);
      }   console.log(firstName);
    }
    getToken();
    console.log(firstName);
//view visited stadiums

    async function visitedStadiums() {
      try {
        const response = await fetch(`http://localhost:3000/api/users`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        const result = await response.json();
        if (result.visited != 0) {
          setVisited(result.visited);
        } else {
          setVisited(!visited);
        }
      } catch (error) {
        console.error(error);
      }
    }
    visitedStadiums();
  }, []);

  console.log();
  

//Basically to undo a stadium you may have clicked that you visited but didn't mean to. Function needs reworking from bookbuddy

  async function checkinStadium(id) {
    // await checkin(id, token);
    // const response = await fetch(`${URL}/reservations`, {
    //   headers: {
    //     "Content-Type": "application/json",
    //     Authorization: `Bearer ${token}`,
    //   },
    // });
    // const result = await response.json();
    // if (result.reservation != 0) {
    //   setReserved(result.reservation);
    // } else {
    //   setReserved(!reserved);
    // }
  }

  //trying to display first name of user, but not getting anything

  return (
    <>
      {!token ? (
        <h3 className="message" >{message}</h3>
      ) : (
        <div>
          <h2>Welcome {firstName}!</h2>
          {!visited ? (
            <h4>{noStadium}</h4>
          ) : (
            <div>
              {visited.map((stadium) => {
                return (
                  <h3 key={stadium.id} className="account-stadium">
                    <img src={stadium.insideImageURL} /> <br />
                    {stadium.name} <br />
                    {/* <button
                      className="checkin"
                      onClick={() => checkinStadium(stadium.id)}
                    >
                      Check-in
                    </button> */}
                  </h3>
                );
              })}
            </div>
          )}
        </div>
      )}
    </>
  );
}
