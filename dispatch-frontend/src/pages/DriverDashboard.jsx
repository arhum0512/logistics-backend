import React, { useEffect, useState } from 'react';
import API from '../api'; 
import { Truck, MapPin, CheckCircle, Package } from 'lucide-react';

const DriverDashboard = () => {
    const [loads, setLoads] = useState([]);
    const [loading, setLoading] = useState(true);
    const isDarkMode = localStorage.getItem('theme') === 'dark';

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

    const handleDeliver = async (loadId) => {
        try {
            await API.put('/loads/deliver', { loadId });
            fetchMyLoads(); 
            alert("Success: Load marked as delivered!");
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
            Loading fleet data...
        </div>
    );

    return (
        <div style={{ minHeight: '100vh', background: theme.bg, padding: '40px 20px' }}>
            <div style={{ maxWidth: '600px', margin: '0 auto' }}>
                <header style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '30px' }}>
                    <div style={{ padding: '10px', background: '#3b82f6', borderRadius: '12px' }}>
                        <Truck color="white" size={24} />
                    </div>
                    <h1 style={{ color: theme.text, fontSize: '24px', margin: 0 }}>Driver Dashboard</h1>
                </header>
                
                {loads.length === 0 ? (
                    <div style={{ background: theme.card, padding: '40px', borderRadius: '16px', textAlign: 'center', border: `1px solid ${theme.border}` }}>
                        <Package size={48} color={theme.textMuted} style={{ margin: '0 auto 15px auto' }} />
                        <p style={{ color: theme.textMuted }}>All caught up! No active loads assigned.</p>
                    </div>
                ) : (
                    loads.map((load) => (
                        <div key={load.id} style={{ background: theme.card, padding: '24px', borderRadius: '16px', marginBottom: '20px', border: `1px solid ${theme.border}`, boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
                                <span style={{ color: '#3b82f6', fontWeight: 'bold', fontSize: '14px' }}>LOAD #{load.id}</span>
                                <span style={{ color: '#10b981', background: '#d1fae5', padding: '4px 12px', borderRadius: '20px', fontSize: '12px', fontWeight: 'bold', textTransform: 'uppercase' }}>
                                    {load.status}
                                </span>
                            </div>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginBottom: '25px' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                    <MapPin size={18} color="#ef4444" />
                                    <div>
                                        <p style={{ fontSize: '12px', color: theme.textMuted, margin: 0 }}>Pickup Location</p>
                                        <p style={{ color: theme.text, fontWeight: '500', margin: 0 }}>{load.pickup_location || 'Not Specified'}</p>
                                    </div>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                    <MapPin size={18} color="#10b981" />
                                    <div>
                                        <p style={{ fontSize: '12px', color: theme.textMuted, margin: 0 }}>Dropoff Location</p>
                                        <p style={{ color: theme.text, fontWeight: '500', margin: 0 }}>{load.dropoff_location || 'Not Specified'}</p>
                                    </div>
                                </div>
                            </div>

                            <button 
                                onClick={() => handleDeliver(load.id)}
                                style={{ width: '100%', padding: '14px', background: '#3b82f6', color: 'white', border: 'none', borderRadius: '10px', fontWeight: 'bold', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}
                            >
                                <CheckCircle size={20} />
                                Mark as Delivered
                            </button>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default DriverDashboard;