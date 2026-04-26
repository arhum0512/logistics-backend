import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { 
  Users, 
  Mail, 
  UserCheck, 
  AlertCircle, 
  Loader2,
  RefreshCw
} from 'lucide-react';

const Drivers = () => {
    const [drivers, setDrivers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // This is your live backend URL
    const BACKEND_URL = 'https://logistics-backend-576i.onrender.com';

    const fetchDrivers = async () => {
        setLoading(true);
        try {
            // We are using the full URL to ensure it doesn't call the frontend by mistake
            const response = await axios.get(`${BACKEND_URL}/api/auth/drivers`);
            setDrivers(response.data);
            setError(null);
        } catch (err) {
            console.error("Error fetching drivers:", err);
            setError("Failed to load drivers. Ensure backend is running.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchDrivers();
    }, []);

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center h-64 text-slate-400">
                <Loader2 className="w-10 h-10 animate-spin mb-2" />
                <p>Connecting to Logistics Fleet...</p>
            </div>
        );
    }

    return (
        <div className="p-6 bg-slate-900 min-h-screen text-white">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-bold flex items-center gap-3">
                        <Users className="text-blue-500" /> Fleet Drivers
                    </h1>
                    <p className="text-slate-400 mt-1">Manage your registered drivers and their contact info.</p>
                </div>
                <button 
                    onClick={fetchDrivers}
                    className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 px-4 py-2 rounded-lg transition"
                >
                    <RefreshCw className="w-4 h-4" /> Refresh
                </button>
            </div>

            {error && (
                <div className="bg-red-900/20 border border-red-500/50 p-4 rounded-xl flex items-center gap-3 text-red-200 mb-6">
                    <AlertCircle className="w-5 h-5" />
                    {error}
                </div>
            )}

            {drivers.length === 0 ? (
                <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-20 text-center">
                    <div className="bg-slate-700 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Users className="text-slate-400 w-8 h-8" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">No Drivers Found</h3>
                    <p className="text-slate-400">Register a new user with the role of "driver" to see them here.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {drivers.map((driver) => (
                        <div key={driver.id} className="bg-slate-800 border border-slate-700 p-6 rounded-2xl hover:border-blue-500/50 transition group">
                            <div className="flex items-start justify-between mb-4">
                                <div className="bg-blue-500/10 p-3 rounded-xl group-hover:bg-blue-500/20 transition">
                                    <UserCheck className="text-blue-500 w-6 h-6" />
                                </div>
                                <span className="bg-green-500/10 text-green-400 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                                    Active
                                </span>
                            </div>
                            <h3 className="text-xl font-bold mb-1">{driver.name}</h3>
                            <div className="flex items-center gap-2 text-slate-400 text-sm mb-4">
                                <Mail className="w-4 h-4" />
                                {driver.email}
                            </div>
                            <div className="pt-4 border-t border-slate-700">
                                <button className="w-full bg-slate-700 hover:bg-blue-600 py-2 rounded-lg text-sm font-semibold transition">
                                    View Driver Stats
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Drivers;