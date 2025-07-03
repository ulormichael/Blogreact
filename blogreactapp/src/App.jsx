import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from "./pages/Home/Home.jsx";
import About from "./pages/About/About.jsx";
import Header from "./components/Header/Header.jsx";
import Footer from "./components/Footer/Footer.jsx";
function App() {
  return (
    <div>
        <Router>
            <Header />
            <Routes>
                <Route path="/home" element={<Home />} />
                <Route path="/about" element={<About />} />
            </Routes>
            <Footer />
        </Router>
    </div>
  )
}

export default App;