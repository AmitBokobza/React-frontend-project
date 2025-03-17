import { FunctionComponent, useContext } from "react";
import { ThemeContext } from "./Provider/ThemeProvider";

interface AboutProps {}

const About: FunctionComponent<AboutProps> = () => {
  const { theme } = useContext(ThemeContext);

  return (
    <>
      <div
        className={`flex flex-col items-center justify-center min-h-screen bg-${
          theme === "dark" ? "gray-900" : "gray-100"
        } p-6 `}
      >
        <div
          className={`max-w-4xl text-center bg-${
            theme === "dark" ? "gray-800" : "white"
          } shadow-lg p-8 rounded-lg card` }
        >
          <h1
            className={`text-4xl font-bold mb-4 text-${
              theme === "dark" ? "white" : "gray-900"
            }`}
          >
            About Us
          </h1>
          <p
            className={`text-lg mb-6 text-${
              theme === "dark" ? "gray-300" : "gray-800"
            }`}
          >
            Welcome to <strong>AmitBusiness</strong>, your ultimate platform
            for creating and displaying digital business cards. Whether you're a
            professional looking to showcase your contact information or a
            business wanting to create cards for your employees, our site makes
            it easy and efficient to share your details.
          </p>

          <h2
            className={`text-2xl font-semibold mb-4 text-${
              theme === "dark" ? "white" : "gray-900"
            }`}
          >
            Our Mission
          </h2>
          <p
            className={`text-lg mb-6 text-${
              theme === "dark" ? "gray-300" : "gray-800"
            }`}
          >
            Our mission is to provide a seamless way for individuals and
            businesses to create, share, and manage their business cards online.
            We believe in the power of digital connections, and we aim to make
            networking easier, faster, and more sustainable.
          </p>

          <h2
            className={`text-2xl font-semibold mb-4 text-${
              theme === "dark" ? "white" : "gray-900"
            }`}
          >
            What We Offer
          </h2>
          <ul
            className={`list-disc pl-6 text-lg mb-6 text-${
              theme === "dark" ? "gray-300" : "gray-800"
            }`}
          >
            <li>Create and customize your own digital business cards.</li>
            <li>Share your card through links, QR codes, or social media.</li>
            <li>Search and explore business cards from other users.</li>
            <li>
              Manage multiple cards for different business roles or locations.
            </li>
          </ul>

          <h2
            className={`text-2xl font-semibold mb-4 text-${
              theme === "dark" ? "white" : "gray-900"
            }`}
          >
            Why Choose Us?
          </h2>
          <p
            className={`text-lg mb-6 text-${
              theme === "dark" ? "gray-300" : "gray-800"
            }`}
          >
            - Easy to use: Create and manage your cards with a few clicks.{" "}
            <br />
            - Customizable: Tailor your card to match your personal or company
            branding. <br />
            - Accessible: Your digital business card is always at your
            fingertips, available to share anywhere, anytime. <br />-
            Eco-friendly: Go paperless and reduce your carbon footprint by
            choosing digital business cards.
          </p>

          <h2
            className={`text-2xl font-semibold mb-4 text-${
              theme === "dark" ? "white" : "gray-900"
            }`}
          >
            Join Us Today
          </h2>
          <p
            className={`text-lg mb-6 text-${
              theme === "dark" ? "gray-300" : "gray-800"
            }`}
          >
            Ready to create your digital business card? Sign up now and start
            building your card today. Let’s make connections that matter!
          </p>

          <p
            className={`text-sm text-${
              theme === "dark" ? "gray-500" : "gray-600"
            }`}
          >
            © 2025 AmitBusiness
          </p>
        </div>
      </div>
    </>
  );
};

export default About;
