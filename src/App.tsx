import { BrowserRouter, Routes, Route } from "react-router-dom";

// Vite base URL
const basePath = import.meta.env.BASE_URL;

const App = () => {
  return (
    <BrowserRouter basename={basePath}>
      <Routes>
        <Route path="/" element={<h1>Hello, world!</h1>} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
