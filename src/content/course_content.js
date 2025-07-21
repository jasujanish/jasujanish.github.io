import castle_1 from '../images/castle_1.png'
import concepts_img from '../images/21127.png'
import systems_img from '../images/213.png'
import bunny_img from '../images/bunny.png'

export const content = [
  {
    slug: 'Fall2025',
    name: 'Fall 2025',
    image: castle_1,
    image_caption: 'Place Holder Image For Now | Source: A. Kniesel',
    date: '3 Courses',
    time: '1 Minute Read',
    tags: ['ai'],
    summary: (
      <p>
        11785 <span className='font-medium'>Intro to Deep Learning </span> (PhD)<br />
        10701 <span className='font-medium'>Intro to Machine Learning </span> (PhD)<br />
        11711 <span className='font-medium'>Advanced Natural Language Processing </span> (PhD)<br />
      </p>
    ),
    term: 'F25',
    fade_in: 0.0,
    description: (
    <ul style={{ listStyleType: 'circle' }}>
      <li>
        <span className='font-medium'>Intro to Deep Learning (PhD)</span><br />
        Upcoming Course - Description Coming Soon. <br /> <br />
      </li>
      <li>
        <span className='font-medium'>Intro to Machine Learning (PhD)</span><br />
        Upcoming Course - Description Coming Soon. <br /> <br />
      </li>
      <li>
        <span className='font-medium'>Natural Language Processing (PhD)</span><br />
        Upcoming Course - Description Coming Soon. <br /> <br />
      </li>
    </ul>
    ),
  },
  {
    slug: 'Summer25',
    name: 'Summer 2025',
    image: bunny_img,
    image_caption: 'A bunny I saw right before my first lecture | Source: Me',
    date: '1 Course',
    time: '2 Minute Read',
    summary: <p>21-325 <span className='font-medium'>Probability Theory</span></p>,
    term: 'S25',
    tags: ['math'],
    fade_in: 0.25,
    description: (
      <>
        <p>
          Since I was working as a research assistant at CMU over the summer, I had the opportunity to take classes at CMU over the summer alongside my work as a research assistant. I opted to take 21-325 <span className='font-medium'>Probability Theory</span> as it was a prerequisite for future machine learning courses. I ended up greatly enjoying the course's mathematically rigorous approach to probability theory. Further, due to this course, I've finally started attending professor office hours.
        </p>
      </>
    ),
  },
  {
    slug: 'Spring25',
    name: 'Spring 2025',
    image: systems_img,
    image_caption: 'CSAPP Cover (Memory Mountain) | Source: Bryant & O\'Hallaron',
    date: '6 Courses',
    time: '5 Minute Read',
    summary: <p>15-213 <span className='font-medium'>Intro to Computer Systems</span><br/>15-150 <span className='font-medium'>Principles of Functional Programming</span><br /> 21-259 <span className='font-medium'>Calculus in Three Dimensions</span> <br />21-241 <span className='font-medium'>Matrices and Linear Transformations</span> </p>,
    term: 'S25',
    fade_in: 0.5,
    tags: ['computer systems', 'math', 'functional programming'],
    description: (
      <>
        <ul style={{ listStyleType: 'circle' }}>
          <li>15-213 <span className='font-medium'>Intro to Computer Systems</span><br />         
          <p>
          15213 has been my favorite course at CMU so far. The course is very project-focused, with the majority of a student's grades coming from labs like the Malloc lab or Web proxy lab. I enjoyed this aspect of the course as it challenged me to reason about design choices and debug with intent. Further, the course covers a wide array of core computer systems concepts, such as        
        </p>
        <ul className="list-disc list-inside ml-4">
          <li>Assembly</li>
          <li>Cache fundamentals & memory hierarchy</li>
          <li>Compiler optimizations & linkers</li>
          <li>System-level signals, and multi-processing</li>
          <li>Virtual memory fundamentals</li>
          <li>Network programming & system I/O</li>
          <li>Concurrency & multi-threading</li>
        </ul> <br /><br />
        </li>
          <li>15-150 <span className='font-medium'>Principles of Functional Programming</span><br />  Functional programming is a type-oriented programming paradigm that emphasizes reasoning about problems mathematically, breaking up code into modular sections, and designing elegant solutions. This course introduced me to numerous functional programming concepts, but the most significant lesson I learned was the importance of visualizing more abstract concepts, such as infinite sequences or trees, when tackling problems. <br /><br /></li>
          <li>21-259 <span className='font-medium'>Calculus in Three Dimensions</span><br /> A strong introduction to foundational multivariable and vector calculus topics with a focus on computational questions. Greatly enjoyable!<br /><br /></li>
          <li>21-241 <span className='font-medium'>Matrices and Linear Transformations</span> <br/>A well-paced introduction to linear algebra with a great balance of computational and proof-based exercises. Greatly enjoyable! <br/> <br/> </li>
          <li>2 general education courses (no notes)</li>
        </ul>
      </>
    ),
  },
  {
    slug: 'Fall24',
    name: 'Fall 2024',
    image: concepts_img,
    image_caption: 'Our 21127 Textbook | Source: Professor Clive Newstead',
    date: '5 Courses',
    time: '2 Minute Read',
    summary: <p>15-122 <span className='font-medium'>Principles of Imperative Computation</span><br />21-127 <span className='font-medium'>Concepts of Mathematics</span></p>,
    term: 'F24',
    fade_in: 0.75,
    tags: ['math', 'data structures'],
    description: (
      <>
        <ul style={{ listStyleType: 'circle' }}>
          <li>15-122 <span className='font-medium'>Principles of Imperative Computation</span><br />15-122 is a standard introductory data structures & algorithms course. The course covers fundamental computer science concepts & familiarizes students with the C programming language. I particularly appreciated the course's emphasis on verifying the correctness of code & I found it very helpful for adjusting to the rigor of CMU's CS curriculum.<br /><br /></li>
          <li>21-127 <span className='font-medium'>Concepts of Mathematics</span> <br/> My first exposure to discrete mathematics; interesting & invaluable for later classes, such as probability and functional programming. <br/> <br/> </li>
          <li>3 general education courses (no notes)</li>
        </ul>
      </>
    ),
  },

];
