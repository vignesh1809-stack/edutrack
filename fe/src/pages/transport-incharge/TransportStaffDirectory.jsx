import React, { useEffect, useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTransportStaffRequest, toggleStaffStatusRequest } from '../../store/actions/transportActions';

const TransportStaffDirectory = () => {
    const dispatch = useDispatch();
    const { staff } = useSelector(state => state.transport);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        dispatch(fetchTransportStaffRequest());
    }, [dispatch]);

    const handleToggleStatus = (id) => {
        dispatch(toggleStaffStatusRequest(id));
    };

    const filteredStaff = useMemo(() => {
        if (!staff.data) return [];
        return staff.data.filter(s => 
            (s.name || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
            (s.role || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
            (s.bus || '').toLowerCase().includes(searchQuery.toLowerCase())
        );
    }, [staff.data, searchQuery]);

    return (
        <div className="bg-surface text-on-surface font-body selection:bg-primary-container min-h-screen">
            {/* TopAppBar */}
            <header className="bg-white/70 backdrop-blur-xl sticky top-0 z-50 shadow-xl shadow-blue-900/5 flex items-center justify-between px-6 py-4 w-full">
                <div className="flex items-center gap-4">
                    <button className="text-blue-600 hover:bg-slate-50 transition-colors p-2 rounded-full scale-95 active:transition-all">
                        <span className="material-symbols-outlined">menu</span>
                    </button>
                    <h1 className="font-manrope font-bold text-2xl tracking-tight text-blue-700">Staff Directory</h1>
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
                <aside className="h-screen w-64 bg-slate-50 flex flex-col gap-2 p-4 pt-4 fixed left-0 hidden md:flex">
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
                        <Link className="flex items-center gap-3 px-4 py-3 text-slate-600 hover:text-blue-500 hover:bg-slate-200/50 rounded-lg transition-all" to="/transport/dashboard">
                            <span className="material-symbols-outlined">dashboard</span>
                            <span>Fleet Overview</span>
                        </Link>
                        <Link className="flex items-center gap-3 px-4 py-3 bg-white text-blue-600 font-bold shadow-sm rounded-lg translate-x-1 transition-transform" to="/transport/staff">
                            <span className="material-symbols-outlined">group</span>
                            <span>Staff Directory</span>
                        </Link>
                        <Link className="flex items-center gap-3 px-4 py-3 text-slate-600 hover:text-blue-500 hover:bg-slate-200/50 rounded-lg transition-all" to="/transport/routes">
                            <span className="material-symbols-outlined">map</span>
                            <span>Route Analytics</span>
                        </Link>
                        <Link className="flex items-center gap-3 px-4 py-3 text-slate-600 hover:text-blue-500 hover:bg-slate-200/50 rounded-lg transition-all" to="/transport/profile">
                            <span className="material-symbols-outlined">account_circle</span>
                            <span>Profile</span>
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

                <main className="flex-1 md:ml-64 p-6 bg-surface">
                {/* High-level Stat Card */}
                <section className="mb-10">
                    <div className="bg-surface-container-lowest rounded-[24px] p-8 flex flex-col md:flex-row justify-between items-center shadow-[0_20px_40px_rgba(42,52,57,0.06)] relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full -mr-20 -mt-20"></div>
                        <div className="relative z-10 flex flex-col md:flex-row items-center gap-6">
                            <div className="w-16 h-16 rounded-2xl bg-primary-container flex items-center justify-center">
                                <span className="material-symbols-outlined text-primary text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>group</span>
                            </div>
                            <div>
                                <h2 className="font-headline text-3xl font-extrabold text-on-surface tracking-tight">{staff.data?.length || 0} Staff Members</h2>
                                <Link 
                                    to="/transport/add-staff"
                                    className="mt-2 inline-flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-xl font-bold text-sm shadow-lg shadow-primary/20 hover:shadow-xl transition-all active:scale-95"
                                >
                                    <span className="material-symbols-outlined text-sm">person_add</span>
                                    Add Staff
                                </Link>
                            </div>
                        </div>
                        <div className="relative z-10 mt-6 md:mt-0 flex -space-x-3">
                            {staff.data?.slice(0, 4).map((s, idx) => (
                                <img key={idx} className="w-12 h-12 rounded-full border-4 border-white" alt={`Staff ${idx}`} src={s.img || `https://ui-avatars.com/api/?name=${s.name}&background=random`}/>
                            ))}
                            {staff.data?.length > 4 && (
                                <div className="w-12 h-12 rounded-full bg-surface-container-highest border-4 border-white flex items-center justify-center text-xs font-bold text-on-surface-variant">+{staff.data.length - 4}</div>
                            )}
                        </div>
                    </div>
                </section>

                {/* Search & Filter Bar */}
                <section className="mb-8 flex flex-col md:flex-row gap-4">
                    <div className="flex-grow relative">
                        <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant">search</span>
                        <input 
                            className="w-full pl-12 pr-4 py-4 bg-surface-container-high rounded-xl border-none focus:ring-2 focus:ring-primary focus:bg-surface-container-lowest transition-all placeholder:text-on-surface-variant/60 font-medium" 
                            placeholder="Search staff by name, role or bus ID..." 
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                    <button className="bg-surface-container-lowest text-on-surface px-6 py-4 rounded-xl font-bold flex items-center justify-center gap-3 hover:bg-slate-50 transition-colors shadow-sm">
                        <span className="material-symbols-outlined">tune</span>
                        Filter
                    </button>
                </section>

                {/* Staff Cards Grid */}
                {staff.loading ? (
                    <div className="flex justify-center p-8">
                        <span className="text-primary font-semibold">Loading Staff Directory...</span>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredStaff.map((s) => (
                            <div key={s.id} className={`bg-surface-container-lowest rounded-2xl p-5 shadow-sm hover:shadow-md transition-all group ${!s.active ? 'opacity-60 grayscale-[0.8]' : ''}`}>
                                <div className="flex items-start justify-between mb-4">
                                    <div className="flex gap-4">
                                        <div className="relative">
                                            <img alt={s.name} className="w-14 h-14 rounded-xl object-cover" src={s.img || `https://ui-avatars.com/api/?name=${s.name}&background=random`}/>
                                        </div>
                                        <div>
                                            <h3 className="font-headline font-bold text-lg text-on-surface">{s.name}</h3>
                                            <p className="text-on-surface-variant text-sm font-medium capitalize">{s.role.toLowerCase()}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className={`text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-tighter ${s.active ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-500'}`}>
                                            {s.active ? 'ACTIVE' : 'INACTIVE'}
                                        </span>
                                        <label className="relative inline-block w-[32px] h-[18px]">
                                            <input 
                                                checked={s.active} 
                                                onChange={() => handleToggleStatus(s.id)} 
                                                type="checkbox"
                                                className="sr-only peer"
                                            />
                                            <div className="w-8 h-4 bg-slate-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-3 after:w-3 after:transition-all peer-checked:bg-green-500 cursor-pointer"></div>
                                        </label>
                                    </div>
                                </div>
                                <div className="bg-surface-container-low rounded-lg p-3 flex justify-between items-center">
                                    <div className="flex items-center gap-2">
                                        <span className="material-symbols-outlined text-on-surface-variant text-sm">directions_bus</span>
                                        <span className="text-xs font-bold text-on-surface uppercase tracking-wider">{s.bus}</span>
                                    </div>
                                    <span className="text-[10px] font-semibold text-on-tertiary-container bg-tertiary-container px-2 py-0.5 rounded">{s.route}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </main>
        </div>

            {/* BottomNavBar */}
            <nav className="fixed bottom-0 left-0 w-full z-50 flex md:hidden justify-around items-center px-4 pb-6 pt-3 bg-white/80 backdrop-blur-lg shadow-[0_-10px_40px_rgba(0,0,0,0.03)] rounded-t-[24px]">
                <Link className="flex flex-col items-center justify-center text-slate-400 px-5 py-2 hover:text-blue-500 transition-all active:scale-90 duration-200" to="/transport/dashboard">
                    <span className="material-symbols-outlined mb-1">directions_bus</span>
                    <span className="font-inter text-[11px] font-semibold uppercase tracking-wider">Fleet</span>
                </Link>
                <Link className="flex flex-col items-center justify-center bg-blue-50 text-blue-700 rounded-xl px-5 py-2 active:scale-90 duration-200" to="/transport/staff">
                    <span className="material-symbols-outlined mb-1" style={{ fontVariationSettings: "'FILL' 1" }}>group</span>
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
        </div>
    );
};

export default TransportStaffDirectory;
