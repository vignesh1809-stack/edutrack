import React, { useState, useEffect, useRef } from 'react';

const ProfessionalDropdown = ({
    value,
    onChange,
    options = [], // Can be array of strings or array of objects { id, name }
    labelPrefix = '',
    placeholder = 'Select Option',
    defaultValue = 'ALL',
    defaultLabel = 'All Options',
    className = ''
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef(null);

    // Close dropdown on click outside
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (containerRef.current && !containerRef.current.contains(e.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('click', handleClickOutside);
        return () => document.removeEventListener('click', handleClickOutside);
    }, []);

    const handleSelect = (optionValue) => {
        onChange(optionValue);
        setIsOpen(false);
    };

    // Helper to format options to standard { id, name } objects
    const normalizedOptions = options.map(opt => {
        if (typeof opt === 'object' && opt !== null) {
            return {
                id: opt.id || opt.value || '',
                name: opt.name || opt.label || ''
            };
        }
        return {
            id: opt,
            name: opt
        };
    });

    const activeOption = normalizedOptions.find(opt => opt.id === value);
    
    // Determine the button display label
    let displayLabel = placeholder;
    if (activeOption) {
        if (activeOption.id === defaultValue) {
            displayLabel = labelPrefix ? `${labelPrefix} ALL` : defaultLabel;
        } else {
            displayLabel = labelPrefix ? `${labelPrefix} ${activeOption.name}` : activeOption.name;
        }
    } else if (value === defaultValue) {
        displayLabel = labelPrefix ? `${labelPrefix} ALL` : defaultLabel;
    }

    return (
        <div className={`relative ${className}`} ref={containerRef}>
            <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center justify-between w-full gap-3 px-4 py-3 bg-slate-50 border-none text-slate-900 rounded-xl hover:bg-slate-100 transition-all active:scale-95 shadow-sm"
            >
                <span className="text-[13px] font-black uppercase tracking-wider whitespace-nowrap">
                    {displayLabel}
                </span>
                <span className={`material-symbols-outlined text-[18px] text-slate-400 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
                    expand_more
                </span>
            </button>

            {isOpen && (
                <div
                    className="absolute top-full left-0 right-0 mt-2 max-h-60 overflow-y-auto bg-white border border-slate-100 rounded-xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.1)] py-2 z-50 animate-in fade-in zoom-in-95 duration-200"
                >
                    <button
                        type="button"
                        onClick={() => handleSelect(defaultValue)}
                        className={`w-full flex items-center justify-between px-5 py-3 text-sm transition-colors ${
                            value === defaultValue
                                ? 'bg-primary/5 text-primary font-bold'
                                : 'text-slate-600 hover:bg-slate-50'
                        }`}
                    >
                        <span className="uppercase font-bold tracking-tight">{defaultLabel}</span>
                        {value === defaultValue && <span className="material-symbols-outlined text-sm">check</span>}
                    </button>
                    {normalizedOptions.filter(opt => opt.id !== defaultValue).map((opt) => (
                        <button
                            type="button"
                            key={opt.id}
                            onClick={() => handleSelect(opt.id)}
                            className={`w-full flex items-center justify-between px-5 py-3 text-sm transition-colors ${
                                value === opt.id
                                    ? 'bg-primary/5 text-primary font-bold'
                                    : 'text-slate-600 hover:bg-slate-50'
                            }`}
                        >
                            <span className="uppercase font-bold tracking-tight">{opt.name}</span>
                            {value === opt.id && <span className="material-symbols-outlined text-sm">check</span>}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ProfessionalDropdown;
