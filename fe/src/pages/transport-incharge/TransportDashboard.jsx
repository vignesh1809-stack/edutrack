import React from 'react';
import { Link } from 'react-router-dom';

const TransportDashboard = () => {
    return (
        <div className="bg-surface text-on-surface selection:bg-primary-container min-h-screen">
            {/* TopAppBar */}
            <header className="bg-white/70 backdrop-blur-xl sticky top-0 z-50 shadow-xl shadow-blue-900/5 flex items-center justify-between px-6 py-4 w-full">
                <div className="flex items-center gap-4">
                    <button className="text-blue-600 hover:bg-slate-50 transition-colors p-2 rounded-full scale-95 active:transition-all">
                        <span className="material-symbols-outlined">menu</span>
                    </button>
                    <h1 className="font-manrope font-bold text-2xl tracking-tight text-blue-700">Fleet Overview</h1>
                </div>
                <div className="flex items-center gap-3">
                    <div className="hidden md:block text-right">
                        <p className="text-xs font-bold text-on-surface-variant uppercase tracking-widest">Transport Incharge</p>
                        <p className="text-sm font-semibold text-primary">EduTrack Horizon</p>
                    </div>
                    <img alt="Transport Incharge Profile" className="w-10 h-10 rounded-full object-cover border-2 border-primary-container" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBGPYYUTUz5nB0USckUAp9u3775SMplcJBPJvEFzFBgd7zRh0ZSaC9YVzfQ1pHDdwX7rW-X-3qUj7EZ0C4ctNqYBrFRcn1wQivgE19AhIC9wORUC5h_SZFL6HvDOx87V7jJnVe6_bjb-zJSqb0HzPV6RGUGf7EsKqnH-rPFhQKqqSCQi5Ladm2fZaYHLWx6jZziHfYWP4PTxTLyCvyYdoh8W31H4lRN_cdkzjnpcy48kx0enMDD_3MemoUaQyi2atbNgVjIeMeC5ls"/>
                </div>
            </header>

            <div className="flex min-h-screen pt-20">
                {/* NavigationDrawer (Sidebar) */}
                <aside className="h-screen w-64 bg-slate-50 flex flex-col gap-2 p-4 pt-4 fixed left-0 hidden lg:flex">
                    <div className="mb-8 px-4 py-6 bg-white rounded-2xl shadow-sm border border-surface-container-highest/50">
                        <div className="flex items-center gap-3 mb-2">
                            <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center">
                                <span className="material-symbols-outlined text-blue-600 text-sm">school</span>
                            </div>
                            <span className="font-manrope font-extrabold text-blue-600">Campus Alpha</span>
                        </div>
                        <p className="text-[10px] uppercase tracking-widest text-slate-400 font-bold">Main Hub</p>
                    </div>
                    <nav className="flex flex-col gap-1">
                        <Link className="flex items-center gap-3 px-4 py-3 bg-white text-blue-600 font-bold shadow-sm rounded-lg translate-x-1 transition-transform" to="/transport/dashboard">
                            <span className="material-symbols-outlined">dashboard</span>
                            <span>Fleet Overview</span>
                        </Link>
                        <Link className="flex items-center gap-3 px-4 py-3 text-slate-600 hover:text-blue-500 hover:bg-slate-200/50 rounded-lg transition-all" to="/transport/staff">
                            <span className="material-symbols-outlined">group</span>
                            <span>Staff Directory</span>
                        </Link>
                        <Link className="flex items-center gap-3 px-4 py-3 text-slate-600 hover:text-blue-500 hover:bg-slate-200/50 rounded-lg transition-all" to="#">
                            <span className="material-symbols-outlined">schedule</span>
                            <span>Time Tracking</span>
                        </Link>
                        <Link className="flex items-center gap-3 px-4 py-3 text-slate-600 hover:text-blue-500 hover:bg-slate-200/50 rounded-lg transition-all" to="/transport/routes">
                            <span className="material-symbols-outlined">map</span>
                            <span>Route Analytics</span>
                        </Link>
                        <Link className="flex items-center gap-3 px-4 py-3 text-slate-600 hover:text-blue-500 hover:bg-slate-200/50 rounded-lg transition-all" to="#">
                            <span className="material-symbols-outlined">settings_suggest</span>
                            <span>Maintenance</span>
                        </Link>
                    </nav>
                    <div className="mt-auto p-4 bg-tertiary-container/30 rounded-2xl">
                        <p className="text-xs font-semibold text-on-tertiary-container mb-2">System Health</p>
                        <div className="w-full bg-white/50 h-1.5 rounded-full overflow-hidden">
                            <div className="bg-primary h-full w-[92%]"></div>
                        </div>
                        <p className="text-[10px] mt-2 text-on-tertiary-container/70">All systems operational</p>
                    </div>
                </aside>

                {/* Main Content Area */}
                <main className="flex-1 lg:ml-64 p-6 bg-surface">
                    <div className="max-w-7xl mx-auto space-y-8">
                        {/* Welcome Section */}
                        <section className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                            <div>
                                <h1 className="text-3xl font-extrabold tracking-tight text-on-surface">Dashboard Intelligence</h1>
                                <p className="text-on-surface-variant font-medium">Real-time oversight for Campus Alpha logistics.</p>
                            </div>
                            <div className="flex items-center gap-3">
                                <button className="px-5 py-2.5 bg-surface-container-lowest text-on-surface font-semibold rounded-xl border border-outline-variant/10 shadow-sm hover:shadow-md transition-all flex items-center gap-2">
                                    <span className="material-symbols-outlined text-lg">file_download</span>
                                    Export Report
                                </button>
                                <button className="px-5 py-2.5 bg-gradient-to-br from-primary to-primary-dim text-white font-semibold rounded-xl shadow-lg hover:shadow-primary/20 transition-all flex items-center gap-2">
                                    <span className="material-symbols-outlined text-lg">add</span>
                                    Add Log Entry
                                </button>
                            </div>
                        </section>

                        {/* Fleet Overview Cards (Bento Style) */}
                        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                            {/* Total Buses */}
                            <div className="bg-surface-container-lowest p-6 rounded-2xl shadow-sm border border-surface-container-highest/30 flex flex-col justify-between h-40">
                                <div className="flex justify-between items-start">
                                    <span className="material-symbols-outlined p-2 bg-primary-container text-primary rounded-lg">directions_bus</span>
                                    <span className="text-xs font-bold text-primary px-2 py-1 bg-primary-container/30 rounded-full">Total</span>
                                </div>
                                <div>
                                    <p className="text-4xl font-extrabold text-on-surface">24</p>
                                    <p className="text-sm font-medium text-on-surface-variant">Fleet Capacity</p>
                                </div>
                            </div>
                            {/* Buses On-Route */}
                            <div className="bg-surface-container-lowest p-6 rounded-2xl shadow-sm border border-surface-container-highest/30 flex flex-col justify-between h-40">
                                <div className="flex justify-between items-start">
                                    <span className="material-symbols-outlined p-2 bg-emerald-100 text-emerald-600 rounded-lg">route</span>
                                    <div className="flex items-center gap-1 text-[10px] font-bold text-emerald-600">
                                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span> LIVE
                                    </div>
                                </div>
                                <div>
                                    <p className="text-4xl font-extrabold text-on-surface">18</p>
                                    <p className="text-sm font-medium text-on-surface-variant">Active Transit</p>
                                </div>
                            </div>
                            {/* Maintenance */}
                            <div className="bg-surface-container-lowest p-6 rounded-2xl shadow-sm border border-surface-container-highest/30 flex flex-col justify-between h-40">
                                <div className="flex justify-between items-start">
                                    <span className="material-symbols-outlined p-2 bg-amber-100 text-amber-600 rounded-lg">build</span>
                                    <span className="text-xs font-bold text-amber-600 px-2 py-1 bg-amber-100 rounded-full">Pending</span>
                                </div>
                                <div>
                                    <p className="text-4xl font-extrabold text-on-surface">02</p>
                                    <p className="text-sm font-medium text-on-surface-variant">In Workshop</p>
                                </div>
                            </div>
                            {/* Before 9:00 AM Arrivals */}
                            <div className="bg-primary p-6 rounded-2xl shadow-xl shadow-primary/10 flex flex-col justify-between h-40 relative overflow-hidden">
                                <div className="absolute -right-4 -top-4 opacity-10">
                                    <span className="material-symbols-outlined text-8xl">schedule</span>
                                </div>
                                <div className="flex justify-between items-start z-10">
                                    <span className="material-symbols-outlined p-2 bg-white/20 text-white rounded-lg">history_toggle_off</span>
                                    <span className="text-xs font-bold text-white/80 border border-white/20 px-2 py-1 rounded-full">Efficiency</span>
                                </div>
                                <div className="z-10">
                                    <p className="text-4xl font-extrabold text-white">16<span className="text-xl font-medium opacity-60">/24</span></p>
                                    <p className="text-sm font-medium text-white/90">Early Arrivals (9:00 AM)</p>
                                </div>
                            </div>
                        </section>

                        {/* Middle Section: Arrival Log & Staff */}
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            {/* Staff Directory (Quick List) */}
                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <h3 className="text-xl font-bold text-on-surface">Staff On-Duty</h3>
                                    <button className="text-sm font-bold text-primary hover:underline">All Staff</button>
                                </div>
                                <div className="bg-surface-container-low p-4 rounded-2xl space-y-3">
                                    {/* Staff Item */}
                                    <div className="bg-surface-container-lowest p-3 rounded-xl flex items-center gap-3 shadow-sm">
                                        <div className="w-10 h-10 rounded-full overflow-hidden">
                                            <img 
                                                alt="Staff Portrait" 
                                                className="w-full h-full object-cover" 
                                                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAZTlE7bFpbAYa_MB3lwRXlKfam6eXMTozEATVB3UUtNwBLBqiq13XqauhtGtA0u8JIYrDHY0Gf2iTzlzKywIH2AgjEYqTsZfgsXf5S4tlJNpScbqpjox3lBlBLQM9S7m9kG8S9zlXvYdLHsY2EXY7P0OWMphni9cfi9KKeoymJGrmq3yle7R58TIgLr-os2SA7fv6ZfueaPgnFOy-3sE6WeNbxZQObm_1tOf75G9rbI4lM-YC_Jzeon9qFCBzm4CJhdic7YTXVnuU" 
                                            />
                                        </div>
                                        <div className="flex-1">
                                            <p className="text-sm font-bold text-on-surface leading-none">Marcus Reeves</p>
                                            <p className="text-[11px] text-on-surface-variant font-medium">Driver • BUS-702</p>
                                        </div>
                                        <span className="px-2 py-1 bg-emerald-100 text-emerald-700 text-[10px] font-bold rounded-full">ACTIVE</span>
                                    </div>
                                    {/* Staff Item */}
                                    <div className="bg-surface-container-lowest p-3 rounded-xl flex items-center gap-3 shadow-sm">
                                        <div className="w-10 h-10 rounded-full overflow-hidden">
                                            <img 
                                                alt="Staff Portrait" 
                                                className="w-full h-full object-cover" 
                                                src="https://lh3.googleusercontent.com/aida-public/AB6AXuACrha3-cuu2XyBkAtcwt6NFXoA3pyTeuVlJRx4FjMA1Bi1zKAWF1QWohC2O2mgPiMbYZpG1wLd2yF-b-VO04paMsVmKrelUEdr5hp0jfiGy2NTs2IdKtkM0r1KXkTDW_Slrk8t9ypuQCQ8jS91A5RuAgLFepkT-ZafguPgbyRvjPbhBagDTYhxzgqwHQEJt3GjjLCDi8BurCq8j8hn7argUk9Tp70v4mx01L3N5SOjLWSFX77U2t9GD1ZQ1myzbrFu83r-lIuaHUk" 
                                            />
                                        </div>
                                        <div className="flex-1">
                                            <p className="text-sm font-bold text-on-surface leading-none">Sarah Chen</p>
                                            <p className="text-[11px] text-on-surface-variant font-medium">Cleaner • BUS-702</p>
                                        </div>
                                        <span className="px-2 py-1 bg-emerald-100 text-emerald-700 text-[10px] font-bold rounded-full">ACTIVE</span>
                                    </div>
                                    {/* Staff Item */}
                                    <div className="bg-surface-container-lowest p-3 rounded-xl flex items-center gap-3 shadow-sm opacity-60">
                                        <div className="w-10 h-10 rounded-full overflow-hidden grayscale">
                                            <img 
                                                alt="Staff Portrait" 
                                                className="w-full h-full object-cover" 
                                                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDvU36Aiakn-36F8pvBxomrka21QkcCmim3ov3_i0MqU4xKc27x53Hh_i2Y6oHymBiGVMP7xE6A0ahDtNkEo4I2GjXJlIsf3AyVWxe9c_kI3q1OKIvC0nZCfrnfmH9S_5O7RocWBZ2TKutbIYnRy3JtWRfybW5Wdgx4NcwhZI83nDGq_4MuIhd1JDyCPWWAZ-BcYM_tEI0TEIC0MrjEBLs_buDFe2bKPOzNBResZq5BNU9fY1FbAB548pVeREgwoCjmNO6-qBlV52M" 
                                            />
                                        </div>
                                        <div className="flex-1">
                                            <p className="text-sm font-bold text-on-surface leading-none">David Miller</p>
                                            <p className="text-[11px] text-on-surface-variant font-medium">Driver • BUS-205</p>
                                        </div>
                                        <span className="px-2 py-1 bg-secondary-container text-secondary text-[10px] font-bold rounded-full">OFF-DUTY</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>

            {/* Bottom Navigation */}
            <nav className="fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-4 pb-6 pt-3 bg-white/80 backdrop-blur-lg shadow-[0_-10px_40px_rgba(0,0,0,0.03)] rounded-t-[24px]">
                <Link className="flex flex-col items-center justify-center bg-blue-50 text-blue-700 rounded-xl px-5 py-2 active:scale-90 duration-200" to="/transport/dashboard">
                    <span className="material-symbols-outlined mb-1" style={{ fontVariationSettings: "'FILL' 1" }}>directions_bus</span>
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
                <Link className="flex flex-col items-center justify-center text-slate-400 px-5 py-2 hover:text-blue-500 transition-all active:scale-90 duration-200" to="/transport/profile">
                    <span className="material-symbols-outlined mb-1">account_circle</span>
                    <span className="font-inter text-[11px] font-semibold uppercase tracking-wider">Profile</span>
                </Link>
            </nav>

            {/* Contextual Floating Action Button */}
            <div className="fixed bottom-24 right-6 md:bottom-10 md:right-10 z-40">
                <button className="w-14 h-14 bg-primary text-white rounded-full shadow-2xl flex items-center justify-center hover:scale-110 active:scale-95 transition-transform">
                    <span className="material-symbols-outlined text-2xl">add_location</span>
                </button>
            </div>
        </div>
    );
};

export default TransportDashboard;
