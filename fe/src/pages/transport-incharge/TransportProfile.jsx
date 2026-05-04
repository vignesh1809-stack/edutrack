import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../../store/actions/authActions';

const TransportProfile = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(logout());
        navigate('/');
    };

    return (
        <div className="bg-surface text-on-surface antialiased min-h-screen pb-32">
            {/* TopAppBar */}
            <header className="sticky top-0 z-50 w-full px-6 py-4 flex justify-between items-center bg-white/70 backdrop-blur-xl shadow-xl shadow-slate-200/50">
                <div className="flex items-center gap-4">
                    <button 
                        onClick={() => navigate(-1)}
                        aria-label="Go back" 
                        className="material-symbols-outlined text-on-surface-variant hover:bg-slate-100 transition-colors rounded-full p-2"
                    >
                        arrow_back
                    </button>
                    <h1 className="font-manrope font-extrabold text-blue-700 text-2xl tracking-tight">Transport Management</h1>
                </div>
                <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-slate-500 hover:bg-slate-100 p-2 rounded-full transition-colors cursor-pointer">settings</span>
                    <div className="w-10 h-10 rounded-full bg-primary-container flex items-center justify-center overflow-hidden">
                        <img 
                            alt="Transport Incharge" 
                            className="w-full h-full object-cover" 
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBGPYYUTUz5nB0USckUAp9u3775SMplcJBPJvEFzFBgd7zRh0ZSaC9YVzfQ1pHDdwX7rW-X-3qUj7EZ0C4ctNqYBrFRcn1wQivgE19AhIC9wORUC5h_SZFL6HvDOx87V7jJnVe6_bjb-zJSqb0HzPV6RGUGf7EsKqnH-rPFhQKqqSCQi5Ladm2fZaYHLWx6jZziHfYWP4PTxTLyCvyYdoh8W31H4lRN_cdkzjnpcy48kx0enMDD_3MemoUaQyi2atbNgVjIeMeC5ls"
                        />
                    </div>
                </div>
            </header>
            
            <main className="max-w-4xl mx-auto px-6 mt-8 space-y-8">
                {/* Profile Header Section (Focus Plate) */}
                <section className="bg-surface-container-lowest rounded-[24px] p-8 flex flex-col md:flex-row items-center gap-8 shadow-[0_20px_40px_rgba(42,52,57,0.06)] relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-full -mr-10 -mt-10"></div>
                    <div className="w-32 h-32 md:w-40 md:h-40 rounded-[24px] overflow-hidden shadow-xl ring-4 ring-white">
                        <img 
                            alt="Marcus Reeves" 
                            className="w-full h-full object-cover" 
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAMd_YFAsHMeoah_XuhBoB5JsV9SW_0tMWEFik9jxP_q0Uj4anFMP0C1DPfDNO6OvdltZqEUaFd7eJflLWd2s9-drohFw4kEMOeXBPTBHmjEK4tlQgdmaWmOGjx7b-rw0YL4FdqZknitXza0OvEZmkUhTqWKsatpP1MJMUQt0iehe0rUIsMvyl2KECr2LrnA0Xm7B92f-35mSDYtqsui--9tTLVtSpnQmc-XGw01-RliokeKXLMZ6gX1a3diQ4kmCdHs_BKm5sS1BQ"
                        />
                    </div>
                    <div className="text-center md:text-left space-y-2">
                        <span className="text-primary font-bold uppercase tracking-widest text-[11px] font-headline">Administrative Personnel</span>
                        <h2 className="text-4xl font-extrabold font-headline text-on-surface tracking-tight">Marcus Reeves</h2>
                        <div className="flex flex-wrap justify-center md:justify-start items-center gap-3">
                            <p className="text-on-surface-variant font-semibold">Transport Manager</p>
                            <span className="w-1 h-1 rounded-full bg-outline-variant"></span>
                            <p className="text-on-surface-variant">Logistics Division</p>
                        </div>
                    </div>
                </section>

                {/* Bento Grid for Professional & Contact Info */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Professional Info */}
                    <div className="md:col-span-2 bg-surface-container-low rounded-[20px] p-6 space-y-6">
                        <div className="flex items-center justify-between">
                            <h3 className="font-headline font-bold text-xl text-on-surface">Professional Details</h3>
                            <span className="material-symbols-outlined text-primary-dim">badge</span>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                            <div className="bg-surface-container-lowest p-4 rounded-xl">
                                <p className="text-[11px] uppercase font-bold text-outline tracking-wider mb-1">Employee ID</p>
                                <p className="text-on-surface font-semibold">TR-9021</p>
                            </div>
                            <div className="bg-surface-container-lowest p-4 rounded-xl">
                                <p className="text-[11px] uppercase font-bold text-outline tracking-wider mb-1">Department</p>
                                <p className="text-on-surface font-semibold">Logistics & Fleet</p>
                            </div>
                            <div className="bg-surface-container-lowest p-4 rounded-xl">
                                <p className="text-[11px] uppercase font-bold text-outline tracking-wider mb-1">Fleet Managed</p>
                                <p className="text-on-surface font-semibold">24 Units</p>
                            </div>
                        </div>
                    </div>

                    {/* Contact Info */}
                    <div className="bg-white rounded-[20px] p-6 space-y-6 shadow-sm">
                        <h3 className="font-headline font-bold text-xl text-on-surface">Contact</h3>
                        <div className="space-y-4">
                            <div className="flex items-start gap-3">
                                <span className="material-symbols-outlined text-primary text-xl">mail</span>
                                <div>
                                    <p className="text-[11px] uppercase font-bold text-outline tracking-wider">Work Email</p>
                                    <p className="text-sm font-semibold text-on-surface truncate">m.reeves@transport.edu</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <span className="material-symbols-outlined text-primary text-xl">call</span>
                                <div>
                                    <p className="text-[11px] uppercase font-bold text-outline tracking-wider">Primary Phone</p>
                                    <p className="text-sm font-semibold text-on-surface">+1 (555) 012-9021</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Account Settings */}
                    <div className="md:col-span-3 bg-surface-container-low rounded-[20px] p-6 space-y-4">
                        <h3 className="font-headline font-bold text-xl text-on-surface">Preferences</h3>
                        <div className="divide-y divide-outline-variant/10">
                            <div className="flex items-center justify-between py-4">
                                <div className="flex items-center gap-3">
                                    <span className="material-symbols-outlined text-on-surface-variant">notifications</span>
                                    <div>
                                        <p className="text-sm font-semibold text-on-surface">Push Notifications</p>
                                        <p className="text-xs text-on-surface-variant">Alerts for route deviations and fuel logs</p>
                                    </div>
                                </div>
                                <button className="w-12 h-6 bg-primary rounded-full relative p-1 transition-colors">
                                    <div className="w-4 h-4 bg-white rounded-full ml-auto shadow-sm"></div>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Logout Action */}
                <div className="pt-4">
                    <button onClick={handleLogout} className="w-full py-4 rounded-xl flex items-center justify-center gap-2 text-error font-bold font-headline bg-white hover:bg-error/5 transition-all border border-error/10">
                        <span className="material-symbols-outlined">logout</span>
                        Log Out
                    </button>
                </div>
            </main>

            {/* BottomNavBar */}
            <nav className="fixed bottom-0 left-0 w-full z-50 flex md:hidden justify-around items-center px-4 pb-6 pt-3 bg-white/80 backdrop-blur-lg shadow-[0_-10px_40px_rgba(0,0,0,0.03)] rounded-t-[24px]">
                <Link className="flex flex-col items-center justify-center text-slate-400 px-5 py-2 hover:text-blue-500 transition-all active:scale-90 duration-200" to="/transport/dashboard">
                    <span className="material-symbols-outlined mb-1">directions_bus</span>
                    <span className="font-inter text-[11px] font-semibold uppercase tracking-wider">Fleet</span>
                </Link>
                <Link className="flex flex-col items-center justify-center text-slate-400 px-5 py-2 hover:text-blue-500 transition-all active:scale-90 duration-200" to="/transport/staff">
                    <span className="material-symbols-outlined mb-1">group</span>
                    <span className="font-inter text-[11px] font-semibold uppercase tracking-wider">Staff</span>
                </Link>
                <Link className="flex flex-col items-center justify-center text-slate-400 px-5 py-2 hover:text-blue-500 transition-all active:scale-90 duration-200" to="/transport/routes">
                    <span className="material-symbols-outlined mb-1">map</span>
                    <span className="font-inter text-[11px] font-semibold uppercase tracking-wider">Routes</span>
                </Link>
                <Link className="flex flex-col items-center justify-center bg-blue-50 text-blue-700 rounded-xl px-5 py-2 active:scale-90 duration-200" to="/transport/profile">
                    <span className="material-symbols-outlined mb-1" style={{ fontVariationSettings: "'FILL' 1" }}>account_circle</span>
                    <span className="font-inter text-[11px] font-semibold uppercase tracking-wider">Profile</span>
                </Link>
            </nav>
        </div>
    );
};

export default TransportProfile;
