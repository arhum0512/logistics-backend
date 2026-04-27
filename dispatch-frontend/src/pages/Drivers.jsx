import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api';
import { LayoutDashboard, LogOut, Truck, Users, Moon, Sun, UserPlus } from 'lucide-react';

const Drivers = () => {
    const [drivers, setDrivers] = useState([]);
    const navigate = useNavigate();

    const [isDarkMode, setIsDarkMode] = useState(() => {
        return localStorage.getItem('theme') === 'dark';
    });

    useEffect(() => { fetchDrivers(); }, []);

    const fetchDrivers = async () => {
        try {
            // We keep your original 'API' variable but add the /api/ prefix 
            // OR use the full URL if 'API' is still acting up:
            const response = await axios.get('https://logistics-backend-576i.onrender.com/api/auth/drivers');
            setDrivers(response.data);
        } catch (error) {
            console.error("Error:", error);
            if (error.response?.status === 401) handleLogout();
        }
    };
    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/login');
    };

    const toggleTheme = () => {
        const newTheme = !isDarkMode;
        setIsDarkMode(newTheme);
        localStorage.setItem('theme', newTheme ? 'dark' : 'light');
    };

    const theme = isDarkMode ? {
        bg: '#0f172a', sidebar: '#020617', card: '#1e293b', 
        text: '#f8fafc', textMuted: '#94a3b8', border: '#334155', hover: '#334155'
    } : {
        bg: '#f1f5f9', sidebar: '#1e293b', card: '#ffffff', 
        text: '#0f172a', textMuted: '#64748b', border: '#e2e8f0', hover: '#f1f5f9'
    };

    return (
        <div style={{ display: 'flex', minHeight: '100vh', width: '100%', background: theme.bg, fontFamily: 'Inter, sans-serif', transition: 'background 0.3s ease' }}>
            
            {/* --- LEFT SIDEBAR --- */}
            <div style={{ width: '260px', background: theme.sidebar, color: 'white', display: 'flex', flexDirection: 'column', padding: '20px 0', transition: 'background 0.3s ease' }}>
                <div style={{ padding: '0 25px 20px 25px', display: 'flex', alignItems: 'center', gap: '12px', borderBottom: '1px solid rgba(255,255,255,0.1)', marginBottom: '20px' }}>
                    <Truck size={28} color="#3b82f6" />
                    <h2 style={{ margin: 0, fontSize: '20px', fontWeight: '800', letterSpacing: '-0.5px' }}>Logistics<span style={{ color: '#3b82f6' }}>Pro</span></h2>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '5px', padding: '0 15px', flex: 1 }}>
                    <div onClick={() => navigate('/dashboard')} style={{ color: '#94a3b8', padding: '12px 15px', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '10px', fontWeight: '500', cursor: 'pointer', transition: 'background 0.2s' }}>
                        <LayoutDashboard size={18} /> Active Loads
                    </div>
                    <div style={{ background: '#3b82f6', color: 'white', padding: '12px 15px', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '10px', fontWeight: '600', cursor: 'pointer' }}>
                        <Users size={18} /> Fleet Drivers
                    </div>
                </div>

                <div style={{ padding: '0 15px' }}>
                    <button onClick={handleLogout} style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', padding: '12px', background: 'rgba(239, 68, 68, 0.15)', color: '#fca5a5', border: '1px solid rgba(239, 68, 68, 0.3)', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}>
                        <LogOut size={18} /> Logout
                    </button>
                </div>
            </div>

            {/* --- RIGHT MAIN CONTENT --- */}
            <div style={{ flex: 1, padding: '40px', overflowY: 'auto' }}>
                <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
                    
                    {/* Header & Theme Toggle */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
                        <div>
                            <h1 style={{ margin: 0, fontSize: '28px', color: theme.text, fontWeight: '800', transition: 'color 0.3s ease' }}>Fleet Drivers</h1>
                            <p style={{ margin: '5px 0 0 0', color: theme.textMuted, transition: 'color 0.3s ease' }}>Manage your registered drivers and their contact info.</p>
                        </div>
                        
                        <div style={{ display: 'flex', gap: '15px' }}>
                            <button onClick={toggleTheme} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 16px', background: theme.card, color: theme.text, border: `1px solid ${theme.border}`, borderRadius: '20px', cursor: 'pointer', fontWeight: '600', boxShadow: '0 2px 4px rgba(0,0,0,0.05)', transition: 'all 0.3s ease' }}>
                                {isDarkMode ? <Sun size={18} color="#eab308" /> : <Moon size={18} color="#64748b" />}
                                {isDarkMode ? 'Light' : 'Dark'}
                            </button>
                        </div>
                    </div>

                    {/* Drivers List */}
                    <div style={{ background: theme.card, borderRadius: '12px', border: `1px solid ${theme.border}`, boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)', overflow: 'hidden', transition: 'all 0.3s ease' }}>
                        {drivers.length === 0 ? (
                            <div style={{ padding: '60px 20px', textAlign: 'center', color: theme.textMuted }}>
                                <UserPlus size={48} color={theme.textMuted} style={{ marginBottom: '10px', opacity: 0.5 }} />
                                <h3>No Drivers Found</h3>
                                <p>Register a new user with the role of "driver" to see them here.</p>
                            </div>
                        ) : (
                            drivers.map((driver, index) => (
                                <div key={driver.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px 25px', borderBottom: index === drivers.length - 1 ? 'none' : `1px solid ${theme.border}` }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                                        <div style={{ background: '#3b82f6', width: '40px', height: '40px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 'bold', fontSize: '18px' }}>
                                            {driver.name.charAt(0).toUpperCase()}
                                        </div>
                                        <div>
                                            <div style={{ fontWeight: '700', fontSize: '16px', color: theme.text, marginBottom: '4px' }}>{driver.name}</div>
                                            <div style={{ color: theme.textMuted, fontSize: '13px', fontWeight: '500' }}>{driver.email}</div>
                                        </div>
                                    </div>
                                    <div style={{ padding: '6px 12px', background: 'rgba(59, 130, 246, 0.1)', color: '#3b82f6', borderRadius: '20px', fontSize: '12px', fontWeight: '800', letterSpacing: '0.5px' }}>
                                        READY FOR DISPATCH
                                    </div>
                                </div>
                            ))
                        )}
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Drivers;