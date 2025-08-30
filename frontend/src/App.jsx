import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import RippleGrid from "./components/RippleGrid";
import { Particles } from "react-tsparticles";
import Loader from "./components/Loader";
import emailjs from "@emailjs/browser";
import { Helmet } from "react-helmet-async";
import ai from "./assets/ai.jpg";
import ai2 from "./assets/ai2.jpg";
// import quoteImage from "./assets/quote-generator.webp";
// import currency from "./assets/currency-converter-project.webp";
// import portfolioImage from "./assets/github-profile-finder-app.webp";
// import profilePic from "./assets/hassan-khan-fullstack-developer.webp";
// import certificate from "./assets/sololearn-web-dev-certificate.webp";
// import college from "./assets/unnamed.webp";
// import test from "./assets/speed-type-test-app.webp";
// import task from "./assets/task-manager-app.webp";
// import quiz from "./assets/quiz-app.webp";
// import color from "./assets/color-palette-app-HassanKhan.webp";
// import expense from "./assets/expense-app.webp";

import {
  FaEnvelope,
  FaInstagram,
  FaHtml5,
  FaCss3Alt,
  FaJsSquare,
  FaMapMarkerAlt,
  FaMoon,
  FaSun,
  FaWhatsapp,
  FaSearch,
  FaPaintBrush,
  FaBrain,
  FaPenFancy,
  FaPalette,
  FaChartLine,
  FaPython,
  FaCode,
  FaDatabase,
} from "react-icons/fa";

// import {
//   SiTailwindcss,
//   SiMongodb,
//   SiExpress,
//   SiPostman,
//   SiRedux,
//   SiTypescript,
//   SiNextdotjs,
//   SiFramer,
//   SiSocketdotio,
//   SiJsonwebtokens,
// } from "react-icons/si";
// Initialize EmailJS once (must be outside the component)
emailjs.init("Rfc7bLUWc-ETdhlWK");

