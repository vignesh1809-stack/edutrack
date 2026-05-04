import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const TransportStaffDirectory = () => {
    const [staffMembers, setStaffMembers] = useState([
        {
            id: 1,
            name: 'Robert Fox',
            role: 'Driver',
            bus: 'BUS-702',
            route: 'North Route',
            active: true,
            img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAT6NMes4PnMrns4A5qBG1IPPVz4hH2r1ZPC0QcUXlB-pgzASpm-zaJLyjVoNrWKP48o9GlC1sHkVULDWX9YhcMWgHhtJu-JsHj1mOrg7giiryb_7DWDlzcVNF7gNV1GloIoxcJ05769K9x9a_K7M7lqXjovSVjQRV50vZ9gdcqMP8A8m70C7W5Px8QTPy4m6FNOLAhcGSUhgNPChJmYuVRlQtERBoCy0ZQXp_6lxNFB5V_lRO1NSaIOKt-Nun4nNu_A04jLGG6UU4'
        },
        {
            id: 2,
            name: 'Jane Cooper',
            role: 'Cleaner',
            bus: 'BUS-415',
            route: 'South Route',
            active: false,
            img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDFo6KGiBQJPdpfXqGTpRrjCd7dHj-NC7_9JHmOYl3HYa-1j3GEwDM1ZoO9MyunIRAci_6JAgTEm0qI3C0NAShcxRi5zkjJ_qpv5bF27DPLhXNvUSJGcLrFhFlVHEaWCJyrNyqUqJE97FuUpctszgRlFYYj9TGg7OJ0msBaxL1WLB92pT85tkLdKBt9gwMnKskcrOwdLdcI0CzC6gk5Du4jlddlqSGJ9wY76dR-zA-wG6FCEc5XEKwR8EHp2uBcUkR_xmbRHt5ZCdM'
        },
        {
            id: 3,
            name: 'Cody Fisher',
            role: 'Driver',
            bus: 'BUS-305',
            route: 'Central Route',
            active: true,
            img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDGZExqTqhYldb9dw9SgD5EeLeOhf2yGICvKQ5xMymC3VQVnefbg_76mLnFGHpY2QJSc8C4o6hPJpQ1WQQ7aZ78ljTQzkgj2sKaOPfu8d20V00IGkp0A1awcU55RxINSWuXh7cKZnGoHQ2XkNabYqpBziozeVc6ZV5cxT_kpW4tYAWmZp2QWnXrefOdukL-dcsvYo3d-WtUYESP4H-b3fwg3tQCn5dq6-Hfl8ErJwXiSHw5GlHfgWi2mMLVRTgnzxWgbUH2kU4K8qo'
        },
        {
            id: 4,
            name: 'Arlene McCoy',
            role: 'Driver',
            bus: 'BUS-101',
            route: 'East Route',
            active: true,
            img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAZU19XBpp6fqAQvYBKxi-V4G0uHH4KvXnzeHw5zrq6ZNTtHyMM2AMLgyvzQulZV6to037LoQSjOiOxqNQNteNHLFwX-54owh7ZD4yYGVVbJKBL2MgnSpTZGwKmZdPw9ML779HDj9tID-s-j2W4830bOxr6ihDHg3ATPefusbgzMb7f0AjItzjk4WMXrYAkNQZk4jH6Sd75oksKp2ZyzW3KENJX97oBvcNQun4ZGbK7PpmKd7n6rAdYxxm8iRLTgp1CxoeifXJAKSs'
        },
        {
            id: 5,
            name: 'Brooklyn Simmons',
            role: 'Cleaner',
            bus: 'BUS-702',
            route: 'North Route',
            active: true,
            img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA3Qp3hUgxPLzLd82IHM6vlU80aGQ0SCLcGzb4fDDkFHKurCaWiZ2YDdbHCjtKQTfVQqohla8Un5nT8IbYiZe6I5Nmgd9w91wXDfREMlWypoxVMccdt1BGbTCl1MAXIQ4Viny0IOKFpyGBmn2t3xuONP_JJzc2whi8FhRPrlcNimPJ8Q5lJrGjqSeP7gTUI-gVaPU26qOTL1-7X-MLThHTzvdwz360maCCVh1XbpzI6IBq09aaZCMRd8fhP7fQBMRzxSKWcoPE9IJA'
        },
        {
            id: 6,
            name: 'Guy Hawkins',
            role: 'Driver',
            bus: 'BUS-202',
            route: 'West Route',
            active: false,
            img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDEKzshk1avyMboDLlPHMC2ILwrwX4ulJLYuirKvCMviy0Cm-zTP87VvfIcGtW-tzgLbdwOUfRVRgYzICBb56xTWXOYRtVhn_vleUsp0Mn4nmcgZQ4El-0eQDukkMeoXi6iTnOQpvYloHcS-lEnuy_ypEkD-RoGQkpeDFrF2VL6zUd9dj5fOsXD9QEbgGdcwr1e7Kd5Ei434xo65TSzNJG3tfOh0IlfPXhEUappu6p9SSO-dReuhrux9DRWDiKN0jVbQEHLPYbQB00'
        }
    ]);

    const toggleStaffStatus = (id) => {
        setStaffMembers(prev => prev.map(staff => 
            staff.id === id ? { ...staff, active: !staff.active } : staff
        ));
    };

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
                                <h2 className="font-headline text-3xl font-extrabold text-on-surface tracking-tight">12 Staff Members</h2>
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
                            <img className="w-12 h-12 rounded-full border-4 border-white" alt="Staff 1" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDsz_88410yKEUsuPcyaUccZ9ErtE_eeFJVsmxqxnMAx3MxGTI2XaJikvDpJOk9cfbnAA5PeF-tkkUfw5O0Ad17E0babzYPHPWW0NF02SsAw_-_BRGL3QQAP-LKH7fc8DwmQWPBpNj02RGYV53Jt-i3u0fKU3E8urmz6IdSYQgXRovwJ5cJ4Vc7dMcPfM1fclHnU76nz2HnsrcjVk0RYuqXvM3bFqan_0z4pQdRx9XBQmjSxpAUj9t2Pm-m-9rSRykUjRC3DZ5up0k"/>
                            <img className="w-12 h-12 rounded-full border-4 border-white" alt="Staff 2" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCBNjQ2dqN-Dj3lTQr96xk5EzQeZEV7lbkXQlw3JtSbLtgkom6pr9ZS3kqBc6wfiRMD8dncO4KlG0md2Y6yWcgqEt0oPhaywcvG81KUqh8Lllmx9f8ghaNsREdZwJqvnKPrktwP-ImB19xK9__tAVbbq-JPaC4cyACV-5BM0E0JDLoBN4OtbmEZNnejvl1JXx9-Cul_Aeoba6EBobcX4lUn1-nwVhGNZHinxK2psDcpugeKAtKWW9BeJBIXthtu0dveqS80qapl2k4"/>
                            <img className="w-12 h-12 rounded-full border-4 border-white" alt="Staff 3" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBixKHNpkzqAQXTirVLf9sJyLrHEO6MZs3Jiv9IUmCVxg0HOFH1NssNJie8n0AtEOhwaAVMHncZZqEX0fONNYBc2WyGXnpLoM10rq2fzPAkZRrBKYE28Be8d9hP27x7IgfiSUG8hrIpwHIhkTviuNK5SF0knniG0eDhMCW1Kg3L-39GLxQutOtk8aFHAR1sFXaEHz__36gI3ZrHBDdjIHRAO5gxxeBMUKNwlSnpY0l8Z6ZgEy3Q2Lo2E7v7WFdfHFqOqQ_rD_3Z4VQ"/>
                            <img className="w-12 h-12 rounded-full border-4 border-white" alt="Staff 4" src="https://lh3.googleusercontent.com/aida-public/AB6AXuA5fmrKEs2gsz9lR5rXteCpF7Gl39tOAG_9AlznLOL7HgKc6S1ebnNmWZxyGXoC6HpbB7y3Lf4wFj-ZzXphpwpzX-P39v3r_4bqWFP14Y0zOTZ-8B7YmRuvCnUmyx7sbj9kErTzUSOjXhCgyIUL2c8OSojtvOHeTUZ4iClj_Rm1-6ayGHvF5Mo2aDbuosTZD0THS02FPxmzCMyb8rcenO73f76nDu43rPTiNJBGwl2PpE7WXZHpe5ccz1gwgNjQwxvJZ_yP6bnWT54"/>
                            <div className="w-12 h-12 rounded-full bg-surface-container-highest border-4 border-white flex items-center justify-center text-xs font-bold text-on-surface-variant">+8</div>
                        </div>
                    </div>
                </section>

                {/* Search & Filter Bar */}
                <section className="mb-8 flex flex-col md:flex-row gap-4">
                    <div className="flex-grow relative">
                        <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant">search</span>
                        <input className="w-full pl-12 pr-4 py-4 bg-surface-container-high rounded-xl border-none focus:ring-2 focus:ring-primary focus:bg-surface-container-lowest transition-all placeholder:text-on-surface-variant/60 font-medium" placeholder="Search staff by name, role or bus ID..." type="text"/>
                    </div>
                    <button className="bg-surface-container-lowest text-on-surface px-6 py-4 rounded-xl font-bold flex items-center justify-center gap-3 hover:bg-slate-50 transition-colors shadow-sm">
                        <span className="material-symbols-outlined">tune</span>
                        Filter
                    </button>
                </section>

                {/* Staff Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {staffMembers.map((staff) => (
                        <div key={staff.id} className={`bg-surface-container-lowest rounded-2xl p-5 shadow-sm hover:shadow-md transition-all group ${!staff.active ? 'opacity-60 grayscale-[0.8]' : ''}`}>
                            <div className="flex items-start justify-between mb-4">
                                <div className="flex gap-4">
                                    <div className="relative">
                                        <img alt={staff.name} className="w-14 h-14 rounded-xl object-cover" src={staff.img}/>
                                    </div>
                                    <div>
                                        <h3 className="font-headline font-bold text-lg text-on-surface">{staff.name}</h3>
                                        <p className="text-on-surface-variant text-sm font-medium">{staff.role}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className={`text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-tighter ${staff.active ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-500'}`}>
                                        {staff.active ? 'ACTIVE' : 'INACTIVE'}
                                    </span>
                                    <label className="relative inline-block width-[32px] height-[18px]">
                                        <input 
                                            checked={staff.active} 
                                            onChange={() => toggleStaffStatus(staff.id)} 
                                            type="checkbox"
                                            className="sr-only peer"
                                        />
                                        <div className="w-8 h-4 bg-slate-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-3 after:w-3 after:transition-all peer-checked:bg-green-500"></div>
                                    </label>
                                </div>
                            </div>
                            <div className="bg-surface-container-low rounded-lg p-3 flex justify-between items-center">
                                <div className="flex items-center gap-2">
                                    <span className="material-symbols-outlined text-on-surface-variant text-sm">directions_bus</span>
                                    <span className="text-xs font-bold text-on-surface uppercase tracking-wider">{staff.bus}</span>
                                </div>
                                <span className="text-[10px] font-semibold text-on-tertiary-container bg-tertiary-container px-2 py-0.5 rounded">{staff.route}</span>
                            </div>
                        </div>
                    ))}
                </div>
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
