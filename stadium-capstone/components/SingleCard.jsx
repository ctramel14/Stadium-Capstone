import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

export default function SingleCard ({ token }) {
    const [stadium, setStadium] = useState([]);
    const [success, setSuccess] = useState("");
    let { id } = useParams();

    useEffect(() => {
        async function getStadium() {
          try {
            const response = await fetch(`/stadiums/${id}`);
            const result = await response.json();
            setStadium(result.stadium);
          } catch (error) {
            console.error(error);
          }
        }
        getStadium();
      }, []);

      async function visited() {
        try {
          await fetch(`/stadiums/${id}`, {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ available: false }),
          });
          setSuccess(`Checked out ${stadium.title}!`);
        } catch (error) {
          console.error(error);
        }
      }

    return (
        <>
        <div className="single">
        <div className="stadiuminfo">
          <h4>{stadium.title}</h4>
          <h5>by {stadium.author}</h5>
          <h6>{stadium.description}</h6>
          <img src={stadium.coverimage} className="singlestadium" /> <br />
        </div>
        {token ? (
          <button className="checkout" onClick={() => checkout(stadium.id)}>
            Check-out
          </button>
        ) : (
          <h4></h4>
        )}
        {success && <h4>{success}</h4>}
      </div>
      <br />
        </>
    )
}