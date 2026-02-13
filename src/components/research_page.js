
import React from 'react';
import { Link } from 'react-router-dom';
import NavBarDesktop from '../sub_components/nav_bar_desktop';

const ResearchPage = () => {
    return (
        <div className="min-h-screen bg-white">
            <NavBarDesktop index={3} />
            <div className="flex flex-col items-center justify-center min-h-[80vh] px-4 text-center">
                <h1 className="text-4xl md:text-5xl font-bold mb-4 text-stone-800">Research</h1>
                <p className="text-xl text-stone-600 mb-8">
                    Coming Soon...
                </p>
                <Link
                    to="/"
                    className="px-6 py-3 bg-stone-800 text-white rounded-lg hover:bg-stone-700 transition-colors"
                >
                    Return Home
                </Link>
            </div>
        </div>
    );
};

export default ResearchPage;
