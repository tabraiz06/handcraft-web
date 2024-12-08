import React, { useState, useEffect } from "react";

import axios from "axios";

const AdminContacts = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const token= localStorage.getItem('token')

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const data = await getContacts(token);
        setContacts(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching contacts:", error);
        setLoading(false);
      }
    };

    fetchContacts();
  }, [token]);

  if (loading) {
    return <p>Loading contacts...</p>;
  }

const getContacts = async () => {
  try {
    const config = {
      headers: {
        token: localStorage.getItem('token')
      },
    };
    const response = await axios.get(
      "https://handcraft-web-j6a7.vercel.app/api/contact",
      config
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching contacts:", error);
    throw error;
  }
};

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold text-center mb-6">
        Contact Submissions
      </h1>
      <table className="min-w-full bg-white border">
        <thead>
          <tr>
            <th className="py-2 px-4 border">Name</th>
            <th className="py-2 px-4 border">Email</th>
            <th className="py-2 px-4 border">Phone</th>
            <th className="py-2 px-4 border">Message</th>
            <th className="py-2 px-4 border">Date</th>
          </tr>
        </thead>
        <tbody>
          {contacts.map((contact) => (
            <tr key={contact._id}>
              <td className="py-2 px-4 border">{contact.name}</td>
              <td className="py-2 px-4 border">{contact.email}</td>
              <td className="py-2 px-4 border">{contact.phone}</td>
              <td className="py-2 px-4 border">{contact.message}</td>
              <td className="py-2 px-4 border">
                {new Date(contact.createdAt).toLocaleDateString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminContacts;
