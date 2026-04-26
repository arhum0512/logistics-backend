import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api';
import { LayoutDashboard, LogOut, Truck, Users, Moon, Sun, X, Trash2 } from 'lucide-react';

const Dashboard = () => {
    const [loads, setLoads] = useState([]);
    const [drivers, setDrivers] = useState([]); 
    
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedLoad, setSelectedLoad] = useState(null);
    const [selectedDriverId, setSelectedDriverId] = useState('');

    const navigate = useNavigate();

    // --- ROLE-BASED SECURITY CHECK ---
    const storedUser = JSON.parse(localStorage.getItem('user')) || {};
    const isAdmin = storedUser.role === 'admin';

    const [isDarkMode, setIsDarkMode] = useState(() => localStorage.getItem('theme') === 'dark');

    useEffect(() => { 
        fetchLoads(); 
        if (isAdmin) fetchDrivers(); // Only fetch drivers if admin
    }, [isAdmin]);

    const fetchLoads = async () => {
        try {
            const response = await API.get('/loads');
            setLoads(response.data);
        } catch (error) {
            if (error.response?.status === 401) handleLogout();
        }
    };

    const fetchDrivers = async () => {
        try {
            const response = await API.get('/auth/drivers');
            setDrivers(response.data);
        } catch (error) {
            console.error("Failed to fetch drivers", error);
        }
    };

    const handleAssign = async () => {
        if (!selectedDriverId) return alert("Please select a driver first!");
        try {
            await API.put('/loads/assign', { loadId: selectedLoad.id, driverId: selectedDriverId });
            setIsModalOpen(false); 
            setSelectedDriverId(''); 
            fetchLoads(); 
        } catch (error) {
            alert("Error assigning driver. Check console.");
        }
    };

    const handleDelete = async (loadId) => {
        if (!window.confirm("Are you sure you want to cancel and delete this load?")) return;
        try {
            await API.delete(`/loads/${loadId}`);
            fetchLoads(); 
        } catch (error) {
            alert("Error deleting load. Check console.");
        }
    };

    // --- THE UPDATED LOGOUT FUNCTION ---
    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/'); // Safely returns to the Landing page
    };

    const toggleTheme = () => {
        const newTheme = !isDarkMode;
        setIsDarkMode(newTheme);
        localStorage.setItem('theme', newTheme ? 'dark' : 'light');
    };

    const theme = isDarkMode ? {
        bg: '#0f172a', sidebar: '#020617', card: '#1e293b', 
        text: '#f8fafc', textMuted: '#94a3b8', border: '#334155', hover: '#334155',
        modalOverlay: 'rgba(0,0,0,0.7)', inputBg: '#0f172a'
    } : {
        bg: '#f1f5f9', sidebar: '#1e293b', card: '#ffffff', 
        text: '#0f172a', textMuted: '#64748b', border: '#e2e8f0', hover: '#f1f5f9',
        modalOverlay: 'rgba(0,0,0,0.4)', inputBg: '#ffffff'
    };

    const totalLoads = loads.length;
    const pendingLoads = loads.filter(l => l.status === 'pending').length;
    const activeLoads = totalLoads - pendingLoads;

    return (
        <div style={{ display: 'flex', minHeight: '100vh', width: '100%', background: theme.bg, fontFamily: 'Inter, sans-serif', transition: 'background 0.3s ease' }}>
            
            {/* --- LEFT SIDEBAR --- */}
            <div style={{ width: '260px', background: theme.sidebar, color: 'white', display: 'flex', flexDirection: 'column', padding: '20px 0', transition: 'background 0.3s ease' }}>
                <div style={{ padding: '0 25px 20px 25px', display: 'flex', alignItems: 'center', gap: '12px', borderBottom: '1px solid rgba(255,255,255,0.1)', marginBottom: '20px' }}>
                    <Truck size={28} color="#3b82f6" />
                    <h2 style={{ margin: 0, fontSize: '20px', fontWeight: '800', letterSpacing: '-0.5px' }}>Logistics<span style={{ color: '#3b82f6' }}>Pro</span></h2>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '5px', padding: '0 15px', flex: 1 }}>
                    <div style={{ background: '#3b82f6', color: 'white', padding: '12px 15px', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '10px', fontWeight: '600', cursor: 'pointer' }}>
                        <LayoutDashboard size={18} /> Active Loads
                    </div>
                    
                    {/* Only show Fleet Drivers tab to Admins */}
                    {isAdmin && (
                        <div onClick={() => navigate('/drivers')} style={{ color: '#94a3b8', padding: '12px 15px', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '10px', fontWeight: '500', cursor: 'pointer', transition: 'background 0.2s' }}>
                            <Users size={18} /> Fleet Drivers
                        </div>
                    )}
                </div>

                <div style={{ padding: '0 15px' }}>
                    <div style={{ padding: '10px 15px', marginBottom: '10px', background: 'rgba(255,255,255,0.05)', borderRadius: '8px', fontSize: '13px', color: '#94a3b8', textAlign: 'center' }}>
                        Logged in as: <strong style={{ color: isAdmin ? '#3b82f6' : '#22c55e' }}>{isAdmin ? 'Admin' : 'Driver'}</strong>
                    </div>
                    <button onClick={handleLogout} style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', padding: '12px', background: 'rgba(239, 68, 68, 0.15)', color: '#fca5a5', border: '1px solid rgba(239, 68, 68, 0.3)', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}>
                        <LogOut size={18} /> Logout
                    </button>
                </div>
            </div>

            {/* --- RIGHT MAIN CONTENT AREA --- */}
            <div style={{ flex: 1, padding: '40px', overflowY: 'auto' }}>
                <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
                    
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
                        <div>
                            <h1 style={{ margin: 0, fontSize: '28px', color: theme.text, fontWeight: '800', transition: 'color 0.3s ease' }}>Active Loads</h1>
                            <p style={{ margin: '5px 0 0 0', color: theme.textMuted, transition: 'color 0.3s ease' }}>Monitor incoming cargo requests.</p>
                        </div>
                        
                        <button onClick={toggleTheme} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 16px', background: theme.card, color: theme.text, border: `1px solid ${theme.border}`, borderRadius: '20px', cursor: 'pointer', fontWeight: '600', boxShadow: '0 2px 4px rgba(0,0,0,0.05)', transition: 'all 0.3s ease' }}>
                            {isDarkMode ? <Sun size={18} color="#eab308" /> : <Moon size={18} color="#64748b" />}
                            {isDarkMode ? 'Light Mode' : 'Dark Mode'}
                        </button>
                    </div>

                    {/* Stats Row */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', marginBottom: '30px' }}>
                        <div style={{ background: theme.card, padding: '24px', borderRadius: '12px', border: `1px solid ${theme.border}`, boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
                            <p style={{ margin: 0, color: theme.textMuted, fontSize: '13px', fontWeight: '700', textTransform: 'uppercase' }}>Total Requests</p>
                            <h2 style={{ margin: '10px 0 0 0', color: theme.text, fontSize: '32px' }}>{totalLoads}</h2>
                        </div>
                        <div style={{ background: theme.card, padding: '24px', borderRadius: '12px', border: `1px solid ${theme.border}`, boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
                            <p style={{ margin: 0, color: theme.textMuted, fontSize: '13px', fontWeight: '700', textTransform: 'uppercase' }}>Pending</p>
                            <h2 style={{ margin: '10px 0 0 0', color: '#eab308', fontSize: '32px' }}>{pendingLoads}</h2>
                        </div>
                        <div style={{ background: theme.card, padding: '24px', borderRadius: '12px', border: `1px solid ${theme.border}`, boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
                            <p style={{ margin: 0, color: theme.textMuted, fontSize: '13px', fontWeight: '700', textTransform: 'uppercase' }}>Assigned</p>
                            <h2 style={{ margin: '10px 0 0 0', color: '#22c55e', fontSize: '32px' }}>{activeLoads}</h2>
                        </div>
                    </div>

                    {/* Main Loads List */}
                    <div style={{ background: theme.card, borderRadius: '12px', border: `1px solid ${theme.border}`, boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)', overflow: 'hidden' }}>
                        {loads.length === 0 ? (
                            <div style={{ padding: '40px', textAlign: 'center', color: theme.textMuted }}>No active loads.</div>
                        ) : (
                            loads.map((load, index) => (
                                <div key={load.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px 25px', borderBottom: index === loads.length - 1 ? 'none' : `1px solid ${theme.border}` }}>
                                    
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                                        <div style={{ background: load.status === 'pending' ? '#fef08a' : '#bbf7d0', width: '12px', height: '12px', borderRadius: '50%', boxShadow: `0 0 8px ${load.status === 'pending' ? 'rgba(234, 179, 8, 0.4)' : 'rgba(34, 197, 94, 0.4)'}` }}></div>
                                        <div>
                                            <div style={{ fontWeight: '700', fontSize: '16px', color: theme.text, marginBottom: '4px' }}>
                                                {load.origin} ➔ {load.destination}
                                            </div>
                                            <div style={{ display: 'flex', gap: '15px', color: theme.textMuted, fontSize: '13px', fontWeight: '500' }}>
                                                <span>{load.weight} lbs</span>
                                                <span style={{ color: load.status === 'pending' ? '#ca8a04' : '#16a34a', textTransform: 'uppercase', fontWeight: '800' }}>{load.status}</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Action Buttons Container */}
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                                        <div style={{ fontSize: '20px', fontWeight: '800', color: '#10b981', marginRight: '10px' }}>
                                            {load.quote ? (load.quote.toString().includes('$') ? load.quote : `$${load.quote}`) : '...'}
                                        </div>
                                        
                                        {/* Status / Assign Button */}
                                        {load.status === 'pending' ? (
                                            isAdmin ? (
                                                <button 
                                                    onClick={() => { setSelectedLoad(load); setIsModalOpen(true); }}
                                                    style={{ background: '#3b82f6', color: 'white', border: 'none', padding: '8px 16px', borderRadius: '6px', fontWeight: '600', cursor: 'pointer', fontSize: '13px', transition: 'all 0.2s' }}
                                                >
                                                    Assign Driver
                                                </button>
                                            ) : (
                                                <div style={{ padding: '8px 16px', color: '#eab308', background: 'rgba(234, 179, 8, 0.1)', borderRadius: '6px', fontWeight: 'bold', fontSize: '13px' }}>
                                                    Awaiting Dispatch
                                                </div>
                                            )
                                        ) : (
                                            <div style={{ padding: '8px 16px', color: '#22c55e', background: 'rgba(34, 197, 94, 0.1)', borderRadius: '6px', fontWeight: 'bold', fontSize: '13px' }}>
                                                Dispatched
                                            </div>
                                        )}

                                        {/* ONLY ADMINS SEE THE TRASH CAN */}
                                        {isAdmin && (
                                            <button 
                                                onClick={() => handleDelete(load.id)}
                                                style={{ background: 'transparent', border: 'none', color: '#ef4444', cursor: 'pointer', padding: '5px', display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: 0.7, transition: 'opacity 0.2s' }}
                                                onMouseOver={(e) => e.currentTarget.style.opacity = 1}
                                                onMouseOut={(e) => e.currentTarget.style.opacity = 0.7}
                                                title="Cancel Load"
                                            >
                                                <Trash2 size={20} />
                                            </button>
                                        )}
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>

            {/* --- THE ASSIGNMENT MODAL (ONLY ADMINS CAN OPEN THIS) --- */}
            {isModalOpen && isAdmin && (
                <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: theme.modalOverlay, backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
                    <div style={{ background: theme.card, padding: '30px', borderRadius: '16px', width: '100%', maxWidth: '450px', border: `1px solid ${theme.border}`, boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)' }}>
                        
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                            <h2 style={{ margin: 0, color: theme.text, fontSize: '20px' }}>Assign Driver to Route</h2>
                            <button onClick={() => setIsModalOpen(false)} style={{ background: 'none', border: 'none', color: theme.textMuted, cursor: 'pointer' }}><X size={24} /></button>
                        </div>

                        <div style={{ padding: '15px', background: theme.bg, borderRadius: '8px', marginBottom: '20px', border: `1px solid ${theme.border}` }}>
                            <p style={{ margin: '0 0 5px 0', fontSize: '12px', color: theme.textMuted, textTransform: 'uppercase', fontWeight: 'bold' }}>Cargo Details</p>
                            <p style={{ margin: 0, color: theme.text, fontWeight: '600', fontSize: '16px' }}>{selectedLoad?.origin} ➔ {selectedLoad?.destination}</p>
                        </div>

                        <p style={{ margin: '0 0 8px 0', color: theme.text, fontWeight: '500', fontSize: '14px' }}>Select Available Driver</p>
                        <select 
                            value={selectedDriverId} 
                            onChange={(e) => setSelectedDriverId(e.target.value)}
                            style={{ width: '100%', padding: '12px', borderRadius: '8px', border: `1px solid ${theme.border}`, background: theme.inputBg, color: theme.text, fontSize: '15px', marginBottom: '25px', outline: 'none' }}
                        >
                            <option value="" disabled>-- Choose a driver --</option>
                            {drivers.length === 0 ? (
                                <option disabled>No drivers available in database</option>
                            ) : (
                                drivers.map(driver => (
                                    <option key={driver.id} value={driver.id}>{driver.name} ({driver.email})</option>
                                ))
                            )}
                        </select>

                        <div style={{ display: 'flex', gap: '10px' }}>
                            <button onClick={() => setIsModalOpen(false)} style={{ flex: 1, padding: '12px', background: 'transparent', border: `1px solid ${theme.border}`, color: theme.text, borderRadius: '8px', cursor: 'pointer', fontWeight: '600' }}>Cancel</button>
                            <button onClick={handleAssign} style={{ flex: 2, padding: '12px', background: '#3b82f6', border: 'none', color: 'white', borderRadius: '8px', cursor: 'pointer', fontWeight: '600' }}>Confirm Assignment</button>
                        </div>

                    </div>
                </div>
            )}

        </div>
    );
};

export default Dashboard;