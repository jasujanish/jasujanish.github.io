import ReactDOM from 'react-dom/client';
import './App.css';

function Page() {
  return (
    <main>
      <h1>Nishchay Jasuja</h1>
      <p>
        I'm a current student at Carnegie Mellon University and a prior intern at Amazon.<br></br>
        I'm interested in autonomous agents, computer systems, and reinforcement learning. 
      </p>
      <nav>
        <a href="https://linkedin.com/in/nishchay-j/" target="_blank" rel="noopener noreferrer">Linkedin</a>
        <a href="https://github.com/jasujanish" target="_blank" rel="noopener noreferrer">Github</a>
      </nav>
    </main>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<Page />);
