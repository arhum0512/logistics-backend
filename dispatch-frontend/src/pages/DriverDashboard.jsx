import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api'; 
import { Truck, MapPin, CheckCircle, Package, LogOut, Sun, Moon } from 'lucide-react';

const DriverDashboard = () => {
    const [loads, setLoads] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isDarkMode, setIsDarkMode] = useState(localStorage.getItem('theme') === 'dark');
    const navigate = useNavigate();

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

    // Theme Toggle Logic
    const toggleTheme = () => {
        const newTheme = !isDarkMode;
        setIsDarkMode(newTheme);
        localStorage.setItem('theme', newTheme ? 'dark' : 'light');
    };

    // Logout Logic
    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/driver-login');
    };

    const handleDeliver = async (loadId) => {
        try {
            await API.put('/loads/deliver', { loadId });
            fetchMyLoads(); 
            alert("Success: Load delivered!");
        } catch (error) {
            alert("Error: Could not update status.");
        }
    };

    const theme = isDarkMode ? {
        bg: '#0f172a', card: '#1e293b', text: '#f8fafc', textMuted: '#94a3b8', border: '#334155'
    } : {
        bg: '#f1f5f9', card: '#ffffff', text: '#0f172a', textMuted: '#64748b', border: '#cbd5e1'
    };

    if (loading) return (
        <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: theme.bg, color: theme.text }}>
            Syncing with fleet...
        </div>
    );

    return (
        <div style={{ minHeight: '100vh', background: theme.bg, padding: '20px', transition: 'background 0.3s ease' }}>
            <div style={{ maxWidth: '500px', margin: '0 auto' }}>
                
                {/* Header with Theme Toggle and Logout */}
                <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <div style={{ padding: '8px', background: '#3b82f6', borderRadius: '10px' }}>
                            <Truck color="white" size={20} />
                        </div>
                        <h1 style={{ color: theme.text, fontSize: '20px', fontWeight: 'bold', margin: 0 }}>Portal</h1>
                    </div>
                    
                    <div style={{ display: 'flex', gap: '10px' }}>
                        <button onClick={toggleTheme} style={{ background: theme.card, border: `1px solid ${theme.border}`, padding: '8px', borderRadius: '8px', cursor: 'pointer', color: theme.text }}>
                            {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
                        </button>
                        <button onClick={handleLogout} style={{ background: '#ef4444', border: 'none', padding: '8px', borderRadius: '8px', cursor: 'pointer', color: 'white', display: 'flex', alignItems: 'center', gap: '5px' }}>
                            <LogOut size={18} />
                        </button>
                    </div>
                </header>
                
                <h2 style={{ color: theme.text, marginBottom: '20px', fontSize: '18px' }}>Active Assignments</h2>

                {loads.length === 0 ? (
                    <div style={{ background: theme.card, padding: '40px', borderRadius: '16px', textAlign: 'center', border: `1px solid ${theme.border}` }}>
                        <Package size={40} color={theme.textMuted} style={{ marginBottom: '15px' }} />
                        <p style={{ color: theme.textMuted, margin: 0 }}>No loads assigned today.</p>
                    </div>
                ) : (
                    loads.map((load) => (
                        <div key={load.id} style={{ background: theme.card, padding: '20px', borderRadius: '16px', marginBottom: '15px', border: `1px solid ${theme.border}` }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px' }}>
                                <span style={{ color: '#3b82f6', fontWeight: 'bold', fontSize: '13px' }}>ID: {load.id}</span>
                                <span style={{ color: isDarkMode ? '#10b981' : '#059669', fontSize: '12px', fontWeight: 'bold' }}>{load.status.toUpperCase()}</span>
                            </div>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '20px' }}>
                                <div style={{ display: 'flex', alignItems: 'start', gap: '10px' }}>
                                    <MapPin size={16} color="#ef4444" style={{ marginTop: '3px' }} />
                                    <div>
                                        <p style={{ fontSize: '11px', color: theme.textMuted, margin: 0 }}>PICKUP</p>
                                        <p style={{ color: theme.text, fontSize: '14px', margin: 0 }}>{load.pickup_location}</p>
                                    </div>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'start', gap: '10px' }}>
                                    <MapPin size={16} color="#10b981" style={{ marginTop: '3px' }} />
                                    <div>
                                        <p style={{ fontSize: '11px', color: theme.textMuted, margin: 0 }}>DROPOFF</p>
                                        <p style={{ color: theme.text, fontSize: '14px', margin: 0 }}>{load.dropoff_location}</p>
                                    </div>
                                </div>
                            </div>

                            <button 
                                onClick={() => handleDeliver(load.id)}
                                style={{ width: '100%', padding: '12px', background: '#3b82f6', color: 'white', border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
                            >
                                <CheckCircle size={18} />
                                Complete Delivery
                            </button>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default DriverDashboard;