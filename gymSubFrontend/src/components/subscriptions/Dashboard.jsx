import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

const Dashboard = () => {

  const navigate = useNavigate();

  const [subscribers, setSubscribers] = useState([]);
  const [query, setQuery] = useState(""); // State for search query

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


  // Handle search input change
  const handleSearch = (e) => {
      setQuery(e.target.value);
  };
    // Filter subscribers based on the search query (ID or name)
    const filteredSubscribers =
    query.trim() === ""
      ? subscribers // Show all subscribers if the query is empty
      : subscribers.filter((subscriber) => {
          const fullName = `${subscriber.firstName} ${subscriber.lastName}`.toLowerCase();
          return (
            subscriber._id.includes(query) || // Match by ID
            subscriber.firstName.toLowerCase().includes(query.toLowerCase()) || // Match by first name
            subscriber.lastName.toLowerCase().includes(query.toLowerCase()) || // Match by last name
            fullName.includes(query.toLowerCase()) // Match by full name
          );
        });
    
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
      const formDataToSend = new FormData();
      formDataToSend.append("firstName", formData.firstName);
      formDataToSend.append("lastName", formData.lastName);
      formDataToSend.append("phone", formData.phone);
      formDataToSend.append("startDate", formData.startDate);
      formDataToSend.append("endDate", formData.endDate);
      formDataToSend.append("amount", formData.amount);
      console.log(formDataToSend)
      if (formData.image) {
        formDataToSend.append("image", formData.image); 
      }

      const response = await fetch("http://localhost:5174/post/createPost", {
        method: "POST",
        body: formDataToSend, // Use formDataToSend instead of JSON.stringify(formData)
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
    
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



  useEffect(() => {
    const fetchSubscribers = async () => {
      try {
        const response = await fetch(`http://localhost:5174/dashboard`
          , {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
            credentials:"include",
          }
        );
        const data = await response.json();
        setSubscribers(data)

      } catch (error) {
        console.error("Error fetching subscribers:", error);
      }
    };
  
    fetchSubscribers();
  }, [formData]); 

  const handleEdit = (id) => {
    const subscriberToEdit = subscribers.find((subscriber) => subscriber.id === id);
    if (subscriberToEdit) {
      setFormData({
        firstName: subscriberToEdit.firstName,
        lastName: subscriberToEdit.lastName,
        phone: subscriberToEdit.phone || "", 
        startDate: subscriberToEdit.startDate.split('T')[0],
        endDate: subscriberToEdit.endDate.split('T')[0],
        amount: subscriberToEdit.amount || "", 
        image: subscriberToEdit.image, 
      });
      console.log(subscriberToEdit)

      // Remove the subscriber being edited from the list
      setSubscribers(subscribers.filter((subscriber) => subscriber.id !== id));
    }
  };
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

      {/* Search Subscribers */}
      <div className="search-container">
        <h2>Search Subscribers</h2>
        <input
          type="text"
          placeholder="Search by ID or name..."
          value={query}
          onChange={handleSearch}
        />
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
            </tr>
          </thead>
          <tbody>
            {filteredSubscribers.map((subscriber) => (
              <tr key={subscriber._id}>
                <td>
                  <Link to={`/subscriber/${subscriber._id}`}>
                    {subscriber.firstName} {subscriber.lastName}
                  </Link>
                </td>
                <td>{ new Date(subscriber.startDate).toLocaleDateString()}</td>
                <td>{new Date(subscriber.endDate).toLocaleDateString()}</td>
                <td>{subscriber.daysRemaining}</td>
                <td>
                  <span className={`status ${subscriber.status}`}>
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
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
