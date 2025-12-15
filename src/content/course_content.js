import ai_eff from '../images/ai_efficient.png'
import concepts_img from '../images/21127.png'
import systems_img from '../images/213.png'
import bunny_img from '../images/bunny.png'

export const content = [
  {
    slug: 'Fall2025',
    name: 'Fall 2025',
    image: ai_eff,
    image_caption: 'AI progress, for a semester of personal progress in AI | Source: 2025 AI Index Report',
    date: '4 Courses',
    time: '6 Minute Read',
    tags: ['ai'],
    summary: (
      <p>
        10701 <span className='font-medium'>Intro to Machine Learning </span> (PhD)<br />
        11711 <span className='font-medium'>Advanced Natural Language Processing </span> (PhD)<br />
        11785 <span className='font-medium'>Intro to Deep Learning </span> (PhD)<br />
        15281 <span className='font-medium'>AI: Representation and Problem Solving</span><br />
      </p>
    ),
    term: 'F25',
    fade_in: 0.0,
    description: (
    <ul style={{ listStyleType: 'circle' }}>
      <li>
        <span className='font-medium'>Intro to Machine Learning (PhD)</span><br />
        10-701 aims to introduce students to a wide array of machine learning concepts. While this emphasis on breadth provides valuable exposure, it necessitates a very fast pace, even by CMU standards. For example, within a single lecture, I found myself learning about both transformers and k-means clustering. As such, I'd advise students to only take this course if they have enough time to explore the ideas introduced in lectures in greater depth outside of class.  <br /> <br />
      </li>
      <li>
        <span className='font-medium'>Natural Language Processing (PhD)</span><br />
          11-711 is a particularly well-structured course that presents core ideas and challenges in natural language processing (NLP) with exceptional clarity. The stellar lectures, supplementary readings, and strong TA support make these concepts understable, even if students lack prior machine learning experience. Additionally, the emphasis on both assigned and independent projects makes the course rewarding for students interested in either building NLP systems or pursuing NLP research.<br /> <br />
      </li>
      <li>
        <span className='font-medium'>Artificial Intelligence</span><br />
        15-281 was an enjoyable complementary class to 10-701. However, I believe that CMU is altering its introductory machine learning classes, so this class likely won't be offered again at CMU. <br /> <br />
      </li>
      <li>
        <span className='font-medium'>Intro to Deep Learning (PhD)</span><br />
        11-785 is one of CMU’s most popular deep learning courses, and its reputation is well deserved. The lecturers are accomplished researchers, the teaching assistants are highly knowledgeable, and the assignments and quizzes are challenging learning experiences. However, I felt that this course requires over 20 hours a week to deeply understand the material and complete assignments, so I'd advise students to avoid taking 11-785 with other challenging technical classes, like 10-701. <br /> <br />
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
          Before taking 21-325 <span className='font-medium'>Probability Theory</span>, I'd always felt shaky about probability as a concept since most of my understanding of probability was based on intuition. However, this course's mathematically rigorous approach to probability theory helped me establish a strong foundation in the subject, which has proved invaluable in later machine learning courses. 
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
          I view 15-213 as one of CMU's best stuctured courses. 15-213 covers multiple core computer systems concepts, such as linkers, virtual memory, concurrency, network programming, etc. Covering such a breadth of content is very difficult, but the course effectively introduces these topics through thorough lecture slides, a great supplementary textbook in 'Computer Systems: A Programmer's Perspective', and highly interesting labs that push students to use the ideas introduced within lectures. 
          </p>
        <br />
        </li>
          <li>15-150 <span className='font-medium'>Principles of Functional Programming</span><br />  Functional programming is a type-oriented programming paradigm that emphasizes reasoning about problems mathematically, breaking up code into modular sections, and designing elegant solutions. I greatly enjoyed working within this paradigm as it improved my ability to visualize abstract concepts, such as infinite sequences or trees, when tackling problems. <br /><br /></li>
          <li>21-259 <span className='font-medium'>Calculus in Three Dimensions</span><br /> CMU offers multiple versions of multivariable calculus. While I enjoyed 21-259, I felt that it didn't fully prepare me for later courses (such as graduate courses in machine learning), so I'd recommend that students with a strong mathematical background take a faster-paced course, such as 21-266 Vector Calculus using Matrix Algebra. <br /><br /></li>
          <li>21-241 <span className='font-medium'>Matrices and Linear Transformations</span> <br/>A well-paced introduction to linear algebra; greatly enjoyable. <br/> <br/> </li>
          <li>2 general education courses (no notes)</li>
        </ul>
      </>
    ),
  },
  {
    slug: 'Fall24',
    name: 'Fall 2024',
    image: concepts_img,
    image_caption: '21-127 Textbook | Source: Professor Clive Newstead',
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
          <li>21-127 <span className='font-medium'>Concepts of Mathematics</span> <br/> 21-127 is generally a student's first introduction to discrete math and mathematical proofs. These concepts underpin CMU's computer science currciulum, so this is arguably the most critcial course students interested in computer science take at CMU. <br/> <br/> </li>
          <li>3 general education courses (no notes)</li>
        </ul>
      </>
    ),
  },

];
