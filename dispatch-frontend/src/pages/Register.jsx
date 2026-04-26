import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import API from '../api';
import { UserPlus } from 'lucide-react';

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const isDarkMode = localStorage.getItem('theme') === 'dark';

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            await API.post('/auth/register', { name, email, password });
            alert("Registration successful! Please Sign In.");
            navigate('/login');
        } catch (err) {
            alert(err.response?.data?.message || "Registration failed");
        }
    };

    const theme = isDarkMode ? {
        bg: '#0f172a', card: '#1e293b', text: '#f8fafc', textMuted: '#94a3b8', border: '#334155'
    } : {
        bg: '#f1f5f9', card: '#ffffff', text: '#0f172a', textMuted: '#64748b', border: '#cbd5e1'
    };

    return (
        <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: theme.bg }}>
            <div style={{ background: theme.card, padding: '40px', borderRadius: '16px', border: `1px solid ${theme.border}`, width: '100%', maxWidth: '400px', textAlign: 'center' }}>
                <UserPlus size={48} color="#16a34a" style={{ margin: '0 auto 20px auto' }} />
                <h2 style={{ color: theme.text, margin: '0 0 10px 0' }}>Driver Sign Up</h2>
                <p style={{ color: theme.textMuted, marginBottom: '30px' }}>Join the LogisticsPro fleet today</p>
                
                <form onSubmit={handleRegister} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                    <input type="text" placeholder="Full Name" value={name} onChange={(e) => setName(e.target.value)} required style={{ padding: '14px', borderRadius: '8px', border: `1px solid ${theme.border}`, background: theme.bg, color: theme.text }} />
                    <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required style={{ padding: '14px', borderRadius: '8px', border: `1px solid ${theme.border}`, background: theme.bg, color: theme.text }} />
                    <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required style={{ padding: '14px', borderRadius: '8px', border: `1px solid ${theme.border}`, background: theme.bg, color: theme.text }} />
                    <button type="submit" style={{ padding: '14px', background: '#16a34a', color: 'white', border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' }}>Sign Up</button>
                </form>

                <p style={{ marginTop: '20px', color: theme.textMuted, fontSize: '14px' }}>
                    Already a driver? <Link to="/login" style={{ color: '#3b82f6', fontWeight: 'bold', textDecoration: 'none' }}>Sign In</Link>
                </p>
            </div>
        </div>
    );
};

export default Register;