import Navbar from "./Navbar";

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen bg-[#121212] text-gray-200">
      <Navbar />
      <main className="pt-6 max-w-7xl mx-auto">{children}</main>
      {/* <main className="pt-20 max-w-7xl mx-auto">{children}</main> */}

    </div>
  );
};

export default Layout;
