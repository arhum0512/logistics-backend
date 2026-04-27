import React, { useEffect, useState } from 'react';
import API from '../api/axios'; // Make sure this path matches your API config file!

const DriverDashboard = () => {
    const [loads, setLoads] = useState([]);
    const [loading, setLoading] = useState(true);

    // 1. Fetch the driver's specific loads
    const fetchMyLoads = async () => {
        try {
            const response = await API.get('/loads/my-loads');
            setLoads(response.data);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching loads:", error);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMyLoads();
    }, []);

    // 2. Function to mark a load as delivered
    const handleDeliver = async (loadId) => {
        try {
            await API.put('/loads/deliver', { loadId });
            // Refresh the list so the delivered load disappears
            fetchMyLoads(); 
            alert("Load marked as delivered!");
        } catch (error) {
            alert("Failed to update load status.");
        }
    };

    if (loading) return <div className="p-10">Loading your loads...</div>;

    return (
        <div className="p-4 max-w-lg mx-auto">
            <h1 className="text-2xl font-bold mb-6">My Assigned Loads</h1>
            
            {loads.length === 0 ? (
                <p className="text-gray-500">No active loads assigned to you right now.</p>
            ) : (
                loads.map((load) => (
                    <div key={load.id} className="bg-white shadow-md rounded-lg p-6 mb-4 border-l-4 border-blue-500">
                        <div className="flex justify-between items-start mb-4">
                            <div>
                                <p className="text-sm text-gray-500 uppercase font-bold">Load ID: #{load.id}</p>
                                <h2 className="text-lg font-semibold">{load.pickup_location} → {load.dropoff_location}</h2>
                            </div>
                            <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
                                {load.status}
                            </span>
                        </div>
                        
                        <button 
                            onClick={() => handleDeliver(load.id)}
                            className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-lg transition"
                        >
                            Mark as Delivered
                        </button>
                    </div>
                ))
            )}
        </div>
    );
};

export default DriverDashboard;