import NavBar from "../NavBar/NavBar";
import Footer from "../Footer/Footer";

export default function Layout({ children }) {
  return (
    <>
      <NavBar />
      <div className="main-content min-h-screen">{children}</div>
      <Footer />
    </>
  );
}
