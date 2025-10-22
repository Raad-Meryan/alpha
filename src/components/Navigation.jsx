import React, { useEffect, useRef, useState } from "react";
import "./Navigation.css";
import alphaLogo from "../assets/ALPHALogo.png";

export default function Navigation({ ids }) {
  const navRef = useRef(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeId, setActiveId] = useState("about");

  const sectionIds = Array.isArray(ids) && ids.length ? ids : ["about", "services", "portfolio", "contact"];

  const getScrollContainer = () => document.querySelector(".app") || window;

  const getNavHeight = () => (navRef.current ? navRef.current.offsetHeight : 72);

  const scrollToSection = (sectionId) => {
    const container = document.querySelector(".app");
    const el = document.getElementById(sectionId);
    if (!el) return;
    const offset = getNavHeight();
    if (container) {
      const top = el.offsetTop - offset;
      container.scrollTo({ top, behavior: "smooth" });
    } else {
      const rect = el.getBoundingClientRect();
      const y = rect.top + window.pageYOffset - offset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  const goHome = () => {
    const id = document.getElementById("hero") ? "hero" : sectionIds[0];
    scrollToSection(id);
  };

  useEffect(() => {
    const scroller = getScrollContainer();
    const onScroll = () => {
      const y = scroller === window ? window.scrollY : scroller.scrollTop;
      setIsScrolled(y > 10);
    };
    onScroll();
    scroller.addEventListener("scroll", onScroll, { passive: true });
    return () => scroller.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const scroller = document.querySelector(".app");
    const options = {
      root: scroller || null,
      threshold: 0.6,
      rootMargin: `-${getNavHeight()}px 0px -40% 0px`,
    };
    const observer = new IntersectionObserver((entries) => {
      const visible = entries
        .filter((e) => e.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
      if (visible[0]) setActiveId(visible[0].target.id);
    }, options);
    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [sectionIds]);

  const navItems = [
    { id: "about", label: "About" },
    { id: "team", label: "Services" },
    { id: "clients", label: "Portfolio" },
  ];

  return (
    <nav ref={navRef} className={`navigation ${isScrolled ? "scrolled" : ""}`}>
      <div className="nav-container">
        <div className="nav-logo" onClick={goHome}>
          <img src={alphaLogo} alt="Alpha" className="nav-logo-image" />
        </div>
        <ul className="nav-menu">
          {navItems.map((item) => (
            <li key={item.id} className="nav-item">
              <button
                onClick={() => scrollToSection(item.id)}
                className={`nav-link ${activeId === item.id ? "active" : ""}`}
                aria-current={activeId === item.id ? "page" : undefined}
              >
                {item.label}
              </button>
            </li>
          ))}
          <li className="nav-separator">|</li>
        </ul>
        <div className="nav-contact">
          <button
            onClick={() => scrollToSection("contact")}
            className={`nav-link contact-link ${activeId === "contact" ? "active" : ""}`}
          >
            Contact
          </button>
        </div>
      </div>
    </nav>
  );
}
