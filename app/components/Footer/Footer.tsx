import { Link } from "react-router";



export default function Footer() {
  return (
    <footer className="mt-auto pt-6 pb-6 px-4 bg-black">
      <div className="max-w-screen-lg mx-auto text-center text-white">
        <p className="text-sm">
          © {new Date().getFullYear()} Fish & Fig
        </p>

        <p className="text-sm mt-2">
          <Link to="/about" className="hover:underline">
            About Us
          </Link>
          {' | '}
          <Link to="/contact" className="hover:underline">
            Contact
          </Link>
        </p>

        <p className="text-sm pt-4">
          Designed by: Danphil Daniel
        </p>
      </div>
    </footer>
  );
}
