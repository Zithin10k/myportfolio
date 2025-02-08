import { useEffect, useRef, useState } from 'react';
import Particles from '@tsparticles/react';
import Hero from './components/Hero';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Experience from './components/Experience';
import Contact from './components/Contact';
import CustomCursor from './components/CustomCursor';
import { collection, addDoc, doc, updateDoc  } from "firebase/firestore"; 
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { v4 as uuidv4 } from 'uuid';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const RanOnce = useRef(false)
  const sections = useRef({
    hero:null,
    skills:null,
    experience:null,
    projects:null,
    contact:null,
  })
  const userHasScrolled = useRef({
    run:0,
    hasScrolled:false,
  })
  useEffect(() => {
    // Handle scroll events
    const handleScroll = () => {
      if (userHasScrolled.current.run === 0) {
        userHasScrolled.current.run = 1
      } else {
        userHasScrolled.current.hasScrolled= true
      }
      // Handle section visibility
      const sections = document.querySelectorAll('.section-container');
      sections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        const isVisible = rect.top <= window.innerHeight * 0.75;
        if (isVisible) {
          section.classList.add('visible');
        }
      });
    };
    function slightScroll() {
      if (!(userHasScrolled.current.hasScrolled)) {
          window.scrollBy({ top: 400, behavior: "smooth" }); 
          setTimeout(() => window.scrollTo({ top: 0, behavior: "smooth" }), 500);
      }
  }

  setTimeout(slightScroll,7000)


    window.addEventListener('scroll', handleScroll);

    // Initial load handling
    const timer = setTimeout(() => {
      setIsLoading(false);
      handleScroll(); // Check initial section visibility
    }, 500);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(timer);
    };
  }, []);

  // Create a device fingure print
  useEffect(()=>{
    if (RanOnce.current) {
      return
    }else{
      RanOnce.current= true
    }
    const func =async () => {
      const key = 'AIzaSyAh-8DbViuH6NlQ2QhyeHLudJaXNDD_wyw'
      const firebaseConfig = {
      apiKey: key ,
      authDomain: "iamjithinsp.firebaseapp.com",
      projectId: "iamjithinsp",
      storageBucket: "iamjithinsp.firebasestorage.app",
      messagingSenderId: "778017077720",
      appId: "1:778017077720:web:397520705325fdde661aad",
      measurementId: "G-ZXE5TRSX40"
    };
    
    // Initialize Firebase
    const app = initializeApp(firebaseConfig);
    
    const db = getFirestore(app);
    async function generateDeviceFingerprint() {
      // Helper: Draw on a hidden canvas to produce a fingerprint string
      function getCanvasFingerprint() {
        const canvas = document.createElement('canvas');
        canvas.width = 200;
        canvas.height = 50;
        const ctx = canvas.getContext('2d');
        
        // Draw a rectangle
        ctx.fillStyle = "#f60";
        ctx.fillRect(125, 1, 62, 20);
        
        // Draw text with some styling
        ctx.textBaseline = "top";
        ctx.font = "16px Arial";
        ctx.fillStyle = "#069";
        ctx.fillText("Fingerprint", 2, 15);
        ctx.fillStyle = "rgba(102, 204, 0, 0.7)";
        ctx.fillText("Fingerprint", 4, 17);
        
        return canvas.toDataURL();
      }
    
      // Helper: djb2 hash function to compute a hash from a string
      function hashString(str) {
        let hash = 5381;
        for (let i = 0; i < str.length; i++) {
          hash = ((hash << 5) + hash) + str.charCodeAt(i); // hash * 33 + c
        }
        return hash >>> 0; // Ensure unsigned 32-bit integer
      }
    
      // Gather attributes into an object.
      const attributes = {};
    
      // 1. Screen Resolution
      attributes["Screen Resolution"] = window.screen.width + " x " + window.screen.height;
    
      // 2. System Language
      attributes["System Language"] = navigator.language || navigator.userLanguage || "Unknown";
    
      // 3. System Font (using computed style on the document body)
      attributes["System Font"] = (document.body && window.getComputedStyle(document.body).fontFamily) || "Unknown";
    
      // 4. User Agent
      attributes["User Agent"] = navigator.userAgent;
    
      // 5. TimeZone (using the Intl API if available)
      attributes["TimeZone"] = (Intl && Intl.DateTimeFormat)
        ? Intl.DateTimeFormat().resolvedOptions().timeZone
        : "Unknown";
    
      // 6. Canvas Fingerprint
      attributes["Canvas Fingerprint"] = getCanvasFingerprint();
    
      // 7. Device Memory (if available)
      attributes["Device Memory"] = navigator.deviceMemory ? navigator.deviceMemory + " GB" : "Not available";
    
      // 8. Hardware Concurrency (logical processors)
      attributes["Hardware Concurrency"] = navigator.hardwareConcurrency || "Not available";
    
      // 9. Client IP Address – retrieved from an external API (requires network access)
      try {
        const response = await fetch('https://api.ipify.org?format=json');
        if (response.ok) {
          const data = await response.json();
          attributes["IP Address"] = data.ip;
        } else {
          attributes["IP Address"] = "Not available";
        }
      } catch (err) {
        attributes["IP Address"] = "Not available";
      }
    
      // Combine all attributes into a single string in sorted order to ensure consistency
      let combinedString = "";
      Object.keys(attributes)
        .sort()
        .forEach(key => combinedString += key + ":" + attributes[key] + ";");
    
      // Generate the unique ID by hashing the combined string (converted to hexadecimal)
      const id = hashString(combinedString).toString(16);
    
      return { id, attributes };
    }
    
    // Generate the device fingerprint attributes
const attributes = await generateDeviceFingerprint();

// Record the starting time using a full Date object (with parentheses)
const startTime = new Date();
attributes.screenTime = 0;
attributes.loginTime = startTime.toISOString()
attributes.systemTime =startTime.toString()
try {
  // Add the new document to Firestore
  const docRef = await addDoc(collection(db, "DeviceLoginsSession"), attributes);
  console.log("Document written with ID: ", docRef.id);
  
  // Get a reference to the same document using its path
  const documentRef = doc(db, docRef.path);

  // Infinite loop (be cautious with infinite loops in production)
  while ((startTime.getTime()- (new Date).getTime())/1000 <180 ) {
    // Create a new Date object for the current time
    const currentTime = new Date();

    // Calculate screenTime using getTime(), which returns the full time in milliseconds,
    // rather than getMilliseconds(), which only returns the millisecond portion of the current second.
    // Here, we compute the difference in seconds.
    let screenTime = (currentTime.getTime() - startTime.getTime()) / 1000;
    
    // Update the document with the new screenTime
    await updateDoc(documentRef, { screenTime });
    console.log("RequestMade");

    // Wait for 2000 milliseconds (2 seconds) before the next update
    await new Promise(resolve => setTimeout(resolve, 2000));
  }
} catch (e) {
  // In case of error, store an error document with a message and timestamp
  const errorData = {
    message: e.message || "Unknown error",
    timestamp: new Date().toISOString()
  };
  const errorDocRef = await addDoc(collection(db, "error"), errorData);
  console.log("Error document written with ID: ", errorDocRef.id);
}

  }
  func()
  },[])
  


  // Prevent content flash
  useEffect(() => {
    document.body.style.visibility = isLoading ? 'hidden' : 'visible';
  }, [isLoading]);

  return (
    <div className="min-h-screen">
      <CustomCursor />
      {!isLoading && (
        <>
          <Particles
            id="tsparticles"
            options={{
              background: {
                color: {
                  value: 'transparent',
                },
              },
              particles: {
                color: {
                  value: '#FFD700',
                },
                links: {
                  color: '#FFD700',
                  distance: 150,
                  enable: true,
                  opacity: 0.2,
                  width: 1,
                },
                move: {
                  enable: true,
                  speed: 1,
                },
                size: {
                  value: { min: 1, max: 3 },
                },
                opacity: {
                  value: 0.3,
                },
              },
            }}
          />

          <main className="relative">
            <Hero refs={sections} />
            <Skills refs={sections}/>
            <Experience refs={sections} />
            <Projects refs={sections} />
            <Contact refs={sections} />
          </main>
          <br />
          <br />
          <br />
        </>
      )}
    </div>
  );
}

export default App;
