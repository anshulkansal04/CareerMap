import './App.css';
import Hero from './Components/Hero';
import Info from './pages/Info';
import SignUp from './pages/SignUp';
import LoginPage from './pages/LoginPage';
import { Toaster } from 'react-hot-toast';
import Carousel from './Components/Carousel';
import Card from './Components/Card'

function App() {
  return (
    <div className="App">
      {/* <Hero />
      <Info /> */}
      {/* <SignUp /> */}
      <LoginPage />
      <Toaster />
      <Carousel />
      <Card />
    </div>
  );
}

export default App;
