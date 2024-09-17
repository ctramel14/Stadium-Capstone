import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

export default function SingleCard ({ token }) {
    const [stadium, setStadium] = useState([]);
    const [success, setSuccess] = useState("");
    const [reviews, setReviews] = useState([])
    let { id } = useParams();


//fetch single stadium
    useEffect(() => {
        async function getStadium() {
          try {
            const response = await fetch(`http://localhost:3000/api/stadiums/${id}`);
            const result = await response.json();
            // console.log(result.reviews);
            // setReviews(result.reviews)
            setStadium(result);
            // console.log(reviews);
            
          } catch (error) {
            console.error(error);
          }
        }
        getStadium();

        async function getReviews() {
          try {
            const response = await fetch(`http://localhost:3000/api/reviews/${id}`)
            const result = await response.json();
            console.log(result.comment);
            setReviews(result.comment)
          } catch (error) {
            console.error();
          }
        }
        getReviews();
      }, []);

      //function to select a stadium as visited
      async function visited() {
        try {
          await fetch(`http://localhost:3000/api/stadiums/${id}`, {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            // body: JSON.stringify({ available: false }), need to add to visitedStadiums here
          });
          setSuccess(`Checked out ${stadium.name}!`);
        } catch (error) {
          console.error(error);
        }
      }

    return (
        <>
        <div className="single">
        <div className="stadiuminfo">
          <h4>{stadium.name}</h4>
          <h5>{stadium.teamname}</h5>
          <h6>{stadium.state}</h6>
          <h6>{reviews}</h6>
          <img src={stadium.imageOutsideURL} className="singlestadium" /> <br />
        </div>
        {token ? (
          <button className="visited" onClick={() => visited(stadium.id)}>
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