import React from 'react';
import NavBarDesktop from '../sub_components/nav_bar_desktop';
import photo1 from '../images/research1.jpg';
import photo2 from '../images/research1.jpg';
import FadeIn from './fade_in';

const ResearchItem = ({ logo, company, role, date, children, isLast }) => {
    const logoButtonRef = React.useRef(null);

    const handleLogoClick = () => {
        const logoButton = logoButtonRef.current;
        if (!logoButton) return;

        logoButton.classList.remove('research-logo-button--animate');
        void logoButton.offsetWidth;
        logoButton.classList.add('research-logo-button--animate');
    };

    return (
        <div className="flex w-full max-w-4xl mx-auto group">
            {/* Left Column: Logo & Timeline Line */}
            <div className="flex flex-col items-center mr-6 md:mr-10 relative">
                {/* Logo Container */}
                <button
                    type="button"
                    ref={logoButtonRef}
                    onClick={handleLogoClick}
                    onAnimationEnd={() => logoButtonRef.current?.classList.remove('research-logo-button--animate')}
                    aria-label={`Animate ${company} logo`}
                    className="research-logo-button w-12 h-12 md:w-16 md:h-16 flex-shrink-0 z-10"
                >
                    <div className="research-logo-disc bg-white rounded-full p-1 shadow-sm border border-stone-100">
                        <img
                            src={logo}
                            alt={`${company} logo`}
                            className="w-full h-full object-contain rounded-full"
                        />
                    </div>
                </button>
                {/* Vertical Line */}
                {!isLast && (
                    <div className="w-0.5 bg-stone-200 h-full absolute top-16 md:top-20 bottom-0 left-1/2 -translate-x-1/2"></div>
                )}
            </div>

            {/* Right Column: Content */}
            <div className="pb-12 md:pb-16 flex-1 text-left">
                <h3 className="text-xl md:text-2xl font-semibold text-stone-800 mb-1">
                    {company}
                </h3>
                <p className="text-sm md:text-base text-stone-500 mb-4 font-normal">
                    {role} • {date}
                </p>
                <div className="text-stone-700 text-sm md:text-base leading-relaxed space-y-4">
                    {children}
                </div>
            </div>
        </div>
    );
};

const ResearchPage = () => {
    return (
        <div className="min-h-screen font-inter relative overflow-x-hidden">

            {/* Navigation */}
            <NavBarDesktop index={4} />

            {/* Main Content */}
            <div className="relative z-10 flex flex-col items-center pt-12 md:pt-20 px-6 md:px-12 lg:px-24 pb-20">
                {/* Page Header */}
                <FadeIn opacity={0} delay={0.1}>

                    {/* Timeline Container */}
                    <div className="w-full max-w-3xl">

                        {/* Felicis */}
                        <ResearchItem
                            logo={photo1}
                            company="CMU College of Computer Science"
                            role="Research Assistant"
                            date="January 2026 - Present"
                        >
                            <p>
                                Investigating mid-training strategies for large language models (LLMs) to improve the effectiveness of domain-specific reinforcement learning post-training techniques
                            </p>
                        </ResearchItem>

                        {/* Shopify */}
                        <ResearchItem
                            logo={photo2}
                            company="CMU College of Engineering"
                            role="Research Assistant"
                            date="May 2025 - July 2025"
                            isLast={true}
                        >
                            <p>
                                <span className="font-semibold text-stone-800">Tasks:</span> Leveraged Python, Slurm, and high-performance computing resources at the Pittsburgh Supercomputing Center to integrate, clean, and analyze large-scale energy usage datasets.
                            </p>
                            <p>
                                <span className="font-semibold text-stone-800">Impacts:</span> Applied multi-threading, multi-processing, and differential evolution to reduce compute time by over 80%. Concurrently fitted piecewise linear regression models to 100,000+ households to evaluate the impact of consumer-facing energy subsidies, generating insights into policy efficacy.
                            </p>
                        </ResearchItem>
                    </div>
                </FadeIn>
            </div>
        </div>
    );
};

export default ResearchPage;
