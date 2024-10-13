import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import DetailPage from './pages/Detail_page';
import Home_page from './pages/Home_page';
import Not_found_page from './pages/Not_found_page';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home_page />} />
        <Route path="*" element={<Not_found_page heading_name="404 - Page Not Found" />} />
        <Route path="/surat/:id" element={<DetailPage />} />
      </Routes>
    </Router>
  );
};

export default App;
