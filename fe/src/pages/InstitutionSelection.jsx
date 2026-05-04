import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getInstitutionsRequest } from '../store/actions/institutionActions';

const InstitutionSelection = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedId, setSelectedId] = useState(null);

    const { list: institutions, isLoading, error } = useSelector((state) => state.institutions);

    useEffect(() => {
        if (institutions.length === 0) {
            dispatch(getInstitutionsRequest());
        }
    }, [dispatch, institutions.length]);

    const handleContinue = () => {
        if (selectedId) {
            const selected = institutions.find(i => i.id === selectedId);
            navigate('/select-role', { state: { institution: selected } });
        }
    };

    const filteredInstitutions = institutions.filter(inst => 
        inst.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="bg-surface text-on-surface selection:bg-primary-container selection:text-on-primary-container min-h-screen relative overflow-x-hidden">
            <style dangerouslySetInnerHTML={{ __html: `
                @keyframes float {
                    0% { transform: translateY(0px) rotate(0deg); }
                    50% { transform: translateY(-20px) rotate(5deg); }
                    100% { transform: translateY(0px) rotate(0deg); }
                }
                .animate-float {
                    animation: float 8s ease-in-out infinite;
                }
                .animate-float-delayed {
                    animation: float 10s ease-in-out infinite 2s;
                }
                .animate-float-slow {
                    animation: float 12s ease-in-out infinite 1s;
                }
                .premium-gradient {
                    background: linear-gradient(135deg, #3755c3 0%, #2848b7 100%);
                }
                .glass-header {
                    background: rgba(247, 249, 251, 0.7);
                    backdrop-filter: blur(20px);
                }
                .no-scrollbar::-webkit-scrollbar {
                    display: none;
                }
                .no-scrollbar {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                }
            `}} />

            {/* Animated Background Decorations - Improved visibility with z-index */}
            <div aria-hidden="true" className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
                <div className="absolute top-1/4 left-[10%] opacity-[0.08] text-primary animate-float">
                    <span className="material-symbols-outlined !text-[60px] md:!text-[120px]">school</span>
                </div>
                <div className="absolute top-1/2 right-[5%] opacity-[0.1] text-primary animate-float-delayed">
                    <span className="material-symbols-outlined !text-[50px] md:!text-[100px]">menu_book</span>
                </div>
                <div className="absolute bottom-[10%] left-[15%] opacity-[0.08] text-primary animate-float-slow">
                    <span className="material-symbols-outlined !text-[70px] md:!text-[150px]">apartment</span>
                </div>
                <div className="absolute top-1/3 right-[20%] opacity-[0.06] text-primary animate-float-slow">
                    <span className="material-symbols-outlined !text-[40px] md:!text-[80px]">history_edu</span>
                </div>
                <div className="absolute bottom-1/4 right-[15%] opacity-[0.05] text-primary animate-float hidden md:block">
                    <span className="material-symbols-outlined !text-[110px]">laptop_mac</span>
                </div>
                <div className="absolute top-2/3 left-[5%] opacity-[0.07] text-primary animate-float-delayed hidden md:block">
                    <span className="material-symbols-outlined !text-[90px]">backpack</span>
                </div>
            </div>

            {/* TopAppBar */}
            <header className="fixed top-0 left-0 w-full z-50 flex items-center justify-between px-6 h-16 glass-header">
                <div className="flex items-center gap-4"></div>
                <div className="absolute left-1/2 -translate-x-1/2 text-center">
                    <h1 className="font-headline font-extrabold text-primary text-lg tracking-tight">Academic Atelier</h1>
                </div>
                <div className="flex items-center">
                    <div className="w-8 h-8 rounded-full bg-primary-container flex items-center justify-center overflow-hidden">
                        <span className="material-symbols-outlined text-primary !text-[24px]">school</span>
                    </div>
                </div>
            </header>

            {/* Main Content Canvas */}
            <main className="relative z-10 pt-24 pb-32 px-4 max-w-4xl mx-auto min-h-screen flex flex-col items-center">
                {/* Hero Search Section */}
                <div className="w-full text-center mb-12 space-y-4">
                    <h2 className="text-4xl md:text-5xl font-headline font-extrabold text-on-surface tracking-tight">Find Your Institution</h2>
                    <p className="text-on-surface-variant text-lg max-w-lg mx-auto leading-relaxed">Search and select your school or university to securely access your academic portal.</p>
                </div>

                {/* Search Input - Focus Plate Style */}
                <div className="w-full max-w-2xl mb-12">
                    <div className="relative group">
                        <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none">
                            <span className="material-symbols-outlined text-outline">search</span>
                        </div>
                        <input 
                            className="w-full h-16 pl-14 pr-6 bg-surface-container-high border-none rounded-2xl text-lg focus:ring-2 focus:ring-primary focus:bg-surface-container-lowest transition-all duration-300 shadow-sm placeholder:text-outline outline-none" 
                            placeholder="Enter your institution's name..." 
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                </div>

                {/* Suggested Matches - Only show when user enters something */}
                {searchQuery.trim().length > 0 && (
                    <div className="w-full space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <div className="flex items-center justify-between">
                            <h3 className="text-xs font-bold uppercase tracking-widest text-on-surface-variant">
                                Search Results
                            </h3>
                            <span className="h-px flex-1 ml-6 bg-surface-container-highest"></span>
                        </div>

                        {isLoading ? (
                            <div className="flex flex-col items-center justify-center py-20 space-y-4 opacity-60">
                                <div className="w-10 h-10 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
                                <p className="font-bold text-xs uppercase tracking-widest text-outline">Fetching Institutes</p>
                            </div>
                        ) : error ? (
                            <div className="w-full p-8 text-center bg-error-container/10 rounded-2xl border border-error/20">
                                <span className="material-symbols-outlined text-error text-[40px] mb-4">error_outline</span>
                                <p className="text-on-surface font-bold">Failed to load institutions</p>
                                <p className="text-secondary text-sm mt-2">{error}</p>
                                <button 
                                    onClick={() => dispatch(getInstitutionsRequest())}
                                    className="mt-6 text-primary font-bold text-sm hover:underline"
                                >
                                    Try again
                                </button>
                            </div>
                        ) : filteredInstitutions.length === 0 ? (
                            <div className="w-full py-20 text-center opacity-60">
                                <span className="material-symbols-outlined text-[48px] mb-4 text-outline">search_off</span>
                                <p className="font-bold text-on-surface">No institutions found</p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {filteredInstitutions.map((inst) => (
                                    <button 
                                        key={inst.id}
                                        onClick={() => setSelectedId(inst.id)}
                                        className={`flex items-center p-6 rounded-2xl text-left transition-all duration-300 group border-2 ${
                                            selectedId === inst.id 
                                            ? 'bg-surface-container-lowest border-primary shadow-[0_20px_40px_rgba(55,85,195,0.1)] scale-[1.02]' 
                                            : 'bg-surface-container-lowest border-transparent hover:shadow-[0_20px_40px_rgba(42,52,57,0.06)]'
                                        }`}
                                    >
                                        <div className={`w-14 h-14 rounded-xl flex items-center justify-center mr-5 transition-transform group-hover:scale-110 ${
                                            selectedId === inst.id ? 'bg-primary/10' : 'bg-surface-container-low'
                                        }`}>
                                            {inst.logo ? (
                                                <img alt={inst.name} className="w-10 h-10 object-contain" src={inst.logo} />
                                            ) : (
                                                <span className={`material-symbols-outlined ${selectedId === inst.id ? 'text-primary' : 'text-outline'} !text-[28px]`}>
                                                    account_balance
                                                </span>
                                            )}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <h4 className={`font-headline font-bold text-lg truncate ${selectedId === inst.id ? 'text-primary' : 'text-on-surface'}`}>
                                                {inst.name}
                                            </h4>
                                            <p className="text-sm text-on-surface-variant flex items-center gap-1 truncate">
                                                <span className="material-symbols-outlined text-[16px]">location_on</span>
                                                {inst.location || "Academic Institution"}
                                            </p>
                                        </div>
                                        <span className={`material-symbols-outlined transition-all ${
                                            selectedId === inst.id ? 'text-primary opacity-100' : 'text-outline-variant opacity-0 group-hover:opacity-100'
                                        }`}>
                                            {selectedId === inst.id ? 'check_circle' : 'chevron_right'}
                                        </span>
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                )}

                {/* Actions */}
                <div className="mt-16 w-full max-w-sm space-y-6 flex flex-col items-center">
                    <button 
                        onClick={handleContinue}
                        disabled={!selectedId}
                        className={`w-full py-4 rounded-xl font-bold text-lg transition-all active:scale-[0.98] ${
                            selectedId 
                            ? 'premium-gradient text-on-primary shadow-xl shadow-primary/20 hover:shadow-primary/40' 
                            : 'bg-surface-container-high text-on-surface/40 cursor-not-allowed shadow-none'
                        }`}
                    >
                        Continue
                    </button>
                    
                    {searchQuery.trim().length > 0 && filteredInstitutions.length > 4 && (
                        <button className="text-primary font-semibold hover:underline transition-all">
                            More Results
                        </button>
                    )}

                    <div className="pt-8 flex flex-col items-center">
                        <p className="text-on-surface-variant text-sm mb-2">Can't find your institution?</p>
                        <a 
                            className="inline-flex items-center gap-2 text-primary-dim font-bold text-sm bg-primary-container/30 px-4 py-2 rounded-full hover:bg-primary-container/50 transition-colors" 
                            href="mailto:support@edutrack.com"
                        >
                            <span className="material-symbols-outlined text-[18px]">support_agent</span>
                            Contact Support
                        </a>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default InstitutionSelection;
