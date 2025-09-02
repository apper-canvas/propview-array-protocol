import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Header from "@/components/organisms/Header";
import Browse from "@/components/pages/Browse";
import PropertyDetail from "@/components/pages/PropertyDetail";
import Saved from "@/components/pages/Saved";

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-background">
        <Header />
        
        <Routes>
          <Route path="/" element={<Browse />} />
          <Route path="/property/:id" element={<PropertyDetail />} />
          <Route path="/saved" element={<Saved />} />
        </Routes>

        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
          toastClassName="custom-toast"
          bodyClassName="custom-toast-body"
          progressClassName="custom-toast-progress"
        />
      </div>
    </BrowserRouter>
  );
}

export default App;