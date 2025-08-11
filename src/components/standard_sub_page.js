import React, { useState, useEffect } from 'react';
import {useNavigate} from "react-router";
import FadeIn from './fade_in'
import { useParams } from 'react-router';
import NavBarDesktop from '../sub_components/nav_bar_desktop';
import NoMotionBackground from '../sub_components/no_motion_background';
// Tag filter, successfully vibe-coded
function TagFilter({ content, page_name, selectedTags, setSelectedTags }) {
  const allTags = [...new Set(content.flatMap(item => item.tags || []))];
  
  const toggleTag = (tag) => {
    setSelectedTags(prev => {
      let updated;
      if (prev.includes(tag)) {
        updated = prev.filter(t => t !== tag);
      } else {
        updated = [...prev, tag];
      }
      window.scrollTo(0, 0);
      return updated;
    });
  };

  const clearAll = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setSelectedTags([]);
  }

  return (
    <div className="w-full mx-auto my-6 md:my-10 z-20">
      <div className="flex flex-wrap gap-2 items-center">
        <span className="text-gray-600 font-medium mr-2 text-sm md:text-base">Filter by tags:</span>
        {allTags.map(tag => (
          <button
            key={tag}
            onClick={() => toggleTag(tag)}
            className={`px-2 py-1 md:px-3 md:py-1 text-xs md:text-sm rounded-full transition-all duration-200 ${
              selectedTags.includes(tag)
                ? 'bg-blue-500 text-white shadow-md'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {tag}
          </button>
        ))}
        {selectedTags.length > 0 && (
          <button
            onClick={clearAll}
            className="px-2 py-1 md:px-3 md:py-1 text-xs md:text-sm rounded-full bg-red-100 text-red-600 hover:bg-red-200 ml-2"
          >
            Clear all
          </button>
        )}
      </div>
      {selectedTags.length > 0 && (
        <div className="mt-2 text-xs md:text-sm text-gray-600">
          Showing items with tags: {selectedTags.join(', ')}
        </div>
      )}
    </div>
  );
}

// List of blog elements (filtered using TagFilter)
function BlogList({content, page_name, selectedTags}) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  useEffect(() => {
    setLoaded(selectedTags.length > 0);
  }, [selectedTags]);

  const nav = useNavigate();
  const [loaded, setLoaded] = useState(selectedTags.length > 0);

  const filteredContent = selectedTags.length === 0 
    ? content 
    : content.filter(item => 
        selectedTags.some(tag => (item.tags || []).includes(tag))
      );

  if (filteredContent.length === 0) {
    return (
      <div className="flex flex-col w-full z-10">
        <div className="text-center py-10 text-gray-500 text-sm md:text-base">
          No posts match the selected tags.
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full z-10">
      {filteredContent.map(p => (
      <FadeIn key={p.slug} delay={loaded ? 0 : p.fade_in} opacity={100}> 
        <div 
          onClick={() => nav(`/${page_name}/${p.slug}`)}
          className="cursor-pointer bg-white bg-opacity-40 rounded-lg shadow-md hover:drop-shadow-lg transition mb-6 md:mb-10 flex flex-col md:flex-row justify-between hover:cursor-pointer hover:bg-stone-50"
        >
          <img src={p.image} alt={p.name} className="w-full md:w-1/2 p-[2%] object-cover rounded-t-lg md:rounded-tr-none md:rounded-tl-lg" />
          <div className='w-full md:w-1/2 p-[2%] flex flex-col'>
            <p className="font-mono text-gray-800 font-light text-base md:text-lg lg:text-xl">{p.name}</p>
            <p className="font-mono text-gray-600 font-light text-xs md:text-sm mb-2">{p.date} · {p.time}</p>
            <div className="font-sans text-gray-700 font-light text-sm md:text-base">{p.summary}</div>
            {p.tags && p.tags.length > 0 && (
              <div className="mt-2 flex flex-wrap gap-1">
                {p.tags.map(tag => (
                  <span key={tag} className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </FadeIn>
      ))}
    </div>
  );
}

// The standard build for a subpage (blogs, courses, projects)
export default function StandardSubPage({page_name, content, idx}) {
  const slug = useParams().slug;
  const post = content.find(p => p.slug === slug);
  const navigate = useNavigate();
  const [selectedTags, setSelectedTags] = useState([]);
  
  if(post !== undefined){
    return (
    <div className="min-h-screen w-screen flex flex-col bg-[#fffefc] font-inter">
      <NavBarDesktop index={-1} />
      <div className="flex flex-col justify-between items-center w-full md:w-3/4 lg:w-2/3 xl:w-1/2 mx-auto p-4 md:p-6 lg:p-[3%]">
        <h1 className="font-mono text-gray-800 font-bold text-xl md:text-2xl lg:text-3xl mb-2 text-center">{post.name}</h1>
        <p className="font-mono text-gray-600 font-light text-sm md:text-md mb-2">{post.date} · {post.time}</p>
        <div 
          className="m-6 md:m-10"><img src={post.image} alt={post.name} className="w-full h-auto rounded-lg" />
          <p className="text-gray-500 text-center font-light font-sans m-1 text-xs md:text-sm"> {post.image_caption}</p>
        </div>
        <div className="font-sans text-gray-700 font-light text-sm md:text-base lg:text-lg leading-relaxed">{post.description}</div>
        {post.tags && post.tags.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2 justify-center">
            <span className="text-gray-600 font-medium text-base md:text-lg">Tags:</span>
            {post.tags.map(tag => (
              <span key={tag} className="px-2 py-1 bg-blue-100 text-blue-700 text-xs md:text-sm rounded-full">
                {tag}
              </span>
            ))}
          </div>
        )}
        <div className="font-sans text-gray-800 font-light text-sm md:text-base mt-6 md:mt-10">
          <span
          className="text-blue-600 hover:text-blue-800 underline hover:cursor-pointer self-start"
          onClick={() => navigate(`/${page_name}/main`)}> Back to Blog
          </span> 
        </div>
      </div>
      </div>
    );
  }
  else{
    return (
      <div className="min-h-screen w-screen flex flex-col font-inter">
      <NoMotionBackground className="opacity-70"/>
        <NavBarDesktop index={idx} />
        <div className='flex flex-col justify-center items-center w-full md:w-3/4 lg:w-2/3 xl:w-1/2 mx-auto px-4 md:px-0'>
          <TagFilter 
            content={content} 
            page_name={page_name} 
            selectedTags={selectedTags}
            setSelectedTags={setSelectedTags}
          />
          <BlogList 
            content={content} 
            page_name={page_name} 
            selectedTags={selectedTags}
          />
        </div>
      </div>
    );
  }
}