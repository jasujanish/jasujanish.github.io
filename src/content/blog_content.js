import castle_1 from '../images/castle_1.png'
import castle_2 from '../images/castle_2.png'
import castle_3 from '../images/castle_3.png'
export const content = [
  {
    slug: 'books',
    name: 'Interesting Reads',
    image: castle_1,
    image_caption: 'Hohenzollern Castle | Germany | Source: A. Kniesel',
    date: 'Jul 18 2025',
    time: '4 minute read',
    summary: 'A collection of books & articles that I found particularly interesting',
    description: (
      <div className='font-light text-gray-700 text-[1vw] leading-7'>
        <p className='font-medium'>Articles</p>
        <ul style={{ listStyleType: 'circle' }}>
          <li>
            Designing better AI interfaces:{" "}
            <a className= "underline text-blue-600 hover:text-blue-800" href="https://deepmind.google/research/publications/106025/">deepmind.google/research/publications/106025/</a>
          </li>
          <li>
            Not exactly an article, but the portfolio that inspired this page:{" "}
            <a className= "underline text-blue-600 hover-text-blue-800" href="https://azumbrunnen.me/">https://azumbrunnen.me/</a>
          </li>
        </ul>
        <br></br>
        <p className='font-medium'>Books</p>
        <ul style={{ listStyleType: 'circle' }}>
          <li>Flowers for Algernon by Daniel Keyes: my favorite book (but the story is quite sad)</li>
          <li>Computer Systems: A Programmer's Perspective by Randal E. Bryant and David R. O'Hallaron: this book was introduced to me at CMU, and it's been a great resource for learning about computer systems</li>
          <li>Competitive Programmer's Handbook by Antti Laaksonen: my favorite resource for learning about dsa</li>
          <li>Zero to One by Peter Thiel: interesting thoughts on innovation (but a bit harsh in tone)</li>
        </ul>
      </div>
    ),
    term: '2025',
    fade_in : 0.25
  },
  {
    slug: 'background',
    name: 'About Me',
    image: castle_2,
    image_caption: 'Wernigerode Castle | Germany | Source: Andreas Tille',
    date: 'Jun 20 2025',
    time: '2 minute read',
    summary: 'A short introduction about me',
    description: (
    <div className='font-light text-gray-700 text-[1vw] leading-7 text-left'>
        <p>
            I'm Nishchay Jasuja. I'm from the bay area, though I'm now based in Pittsburgh as I attend Carnegie Mellon University (CMU). At CMU, I'm studying Statistics and Machine Learning with an additional major in Computer Science. I'm currently interested in exploring the fields of machine learning, deep learning, robotics, and computer systems.<br></br>Outside of academic interests, I enjoy playing chess, creating quick sketches with my iPad, reading nonfiction novels, and following the NBA & La Liga. If you want to reach me, please email me at <span className='font-normal'> njasuja [at] andrew [dot] cmu [dot] edu</span>
        </p>
    </div>),
    fade_in : 0.5
  },
  {
    slug: 'fun-facts',                  
    name: 'Fun Facts',
    image: castle_3,
    image_caption: 'Stolzenfels Castle | Germany | Source: Holger Weinandt',
    date: 'Jun 20 2025',
    time: '2 minute read',
    summary: 'A collection of fun facts about me',
    description: (
    <div className='font-light text-gray-700 text-[1vw] leading-7 text-left'>
      <ul style={{ listStyleType: 'circle' }}>
        <li>I'm ~2000 ELO in bullet chess (on chess.com)</li>
        <li>I'm ~1700 ELO in blitz chess (on chess.com)</li>
        <li>I'm an avid connect 4 player (though it's a bit difficult to find opponents)</li>
        <li>I've been on submarines, boats, and kayaks</li>
      </ul>
    </div>),
    fade_in : 0.75
  },
];

