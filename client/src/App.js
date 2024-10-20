import './App.css';
import Hero from './Components/Hero';
import Info from './pages/Info';
import SignUp from './pages/SignUp';
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <div className="App">
      {/* <Hero />
      <Info /> */}
      <SignUp />
      <Toaster />
    </div>
  );
}

export default App;
