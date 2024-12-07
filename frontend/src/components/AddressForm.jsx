import React, { useState } from "react";
import axios from "axios";
const AddressForm = () => {
    const token= localStorage.getItem('token')
  const [addressData, setAddressData] = useState({
    name: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    country: "",
    postalCode: "",
  });

  const handleChange = (e) => {
    setAddressData({ ...addressData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const { data } = await axios.post(
          "https://your-api-endpoint/api/address",
          addressData,
          token
        );
        
      console.log(data)
      alert("Address saved successfully!");
    } catch (error) {
      alert("Failed to save address. " + error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-4">
      <input
        name="name"
        value={addressData.name}
        onChange={handleChange}
        placeholder="Name"
        required
        className="w-full p-2 border rounded"
      />
      <input
        name="phone"
        value={addressData.phone}
        onChange={handleChange}
        placeholder="Phone"
        required
        className="w-full p-2 border rounded"
      />
      <textarea
        name="address"
        value={addressData.address}
        onChange={handleChange}
        placeholder="Address"
        required
        className="w-full p-2 border rounded"
      ></textarea>
      <input
        name="city"
        value={addressData.city}
        onChange={handleChange}
        placeholder="City"
        required
        className="w-full p-2 border rounded"
      />
      <input
        name="state"
        value={addressData.state}
        onChange={handleChange}
        placeholder="State"
        required
        className="w-full p-2 border rounded"
      />
      <input
        name="country"
        value={addressData.country}
        onChange={handleChange}
        placeholder="Country"
        required
        className="w-full p-2 border rounded"
      />
      <input
        name="postalCode"
        value={addressData.postalCode}
        onChange={handleChange}
        placeholder="Postal Code"
        required
        className="w-full p-2 border rounded"
      />
      <button
        type="submit"
        className="w-full bg-blue-500 text-white p-2 rounded"
      >
        Save Address
      </button>
    </form>
  );
};

export default AddressForm;
