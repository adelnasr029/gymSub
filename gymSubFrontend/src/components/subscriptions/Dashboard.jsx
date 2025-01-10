import React, { useState, useEffect } from "react";

const Dashboard = () => {
  const [subscribers, setSubscribers] = useState([]);

  const [formData, setFormData] = useState({
    name: "",
    startDate: "",
    endDate: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic validation
    if (!formData.firstName || formData.lastName || !formData.startDate || !formData.endDate) {
      alert("Please fill in all fields");
      return;
    }

    // Calculate days remaining
    const endDate = new Date(formData.endDate);
    const today = new Date();
    const daysRemaining = Math.ceil((endDate - today) / (1000 * 60 * 60 * 24));

    // Add new subscriber
    const newSubscriber = {
      id: subscribers.length + 1,
      firstName: formData.firstName,
      lastName: formData.lastName,
      startDate: formData.startDate,
      endDate: formData.endDate,
      daysRemaining: daysRemaining > 0 ? daysRemaining : 0,
      status: daysRemaining > 0 ? "Active" : "Expired",
    };

    setSubscribers([...subscribers, newSubscriber]);

    // Reset form
    setFormData({
      firstName: "",
      lastName: "",
      startDate: "",
      endDate: "",
    });
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
  }, []); // Re-fetch when `query` changes

  return (
    <div className="dashboard">
      <h1>Subscriber Dashboard</h1>
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