function App() {
  const formRef = useRef(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const Picture = "https://iili.io/Kd7KdiX.md.jpg"; // Updated image URL
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("darkMode") === "enabled"
  );
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  // Loader timeout
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 4500);
    return () => clearTimeout(timer);
  }, []);

  // useEffect(() => {
  //   console.log("i will run on every render");
  //  }); // use this to slow your website 😁

  // Typewriter effect
  // Typewriter effect (no re-render on each letter)
  const lines = [
    "Creative Graphic Designer",
    "Innovative Brand Builder",
    "Results-Driven SEO Optimizer",
    "Engaging Visual Storyteller",
  ];
  const [typedText, setTypedText] = useState("");
  const [lineIndex, setLineIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);

  useEffect(() => {
    const currentLine = lines[lineIndex];

    if (charIndex < currentLine.length) {
      const timeout = setTimeout(() => {
        setTypedText((prev) => prev + currentLine[charIndex]);
        setCharIndex((prev) => prev + 1);
      }, 70);
      return () => clearTimeout(timeout);
    } else {
      // Wait before going to next line
      const timeout = setTimeout(() => {
        setTypedText("");
        setCharIndex(0);
        setLineIndex((prev) => (prev + 1) % lines.length); // loop lines
      }, 1000);
      return () => clearTimeout(timeout);
    }
  }, [charIndex, lineIndex, lines]);
  // Dark mode on load
  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);
  // email
  // email sender
  const handleSubmit = async (e) => {
    e.preventDefault();
    alert("📤 Sending message...");

    const formData = new FormData(formRef.current);
    const name = formData.get("user_name");
    const email = formData.get("user_email");
    const subject = formData.get("subject");
    const message = formData.get("message");

    try {
    const res = await fetch("http://localhost:5000/api/send-message", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, subject, message }),
    });
      const data = await res.json(); // ✅ Only parse once
      console.log(data);

      if (data.success) {
        alert(`✅ Message sent successfully! Wait for my reply, ${name}.`);
        formRef.current.reset();
      } else {
        throw new Error(data.error || "Unknown error");
      }
    } catch (error) {
      console.error("❌ Error:", error);
      alert("❌ Failed to send message. Please try again later.");
    }
  };

  // Animate on scroll
  useEffect(() => {
    const animatedElements = document.querySelectorAll(".animate-on-scroll");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("opacity-100", "translate-y-0");
          }
        });
      },
      { threshold: 0.1 }
    );

    animatedElements.forEach((el) => {
      el.classList.add(
        "opacity-0",
        "translate-y-10",
        "transition-all",
        "duration-700"
      );
      observer.observe(el);
    });

    return () => {
      animatedElements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  // Smooth scroll
  useEffect(() => {
    const handleSmoothScroll = (e) => {
      const targetId = e.currentTarget.getAttribute("href");
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        window.scrollTo({
          top: target.offsetTop - 80,
          behavior: "smooth",
        });
        setIsMobileMenuOpen(false);
      }
    };

    const anchors = document.querySelectorAll('a[href^="#"]');
    anchors.forEach((anchor) => {
      anchor.addEventListener("click", handleSmoothScroll);
    });

    return () => {
      anchors.forEach((anchor) => {
        anchor.removeEventListener("click", handleSmoothScroll);
      });
    };
  }, []);

  // Dark mode toggle
  // const handleThemeToggle = () => {
  //   const newDarkMode = !darkMode;
  //   setDarkMode(newDarkMode);
  //   document.documentElement.classList.toggle("dark", newDarkMode);
  //   localStorage.setItem("darkMode", newDarkMode ? "enabled" : "disabled");

  //   try {
  //     new Audio("/click.mp3").play().catch(() => {});
  //     if ('vibrate' in navigator) navigator.vibrate(250);
  //   } catch (e) {
  //     console.log("Toggle error:", e);
  //   }
  // };

  // Loader
  if (isLoading) {
    return <Loader theme={darkMode ? "dark" : "light"} />;
  }
  return (
    <div className="font-sans transition-colors duration-300 bg-section1 text-dark dark:bg-dark dark:text-white">
      <Helmet>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Usama Khan – Creative Graphic Designer | SEO Expert</title>
        <meta
          name="description"
          content="Usama Khan – Creative Graphic Designer and SEO Expert. Explore professional branding, visual storytelling, and SEO strategies to enhance your digital presence."
        />
        <meta
          name="keywords"
          content="Usama Khan, Graphic Designer, SEO Expert, Brand Builder, Visual Storyteller, Creative Designer Portfolio, SEO Strategies, Branding"
        />
        <meta name="author" content="Usama Khan" />
        <link
          rel="canonical"
          href="https://usama-khan-portfolio.netlify.app/"
        />

        {/* Open Graph / Social Sharing */}
        <meta
          property="og:title"
          content="Usama Khan Portfolio – Graphic Designer & SEO Expert"
        />
        <meta
          property="og:description"
          content="Discover Usama Khan's creative portfolio showcasing graphic design, branding expertise, and SEO-driven digital strategies."
        />
        <meta property="og:image" content="https://iili.io/FmQU9ea.jpg" />
        <meta
          property="og:image:alt"
          content="Portfolio preview of Usama Khan – Graphic Designer & SEO Expert"
        />
        <meta
          property="og:url"
          content="https://usama-khan-portfolio.netlify.app/"
        />
        <meta property="og:type" content="website" />

        {/* Structured Data */}
        <script type="application/ld+json">
          {`
      {
        "@context": "https://schema.org",
        "@type": "Person",
        "name": "Usama Khan",
        "jobTitle": "Graphic Designer & SEO Expert",
        "url": "https://usama-khan-portfolio.netlify.app",
        "sameAs": [
          "https://wa.me/923001234567",
          "https://www.instagram.com/its_digiace?igsh=MWMyeGdyOGdhejJvNA=="
        ],
        "contactPoint": {
          "@type": "ContactPoint",
          "contactType": "Portfolio Inquiries",
          "email": "uk9711680@gmail.com"
        }
      }
    `}
        </script>
      </Helmet>
      {/* HEADER */}
      <header className="fixed top-0 left-0 z-50 w-full transition-all shadow-sm dark:bg-slate-900/95">
        <div className="container flex items-center justify-between px-5 py-4 mx-auto">
          {/* LOGO */}
          <div className="text-xl font-bold dark:text-white">
            <a href="#home" className="text-dark dark:text-light">
              Usama<span className="text-primary">Khan</span>
            </a>
          </div>

          {/* NAVIGATION */}
          <ul
            className={`${
              isMobileMenuOpen ? "flex" : "hidden"
            } fixed top-0 left-0 z-40 flex-col items-center justify-center w-full h-screen gap-8 font-medium text-xl bg-white text-dark dark:bg-dark dark:text-white md:static md:h-auto md:w-auto md:flex md:flex-row md:bg-transparent md:dark:bg-transparent`}
          >
            <li>
              <a
                href="#about"
                className="relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-primary after:transition-all hover:after:w-full hover:after:shadow-[0_0_10px] hover:after:shadow-primary"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                About
              </a>
            </li>
            <li>
              <a
                href="#skills"
                className="relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-primary after:transition-all hover:after:w-full hover:after:shadow-[0_0_10px] hover:after:shadow-primary"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Skills
              </a>
            </li>
            <li>
              <a
                href="#seo-projects"
                className="relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-primary after:transition-all hover:after:w-full hover:after:shadow-[0_0_10px] hover:after:shadow-primary"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Projects
              </a>
            </li>
            <li>
              <a
                href="#contact"
                className="relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-primary after:transition-all hover:after:w-full hover:after:shadow-[0_0_10px] hover:after:shadow-primary"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Contact
              </a>
            </li>
          </ul>

          {/* THEME TOGGLE + HAMBURGER */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => {
                const newDarkMode = !darkMode;
                setDarkMode(newDarkMode);
                document.documentElement.classList.toggle("dark", newDarkMode);
                localStorage.setItem(
                  "darkMode",
                  newDarkMode ? "enabled" : "disabled"
                );

                // Play sound
                try {
                  new Audio("/click.mp3").play();
                  if ("vibrate" in navigator) navigator.vibrate(250);
                } catch (err) {
                  console.log("Error:", err);
                }
              }}
              className="relative w-10 h-10"
              aria-label={
                darkMode ? "Switch to light mode" : "Switch to dark mode"
              }
            >
              <FaMoon className="block dark:hidden" />
              <FaSun className="hidden text-yellow-400 dark:block" />
            </button>
            <button
              onClick={toggleMobileMenu}
              className="hamburger md:hidden flex flex-col justify-between w-8 h-5 cursor-pointer z-[1001]"
              aria-label="Toggle menu"
              aria-expanded={isMobileMenuOpen}
            >
              <span
                className={`line w-full h-0.5 bg-dark transition-all dark:bg-light ${
                  isMobileMenuOpen ? "transform rotate-45 translate-y-2" : ""
                }`}
              ></span>
              <span
                className={`line w-full h-0.5 bg-dark transition-all dark:bg-light ${
                  isMobileMenuOpen ? "opacity-0" : ""
                }`}
              ></span>
              <span
                className={`line w-full h-0.5 bg-dark transition-all dark:bg-light ${
                  isMobileMenuOpen ? "transform -rotate-45 -translate-y-2" : ""
                }`}
              ></span>
            </button>
          </div>
        </div>
      </header>
      {/* main */}
      <main>
        {/* HERO SECTION */}
        <section
          id="home"
          className="relative flex items-center min-h-[110vh] pt-5 overflow-hidden bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-slate-900 dark:to-slate-950"
          aria-label="Usama Khan - Professional Portfolio"
        >
          {/* Background Layers */}
          <div
            className="absolute inset-0 z-0 w-full h-full"
            aria-hidden="true"
          >
            {/* RippleGrid Background */}
            <RippleGrid
              enableRainbow={false}
              gridColor={darkMode ? "rgba(147, 197, 253, 0.85)" : "#2563eb"}
              rippleIntensity={darkMode ? 0.1 : 0.05}
              gridSize={10}
              gridThickness={darkMode ? 18 : 15}
              mouseInteraction={true}
              mouseInteractionRadius={1.2}
              opacity={darkMode ? 0.2 : 0.05}
              glowIntensity={darkMode ? 0.25 : 0}
              fadeDistance={darkMode ? 1.3 : 1.5}
            />

            {/* Particle Background */}
            <div
              className="absolute inset-0 opacity-30 dark:opacity-20"
              aria-hidden="true"
            >
              <Particles
                id="tsparticles"
                options={
                  {
                    /* ... (keep existing particle options) ... */
                  }
                }
              />
            </div>
          </div>

          <div className="container relative z-10 flex flex-col items-center px-5 py-16 mx-auto md:flex-row">
            {/* Main Content */}
            <article className="mb-12 text-center hero-content md:w-3/5 md:mb-0 md:pr-12 md:text-left">
              <header>
                <motion.div
                  className="inline-flex items-center px-4 py-2 mb-4 space-x-2 text-sm font-medium rounded-full bg-primary/10 text-primary"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  <span className="relative flex w-2 h-2">
                    <span className="absolute inline-flex w-full h-full rounded-full opacity-75 animate-ping bg-primary/80"></span>
                    <span className="relative inline-flex w-2 h-2 rounded-full bg-primary"></span>
                  </span>
                  <span>Leading Digital Innovation at Digiace</span>
                </motion.div>

                <motion.h1
                  className="mb-4 text-4xl font-bold leading-tight tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white"
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                >
                  <motion.span
                    className="block mb-2 text-lg font-medium tracking-wider text-primary"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                  >
                    Hi, I'm
                  </motion.span>
                  Usama Khan
                  <motion.span
                    className="relative inline-block ml-2"
                    initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
                    animate={{ opacity: 1, scale: 1, rotate: 0 }}
                    transition={{ duration: 0.7, delay: 0.8, type: "spring" }}
                  >
                    <span className="relative z-10">Founder of</span>
                    <span className="absolute bottom-0 left-0 w-full h-3 -skew-x-6 bg-primary/30 -rotate-1"></span>
                  </motion.span>
                  <motion.span
                    className="block md:inline"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 1 }}
                  >
                    {" "}
                    Digiace
                  </motion.span>
                </motion.h1>

                <motion.h2
                  id="typewriter-text"
                  className="mb-8 text-xl font-medium tracking-wide text-gray-600 md:text-2xl lg:text-3xl dark:text-gray-300"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: 1.2 }}
                  aria-live="polite"
                >
                  {typedText}
                  <span className="inline-block w-[2px] h-8 bg-primary dark:bg-primary-light animate-pulse ml-1 align-middle">
                    <span className="sr-only">Cursor</span>
                  </span>
                </motion.h2>
              </header>

              <section>
                <motion.p
                  className="mb-10 text-lg leading-relaxed text-gray-700 dark:text-gray-400 max-w-[600px]"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 1.4 }}
                >
                  Leading{" "}
                  <strong className="text-primary dark:text-primary-light">
                    Digiace
                  </strong>{" "}
                  to create visually stunning designs and optimize digital
                  presence with expertise in{" "}
                  <strong className="relative px-1 font-medium text-primary dark:text-primary-light before:absolute before:inset-0 before:bg-primary/10 before:-z-10 before:-skew-x-6 before:-rotate-1">
                    Adobe Creative Suite, SEO strategies, and data-driven
                    analytics
                  </strong>
                  . We transform brands into visually compelling and highly
                  discoverable digital experiences.
                </motion.p>

                {/* CTA Buttons */}
                <motion.nav
                  className="flex flex-wrap justify-center gap-4 md:justify-start"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 1.6 }}
                >
                  <motion.a
                    href="#contact"
                    className="relative px-8 py-3 font-semibold text-white transition-all duration-300 rounded-full shadow-lg group bg-gradient-to-r from-primary to-primary-dark hover:shadow-xl hover:scale-105"
                    aria-label="Contact Usama Khan"
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span className="relative z-10">Contact Me</span>
                    <span className="absolute inset-0 transition-opacity duration-300 rounded-full opacity-0 group-hover:opacity-100 bg-gradient-to-r from-primary-dark to-primary"></span>
                  </motion.a>
                  <motion.a
                    href="#seo-projects"
                    className="relative px-8 py-3 font-semibold transition-all duration-300 bg-transparent border-2 rounded-full shadow-sm group text-primary border-primary hover:bg-primary hover:text-white hover:shadow-md hover:scale-105"
                    aria-label="View Digiace Projects"
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span className="relative z-10">View Projects</span>
                    <span className="absolute inset-0 transition-opacity duration-300 rounded-full opacity-0 bg-primary group-hover:opacity-100"></span>
                  </motion.a>
                </motion.nav>
              </section>

              {/* Social Links */}
              <motion.nav
                className="flex justify-center gap-4 mt-12 md:justify-start"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.7, delay: 1.8 }}
                aria-label="Social Media Links"
              >
                {[
                  {
                    icon: <FaEnvelope aria-hidden="true" />,
                    href: "mailto:uk9711680@gmail.com",
                    label: "Email",
                  },
                  {
                    icon: <FaInstagram aria-hidden="true" />,
                    href: "https://www.instagram.com/its_digiace/?igsh=MWMyeGdyOGdhejJvNA%3D%3D#",
                    label: "Instagram Profile",
                  },
                  {
                    icon: <FaWhatsapp aria-hidden="true" />,
                    href: "https://wa.me/923174559088",
                    label: "Whatsapp Number",
                  },
                ].map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`relative flex items-center justify-center w-12 h-12 transition-all duration-300 group rounded-full ${
                      darkMode
                        ? "bg-gray-800 text-primary-light hover:bg-primary/90"
                        : "bg-white text-primary hover:bg-primary/90"
                    } shadow-md hover:shadow-lg hover:scale-110`}
                    aria-label={social.label}
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 2 + index * 0.1 }}
                    whileHover={{
                      scale: 1.15,
                      rotate: 5,
                      transition: { duration: 0.3 },
                    }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <div
                      className={`${
                        darkMode
                          ? "text-primary-light group-hover:text-white"
                          : "text-primary group-hover:text-white"
                      }`}
                    >
                      {social.icon}
                    </div>
                  </motion.a>
                ))}
              </motion.nav>
            </article>

            {/* Profile Image */}
            <motion.figure
              className="flex justify-center mb-24 hero-image md:w-2/5"
              initial={{ opacity: 0, x: 100, rotate: 5 }}
              animate={{ opacity: 1, x: 0, rotate: 0 }}
              transition={{ duration: 1, delay: 0.5, type: "spring" }}
            >
              <div className="relative w-64 h-64 overflow-hidden transition-all duration-500 md:w-80 md:h-80">
                <div
                  className="absolute inset-0 z-0 rounded-full bg-gradient-to-br from-primary to-primary-dark opacity-20 blur-xl animate-pulse"
                  aria-hidden="true"
                ></div>
                <div className="relative z-10 w-full h-full overflow-hidden border-4 border-white rounded-full shadow-2xl dark:border-gray-800">
                  <img
                    src={Picture}
                    alt="Usama Khan, Founder of Digiace - Graphic Designer and SEO Expert"
                    className="object-cover rounded-full w-2/2 h-2/2"
                    width="320"
                    height="320"
                    loading="eager"
                  />
                </div>
                {/* Digiace Badge */}
                <div className="absolute bottom-0 right-0 z-20 px-3 py-1 text-xs font-bold text-white rounded-full shadow-lg bg-gradient-to-r from-primary to-primary-dark">
                  Digiace Founder
                </div>
              </div>
            </motion.figure>
          </div>

          {/* Scroll Button */}
          <motion.nav
            className="absolute bottom-0 z-10 mt-5 transform -translate-x-1/2 left-1/2 animate-bounce"
            initial={{ opacity: 0, y: 20 }}
            animate={{
              opacity: 1,
              y: 0,
              transition: { delay: 2.5, duration: 0.8 },
            }}
          >
            <a
              href="#about"
              className={`
        flex flex-col items-center
        px-4 py-2 rounded-lg
        text-sm font-medium
        transition-all duration-300
        ${
          darkMode
            ? "bg-gray-800/80 text-primary-light backdrop-blur-2xl"
            : "bg-white/80 text-primary backdrop-blur-2xl"
        }
        shadow-lg hover:shadow-xl
      `}
              aria-label="Scroll to About Section"
            >
              <span className="text-xs md:text-sm">Scroll Down</span>
              <svg
                className={`w-4 h-4 mt-1 ${
                  darkMode ? "text-primary-light" : "text-primary"
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 14l-7 7m0 0l-7-7m7 7V3"
                />
              </svg>
            </a>
          </motion.nav>
        </section>
        <section
          id="about"
          className="py-20 bg-section2 dark:bg-slate-900"
          aria-labelledby="about-heading"
        >
          <div className="container px-5 mx-auto">
            <header className="text-center">
              <h2
                id="about-heading"
                className="relative mb-12 text-3xl font-bold md:text-4xl"
              >
                About Me
                <span className="absolute bottom-0 w-24 h-1 mt-2 transform -translate-x-1/2 rounded-full left-1/2 bg-gradient-to-r from-primary to-accent-1"></span>
              </h2>
            </header>

            <article className="flex flex-col gap-12">
              <section className="max-w-4xl mx-auto text-center md:text-left">
                <p className="mb-6 text-lg leading-relaxed text-gray-700 dark:text-gray-300">
                  Hello! I'm{" "}
                  <strong className="font-semibold text-primary">
                    Usama Khan
                  </strong>
                  , the founder of Digiace and a passionate creative
                  professional with expertise in graphic design and search
                  engine optimization. I specialize in transforming brands into
                  visually compelling and highly discoverable digital
                  experiences.
                </p>

                <div className="grid gap-6 mb-8 md:grid-cols-2">
                  <article className="p-6 transition-all bg-white rounded-lg shadow-md dark:bg-slate-700 hover:shadow-lg hover:-translate-y-1">
                    <h3 className="flex items-center mb-3 text-xl font-semibold">
                      <svg
                        className="w-5 h-5 mr-2 text-accent-1"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        aria-hidden="true"
                      >
                        <path
                          fillRule="evenodd"
                          d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z"
                          clipRule="evenodd"
                        />
                      </svg>
                      My Design Philosophy
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      I believe in{" "}
                      <strong className="font-medium">
                        creating visually stunning, user-centered designs
                      </strong>{" "}
                      that not only look beautiful but also communicate
                      effectively and drive results for businesses.
                    </p>
                  </article>

                  <article className="p-6 transition-all bg-white rounded-lg shadow-md dark:bg-slate-700 hover:shadow-lg hover:-translate-y-1">
                    <h3 className="flex items-center mb-3 text-xl font-semibold">
                      <svg
                        className="w-5 h-5 mr-2 text-accent-1"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        aria-hidden="true"
                      >
                        <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
                      </svg>
                      Continuous Learning
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      In the rapidly evolving digital landscape, I dedicate time
                      to{" "}
                      <strong className="font-medium">
                        staying updated with design trends and SEO algorithms
                      </strong>{" "}
                      to ensure my clients get the best possible results.
                    </p>
                  </article>
                </div>
              </section>

              {/* Certification Section */}
              {/* Certification Section */}
              <section
                aria-labelledby="certification-heading"
                className="space-y-8"
              >
                <h3
                  id="certification-heading"
                  className="mb-8 text-2xl font-bold text-center md:text-left"
                >
                  <span className="relative inline-block">
                    Professional Certifications
                    <span className="absolute bottom-0 left-0 w-full h-0.5 -mb-1 bg-gradient-to-r from-primary to-accent-1 rounded-full"></span>
                  </span>
                </h3>

                <div className="grid gap-8 md:grid-cols-2">
                  {/* SEO Certificate */}
                  <article className="overflow-hidden transition-all duration-300 bg-white shadow-lg dark:bg-slate-800 rounded-xl hover:shadow-xl">
                    <div className="flex flex-col">
                      <div className="w-full p-6">
                        <header className="flex items-center justify-between mb-4">
                          <div className="flex items-center gap-3">
                            <div
                              className="p-2 rounded-lg bg-primary/10"
                              aria-hidden="true"
                            >
                              <svg
                                className="w-6 h-6 text-primary"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            </div>
                            <h4 className="text-xl font-bold">
                              SEO Certification
                            </h4>
                          </div>
                          <span className="px-3 py-1 text-sm font-medium rounded-full bg-primary/10 text-primary">
                            2024
                          </span>
                        </header>

                        <p className="mb-4 text-gray-600 dark:text-gray-300">
                          Completed SEO training program at Sexon Academy of
                          Learning, mastering advanced search engine
                          optimization techniques.
                        </p>

                        {/* Key Skills */}
                        <section className="mb-4">
                          <h5 className="mb-2 font-medium text-gray-700 dark:text-gray-200">
                            Key Skills Validated:
                          </h5>
                          <div className="flex flex-wrap gap-2" role="list">
                            {[
                              "Keyword Research",
                              "On-Page Optimization",
                              "Technical SEO",
                              "Analytics",
                            ].map((skill) => (
                              <span
                                key={skill}
                                className="px-2 py-1 text-xs font-medium text-gray-800 bg-gray-100 rounded-full dark:bg-slate-700 dark:text-gray-200"
                                role="listitem"
                              >
                                {skill}
                              </span>
                            ))}
                          </div>
                        </section>

                        {/* Certificate Image */}
                        <figure className="mt-4">
                          <div className="relative flex items-center justify-center p-4 rounded-lg bg-gray-50 dark:bg-slate-900/50">
                            <div className="w-full h-64 overflow-hidden rounded-lg">
                              {" "}
                              {/* increased height */}
                              <img
                                src={ai2}
                                alt="SEO Completion Certificate from Sexon Academy of Learning"
                                className="object-contain w-full h-full"
                              />
                            </div>
                            <button
                              onClick={() => {
                                const link = document.createElement("a");
                                link.href = ai2;
                                link.download =
                                  "SEO-Certificate-Usama-Khan.jpg";
                                document.body.appendChild(link);
                                link.click();
                                document.body.removeChild(link);
                              }}
                              className="absolute p-2 text-white transition-all bg-black rounded-full bottom-4 right-4 bg-opacity-80 hover:bg-opacity-100"
                              aria-label="Download SEO certificate"
                            >
                              <svg
                                className="w-4 h-4"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                                aria-hidden="true"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            </button>
                          </div>
                        </figure>
                      </div>
                    </div>
                  </article>

                  {/* AI Certificate */}
                  <article className="overflow-hidden transition-all duration-300 bg-white shadow-lg dark:bg-slate-800 rounded-xl hover:shadow-xl">
                    <div className="flex flex-col">
                      <div className="w-full p-6">
                        <header className="flex items-center justify-between mb-4">
                          <div className="flex items-center gap-3">
                            <div
                              className="p-2 rounded-lg bg-primary/10"
                              aria-hidden="true"
                            >
                              <svg
                                className="w-6 h-6 text-primary"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            </div>
                            <h4 className="text-xl font-bold">
                              AI Certification
                            </h4>
                          </div>
                          <span className="px-3 py-1 text-sm font-medium rounded-full bg-primary/10 text-primary">
                            2024
                          </span>
                        </header>

                        <p className="mb-4 text-gray-600 dark:text-gray-300">
                          Earned Artificial Intelligence certification from
                          Skill Development Center, University of Punjab,
                          covering fundamental AI concepts and applications.
                        </p>

                        {/* Key Skills */}
                        <section className="mb-4">
                          <h5 className="mb-2 font-medium text-gray-700 dark:text-gray-200">
                            Key Skills Validated:
                          </h5>
                          <div className="flex flex-wrap gap-2" role="list">
                            {[
                              "Machine Learning",
                              "Neural Networks",
                              "AI Ethics",
                              "Data Analysis",
                            ].map((skill) => (
                              <span
                                key={skill}
                                className="px-2 py-1 text-xs font-medium text-gray-800 bg-gray-100 rounded-full dark:bg-slate-700 dark:text-gray-200"
                                role="listitem"
                              >
                                {skill}
                              </span>
                            ))}
                          </div>
                        </section>

                        {/* Certificate Image */}
                        <figure className="mt-4">
                          <div className="relative flex items-center justify-center p-4 rounded-lg bg-gray-50 dark:bg-slate-900/50">
                            <div className="w-full h-64 overflow-hidden rounded-lg">
                              {" "}
                              {/* rectangle box */}
                              <img
                                src={ai}
                                alt="Artificial Intelligence Completion Certificate from University of Punjab"
                                className="object-contain w-full h-full"
                              />
                            </div>
                            <button
                              onClick={() => {
                                const link = document.createElement("a");
                                link.href = ai;
                                link.download = "AI-Certificate-Usama-Khan.jpg";
                                document.body.appendChild(link);
                                link.click();
                                document.body.removeChild(link);
                              }}
                              className="absolute p-2 text-white transition-all bg-black rounded-full bottom-4 right-4 bg-opacity-80 hover:bg-opacity-100"
                              aria-label="Download AI certificate"
                            >
                              <svg
                                className="w-4 h-4"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                                aria-hidden="true"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            </button>
                          </div>
                        </figure>
                      </div>
                    </div>
                  </article>
                </div>
              </section>
            </article>

            {/* Download CV Button */}
            <div className="mt-12 text-center">
              <button
                onClick={() => {
                  alert("It will be available soon");
                }}
                className="inline-flex items-center px-4 py-2 text-sm font-medium text-center transition-colors rounded-lg bg-primary/10 text-primary hover:bg-primary/20"
                aria-label="Download CV (coming soon)"
              >
                Download CV
                <svg
                  className="w-4 h-4 ml-2"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>
          </div>
        </section>
        {/* SKILLS SECTION */}
        <motion.section
          id="skills"
          className="py-20 bg-section3 dark:bg-slate-950"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.4 }}
          viewport={{ once: false, amount: 0.2 }}
          aria-labelledby="skills-heading"
        >
          <div className="container px-5 mx-auto">
            <header className="text-center">
              <motion.h2
                id="skills-heading"
                className="relative mb-12 text-3xl font-bold tracking-tight md:text-4xl font-poppins"
                initial={{ y: -10, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.4 }}
              >
                <span className="relative z-10">
                  Skills & Expertise
                  <motion.span
                    className="absolute bottom-0 w-24 h-1 mt-2 transform -translate-x-1/2 rounded-full left-1/2 bg-gradient-to-r from-primary to-accent-1"
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    transition={{
                      delay: 0.1,
                      duration: 0.4,
                      ease: "easeOut",
                    }}
                    aria-hidden="true"
                  />
                </span>
              </motion.h2>
            </header>

            <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
              {/* Design & SEO Skills Section */}
              <motion.article
                aria-labelledby="design-seo-skills"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1 }}
              >
                <header className="relative group">
                  <motion.h3
                    id="design-seo-skills"
                    className="inline-block mb-8 text-2xl font-semibold tracking-tight text-transparent bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text font-poppins"
                    initial={{ backgroundSize: "0% 100%" }}
                    whileInView={{
                      backgroundSize: "100% 100%",
                      transition: { duration: 0.6, ease: "easeOut" },
                    }}
                  >
                    Design & SEO Expertise
                  </motion.h3>
                </header>

                <motion.ul
                  className="grid grid-cols-2 gap-6 sm:grid-cols-3"
                  role="list"
                  aria-label="Design and SEO skills"
                >
                  {[
                    {
                      icon: (
                        <FaSearch className="text-2xl" aria-hidden="true" />
                      ),
                      label: "SEO Expert",
                      id: "seo",
                      color: "#4A86E8",
                    },
                    {
                      icon: (
                        <FaPaintBrush className="text-2xl" aria-hidden="true" />
                      ),
                      label: "Graphic Design",
                      id: "graphic-design",
                      color: "#FF6B6B",
                    },
                    {
                      icon: <FaBrain className="text-2xl" aria-hidden="true" />,
                      label: "AI Tools",
                      id: "ai",
                      color: "#9C27B0",
                    },
                    {
                      icon: (
                        <FaPenFancy className="text-2xl" aria-hidden="true" />
                      ),
                      label: "Logo Design",
                      id: "logo-design",
                      color: "#FFA726",
                    },
                    {
                      icon: (
                        <FaPalette className="text-2xl" aria-hidden="true" />
                      ),
                      label: "Canva Editor",
                      id: "canva",
                      color: "#00C4CC",
                    },
                    {
                      icon: (
                        <FaChartLine className="text-2xl" aria-hidden="true" />
                      ),
                      label: "Analytics",
                      id: "analytics",
                      color: "#34A853",
                    },
                  ].map((item, i) => (
                    <motion.li
                      key={item.id}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ delay: 0.05 + i * 0.03, duration: 0.3 }}
                      viewport={{ once: false, amount: 0.1 }}
                      className="relative"
                      role="listitem"
                    >
                      <div
                        className="relative z-10 h-full p-1 transition-all duration-300 rounded-xl bg-gradient-to-br from-primary/20 to-accent-1/20 hover:from-primary/25 hover:to-accent-1/25 group"
                        tabIndex="0"
                        aria-label={`${item.label} skill`}
                      >
                        <div className="relative z-20 flex flex-col items-center gap-3 p-5 transition-all duration-300 rounded-lg cursor-pointer bg-white/90 backdrop-blur-md hover:bg-white dark:bg-slate-800/90 dark:hover:bg-slate-800 h-full focus:outline-none hover:shadow-[0_0_6px_black]">
                          <div
                            className="flex items-center justify-center w-12 h-12 p-2 transition-all duration-300 bg-white rounded-full shadow-sm group-hover:shadow-md dark:bg-slate-700"
                            style={{ color: item.color }}
                            aria-hidden="true"
                          >
                            {item.icon}
                          </div>
                          <span className="text-lg font-medium transition-all duration-300 group-hover:text-primary dark:group-hover:text-accent-1">
                            {item.label}
                          </span>
                        </div>
                      </div>
                    </motion.li>
                  ))}
                </motion.ul>
              </motion.article>

              {/* Technical Skills Section */}
              <motion.article
                aria-labelledby="technical-skills"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.2 }}
              >
                <header className="relative group">
                  <motion.h3
                    id="technical-skills"
                    className="inline-block mb-8 text-2xl font-semibold tracking-tight text-transparent bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text font-poppins"
                    initial={{ backgroundSize: "0% 100%" }}
                    whileInView={{
                      backgroundSize: "100% 100%",
                      transition: {
                        duration: 0.6,
                        ease: "easeOut",
                        delay: 0.1,
                      },
                    }}
                  >
                    Technical Skills
                  </motion.h3>
                </header>

                <motion.ul
                  className="grid grid-cols-2 gap-6 sm:grid-cols-3"
                  role="list"
                  aria-label="Technical skills"
                >
                  {[
                    {
                      icon: (
                        <FaPython className="text-2xl" aria-hidden="true" />
                      ),
                      label: "Python",
                      id: "python",
                      color: "#3776AB",
                    },
                    {
                      icon: <FaCode className="text-2xl" aria-hidden="true" />,
                      label: "C++",
                      id: "cpp",
                      color: "#00599C",
                    },
                    {
                      icon: <FaHtml5 className="text-2xl" aria-hidden="true" />,
                      label: "HTML5",
                      id: "html",
                      color: "#E34F26",
                    },
                    {
                      icon: (
                        <FaCss3Alt className="text-2xl" aria-hidden="true" />
                      ),
                      label: "CSS3",
                      id: "css",
                      color: "#1572B6",
                    },
                    {
                      icon: (
                        <FaJsSquare className="text-2xl" aria-hidden="true" />
                      ),
                      label: "JavaScript",
                      id: "js",
                      color: "#F7DF1E",
                    },
                    {
                      icon: (
                        <FaDatabase className="text-2xl" aria-hidden="true" />
                      ),
                      label: "Data Analysis",
                      id: "data-analysis",
                      color: "#673AB7",
                    },
                  ].map((item, i) => (
                    <motion.li
                      key={item.id}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ delay: 0.05 + i * 0.03, duration: 0.3 }}
                      viewport={{ once: false, amount: 0.1 }}
                      className="relative"
                      role="listitem"
                    >
                      <div
                        className="relative z-10 h-full p-1 transition-all duration-300 rounded-xl bg-gradient-to-br from-primary/20 to-accent-1/20 hover:from-primary/25 hover:to-accent-1/25 group"
                        tabIndex="0"
                        aria-label={`${item.label} skill`}
                      >
                        <div className="relative z-20 flex flex-col items-center gap-3 p-5 transition-all duration-300 rounded-lg cursor-pointer bg-white/90 backdrop-blur-md hover:bg-white dark:bg-slate-800/90 dark:hover:bg-slate-800 h-full focus:outline-none hover:shadow-[0_0_6px_black]">
                          <div
                            className="flex items-center justify-center w-12 h-12 p-2 transition-all duration-300 bg-white rounded-full shadow-sm group-hover:shadow-md dark:bg-slate-700"
                            style={{ color: item.color }}
                            aria-hidden="true"
                          >
                            {item.icon}
                          </div>
                          <span className="text-lg font-medium transition-all duration-300 group-hover:text-primary dark:group-hover:text-accent-1">
                            {item.label}
                          </span>
                        </div>
                      </div>
                    </motion.li>
                  ))}
                </motion.ul>
              </motion.article>
            </div>
          </div>
        </motion.section>
        {/* full stack  */}
        <section
          id="seo-projects"
          className="relative py-24 overflow-hidden bg-gradient-to-br from-indigo-25 via-violet-50 to-fuchsia-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900"
          aria-labelledby="projects-heading"
        >
          {/* Animated background elements */}
          <div className="absolute top-0 left-0 w-full h-full opacity-40">
            <div className="absolute bg-purple-300 rounded-full top-20 left-10 w-80 h-80 mix-blend-multiply filter blur-xl opacity-20 animate-float"></div>
            <div
              className="absolute rounded-full top-10 right-10 w-80 h-80 bg-amber-300 mix-blend-multiply filter blur-xl opacity-20 animate-float"
              style={{ animationDelay: "2s" }}
            ></div>
            <div
              className="absolute bg-pink-300 rounded-full bottom-20 left-20 w-80 h-80 mix-blend-multiply filter blur-xl opacity-20 animate-float"
              style={{ animationDelay: "4s" }}
            ></div>
            <div
              className="absolute rounded-full bottom-10 right-20 w-80 h-80 bg-cyan-300 mix-blend-multiply filter blur-xl opacity-20 animate-float"
              style={{ animationDelay: "6s" }}
            ></div>
          </div>

          {/* Glowing orbs */}
          <div className="absolute rounded-full -top-20 -left-20 w-96 h-96 bg-purple-500/10 blur-3xl"></div>
          <div className="absolute rounded-full -bottom-20 -right-20 w-96 h-96 bg-cyan-500/10 blur-3xl"></div>

          <div className="container relative z-10 px-4 mx-auto">
            <header className="mb-20 text-center">
              <div className="inline-flex mb-4 px-4 py-1.5 rounded-full bg-white/80 dark:bg-slate-800/80 backdrop-blur-md border border-slate-200/50 dark:border-slate-700/30 shadow-sm">
                <span className="text-sm font-medium text-primary dark:text-accent">
                  SEO & Digital Marketing
                </span>
              </div>
              <h2
                id="projects-heading"
                className="relative mb-5 text-4xl font-bold text-center md:text-5xl text-slate-800 dark:text-white"
              >
                Featured{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
                  SEO Projects.
                </span>
              </h2>
              <p className="max-w-2xl mx-auto text-lg text-slate-600 dark:text-slate-300">
                Explore my latest SEO-optimized applications built with modern
                MERN stack technologies and performance best practices
              </p>
              <div className="relative inline-flex justify-center mt-8">
                <div className="absolute rounded-lg -inset-1 bg-gradient-to-r from-primary to-accent blur opacity-30"></div>
                <div className="relative w-24 h-1 mt-2 rounded-full bg-gradient-to-r from-primary to-accent"></div>
              </div>
            </header>

            <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
              {/* Project 1 - Expense Tracker App */}
              <article className="relative overflow-hidden transition-all duration-700 group rounded-3xl hover:-translate-y-2">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-primary to-accent rounded-3xl blur-md opacity-40 group-hover:opacity-70 transition duration-1000 group-hover:duration-300"></div>
                <div className="relative h-full overflow-hidden border shadow-2xl bg-white/90 dark:bg-slate-800/90 backdrop-blur-xl rounded-3xl border-white/30 dark:border-slate-700/30">
                  <figure className="relative overflow-hidden h-72 bg-slate-100 dark:bg-slate-700">
                    <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
                    <div className="absolute top-4 left-4 z-20 flex space-x-1.5">
                      <span className="w-2.5 h-2.5 bg-red-400 rounded-full"></span>
                      <span className="w-2.5 h-2.5 bg-yellow-400 rounded-full"></span>
                      <span className="w-2.5 h-2.5 bg-green-400 rounded-full"></span>
                    </div>
                    <img
                      src="https://iili.io/FmZCiss.md.webp"
                      alt="Expense Tracker SaaS application dashboard showing financial analytics and charts"
                      className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                      decoding="async"
                      width="600"
                      height="400"
                    />
                    <div className="absolute z-20 bottom-4 left-4">
                      <span className="px-4 py-1.5 text-xs font-medium text-white bg-gradient-to-r from-primary to-accent rounded-full shadow-lg backdrop-blur-sm">
                        Live Project
                      </span>
                    </div>
                  </figure>
                  <div className="p-8">
                    <header className="mb-5">
                      <div className="flex items-center justify-between">
                        <h3 className="text-2xl font-bold text-slate-800 dark:text-white">
                          Expense Tracker App
                        </h3>
                        <div className="flex items-center">
                          <div className="w-2.5 h-2.5 bg-green-400 rounded-full animate-pulse mr-2"></div>
                          <span className="text-xs font-medium text-green-600 dark:text-green-400">
                            Live
                          </span>
                        </div>
                      </div>
                      <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                        MERN Stack SaaS Application
                      </p>
                    </header>
                    <p className="mb-6 leading-relaxed text-slate-600 dark:text-slate-300">
                      A high-performance expense tracking application optimized
                      for search engines with server-side rendering, structured
                      data markup, and lightning-fast loading times. Built with
                      SEO best practices to maximize visibility for financial
                      management tools.
                    </p>

                    <section aria-label="Key features" className="mb-6">
                      <h4 className="flex items-center mb-3 font-semibold text-slate-800 dark:text-white">
                        <svg
                          className="w-5 h-5 mr-2 text-accent"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z"
                            clipRule="evenodd"
                          />
                        </svg>
                        SEO Optimized Features
                      </h4>
                      <ul className="space-y-3 text-sm text-slate-600 dark:text-slate-300">
                        <li className="flex items-start">
                          <svg
                            className="w-5 h-5 mt-0.5 mr-3 text-accent flex-shrink-0"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                              clipRule="evenodd"
                            />
                          </svg>
                          <span>
                            Server-side rendering for optimal search engine
                            crawling
                          </span>
                        </li>
                        <li className="flex items-start">
                          <svg
                            className="w-5 h-5 mt-0.5 mr-3 text-accent flex-shrink-0"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                              clipRule="evenodd"
                            />
                          </svg>
                          <span>
                            Structured data markup for rich search results
                          </span>
                        </li>
                        <li className="flex items-start">
                          <svg
                            className="w-5 h-5 mt-0.5 mr-3 text-accent flex-shrink-0"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                              clipRule="evenodd"
                            />
                          </svg>
                          <span>
                            Optimized Core Web Vitals for better search rankings
                          </span>
                        </li>
                      </ul>
                    </section>

                    <section aria-label="Technologies used" className="mb-7">
                      <h4 className="flex items-center mb-3 font-semibold text-slate-800 dark:text-white">
                        <svg
                          className="w-5 h-5 mr-2 text-accent"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z"
                            clipRule="evenodd"
                          />
                        </svg>
                        Technologies
                      </h4>
                      <div className="flex flex-wrap gap-2" role="list">
                        {[
                          "React.js",
                          "FramerMotion",
                          "JWT",
                          "MongoDB",
                          "Node.js",
                          "Express",
                        ].map((tag, i) => (
                          <span
                            key={i}
                            className="px-3 py-1.5 text-xs font-medium bg-white/80 dark:bg-slate-700/80 backdrop-blur-sm rounded-full border border-slate-200/50 dark:border-slate-600/30 shadow-sm"
                            role="listitem"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </section>

                    <nav aria-label="Project links">
                      <div className="flex gap-4">
                        <a
                          href="https://expensetracker-pro.netlify.app/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center gap-2 flex-1 px-5 py-3 text-sm font-semibold text-white transition-all duration-300 rounded-xl bg-gradient-to-r from-primary to-accent hover:shadow-lg hover:shadow-primary/30 hover:-translate-y-0.5"
                          aria-label="View Expense Tracker live demo"
                        >
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                            ></path>
                          </svg>
                          Live Demo
                        </a>
                        <a
                          href="https://github.com/hassankhan931/Expense-App-MERN"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center gap-2 flex-1 px-5 py-3 text-sm font-semibold text-center transition-all duration-300 rounded-xl bg-white/80 dark:bg-slate-700/80 backdrop-blur-sm border border-slate-300/50 dark:border-slate-600/30 text-slate-700 dark:text-slate-200 hover:shadow-lg hover:-translate-y-0.5"
                          aria-label="View Expense Tracker source code"
                        >
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                            ></path>
                          </svg>
                          Source Code
                        </a>
                      </div>
                    </nav>
                  </div>
                </div>
              </article>

              {/* Project 2 - Portfolio Website */}
              <article className="relative overflow-hidden transition-all duration-700 group rounded-3xl hover:-translate-y-2">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-3xl blur-md opacity-40 group-hover:opacity-70 transition duration-1000 group-hover:duration-300"></div>
                <div className="relative h-full overflow-hidden border shadow-2xl bg-white/90 dark:bg-slate-800/90 backdrop-blur-xl rounded-3xl border-white/30 dark:border-slate-700/30">
                  <figure className="relative overflow-hidden h-72 bg-slate-100 dark:bg-slate-700">
                    <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
                    <div className="absolute top-4 left-4 z-20 flex space-x-1.5">
                      <span className="w-2.5 h-2.5 bg-red-400 rounded-full"></span>
                      <span className="w-2.5 h-2.5 bg-yellow-400 rounded-full"></span>
                      <span className="w-2.5 h-2.5 bg-green-400 rounded-full"></span>
                    </div>
                    <img
                      src="https://iili.io/Kdc82fe.md.png"
                      alt="Professional portfolio website with modern design and SEO optimization"
                      className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                      decoding="async"
                      width="600"
                      height="400"
                    />
                    <div className="absolute z-20 bottom-4 left-4">
                      <span className="px-4 py-1.5 text-xs font-medium text-white bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full shadow-lg backdrop-blur-sm">
                        Completed Project
                      </span>
                    </div>
                  </figure>
                  <div className="p-8">
                    <header className="mb-5">
                      <div className="flex items-center justify-between">
                        <h3 className="text-2xl font-bold text-slate-800 dark:text-white">
                          Professional Portfolio
                        </h3>
                        <div className="flex items-center">
                          <div className="w-2.5 h-2.5 bg-blue-400 rounded-full animate-pulse mr-2"></div>
                          <span className="text-xs font-medium text-blue-600 dark:text-blue-400">
                            Completed
                          </span>
                        </div>
                      </div>
                      <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                        SEO-Optimized Portfolio Website
                      </p>
                    </header>
                    <p className="mb-6 leading-relaxed text-slate-600 dark:text-slate-300">
                      A fully optimized portfolio website designed to rank
                      highly in search results for web development services.
                      Features semantic HTML structure, optimized metadata, fast
                      loading times, and mobile responsiveness to maximize
                      online visibility and lead generation.
                    </p>

                    <section aria-label="Key features" className="mb-6">
                      <h4 className="flex items-center mb-3 font-semibold text-slate-800 dark:text-white">
                        <svg
                          className="w-5 h-5 mr-2 text-blue-500"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z"
                            clipRule="evenodd"
                          />
                        </svg>
                        SEO Optimized Features
                      </h4>
                      <ul className="space-y-3 text-sm text-slate-600 dark:text-slate-300">
                        <li className="flex items-start">
                          <svg
                            className="w-5 h-5 mt-0.5 mr-3 text-blue-500 flex-shrink-0"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                              clipRule="evenodd"
                            />
                          </svg>
                          <span>
                            Semantic HTML5 markup for better search
                            understanding
                          </span>
                        </li>
                        <li className="flex items-start">
                          <svg
                            className="w-5 h-5 mt-0.5 mr-3 text-blue-500 flex-shrink-0"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                              clipRule="evenodd"
                            />
                          </svg>
                          <span>
                            Optimized meta tags and structured data for rich
                            snippets
                          </span>
                        </li>
                        <li className="flex items-start">
                          <svg
                            className="w-5 h-5 mt-0.5 mr-3 text-blue-500 flex-shrink-0"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                              clipRule="evenodd"
                            />
                          </svg>
                          <span>
                            Perfect Google Lighthouse scores for optimal search
                            ranking
                          </span>
                        </li>
                      </ul>
                    </section>

                    <section aria-label="Technologies used" className="mb-7">
                      <h4 className="flex items-center mb-3 font-semibold text-slate-800 dark:text-white">
                        <svg
                          className="w-5 h-5 mr-2 text-blue-500"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z"
                            clipRule="evenodd"
                          />
                        </svg>
                        Technologies
                      </h4>
                      <div className="flex flex-wrap gap-2" role="list">
                        {[
                          "React.js",
                          "Framer Motion",
                          "Tailwind CSS",
                          "Node.js",
                          "Express",
                          "MongoDB",
                        ].map((tag, i) => (
                          <span
                            key={i}
                            className="px-3 py-1.5 text-xs font-medium bg-white/80 dark:bg-slate-700/80 backdrop-blur-sm rounded-full border border-slate-200/50 dark:border-slate-600/30 shadow-sm"
                            role="listitem"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </section>

                    <nav aria-label="Project links">
                      <div className="flex gap-4">
                        <a
                          href="https://hassan-khan-portfolio.netlify.app/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center gap-2 flex-1 px-5 py-3 text-sm font-semibold text-white transition-all duration-300 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 hover:shadow-lg hover:shadow-blue-400/30 hover:-translate-y-0.5"
                          aria-label="View Portfolio live demo"
                        >
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                            ></path>
                          </svg>
                          Live Demo
                        </a>
                        <a
                          href="https://github.com/hassankhan931/MY-Portfolio"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center gap-2 flex-1 px-5 py-3 text-sm font-semibold text-center transition-all duration-300 rounded-xl bg-white/80 dark:bg-slate-700/80 backdrop-blur-sm border border-slate-300/50 dark:border-slate-600/30 text-slate-700 dark:text-slate-200 hover:shadow-lg hover:-translate-y-0.5"
                          aria-label="View Portfolio source code"
                        >
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                            ></path>
                          </svg>
                          Source Code
                        </a>
                      </div>
                    </nav>
                  </div>
                </div>
              </article>
            </div>
          </div>

          <style jsx>{`
            @keyframes float {
              0%,
              100% {
                transform: translateY(0px);
              }
              50% {
                transform: translateY(-10px);
              }
            }
            .animate-float {
              animation: float 6s ease-in-out infinite;
            }
          `}</style>
        </section>
        {/* CONTACT SECTION */}
        <section
          id="contact"
          className="py-20 transition-colors duration-300 text-dark bg-[#f4d4f8] dark:bg-white"
          aria-labelledby="contact-heading"
        >
          <div className="container px-5 mx-auto">
            {/* Section Heading */}
            <header className="text-center">
              <h2
                id="contact-heading"
                className="relative mb-12 text-3xl font-bold text-center md:text-4xl dark:text-black"
              >
                Get In Touch
                <span
                  className="absolute bottom-0 w-24 h-1 mt-2 transform -translate-x-1/2 rounded-full left-1/2 bg-gradient-to-r from-primary to-accent-1"
                  aria-hidden="true"
                ></span>
              </h2>
            </header>

            <div className="flex flex-col gap-10 md:flex-row">
              {/* Left Info Card */}
              <motion.article
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 30 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: false, amount: 0.3 }}
                className="p-8 text-center shadow-lg rounded-2xl bg-white/80 dark:bg-white backdrop-blur-sm md:w-1/2 md:text-left"
              >
                <h3 className="mb-4 text-2xl font-bold text-primary">
                  Let's Connect!
                </h3>
                <p className="mb-8 text-gray-600 dark:text-gray-800">
                  I'm always open to discussing new projects, creative ideas, or
                  opportunities to be part of your vision.
                </p>

                {/* Contact Info */}
                <address className="space-y-5 not-italic">
                  <div className="flex items-center">
                    <div className="flex items-center justify-center w-12 h-12 mr-4 text-white rounded-full shadow-md bg-primary">
                      <FaEnvelope aria-hidden="true" />
                    </div>
                    <a
                      href="mailto:uk9711680@gmail.com"
                      className="text-lg font-medium text-black transition-colors duration-200 hover:text-primary"
                      aria-label="Send email to Hassan Khan"
                    >
                      E-Mail
                    </a>
                  </div>

                  <div className="flex items-center">
                    <div className="flex items-center justify-center w-12 h-12 mr-4 text-white rounded-full shadow-md bg-primary">
                      <FaMapMarkerAlt aria-hidden="true" />
                    </div>
                    <a
                      href="https://www.google.com/maps/place/Sabzazar+Housing+Scheme,+Lahore,+Punjab"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-lg font-medium text-black transition-colors duration-200 hover:text-primary"
                      aria-label="View Hassan Khan's location on Google Maps"
                    >
                      Sabzazar, Lahore
                    </a>
                  </div>

                  <div className="flex items-center">
                    <div className="flex items-center justify-center w-12 h-12 mr-4 text-white rounded-full shadow-md bg-primary">
                      <FaWhatsapp aria-hidden="true" />
                    </div>
                    <a
                      href="https://wa.me/923174559088"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-lg font-medium text-black transition-colors duration-200 hover:text-primary"
                      aria-label="Contact Hassan Khan on WhatsApp"
                    >
                      WhatsApp
                    </a>
                  </div>
                </address>

                {/* Social Links */}
                <nav aria-label="Social media links">
                  <div className="flex justify-center gap-4 mt-8 md:justify-start">
                    {[
                      {
                        icon: <FaWhatsapp aria-hidden="true" />,
                        link: "https://wa.me/923174559088",
                        label: "Whatsapp",
                      },
                      {
                        icon: <FaInstagram aria-hidden="true" />,
                        link: "https://www.instagram.com/its_digiace?igsh=MWMyeGdyOGdhejJvNA==",
                        label: "Instagram profile",
                      },
                    ].map((item, i) => (
                      <a
                        key={i}
                        href={item.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center w-10 h-10 transition-all bg-gray-200 rounded-full hover:bg-primary hover:text-white hover:-translate-y-1"
                        aria-label={item.label}
                      >
                        {item.icon}
                      </a>
                    ))}
                  </div>
                </nav>
              </motion.article>

              {/* Right Contact Form */}
              <motion.form
                ref={formRef}
                onSubmit={handleSubmit}
                id="contact-form"
                className="p-8 transition-colors duration-300 bg-white shadow-lg rounded-2xl dark:bg-white backdrop-blur-sm md:w-1/2"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 30 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: false, amount: 0.3 }}
                aria-label="Contact form"
              >
                {[
                  {
                    id: "name",
                    label: "Name",
                    type: "text",
                    name: "user_name",
                    autoComplete: "name",
                    "aria-required": "true",
                  },
                  {
                    id: "email",
                    label: "Email",
                    type: "email",
                    name: "user_email",
                    autoComplete: "email",
                    "aria-required": "true",
                  },
                  {
                    id: "subject",
                    label: "Subject",
                    type: "text",
                    name: "subject",
                    autoComplete: "off",
                    "aria-required": "true",
                  },
                ].map((field, i) => (
                  <div className="mb-6" key={i}>
                    <label
                      htmlFor={field.id}
                      className="block mb-2 font-semibold"
                    >
                      {field.label}
                    </label>
                    <input
                      type={field.type}
                      id={field.id}
                      name={field.name}
                      autoComplete={field.autoComplete}
                      required
                      aria-required={field["aria-required"]}
                      className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                ))}

                <div className="mb-6">
                  <label htmlFor="message" className="block mb-2 font-semibold">
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows="5"
                    name="message"
                    autoComplete="off"
                    required
                    aria-required="true"
                    className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full px-6 py-3 font-semibold text-white transition-all duration-300 transform rounded-full shadow-sm bg-primary hover:bg-blue-700 hover:shadow-lg hover:-translate-y-1"
                  aria-label="Send message"
                >
                  Send Message
                </button>
              </motion.form>
            </div>
          </div>
        </section>
      </main>
      {/* FOOTER */}
      <footer
        className="py-8 text-white bg-section7 dark:bg-slate-900"
        aria-label="Website footer"
      >
        <div className="container px-5 mx-auto text-center">
          <div className="mb-4">
            <a
              href="#home"
              className="text-2xl font-bold"
              aria-label="Return to top of page"
            >
              Usama<span className="text-primary">Khan</span>
            </a>
          </div>

          <p className="mb-4">Graphic Designer | Seo Expert</p>

          <nav aria-label="Footer navigation">
            <div className="flex flex-wrap justify-center gap-4 mb-6">
              {[
                { href: "#home", text: "Home" },
                { href: "#about", text: "About" },
                { href: "#skills", text: "Skills" },
                { href: "#seo-projects", text: "Projects" },
                { href: "#contact", text: "Contact" },
              ].map((link, index) => (
                <a
                  key={index}
                  href={link.href}
                  className="transition-colors hover:text-primary-light hover:underline"
                  aria-label={`Go to ${link.text} section`}
                >
                  {link.text}
                </a>
              ))}
            </div>
          </nav>

          <div className="copyright">
            <p>
              &copy; {new Date().getFullYear()} Usama Khan. All rights reserved.
            </p>
            <p>
              Last Updated:{" "}
              {new Date().toLocaleDateString("en-GB", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
              })}
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
export default App;
