// import React from 'react';
// import './About.css';
// import CountUp from '../assets/CountUp';
// import GradientText from '../assets/GradientText';
// import TrueFocus from '../assets/TrueFocus';

// const About = () => {
//   return (
//     <section id="about" className="about">
//       <div className="container">
//         <TrueFocus 
//           sentence="About Us"
//           manualMode={true}
//           blurAmount={5}
//           borderColor="#ff0000ff"
//           animationDuration={0.5}
//           pauseBetweenAnimations={1}
//         />
//         <div className="about-content">
//           <br />
//           <br />
//           <div className="about-text">
//             <strong> A production company, </strong>
//             <br />
//             founded in Amman, Jordan in 2021.
//           </div>

//           <div className="about-text">
//             We breathe life into stories, ignite inspiration within people,
//             and transport you into new worlds, filled with emotions, wonder, and hope.
//           </div>
//         </div>
//         <div className="stats-container">
//           <div className="stat-item">
//             <div className="stat-number">
//               <GradientText>
//                 +<CountUp
//                   from={0}
//                   to={4}
//                   direction="up"
//                   duration={3}
//                   className="count-up-text"
//                 />
//               </GradientText>
//             </div>
//             <div className="stat-label">Years of Experience</div>
//           </div>

//           <div className="stat-divider">|</div>

//           <div className="stat-item">
//             <div className="stat-number">
//               <GradientText>
//                 +<CountUp
//                   from={0}
//                   to={175}
//                   separator=","
//                   direction="up"
//                   duration={1}
//                   className="count-up-text"
//                 />
//               </GradientText>
//             </div>
//             <div className="stat-label">Projects</div>
//           </div>

//           <div className="stat-divider">|</div>

//           <div className="stat-item">
//             <div className="stat-number">
//               <GradientText>
//                 +<CountUp
//                   from={0}
//                   to={20}
//                   direction="up"
//                   duration={1}
//                   className="count-up-text"
//                 />
//               </GradientText>
//             </div>
//             <div className="stat-label">Clients</div>
//           </div>

//           <div className="stat-divider">|</div>

//           <div className="stat-item">
//             <div className="stat-number">
//               <GradientText>
//                 +<CountUp
//                   from={1000000}
//                   to={3000000}
//                   separator=","
//                   direction="up"
//                   duration={0.25}
//                   className="count-up-text"
//                 />
//               </GradientText>
//             </div>
//             <div className="stat-label">Inspired People</div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default About;

import React from 'react';
import './About.css';
import CountUp from '../assets/CountUp';
import GradientText from '../assets/GradientText';
import TrueFocus from '../assets/TrueFocus';
import DecryptedText from '../assets/DecryptedText';

const About = () => {
  return (
    <section id="about" className="about">
      <div className="container">
        <TrueFocus
          sentence="About Us"
          manualMode={true}
          blurAmount={5}
          borderColor="#ff0000ff"
          animationDuration={0.5}
          pauseBetweenAnimations={1}
        />
        <div className="about-content">
          <br />
          <br />
          <div className="about-text">
            <strong>A production company,</strong>
            <br />
            founded in Amman, Jordan in 2021.
          </div>
          <div className="about-text">
            We breathe life into stories, ignite inspiration within people,
            and transport you into new worlds, filled with emotions, wonder, and hope.
          </div>
        </div>
        <div className="stats-container">
          <div className="stat-item">
            <div className="stat-number">
              <GradientText>
                +<CountUp from={0} to={4} direction="up" duration={3} className="count-up-text" />
              </GradientText>
            </div>
            <div className="stat-label">Years of Experience</div>
          </div>
          <div className="stat-divider">|</div>
          <div className="stat-item">
            <div className="stat-number">
              <GradientText>
                +<CountUp from={0} to={175} separator="," direction="up" duration={1} className="count-up-text" />
              </GradientText>
            </div>
            <div className="stat-label">Projects</div>
          </div>
          <div className="stat-divider">|</div>
          <div className="stat-item">
            <div className="stat-number">
              <GradientText>
                +<CountUp from={0} to={20} direction="up" duration={1} className="count-up-text" />
              </GradientText>
            </div>
            <div className="stat-label">Clients</div>
          </div>
          <div className="stat-divider">|</div>
          <div className="stat-item">
            <div className="stat-number">
              <GradientText>
                <DecryptedText
                  text="MILLIONS"
                  animateOn="view"
                  sequential={true}
                  revealDirection="start"
                  speed={70}
                  className="count-up-text"
                  encryptedClassName="count-up-text"
                />
              </GradientText>
            </div>
            <div className="stat-label">of Inspired People</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
