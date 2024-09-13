import { useState, useEffect } from "react";
// import { checkin, URL } from "../API";

export default function Account({ token, email }) {
  const [visited, setVisited] = useState([]);
  const message = `Please log in to see visited stadiums`;
  const noStadium = `No stadiums visited yet`;

  useEffect(() => {
    async function getToken() {
      try {
        const response = await fetch(`/users/me`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        await response.json();
      } catch (error) {
        console.error(error);
      }
    }
    getToken();

    async function visitedStadiums() {
      try {
        const response = await fetch(`/visited-stadiums`, {
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

  return (
    <>
      {!token ? (
        <h3 className="message" >{message}</h3>
      ) : (
        <div>
          <h2>Welcome {email}!</h2>
          {!visited ? (
            <h4>{noStadium}</h4>
          ) : (
            <div>
              {reserved.map((stadium) => {
                return (
                  <h3 key={stadium.id} className="account-stadium">
                    <img src={stadium.imageURL} /> <br />
                    {stadium.title} <br />
                    <button
                      className="checkin"
                      onClick={() => checkinStadium(stadium.id)}
                    >
                      Check-in
                    </button>
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
