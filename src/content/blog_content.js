import mamba from '../images/mamba.jpg'

export const content = [

  // {
  //   slug: 'books',
  //   name: 'Noteworthy Reads',
  //   image: castle_1,
  //   image_caption: 'Hohenzollern Castle | Germany | Source: A. Kniesel',
  //   date: 'Jul 18 2025',
  //   time: '4 minute read',
  //   summary: 'A collection of books & articles that I found particularly interesting',
  //   description: (
  //     <div className='font-light text-gray-700 leading-7'>
  //       <p className='font-medium'>Articles</p>
  //       <ul style={{ listStyleType: 'circle' }}>
  //         <li>
  //           Designing better AI interfaces:{" "}
  //           <a className= "underline text-blue-600 hover:text-blue-800" href="https://deepmind.google/research/publications/106025/">deepmind.google/research/publications/106025/</a>
  //         </li>
  //         <li>
  //           Scaling compute during LLM inference: {" "}
  //           <a className= "underline text-blue-600 hover:text-blue-800" href="https://arxiv.org/pdf/2406.16838">https://arxiv.org/pdf/2406.16838</a>
  //         </li>
  //         <li>
  //           The portfolio that inspired this page:{" "}
  //           <a className= "underline text-blue-600 hover-text-blue-800" href="https://azumbrunnen.me/">https://azumbrunnen.me/</a>
  //         </li>
  //       </ul>
  //       <br></br>
  //       <p className='font-medium'>Books</p>
  //       <ul style={{ listStyleType: 'circle' }}>
  //         <li>Flowers for Algernon by Daniel Keyes: my favorite book</li>
  //         <li>Computer Systems: A Programmer's Perspective by Randal E. Bryant and David R. O'Hallaron: Introduced to me at CMU; a great resource for learning about computer systems</li>
  //         <li>Competitive Programmer's Handbook by Antti Laaksonen: my favorite resource for learning about dsa</li>
  //         <li>Zero to One by Peter Thiel: interesting thoughts on innovation and societal trends</li>
  //       </ul>
  //     </div>
  //   ),
  //   tags: ['resources'],
  //   term: '2025',
  //   fade_in : 0.0
  // },
  
  {
    slug: 'mamba',
    name: 'Mamba Papers',
    image: mamba,
    image_caption: 'Black Mamba! | Source: Hendrik van den Berg',
    date: 'December 15th, 2025',
    time: '2 minute read',
    summary: 'A collection of books & articles that I found particularly interesting',
    description: (
      <div className='font-light text-gray-700 leading-7'>
        <p className='font-medium'>Context</p>
        <ul style={{ listStyleType: 'circle' }}>
          <li>
            During the Fall 2025 semester, I took on an independent project in which I applied reinforcement learning as a post-training technique for Mamba-based models. Here are a few interesting papers I read while working on this project, introducing what is the Mamba architecture, what are some pros/cons of this architecture, and how can we improve these models to develop efficient transformer-alternatives. 
          </li>
        </ul>
        <br></br>
        <p className='font-medium'>Books</p>
        <ul style={{ listStyleType: 'circle' }}>
          <li>
            Original Mamba paper:{" "}
            <a className= "underline text-blue-600 hover-text-blue-800" href="https://arxiv.org/abs/2312.00752">Mamba: Linear-Time Sequence Modeling with Selective State Spaces</a>
          </li>
          <li>
            Mamba2:{" "}
            <a className= "underline text-blue-600 hover-text-blue-800" href="https://arxiv.org/abs/2405.21060">Transformers are SSMs: Generalized Models and Efficient Algorithms Through Structured State Space Duality </a>
          </li>
          <li>
            Extending long-context performance:{" "}
            <a className= "underline text-blue-600 hover-text-blue-800" href="https://arxiv.org/abs/2410.07145">Stuffed Mamba: Oversized States Lead to the Inability to Forget </a>
          </li>
          <li>
            Llama meets Mamba:{" "}
            <a className= "underline text-blue-600 hover-text-blue-800" href="https://arxiv.org/abs/2408.15237">The Mamba in the Llama: Distilling and Accelerating Hybrid Models </a>
          </li>
          <li>
            Fine-tuning for Mamba:{" "}
            <a className= "underline text-blue-600 hover-text-blue-800" href="https://arxiv.org/abs/2411.03855">MambaPEFT: Exploring Parameter-Efficient Fine-Tuning for Mamba </a>
          </li>
        </ul>
      </div>
    ),
    tags: ['mamba'],
    term: '2025',
    fade_in : 0.0
  },
];

