import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <div
      data-testid="footer-container"
      className="bg-black text-white p-4 mt-8"
    >
      <h2 className="text-2xl font-bold mb-4">Reach Us</h2>
      <p className="mb-2">Email: info@eshopzz.com</p>
      <p className="mb-2">Phone: +1234567890</p>
      <p className="mb-2">Address: 123 Main St, Anytown, USA</p>
      <div className="flex items-center justify-center gap-2">
        <FaFacebook className="text-2xl" />
        <FaTwitter className="text-2xl" />
        <FaInstagram className="text-2xl" />
        <FaLinkedin className="text-2xl" />
      </div>
    </div>
  );
};

export default Footer;
