// src/pages/admin/BrokerDetailsPage.tsx

import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { ArrowLeft, User, Mail, Briefcase, MapPin, CheckCircle, XCircle, Building, Award, Phone as PhoneIcon } from "lucide-react"; // Added PhoneIcon

interface User {
  _id: string;
  name: string;
  email: string;
  userType: string;
  companyName?: string;
  isVerified: boolean;
  location?: string;
  specialization?: string;
  phone?: string;
  bio?: string;
  profilePictureUrl?: string;
}

const BASE_URL = "http://localhost:4000";

const BrokerDetailsPage = () => {
  const { _id } = useParams<{ _id: string }>(); // <--- CORRECTED: Use _id
  const navigate = useNavigate();
  const [broker, setBroker] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBrokerDetails = async () => {
      if (!_id) { // <--- CORRECTED: Check _id
        setError("Broker ID is missing in URL."); // More specific error
        setLoading(false);
        return;
      }
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setError("Authentication token not found. Please log in.");
          setLoading(false);
          return;
        }

        // Ensure your backend has an endpoint that accepts a user ID like this
        const response = await axios.get(`${BASE_URL}/api/auth/user/${_id}`, { // <--- CORRECTED: Use _id
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        // Adjust this based on your actual API response structure for a single user
        // If the API returns the user object directly in response.data:
        if (response.data) {
             // If the user object is nested, e.g., response.data.user or response.data.data
            if (response.data.user) {
                setBroker(response.data.user);
            } else if (response.data.data) {
                setBroker(response.data.data);
            } else if (typeof response.data === 'object' && response.data._id) { // Check if response.data itself is the user object
                setBroker(response.data);
            }
            else {
                 setError("Broker data not found in the expected format in API response.");
            }
        } else {
          setError("No data received from API.");
        }

      } catch (err: any) {
        console.error("Failed to fetch broker details", err);
        setError(
          err.response?.data?.message ||
          `Failed to fetch broker details for ID ${_id}. The broker may not exist or there was a server error.`
        );
      } finally {
        setLoading(false);
      }
    };

    fetchBrokerDetails();
  }, [_id]); // <--- CORRECTED: Dependency is _id

  // ... rest of your component remains the same ...


  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="p-6 bg-white shadow-lg rounded-lg">
          <p className="text-lg font-semibold text-primary">Loading broker details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto p-6 min-h-screen bg-gray-100">
        <Button onClick={() => navigate(-1)} variant="outline" className="mb-4 flex items-center">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back
        </Button>
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
          <strong className="font-bold">Error!</strong>
          <span className="block sm:inline"> {error}</span>
        </div>
      </div>
    );
  }

  if (!broker) {
    return (
      <div className="container mx-auto p-6 min-h-screen bg-gray-100">
        <Button onClick={() => navigate(-1)} variant="outline" className="mb-4 flex items-center">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back
        </Button>
        <p className="text-center text-gray-500 text-lg">Broker not found or data could not be loaded.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-8">
      <div className="container mx-auto max-w-4xl">
        <Button
          onClick={() => navigate("/admin/brokers")}
          variant="outline"
          className="mb-6 flex items-center group hover:bg-primary hover:text-white"
        >
          <ArrowLeft className="mr-2 h-4 w-4 group-hover:text-white" /> Back to Brokers List
        </Button>

        <div className="bg-white shadow-2xl rounded-xl overflow-hidden">
          <div className="bg-gradient-to-r from-primary to-primary-dark p-6 md:p-8 text-white">
             <div className="flex flex-col sm:flex-row items-center">
                <img
                  src={broker.profilePictureUrl || `https://ui-avatars.com/api/?name=${encodeURIComponent(broker.name)}&background=random&color=fff&size=128`}
                  alt={broker.name}
                  className="w-24 h-24 md:w-32 md:h-32 rounded-full border-4 border-white shadow-lg mb-4 sm:mb-0 sm:mr-6 object-cover"
                />
                <div>
                  <h1 className="text-3xl md:text-4xl font-bold">{broker.name}</h1>
                  <p className="text-md text-primary-200 flex items-center mt-1">
                    <User className="w-5 h-5 mr-2" /> {broker.userType ? broker.userType.charAt(0).toUpperCase() + broker.userType.slice(1) : 'N/A'}
                  </p>
                   <span
                      className={`mt-2 inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${
                        broker.isVerified
                          ? "bg-green-500 text-white"
                          : "bg-yellow-500 text-black"
                      }`}
                    >
                      {broker.isVerified ? <CheckCircle className="w-4 h-4 mr-1" /> : <XCircle className="w-4 h-4 mr-1" />}
                      {broker.isVerified ? "Verified" : "Pending Verification"}
                    </span>
                </div>
             </div>
          </div>

          <div className="p-6 md:p-8 grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            <div className="bg-gray-50 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <h2 className="text-xl font-semibold text-primary mb-4 flex items-center">
                <Mail className="w-6 h-6 mr-3" /> Contact & Location
              </h2>
              <div className="space-y-3 text-gray-700">
                <p className="flex items-start">
                  <Mail className="w-5 h-5 mr-3 mt-1 text-gray-500 flex-shrink-0" />
                  <span>{broker.email || "N/A"}</span>
                </p>
                {broker.phone && (
                  <p className="flex items-start">
                    <PhoneIcon className="w-5 h-5 mr-3 mt-1 text-gray-500 flex-shrink-0" />
                    <span>{broker.phone}</span>
                  </p>
                )}
                {broker.location && (
                  <p className="flex items-start">
                    <MapPin className="w-5 h-5 mr-3 mt-1 text-gray-500 flex-shrink-0" />
                    <span>{broker.location}</span>
                  </p>
                )}
                 {!broker.phone && !broker.location && !broker.email &&(
                    <p className="text-gray-500 italic">No contact/location info.</p>
                 )}
              </div>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <h2 className="text-xl font-semibold text-primary mb-4 flex items-center">
                <Briefcase className="w-6 h-6 mr-3" /> Professional Details
              </h2>
              <div className="space-y-3 text-gray-700">
                {broker.companyName && (
                  <p className="flex items-start">
                    <Building className="w-5 h-5 mr-3 mt-1 text-gray-500 flex-shrink-0" />
                    <span><strong>Company:</strong> {broker.companyName}</span>
                  </p>
                )}
                {broker.specialization && (
                  <p className="flex items-start">
                    <Award className="w-5 h-5 mr-3 mt-1 text-gray-500 flex-shrink-0" />
                    <span><strong>Specialization:</strong> {broker.specialization}</span>
                  </p>
                )}
                {!broker.companyName && !broker.specialization && (
                    <p className="text-gray-500 italic">No professional details provided.</p>
                 )}
              </div>
            </div>

            {broker.bio && (
              <div className="md:col-span-2 bg-gray-50 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <h2 className="text-xl font-semibold text-primary mb-4">About {broker.name}</h2>
                <p className="text-gray-700 leading-relaxed whitespace-pre-line">{broker.bio}</p>
              </div>
            )}
            {!broker.bio && (
                 <div className="md:col-span-2 bg-gray-50 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                    <h2 className="text-xl font-semibold text-primary mb-4">About {broker.name}</h2>
                    <p className="text-gray-500 italic">No bio provided.</p>
                </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BrokerDetailsPage;