import { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Layout from "./components/Layout";
import "./App.css";
import Loader from './components/Loader'

// Lazy load all pages
const Home = lazy(() => import("./pages/Home"));
const Login = lazy(() => import("./pages/Login"));
const Register = lazy(() => import("./pages/Register"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const BlogList = lazy(() => import("./pages/Blogs/BlogList"));
const CreateBlog = lazy(() => import("./pages/Blogs/CreateBlog"));
const BlogDetails = lazy(() => import("./pages/Blogs/BlogDetails"));
const EditBlog = lazy(() => import("./pages/Blogs/EditBlog"));

export default function App() {
  return (
    <div className="max-w-4xl mx-auto">
      <Layout>
        <Suspense fallback={<Loader/>}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/blogs" element={<BlogList />} />
            <Route path="/blogs/create" element={<CreateBlog />} />
            <Route path="/blogs/:id" element={<BlogDetails />} />
            <Route path="/blogs/:id/edit" element={<EditBlog />} />
          </Routes>
        </Suspense>
      </Layout>

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover
        theme="dark"
        limit={3}
        toastClassName="custom-toast"
        bodyClassName="custom-toast-body"
        progressClassName="custom-progress-bar"
      />
    </div>
  );
}
