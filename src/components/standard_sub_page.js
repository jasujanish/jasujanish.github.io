import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from "react-router";
import { motion, AnimatePresence } from "framer-motion"; // The magic engine
import NavBarDesktop from '../sub_components/nav_bar_desktop';
import NoMotionBackground from '../sub_components/no_motion_background';

// --- ANIMATION VARIANTS ---

// Staggered container for the list
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1 // Delays each child by 0.1s
    }
  }
};

// Individual card entry animation
const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { type: "spring", stiffness: 100, damping: 20 }
  },
  exit: { 
    opacity: 0, 
    scale: 0.95, 
    transition: { duration: 0.2 } 
  }
};

// Spring physics for buttons
const buttonSpring = {
  type: "spring",
  stiffness: 400,
  damping: 25
};

// --- COMPONENTS ---

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
      // Optional: Scroll to top if you want, or let the user stay where they are
      // window.scrollTo({ top: 0, behavior: 'smooth' }); 
      return updated;
    });
  };

  const clearAll = () => {
    // window.scrollTo({ top: 0, behavior: 'smooth' });
    setSelectedTags([]);
  }

  return (
    <div className="w-full mx-auto my-6 md:my-10 z-20">
      <motion.div layout className="flex flex-wrap gap-2 items-center">
        <span className="text-gray-600 font-medium mr-2 text-sm md:text-base">Filter by tags:</span>
        
        <AnimatePresence mode='popLayout'>
          {allTags.map(tag => {
            const isSelected = selectedTags.includes(tag);
            return (
              <motion.button
                layout
                key={tag}
                onClick={() => toggleTag(tag)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={buttonSpring}
                className={`px-2 py-1 md:px-3 md:py-1 text-xs md:text-sm rounded-full transition-colors duration-200 ${
                  isSelected
                    ? 'bg-blue-500 text-white shadow-md'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {tag}
                {/* Optional checkmark for selected state */}
                {isSelected && (
                   <motion.span 
                     initial={{ width: 0, opacity: 0 }} 
                     animate={{ width: "auto", opacity: 1 }} 
                     className="ml-1 inline-block"
                   >✓</motion.span> 
                )}
              </motion.button>
            );
          })}

          {selectedTags.length > 0 && (
            <motion.button
              layout
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              onClick={clearAll}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-2 py-1 md:px-3 md:py-1 text-xs md:text-sm rounded-full bg-red-100 text-red-600 hover:bg-red-200 ml-2"
            >
              Clear all
            </motion.button>
          )}
        </AnimatePresence>
      </motion.div>
      
      <AnimatePresence>
        {selectedTags.length > 0 && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-2 text-xs md:text-sm text-gray-600 overflow-hidden"
          >
            Showing items with tags: {selectedTags.join(', ')}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function BlogList({content, page_name, selectedTags}) {
  const nav = useNavigate();

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
    <motion.div 
      className="flex flex-col w-full z-10"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <AnimatePresence mode='popLayout'>
        {filteredContent.map(p => (
          <motion.div 
            layout // THE MAGIC MOVE: Enables smooth reordering
            key={p.slug} 
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            whileHover={{ 
              y: -8, 
              transition: { type: "spring", stiffness: 200, damping:10 } 
            }}
            onClick={() => nav(`/${page_name}/${p.slug}`)}
            className="cursor-pointer bg-white bg-opacity-40 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 mb-6 md:mb-10 flex flex-col md:flex-row justify-between hover:bg-stone-50"
          >
            {/* Image with layoutId for Shared Element Transition potential */}
            <motion.img 
              layoutId={`image-${p.slug}`}
              src={p.image} 
              alt={p.name} 
              className="w-full md:w-1/2 p-[2%] object-cover rounded-t-lg md:rounded-tr-none md:rounded-tl-lg" 
            />
            
            <div className='w-full md:w-1/2 p-[2%] flex flex-col'>
              <motion.p layout className="font-mono text-gray-800 font-light text-base md:text-lg lg:text-xl">
                {p.name}
              </motion.p>
              <p className="font-mono text-gray-600 font-light text-xs md:text-sm mb-2">
                {p.date} · {p.time}
              </p>
              <div className="font-sans text-gray-700 font-light text-sm md:text-base">
                {p.summary}
              </div>
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
          </motion.div>
        ))}
      </AnimatePresence>
    </motion.div>
  );
}

// The standard build for a subpage (blogs, courses, projects)
export default function StandardSubPage({page_name, content, idx}) {
  const slug = useParams().slug;
  const post = content.find(p => p.slug === slug);
  const navigate = useNavigate();
  const [selectedTags, setSelectedTags] = useState([]);

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);
  
  if(post !== undefined){
    // --- DETAIL VIEW ---
    return (
      <div className="min-h-screen w-screen flex flex-col bg-[#fffefc] font-inter">
        <NavBarDesktop index={-1} />
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col justify-between items-center w-full md:w-3/4 lg:w-2/3 xl:w-1/2 mx-auto p-4 md:p-6 lg:p-[3%]"
        >
          <motion.h1 
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="font-mono text-gray-800 font-bold text-xl md:text-2xl lg:text-3xl mb-2 text-center"
          >
            {post.name}
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="font-mono text-gray-600 font-light text-sm md:text-md mb-2"
          >
            {post.date} · {post.time}
          </motion.p>
          
          <div className="m-6 md:m-10">
            {/* Matches the list view image for smooth transition if supported by router setup */}
            <motion.img 
              layoutId={`image-${post.slug}`}
              src={post.image} 
              alt={post.name} 
              className="w-full h-auto rounded-lg shadow-lg" 
            />
            <p className="text-gray-500 text-center font-light font-sans m-1 text-xs md:text-sm"> 
              {post.image_caption}
            </p>
          </div>

          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="font-sans text-gray-700 font-light text-sm md:text-base lg:text-lg leading-relaxed p-4"
          >
            {post.description}
          </motion.div>

          {post.tags && post.tags.length > 0 && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-4 flex flex-wrap gap-2 justify-center"
            >
              <span className="text-gray-600 font-medium text-base md:text-lg">Tags:</span>
              {post.tags.map(tag => (
                <span key={tag} className="px-2 py-1 bg-blue-100 text-blue-700 text-xs md:text-sm rounded-full">
                  {tag}
                </span>
              ))}
            </motion.div>
          )}

          <div className="font-sans text-gray-800 font-light text-sm md:text-base mt-6 md:mt-10">
            <span
              className="text-blue-600 hover:text-blue-800 underline hover:cursor-pointer self-start"
              onClick={() => navigate(`/${page_name}/main`)}
            > 
              Back to Blog
            </span> 
          </div>
        </motion.div>
      </div>
    );
  }
  else {
    // --- LIST VIEW ---
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