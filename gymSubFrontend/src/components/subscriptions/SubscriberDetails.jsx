import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
const SubscriberDetails = () => {
  const { id } = useParams(); // Get the subscriber ID from the URL
  const navigate = useNavigate();
  const [subscriber, setSubscriber] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch subscriber details
  useEffect(() => {
    const fetchSubscriber = async () => {
      try {
        const response = await fetch(`http://localhost:5174/post/subscriber/${id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch subscriber details");
        }
        const data = await response.json();
        console.log(data)
        setSubscriber(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchSubscriber();
  }, [id]);

  // Handle subscription renewal
  const handleRenew = async (newStartDate, newEndDate) => {
    try {
      const response = await fetch(`http://localhost:5174/subscriber/${id}/renew`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ startDate: newStartDate, endDate: newEndDate }),
      });
      if (!response.ok) {
        throw new Error("Failed to renew subscription");
      }
      const updatedSubscriber = await response.json();
      setSubscriber(updatedSubscriber);
    } catch (error) {
      setError(error.message);
    }
  };

  // Handle delete
  const handleDelete = async () => {
    try {
      const response = await fetch(`http://localhost:5174/post/subscriber/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Failed to delete subscriber");
      }
      navigate("/dashboard"); // Redirect to dashboard after deletion
    } catch (error) {
      setError(error.message);
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="subscriber-details">
      <h2>
        {subscriber.firstName} {subscriber.lastName}
      </h2>
      {subscriber.image && (
        <div className="subscriber-image">
          <img src={subscriber.image} alt={`${subscriber.firstName} ${subscriber.lastName}`} />
        </div>
      )}
      <p>Phone: {subscriber.phone}</p>
      <p>Start Date: {new Date(subscriber.startDate).toLocaleDateString()}</p>
      <p>End Date: {new Date(subscriber.endDate).toLocaleDateString()}</p>
      <p>Amount: {subscriber.amount}</p>
      <p>status: {subscriber.status}</p>


      {/* Renew Subscription Form */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const newStartDate = e.target.startDate.value;
          const newEndDate = e.target.endDate.value;
          handleRenew(newStartDate, newEndDate);
        }}
      >
        <label htmlFor="startDate">New Start Date</label>
        <input type="date" id="startDate" name="startDate" required />
        <label htmlFor="endDate">New End Date</label>
        <input type="date" id="endDate" name="endDate" required />
        <button type="submit">Renew Subscription</button>
      </form>

      {/* Delete Button */}
      <button onClick={handleDelete} className="delete-button">
        Delete Subscriber
      </button>
    </div>
  );
};

export default SubscriberDetails;