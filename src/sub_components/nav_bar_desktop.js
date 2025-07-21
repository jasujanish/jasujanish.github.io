import { Link } from "react-router-dom";

// Nav bar at the top of each page
export default function NavBarDesktop({index}) {
  const navLinks = [
    { to: "/courses/main", label: "COURSES", index: 1 },
    { to: "/about/main", label: "BLOG", index: 2 },
    { to: "/projects/main", label: "PROJECTS", index: 3 },
  ];
    return (
    <header className="w-full md:w-3/4 lg:w-2/3 xl:w-1/2 mx-auto flex items-center justify-between sticky top-0 bg-opacity-50 backdrop-blur-md py-2 md:py-3 z-50 border-b-2 border-stone-100 border-opacity-80 sm:px-[5%] md:px-[2%]">
        <Link
        to="/"
        className={
            index === 0
            ? 'tracking-normal text-xl font-normal cursor-no-drop relative pb-1 after:absolute after:bottom-0 after:left-0 after:w-full after:h-1 after:bg-stone-800 after:transition-all after:duration-300'
            : 'tracking-normal text-xl font-normal cursor-pointer relative pb-1 after:absolute after:bottom-0 after:left-0 after:w-0 after:h-1 after:bg-stone-800 after:transition-all after:duration-300 hover:after:w-full'
        }
        >
        Nishchay Jasuja
        </Link>
        <nav className="flex flex-wrap gap-x-8 md:gap-x-12 xl:gap-x-16">
        {navLinks.map((link) => (
            <Link
            key={link.to}
            to={link.to}
            className= {index === link.index
                ? 'hover:cursor-no-drop text-lg font-extralight relative pb-1 after:absolute after:bottom-0 after:left-0 after:w-0 after:h-1 after:bg-stone-800 after:transition-all after:duration-300 after:w-full'
                : 'hover:cursor-pointer text-lg font-extralight relative pb-1 after:absolute after:bottom-0 after:left-0 after:w-0 after:h-1 after:bg-stone-800 after:transition-all after:duration-300 hover:after:w-full'
            }
            >
            {link.label}
            </Link>
        ))}
        </nav>
    </header>
    );
}