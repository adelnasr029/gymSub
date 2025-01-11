import React, { useState, useEffect, memo } from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {

  const navigate = useNavigate();

  const [subscribers, setSubscribers] = useState([]);

  
    const [formData, setFormData] = useState({
      firstName: "",
      lastName: "",
      phone: "",
      startDate: "",
      endDate: "",
      amount: "",
      image: null,
    })
  
  // State to manage loading and error states
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      image: e.target.files[0], // Store the selected file
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true); // Set loading state to true
    setError(null); // Clear any previous errors
  
    // Basic validation
    if (!formData.firstName || !formData.lastName || !formData.startDate || !formData.endDate) {
      alert("Please fill in all fields");
      setIsLoading(false); // Reset loading state
      return;
    }
  
    try {
      // Create a FormData object for file upload
      const formDataToSend = new FormData();
      formDataToSend.append("firstName", formData.firstName);
      formDataToSend.append("lastName", formData.lastName);
      formDataToSend.append("phone", formData.phone);
      formDataToSend.append("startDate", formData.startDate);
      formDataToSend.append("endDate", formData.endDate);
      formDataToSend.append("amount", formData.amount);
      // if (formData.image) {
      //   formDataToSend.append("image", formData.image); // Append the image file
      // }
      console.log(formDataToSend)
      // Make a POST request to the backend server
      const response = await fetch("http://localhost:2121/post/createPost", {
        method: "POST",
        body: formDataToSend, // Use formDataToSend instead of JSON.stringify(formData)
        // Do not set Content-Type header manually for FormData
      });
  
      // Check if the response is successful
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      // Parse the response JSON
      const result = await response.json();
      console.log("Success:", result);
  
      // Reset the form after successful submission
      setFormData({
        firstName: "",
        lastName: "",
        phone: "",
        startDate: "",
        endDate: "",
        amount: "",
        image: null,
      });
    } catch (error) {
      console.error("Error:", error);
      setError("Failed to submit the form. Please try again."); // Set error message
    } finally {
      setIsLoading(false); // Set loading state to false
    }
  };

  const handleEdit = (id) => {
    const subscriberToEdit = subscribers.find((subscriber) => subscriber.id === id);
    if (subscriberToEdit) {
      setFormData({
        firstName: subscriberToEdit.firstName,
        lastName: subscriberToEdit.lastName,
        startDate: subscriberToEdit.startDate,
        endDate: subscriberToEdit.endDate,
      });

      // Remove the subscriber being edited from the list
      setSubscribers(subscribers.filter((subscriber) => subscriber.id !== id));
    }
  };

  useEffect(() => {
    const fetchSubscribers = async () => {
      try {
        const response = await fetch(`http://localhost:2121/dashboard`);
        const data = await response.json();
        console.log(data)
      } catch (error) {
        console.error("Error fetching subscribers:", error);
      }
    };
  
    fetchSubscribers();
  }, []); 

  return (
    <div className="dashboard">
      <h1>Subscriber Dashboard</h1>
      <button  onClick={() => navigate("/logout")}>Logout</button>

      {/* Add New Subscriber Form */}
      <div className="form-container">
        <h2>Add New Subscriber</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="firstName">First Name</label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="lastName">Last Name</label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="startDate">Start Date</label>
            <input
              type="date"
              id="startDate"
              name="startDate"
              value={formData.startDate}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="endDate">End Date</label>
            <input
              type="date"
              id="endDate"
              name="endDate"
              value={formData.endDate}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="phone">Phone Number</label>
            <input
              type="text"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>
        <div className="form-group">
          <label htmlFor="amount">Amount</label>
          <input
            type="number"
            id="amount"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            required
          />
      </div>
      <div className="form-group">
        <label htmlFor="image">Subscriper Photo</label>
        <input
          type="file"
          id="image"
          name="image"
          onChange={handleFileChange}
        />
      </div>
          <button type="submit">Add Subscriber</button>
        </form>
      </div>

      {/* Subscribers Table */}
      <div className="table-container">
        <h2>Subscribers List</h2>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Days Remaining</th>
              <th>Status</th>
              <th>Actions</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {subscribers.map((subscriber) => (
              <tr key={subscriber.id}>
                <td>{subscriber.firstName} {subscriber.lastName}</td>
                <td>{subscriber.startDate}</td>
                <td>{subscriber.endDate}</td>
                <td>{subscriber.daysRemaining}</td>
                <td>
                  <span className={`status ${subscriber.status.toLowerCase()}`}>
                    {subscriber.status}
                  </span>
                </td>
                <td>
                  <button
                    onClick={() => handleEdit(subscriber.id)}
                    className="edit-button"
                  >
                    Edit
                  </button>
                </td>
                <td>
                  <button
                    onClick={() => handleEdit(subscriber.id)}
                    className="edit-button"
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
