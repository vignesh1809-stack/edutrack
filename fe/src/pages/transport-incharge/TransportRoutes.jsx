import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTransportRoutesRequest } from '../../store/actions/transportActions';

const TransportRoutes = () => {
    const dispatch = useDispatch();
    const { routes } = useSelector(state => state.transport);

    useEffect(() => {
        dispatch(fetchTransportRoutesRequest());
    }, [dispatch]);

    return (
        <div className="bg-background text-on-surface font-body min-h-screen pb-24">
            {/* TopAppBar */}
            <header className="bg-white/70 backdrop-blur-xl sticky top-0 z-50 shadow-xl shadow-blue-900/5 flex items-center justify-between px-6 py-4 w-full">
                <div className="flex items-center gap-4">
                    <button className="text-blue-600 hover:bg-slate-50 transition-colors p-2 rounded-full scale-95 active:transition-all">
                        <span className="material-symbols-outlined">menu</span>
                    </button>
                    <h1 className="font-manrope font-bold text-2xl tracking-tight text-blue-700">Routes Management</h1>
                </div>
                <div className="flex items-center gap-3">
                    <div className="hidden md:block text-right">
                        <p className="text-xs font-bold text-on-surface-variant uppercase tracking-widest">Transport Incharge</p>
                        <p className="text-sm font-semibold text-primary">EduTrack Horizon</p>
                    </div>
                    <img alt="Transport Incharge Profile" className="w-10 h-10 rounded-full object-cover border-2 border-primary-container" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBGPYYUTUz5nB0USckUAp9u3775SMplcJBPJvEFzFBgd7zRh0ZSaC9YVzfQ1pHDdwX7rW-X-3qUj7EZ0C4ctNqYBrFRcn1wQivgE19AhIC9wORUC5h_SZFL6HvDOx87V7jJnVe6_bjb-zJSqb0HzPV6RGUGf7EsKqnH-rPFhQKqqSCQi5Ladm2fZaYHLWx6jZziHfYWP4PTxTLyCvyYdoh8W31H4lRN_cdkzjnpcy48kx0enMDD_3MemoUaQyi2atbNgVjIeMeC5ls"/>
                </div>
            </header>

            <div className="flex min-h-screen pt-16">
                {/* Sidebar (Desktop) */}
                <aside className="h-screen w-64 bg-slate-50 flex flex-col gap-2 p-4 pt-4 fixed left-0 hidden md:flex border-r border-surface-container">
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
                        <Link className="flex items-center gap-3 px-4 py-3 text-slate-600 hover:text-blue-500 hover:bg-slate-200/50 rounded-lg transition-all" to="/transport/staff">
                            <span className="material-symbols-outlined">group</span>
                            <span>Staff Directory</span>
                        </Link>
                        <Link className="flex items-center gap-3 px-4 py-3 bg-white text-blue-600 font-bold shadow-sm rounded-lg translate-x-1 transition-transform" to="/transport/routes">
                            <span className="material-symbols-outlined">map</span>
                            <span>Routes Management</span>
                        </Link>
                        <Link className="flex items-center gap-3 px-4 py-3 text-slate-600 hover:text-blue-500 hover:bg-slate-200/50 rounded-lg transition-all" to="/transport/profile">
                            <span className="material-symbols-outlined">account_circle</span>
                            <span>Profile</span>
                        </Link>
                    </nav>
                </aside>

                <main className="flex-1 md:ml-64 p-4 space-y-6">
                    <section className="space-y-4">
                        <div className="flex items-center justify-between px-2">
                            <h2 className="font-headline font-bold text-on-surface text-xl">Active Bus Routes</h2>
                            <button className="text-primary text-sm font-bold flex items-center gap-1">
                                <span className="material-symbols-outlined text-lg">filter_list</span>
                                Filter
                            </button>
                        </div>
                        {routes.loading ? (
                            <div className="flex justify-center p-8">
                                <span className="text-primary font-semibold">Loading Routes...</span>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                                {routes.data?.map((route) => (
                                    <div key={route.id} className="bg-surface-container-lowest rounded-[24px] p-5 shadow-[0px_10px_30px_rgba(42,52,57,0.04)] border border-surface-container hover:shadow-md transition-shadow">
                                        <div className="flex justify-between items-start mb-3">
                                            <div className="flex items-center gap-3">
                                                <div className="w-12 h-12 rounded-2xl bg-primary-container/30 flex items-center justify-center text-primary">
                                                    <span className="material-symbols-outlined text-3xl">directions_bus</span>
                                                </div>
                                                <div className="space-y-0.5">
                                                    <p className="text-[10px] font-bold text-primary tracking-widest uppercase">Route ID</p>
                                                    <h3 className="font-headline font-bold text-lg text-on-surface">{route.routeName}</h3>
                                                </div>
                                            </div>
                                            <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-100 text-emerald-700`}>
                                                ACTIVE
                                            </span>
                                        </div>
                                        <div className="p-4 bg-surface-container-low rounded-2xl space-y-2">
                                            <div className="flex items-center gap-2 text-on-surface-variant">
                                                <span className="material-symbols-outlined text-sm">route</span>
                                                <p className="text-xs font-medium">Path Summary</p>
                                            </div>
                                            <p className="text-sm text-on-surface leading-relaxed">{route.pathSummary}</p>
                                        </div>
                                        <div className="flex items-center justify-between pt-2">
                                            <div className="flex items-center gap-2">
                                                <span className="material-symbols-outlined text-base text-on-surface-variant">person</span>
                                                <span className="text-xs text-on-surface-variant">Assigned Driver</span>
                                            </div>
                                            <button className="text-primary font-bold text-sm flex items-center gap-1 hover:underline">
                                                Details
                                                <span className="material-symbols-outlined text-sm">chevron_right</span>
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </section>
                </main>
            </div>

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
                <Link className="flex flex-col items-center justify-center bg-blue-50 text-blue-700 rounded-xl px-5 py-2 active:scale-90 duration-200" to="/transport/routes">
                    <span className="material-symbols-outlined mb-1" style={{ fontVariationSettings: "'FILL' 1" }}>map</span>
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

export default TransportRoutes;
