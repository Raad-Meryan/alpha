import React, { useMemo, useRef } from "react";
import Navigation from "./components/Navigation";
import Hero from "./components/Hero";
import About from "./components/About";
import Vision from "./components/Vision";
import Team from "./components/Team";
import Clients from "./components/Clients";
import Gallery from "./components/Gallery";
import Contact from "./components/Contact";
import DotNav from "./components/DotNav";
import useChunkScroll from "./hooks/useChunkScroll";
import "./App.css";

export default function App() {
  const ids = useMemo(
    () => ["hero", "about", "vision", "team", "clients", "clients2", "contact"],
    []
  );
  const containerRef = useRef(null);
  const sectionRefs = useRef([]);
  sectionRefs.current = [];
  const pushRef = (el) => {
    if (el && !sectionRefs.current.includes(el)) sectionRefs.current.push(el);
  };
  const { index, scrollToIndex } = useChunkScroll(containerRef, sectionRefs, {
    mode: "chunk",
    snapDuration: 500,
    wheelCooldown: 450
  });
  return (
    <>
      <div id="app" className="app" ref={containerRef}>
        <section id={ids[0]} ref={pushRef}>
          <Navigation onNavigate={scrollToIndex} ids={ids} />
          <Hero />
        </section>
        <section id={ids[1]} ref={pushRef}>
          <About />
        </section>
        <section id={ids[2]} ref={pushRef}>
          <Vision />
        </section>
        <section id={ids[3]} ref={pushRef}>
          <Team />
        </section>
        <section id={ids[4]} ref={pushRef}>
          <Clients />
        </section>
        <section id={ids[5]} ref={pushRef}>
          <Clients page={2} />
        </section>
        {/* <section id={ids[6]} ref={pushRef}>
          <Gallery />
        </section> */}
        <section id={ids[6]} ref={pushRef}>
          <Contact />
        </section>
      </div>
      <DotNav count={7} activeIndex={index} onSelect={scrollToIndex} />
    </>
  );
}


// import React, { useMemo, useRef } from "react";
// import Navigation from "./components/Navigation";
// import Hero from "./components/Hero";
// import About from "./components/About";
// import Vision from "./components/Vision";
// import Team from "./components/Team";
// import Clients from "./components/Clients";
// import Gallery from "./components/Gallery";
// import Contact from "./components/Contact";
// import DotNav from "./components/DotNav";
// import useChunkScroll from "./hooks/useChunkScroll";
// import "./App.css";

// export default function App() {
//   const ids = useMemo(
//     () => ["hero", "about", "vision", "team", "clients", "clients2", "contact"],
//     []
//   );
//   const containerRef = useRef(null);
//   const sectionRefs = useRef([]);
//   sectionRefs.current = [];
//   const pushRef = (el) => {
//     if (el && !sectionRefs.current.includes(el)) sectionRefs.current.push(el);
//   };
//   const { index, scrollToIndex } = useChunkScroll(containerRef, sectionRefs, {
//     mode: "chunk",
//     snapDuration: 500,
//     wheelCooldown: 450
//   });

//   return (
//     <>
//       <div id="app" className="app" ref={containerRef}>
//         <section id={ids[0]} ref={pushRef}>
//           <Navigation />
//           <Hero />
//         </section>
//         <section id={ids[1]} ref={pushRef}>
//           <About />
//         </section>
//         <section id={ids[2]} ref={pushRef}>
//           <Vision />
//         </section>
//         <section id={ids[3]} ref={pushRef}>
//           <Team />
//         </section>
//         <section id={ids[4]} ref={pushRef}>
//           <Clients />
//         </section>
//         <section id={ids[5]} ref={pushRef}>
//           <Clients page={2} />
//         </section>
//         <section id={ids[6]} ref={pushRef}>
//           <Contact />
//         </section>
//       </div>
//       <DotNav count={ids.length} activeIndex={index} onSelect={scrollToIndex} />
//     </>
//   );
// }
