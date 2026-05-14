import { useNavigate, useLocation } from 'react-router-dom';

const roles = [
    {
        key: 'STAFF',
        label: 'STAFF',
        icon: 'supervisor_account',
        iconBg: 'bg-primary-container',
        iconColor: 'text-on-primary-container',
        description: 'Manage administration, curriculum, and institutional analytics.',
    },
    {
        key: 'STUDENT',
        label: 'STUDENT',
        icon: 'person',
        iconBg: 'bg-tertiary-container',
        iconColor: 'text-on-tertiary-container',
        description: 'Access your learning hub, track progress, and submit feedback.',
    },
    {
        key: 'GUARDIAN',
        label: 'GUARDIAN',
        icon: 'family_restroom',
        iconBg: 'bg-surface-container-high',
        iconColor: 'text-on-surface-variant',
        description: "Monitor your student's attendance, grades, and campus updates.",
    },
    {
        key: 'TRANSPORT',
        label: 'TRANSPORT',
        icon: 'directions_bus',
        iconBg: 'bg-blue-100',
        iconColor: 'text-blue-700',
        description: 'Manage fleet, tracking, and route logistics for the campus.',
    },
];

const RoleSelectionPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const institution = location.state?.institution;

    const handleRoleSelect = (role) => {
        navigate('/login-credentials', { state: { institution, role } });
    };

    return (
        <div
            className="bg-background font-body text-on-background flex flex-col overflow-hidden"
            style={{ minHeight: 'max(884px, 100dvh)' }}
        >
            {/* Ambient blobs */}
            <div className="fixed top-0 left-0 w-full h-full pointer-events-none -z-10">
                <div className="absolute -top-24 -left-24 w-64 h-64 bg-primary/5 rounded-full blur-3xl"></div>
                <div className="absolute top-1/2 -right-24 w-72 h-72 bg-tertiary/5 rounded-full blur-3xl"></div>
            </div>

            {/* Dotted background pattern */}
            <div
                className="fixed inset-0 -z-10"
                style={{
                    backgroundImage: 'radial-gradient(circle at 2px 2px, #e8eff3 1px, transparent 0)',
                    backgroundSize: '24px 24px',
                }}
            ></div>

            {/* Header */}
            <header className="sticky top-0 z-50 bg-white/70 backdrop-blur-md shadow-sm flex items-center justify-between px-6 py-4 w-full">
                <div className="flex items-center gap-2">
                    <span
                        className="material-symbols-outlined text-blue-700"
                        style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                        school
                    </span>
                    <span className="font-headline font-extrabold text-blue-700 tracking-tighter text-xl">
                        EduTrack
                    </span>
                </div>
                <button
                    onClick={() => navigate('/')}
                    className="p-2 rounded-full hover:bg-slate-50 transition-colors active:scale-95 duration-200"
                >
                    <span className="material-symbols-outlined text-blue-600">arrow_back</span>
                </button>
            </header>

            <main className="flex-1 flex flex-col items-center justify-start pt-8 px-6 overflow-y-auto pb-12">
                {/* Title */}
                <div className="w-full max-w-sm flex flex-col items-center text-center space-y-2 mb-8">
                    {institution && (
                        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary-container text-on-primary-container text-[10px] font-bold uppercase tracking-widest mb-2">
                            <span
                                className="material-symbols-outlined text-sm"
                                style={{ fontVariationSettings: "'FILL' 1" }}
                            >
                                account_balance
                            </span>
                            {institution.name}
                        </div>
                    )}
                    <h1 className="font-headline font-extrabold text-3xl tracking-tight text-on-background">
                        Choose Your <span className="text-primary">Portal</span>
                    </h1>
                    <p className="text-on-surface-variant text-sm max-w-[280px]">
                        Select your role to access dashboards, track academic progress, and monitor daily attendance.
                    </p>
                </div>

                {/* Role Cards */}
                <div className="flex flex-col gap-4 w-full max-w-md">
                    {roles.map((role) => (
                        <div
                            key={role.key}
                            onClick={() => handleRoleSelect(role.key)}
                            className="bg-surface-container-lowest rounded-2xl p-5 flex items-start gap-4 shadow-sm hover:shadow-md hover:bg-surface-container-low transition-all cursor-pointer group active:scale-[0.98]"
                        >
                            <div
                                className={`w-12 h-12 shrink-0 ${role.iconBg} ${role.iconColor} rounded-xl flex items-center justify-center`}
                            >
                                <span
                                    className="material-symbols-outlined text-2xl"
                                    style={{ fontVariationSettings: "'FILL' 1" }}
                                >
                                    {role.icon}
                                </span>
                            </div>
                            <div className="flex-1">
                                <div className="flex items-center justify-between mb-1">
                                    <h3 className="font-headline font-bold text-lg text-on-background">
                                        {role.label}
                                    </h3>
                                    <span className="material-symbols-outlined text-primary text-xl opacity-0 group-hover:opacity-100 transition-opacity">
                                        chevron_right
                                    </span>
                                </div>
                                <p className="text-xs text-on-surface-variant leading-relaxed">
                                    {role.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Footer note */}
                <div className="mt-8 flex flex-col items-center gap-4 w-full max-w-md">
                    <div className="h-1 w-12 bg-surface-container-highest rounded-full"></div>
                    <p className="text-xs text-on-surface-variant font-medium">
                        New to EduTrack?{' '}
                        <button
                            onClick={() => navigate('/signup', { state: { institution, from: 'role' } })}
                            className="text-primary font-bold hover:underline"
                        >
                            Register Institution
                        </button>
                    </p>
                </div>

                {/* Trust badge */}
                <footer className="w-full max-w-md mx-auto px-6 py-8 flex flex-col items-center text-center gap-6 border-t border-surface-container-highest mt-4">
                    <div className="flex items-center gap-2 text-on-surface-variant bg-surface-container-low px-3 py-1.5 rounded-full border border-outline-variant/30">
                        <span
                            className="material-symbols-outlined text-sm"
                            style={{ fontVariationSettings: "'FILL' 1" }}
                        >
                            lock
                        </span>
                        <span className="font-label text-[10px] font-semibold uppercase tracking-wider">
                            Secure 256-bit SSL Encryption
                        </span>
                    </div>
                    <p className="font-body text-[11px] text-on-surface-variant font-medium">
                        © 2024 EduTrack Institutional Systems. All rights reserved.
                    </p>
                </footer>
            </main>
        </div>
    );
};

export default RoleSelectionPage;
