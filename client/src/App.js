// import './App.css';
import Hero from './Components/Hero';
import SignUp from './pages/SignUp';
import LoginPage from './pages/LoginPage';
import { Toaster } from 'react-hot-toast';
import Carousel from './Components/Carousel';
import Card from './Components/Card'
import Testimonal from './Components/Testimonal';
import './Components/styles.css';

function App() {
  return (
    <div className="App">
      <Hero />
      {/* <Info /> */}
      {/* <SignUp /> */}
      <LoginPage />
      <Toaster />
      <Carousel />
      <Card />
      <Testimonal />
    </div>
  );
}

export default App;
