import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getInstitutionsRequest } from '../store/actions/institutionActions';

const InstitutionSelection = () => {
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedId, setSelectedId] = useState(null);

    const dispatch = useDispatch();
    const { list: institutions, isLoading, error } = useSelector((state) => state.institutions);

    useEffect(() => {
        if (institutions.length === 0) {
            dispatch(getInstitutionsRequest());
        }
    }, [dispatch, institutions.length]);

    const handleContinue = () => {
        if (selectedId) {
            const selected = institutions.find(i => i.id === selectedId);
            navigate('/login-credentials', { state: { institution: selected } });
        }
    };

    return (
        <div className="bg-background h-[100dvh] flex flex-col items-center overflow-hidden">
            {/* Header Section */}
            <div className="w-full max-w-2xl px-6 pt-12 pb-8 bg-background relative z-0 flex-shrink-0">
                <header className="flex items-center mb-8">
                    <h1 className="text-[32px] font-extrabold leading-[1.1] tracking-tight text-on-surface">Find Your Institution</h1>
                </header>
                <div className="max-w-sm">
                    <p className="text-secondary text-base leading-relaxed">Search and select your school or university to continue to your dashboard.</p>
                </div>
            </div>

            {/* Selection Section */}
            <div className="flex-1 w-full max-w-2xl bg-surface-container-lowest rounded-t-[40px] shadow-[0px_-10px_40px_rgba(42,52,57,0.12)] relative z-10 flex flex-col mt-4 border-x border-t border-surface-container-high md:rounded-[40px] md:mb-12 md:max-h-[70vh] min-h-0">
                <div className="w-full flex justify-center pt-4 pb-2">
                    <div className="w-12 h-1.5 bg-surface-variant rounded-full opacity-60"></div>
                </div>

                <div className="px-6 py-6 md:px-10">
                    <div className="relative group">
                        <div className="flex items-center bg-surface-container-low rounded-2xl px-5 py-2 transition-all focus-within:bg-white focus-within:ring-2 focus-within:ring-primary/10 border border-transparent focus-within:border-primary/20 shadow-sm">
                            <span className="material-symbols-outlined text-outline" style={{ fontVariationSettings: "'wght' 300" }}>search</span>
                            <input 
                                className="w-full bg-transparent border-none focus:ring-0 text-on-surface placeholder:text-outline py-4 pl-3 font-body text-base outline-none" 
                                placeholder="Search school, college or university" 
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto px-6 md:px-10 pb-6 no-scrollbar min-h-0">
                    <div className="space-y-4 mt-2">
                        {isLoading ? (
                            <div className="flex flex-col items-center justify-center py-20 space-y-4 opacity-60">
                                <div className="w-10 h-10 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
                                <p className="font-bold text-xs uppercase tracking-widest text-outline">Fetching Institutes</p>
                            </div>
                        ) : error ? (
                            <div className="p-8 text-center bg-error-container/10 rounded-[24px] border border-error/20">
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
                        ) : institutions.length === 0 ? (
                            <div className="py-20 text-center opacity-60">
                                <span className="material-symbols-outlined text-[48px] mb-4 text-outline">search_off</span>
                                <p className="font-bold text-on-surface">No institutions found</p>
                            </div>
                        ) : (
                            institutions
                                .filter(inst => inst.name.toLowerCase().includes(searchQuery.toLowerCase()))
                                .map((inst) => (
                                    <div 
                                        key={inst.id}
                                        onClick={() => setSelectedId(inst.id)}
                                        className={`flex items-center gap-4 p-5 rounded-2xl border transition-all duration-300 cursor-pointer ${
                                            selectedId === inst.id 
                                            ? 'bg-primary-container/40 border-primary/30 shadow-md ring-1 ring-primary/20' 
                                            : 'bg-surface-container-lowest border-surface-container-high hover:bg-surface-container-low/50 shadow-sm hover:shadow-md'
                                        }`}
                                    >
                                        <div className="size-14 rounded-xl bg-surface-container overflow-hidden flex-shrink-0 border border-surface-container-high flex items-center justify-center">
                                            {inst.logo ? (
                                                <img alt={inst.name} className="w-full h-full object-cover" src={inst.logo} />
                                            ) : (
                                                <span className="material-symbols-outlined text-outline text-[28px]">account_balance</span>
                                            )}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className={`font-bold text-[16px] truncate ${selectedId === inst.id ? 'text-on-primary-container' : 'text-on-surface'}`}>
                                                {inst.name}
                                            </p>
                                            <p className={`text-[13px] truncate ${selectedId === inst.id ? 'text-on-primary-container/70' : 'text-secondary'}`}>
                                                {inst.location || "Academic Institution"}
                                            </p>
                                        </div>
                                        <span className={`material-symbols-outlined ${selectedId === inst.id ? 'text-primary' : 'text-outline-variant'}`}>
                                            {selectedId === inst.id ? 'check_circle' : 'chevron_right'}
                                        </span>
                                    </div>
                                ))
                        )}

                        <div className="pt-10 pb-6 text-center">
                            <p className="text-secondary text-[11px] uppercase tracking-widest font-bold mb-3">Can't find your institution?</p>
                            <button className="inline-flex items-center gap-2 text-primary font-bold text-sm hover:underline decoration-2 underline-offset-4 active:scale-95 transition-transform">
                                Contact your administrator
                                <span className="material-symbols-outlined text-[16px]">open_in_new</span>
                            </button>
                        </div>
                    </div>
                </div>

                <div className="w-full p-8 bg-surface-container-lowest border-t border-surface-container-high md:rounded-b-[40px] z-50 flex-shrink-0">
                    <button 
                        disabled={!selectedId}
                        onClick={handleContinue}
                        className={`w-full py-5 rounded-[24px] font-bold text-lg transition-all shadow-xl active:scale-[0.98] ${
                            selectedId 
                            ? 'bg-primary text-on-primary shadow-primary/25 hover:shadow-primary/40 hover:bg-primary-dim' 
                            : 'bg-surface-container-high text-on-surface/40 cursor-not-allowed shadow-none'
                        }`}
                    >
                        Continue
                    </button>
                </div>
            </div>
        </div>
    );
};

export default InstitutionSelection;
