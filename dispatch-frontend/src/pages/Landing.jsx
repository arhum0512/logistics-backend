import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api';
import { Truck, MapPin, Package, DollarSign, ArrowRight, Sun, Moon, ShieldAlert, UserCheck } from 'lucide-react';

const Landing = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ origin: '', destination: '', weight: '' });
    const [quoteResult, setQuoteResult] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const [isDarkMode, setIsDarkMode] = useState(() => localStorage.getItem('theme') === 'dark');

    const toggleTheme = () => {
        const newTheme = !isDarkMode;
        setIsDarkMode(newTheme);
        localStorage.setItem('theme', newTheme ? 'dark' : 'light');
    };

    const theme = isDarkMode ? {
        bg: '#0f172a', navBg: '#020617', navText: '#f8fafc', card: '#1e293b', 
        heroText: '#f1f5f9', textMuted: '#94a3b8', border: '#334155', inputBg: '#0f172a'
    } : {
        bg: '#f8fafc', navBg: '#ffffff', navText: '#1e293b', card: '#ffffff', 
        heroText: '#0f172a', textMuted: '#64748b', border: '#cbd5e1', inputBg: '#ffffff'
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            const response = await API.post('/loads', { ...formData, weight: Number(formData.weight) });
            setQuoteResult(response.data.load.quote);
            setIsSubmitting(false);
        } catch (error) {
            alert("Error: Ensure backend is running.");
            setIsSubmitting(false);
        }
    };

    return (
        <div style={{ fontFamily: 'Inter, sans-serif', color: theme.heroText, background: theme.bg, minHeight: '100vh', transition: 'all 0.3s' }}>
            <nav style={{ display: 'flex', justifyContent: 'space-between', padding: '20px 50px', background: theme.navBg, boxShadow: '0 2px 10px rgba(0,0,0,0.1)', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontWeight: '900', fontSize: '24px' }}>
                    <Truck color="#3b82f6" size={32} /> Logistics<span style={{ color: '#3b82f6' }}>Pro</span>
                </div>
                <div style={{ display: 'flex', gap: '10px' }}>
                    <button onClick={toggleTheme} style={{ background: 'transparent', border: `1px solid ${theme.border}`, color: theme.navText, borderRadius: '20px', padding: '8px 15px', cursor: 'pointer' }}>
                        {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
                    </button>
                    {/* NEW: DIRECT LINK TO ADMIN PORTAL */}
                    <button onClick={() => navigate('/admin-login')} style={{ background: 'transparent', color: theme.navText, border: `1px solid ${theme.border}`, padding: '10px 20px', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' }}>Admin</button>
                    {/* NEW: DIRECT LINK TO DRIVER PORTAL */}
                    <button onClick={() => navigate('/driver-login')} style={{ background: '#3b82f6', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' }}>Driver Login</button>
                </div>
            </nav>

            <div style={{ display: 'flex', flexWrap: 'wrap', maxWidth: '1200px', margin: '60px auto', gap: '40px', padding: '0 20px' }}>
                <div style={{ flex: '1 1 500px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                    <h1 style={{ fontSize: '48px', fontWeight: '900', margin: '0 0 20px 0' }}>The Future of <br/>Freight Dispatch.</h1>
                    <p style={{ fontSize: '18px', color: theme.textMuted, marginBottom: '40px' }}>The complete ecosystem for shippers to get quotes and for drivers to manage their fleet operations.</p>
                    
                    <div style={{ display: 'flex', gap: '15px' }}>
                        {/* NEW: DRIVER LOGIN BUTTON */}
                        <button onClick={() => navigate('/driver-login')} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '15px 30px', background: '#16a34a', color: 'white', border: 'none', borderRadius: '12px', fontSize: '18px', fontWeight: 'bold', cursor: 'pointer', boxShadow: '0 10px 15px -3px rgba(22, 163, 74, 0.3)' }}>
                            <UserCheck size={22} /> Driver Portal
                        </button>
                        {/* NEW: ADMIN LOGIN BUTTON */}
                        <button onClick={() => navigate('/admin-login')} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '15px 30px', background: theme.card, color: theme.heroText, border: `1px solid ${theme.border}`, borderRadius: '12px', fontSize: '18px', fontWeight: 'bold', cursor: 'pointer' }}>
                            <ShieldAlert size={22} /> Command Center
                        </button>
                    </div>
                </div>

                {/* Quote Form Container */}
                <div style={{ flex: '1 1 400px', background: theme.card, padding: '40px', borderRadius: '20px', border: `1px solid ${theme.border}`, boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }}>
                    {quoteResult ? (
                        <div style={{ textAlign: 'center' }}>
                            <DollarSign size={48} color="#16a34a" style={{ marginBottom: '10px' }} />
                            <h3>Estimated Quote</h3>
                            <div style={{ fontSize: '48px', fontWeight: '900', margin: '20px 0' }}>${quoteResult}</div>
                            <button onClick={() => setQuoteResult(null)} style={{ background: '#3b82f6', color: 'white', width: '100%', padding: '12px', borderRadius: '8px', border: 'none', cursor: 'pointer', fontWeight: 'bold' }}>New Quote</button>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                            <h2 style={{ margin: '0 0 20px 0' }}>Request Shipping</h2>
                            <input name="origin" placeholder="Origin" onChange={(e) => setFormData({...formData, origin: e.target.value})} required style={{ background: theme.bg, border: `1px solid ${theme.border}`, padding: '15px', borderRadius: '8px', color: theme.heroText, outline: 'none' }} />
                            <input name="destination" placeholder="Destination" onChange={(e) => setFormData({...formData, destination: e.target.value})} required style={{ background: theme.bg, border: `1px solid ${theme.border}`, padding: '15px', borderRadius: '8px', color: theme.heroText, outline: 'none' }} />
                            <input name="weight" type="number" placeholder="Weight (lbs)" onChange={(e) => setFormData({...formData, weight: e.target.value})} required style={{ background: theme.bg, border: `1px solid ${theme.border}`, padding: '15px', borderRadius: '8px', color: theme.heroText, outline: 'none' }} />
                            <button type="submit" style={{ background: '#3b82f6', color: 'white', padding: '18px', borderRadius: '8px', border: 'none', fontWeight: 'bold', cursor: 'pointer', marginTop: '10px', fontSize: '16px' }}>Calculate Quote <ArrowRight size={18} style={{ marginLeft: '10px' }} /></button>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Landing;