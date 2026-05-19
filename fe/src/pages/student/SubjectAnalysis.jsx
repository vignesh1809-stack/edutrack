import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import StudentSidebar from '../../components/StudentSidebar';
import StudentNavBar from '../../components/StudentNavBar';

const SubjectAnalysis = () => {
    const navigate = useNavigate();
    const user = useSelector(state => state.auth.user);

    return (
        <div className="bg-surface text-on-surface antialiased mb-24 md:mb-0 font-body min-h-screen">
            <StudentSidebar />
            <div className="md:pl-64">
                {/* TopAppBar */}
                <header className="fixed top-0 w-full z-50 bg-surface/70 backdrop-blur-md shadow-sm flex items-center justify-between px-6 h-16 md:w-[calc(100%-16rem)]">
                    <div className="flex items-center gap-4">
                        <button onClick={() => navigate(-1)} className="text-primary active:scale-95 duration-200">
                            <span className="material-symbols-outlined">arrow_back</span>
                        </button>
                        <h1 className="font-headline font-extrabold text-xl tracking-tight text-on-surface">Academic Insights</h1>
                    </div>
                    <div className="flex items-center gap-4">
                        <span className="hidden md:block font-label text-on-surface-variant text-sm font-medium">Advanced Mathematics Analysis</span>
                        <div className="w-10 h-10 rounded-full bg-primary-fixed flex items-center justify-center overflow-hidden border-2 border-primary-container">
                            <img 
                                alt="User profile" 
                                className="w-full h-full object-cover" 
                                src={user?.profileImage || "https://lh3.googleusercontent.com/aida-public/AB6AXuB3T9QC9lDrt9G7BYVxB1q8WQtR1CPBPE6v4sSLPhcf3uaNo1IGGkQwpmGVzixQDFOwUvPFCypvhfdTk8xMf0pWxpWFtECXPJIWtOfwUSFBFnzVJwUOkY6TON_O8YLNu-o828KOzKf6qtjG_rmywRQNnwW4ADgdg7KjO_F_GBs83Eov2PSu3OyxmsSetxLUaXsQladERu58mV4AKjiq9vgxPYPNE--CXPZb1IHyJ2z2dwSLkiXLAXX0pKQ6ef93-v4OruCJJ2aGa48"} 
                            />
                        </div>
                    </div>
                </header>

                <main className="pt-24 pb-32 px-6 max-w-6xl mx-auto space-y-8">
                    {/* Hero Section: Overall Score */}
                    <section className="grid grid-cols-1 gap-6">
                        <div className="bg-surface-container-lowest rounded-3xl p-8 flex flex-col justify-between relative overflow-hidden shadow-sm border border-surface-container">
                            <div className="space-y-2 max-w-md">
                                <span className="bg-tertiary-container text-on-tertiary-container px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider inline-block">High Distinction</span>
                                <h2 className="text-4xl font-extrabold tracking-tight font-headline text-on-surface">Advanced Mathematics</h2>
                                <p className="text-on-surface-variant text-base leading-relaxed mt-2">Detailed analysis for Mid-Term Examination. Your performance places you in the top 5% of the global cohort.</p>
                            </div>
                            <div className="mt-8 flex gap-8">
                                <div>
                                    <p className="text-xs font-medium text-on-surface-variant uppercase tracking-widest font-label">Score</p>
                                    <p className="text-2xl font-bold text-on-surface">92 / 100</p>
                                </div>
                                <div>
                                    <p className="text-xs font-medium text-on-surface-variant uppercase tracking-widest font-label">Grade</p>
                                    <p className="text-2xl font-bold text-primary">A+</p>
                                </div>
                                <div>
                                    <p className="text-xs font-medium text-on-surface-variant uppercase tracking-widest font-label">Class Average</p>
                                    <p className="text-2xl font-bold text-on-surface">74 / 100</p>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* AI-Identified Strengths */}
                    <section className="space-y-6">
                        <h3 className="font-headline text-2xl font-bold px-2 text-on-surface">AI-Identified Strengths</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                            {[
                                { title: 'Logical Reasoning', icon: 'psychology', desc: 'Exceptional ability to deconstruct multi-step word problems into solvable equations.' },
                                { title: 'Calculus Fundamentals', icon: 'calculate', desc: 'Flawless execution of derivation rules and integration by parts techniques.' },
                                { title: 'Geometry Intuition', icon: 'architecture', desc: 'Strong visual-spatial skills in interpreting complex 3D geometric transformations.' },
                                { title: 'Computational Speed', icon: 'bolt', desc: '25% faster processing of arithmetic sequences compared to the cohort average.' }
                            ].map((strength, idx) => (
                                <div key={idx} className="bg-surface-container-low p-6 rounded-2xl hover:bg-surface-container-high transition-colors group border border-transparent hover:border-surface-container-highest">
                                    <span className="material-symbols-outlined text-primary mb-4 block" style={{ fontVariationSettings: "'FILL' 1" }}>{strength.icon}</span>
                                    <h4 className="font-headline font-bold text-lg mb-1 text-on-surface">{strength.title}</h4>
                                    <p className="text-sm text-on-surface-variant">{strength.desc}</p>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Question-Wise Breakdown */}
                    <section className="space-y-6">
                        <div className="flex items-center justify-between px-2">
                            <h3 className="font-headline text-2xl font-bold text-on-surface">Question-Wise Breakdown</h3>
                            <div className="flex gap-2">
                                <button className="p-2 rounded-lg bg-surface-container text-on-surface-variant hover:bg-surface-container-high transition-colors">
                                    <span className="material-symbols-outlined">filter_list</span>
                                </button>
                                <button className="p-2 rounded-lg bg-surface-container text-on-surface-variant hover:bg-surface-container-high transition-colors">
                                    <span className="material-symbols-outlined">download</span>
                                </button>
                            </div>
                        </div>
                        <div className="grid grid-cols-1 gap-4">
                            {[
                                { q: 'Q1', area: 'Linear Algebra', score: '10/10', status: 'Full Marks', type: 'success', well: 'Perfect execution. Methodical approach to Gaussian elimination demonstrated with clear intermediate steps.', improve: 'Maintain this level of rigor. Explore more efficient pivot selection strategies for larger matrices.' },
                                { q: 'Q2', area: 'Vector Spaces', score: '8/10', status: 'High Pass', type: 'success', well: 'Strong conceptual understanding of basis and dimension. Accurate identification of independent vectors.', improve: 'Minor computational error in final subspace proof. Double-check arithmetic in coordinate transformations.' },
                                { q: 'Q3', area: 'Trigonometry', score: '4/10', status: 'Action Required', type: 'error', well: 'Correct initial setup of the trigonometric equation and identification of the relevant unit circle quadrant.', improve: 'Significant difficulty in applying the double-angle theorem. Review core identities for sine and cosine.' },
                                { q: 'Q4', area: 'Limits & Continuity', score: '10/10', status: 'Full Marks', type: 'success', well: "Sophisticated use of L'Hôpital's rule on complex indeterminate forms. Excellent epsilon-delta reasoning.", improve: 'Confidence in limit evaluation is high. Next, practice identifying points of non-removable discontinuity.' },
                                { q: 'Q5', area: 'Differentiation', score: '10/10', status: 'Full Marks', type: 'success', well: 'Strong application of chain rule. Clean notation and logical flow in multi-stage derivative calculations.', improve: 'Mastery achieved. Begin applying these techniques to optimization problems in physical contexts.' }
                            ].map((item, idx) => (
                                <div key={idx} className="bg-surface-container-lowest rounded-3xl p-6 shadow-sm border border-surface-container space-y-4">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <div className={`${item.type === 'error' ? 'bg-error-container text-on-error-container' : 'bg-primary-container text-on-primary-container'} w-10 h-10 rounded-xl flex items-center justify-center font-bold text-lg`}>{item.q}</div>
                                            <div>
                                                <h4 className="font-headline font-bold text-on-surface">{item.area}</h4>
                                                <p className="text-[10px] font-label text-on-surface-variant uppercase tracking-widest">Subject Area</p>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <p className={`text-xl font-extrabold ${item.type === 'error' ? 'text-error' : 'text-primary'}`}>{item.score}</p>
                                            <p className="text-[10px] font-label text-on-surface-variant uppercase tracking-widest">{item.status}</p>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                                        <div className="bg-surface-container-low rounded-2xl p-4">
                                            <h5 className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-primary mb-2">
                                                <span className="material-symbols-outlined text-sm">check_circle</span> What Went Well
                                            </h5>
                                            <p className="text-sm italic text-on-surface-variant leading-relaxed">"{item.well}"</p>
                                        </div>
                                        <div className={`${item.type === 'error' ? 'bg-error-container/10 border-l-4 border-error' : 'bg-surface-container-low'} rounded-2xl p-4`}>
                                            <h5 className={`flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest ${item.type === 'error' ? 'text-error' : 'text-on-tertiary-fixed-variant'} mb-2`}>
                                                <span className="material-symbols-outlined text-sm">{item.type === 'error' ? 'warning' : 'trending_up'}</span> Needs Improvement
                                            </h5>
                                            <p className={`text-sm italic ${item.type === 'error' ? 'text-on-error-container' : 'text-on-surface-variant'} leading-relaxed`}>"{item.improve}"</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Final Call to Action */}
                    <div className="py-12 flex justify-center">
                        <button className="flex items-center gap-2 px-8 py-4 bg-on-surface text-surface rounded-full font-bold hover:scale-105 transition-transform active:scale-95 shadow-xl">
                            <span>Start Review Session</span>
                            <span className="material-symbols-outlined">trending_flat</span>
                        </button>
                    </div>
                </main>
                <StudentNavBar />
            </div>
        </div>
    );
};

export default SubjectAnalysis;
