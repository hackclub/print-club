import { useState, useEffect } from 'react';

export default function Home() {
  const [hasBeenTapped, setHasBeenTapped] = useState(false);
  const [windowsOpen, setWindowsOpen] = useState([]);

  const [windowPositions, setWindowPositions] = useState({});
  const [dragging, setDragging] = useState(null);
  const [isArtistSelected, setIsArtistSelected] = useState(false);
  const [prints, setPrints] = useState([]);

  useEffect(() => {
    fetch('/prints.json')
      .then(res => res.json())
      .then(data => setPrints(data))
      .catch(err => console.error('Error loading prints:', err));
  }, []);
  return <div 
    style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}
    onMouseMove={(e) => {
      if (dragging) {
        setWindowPositions(prev => ({
          ...prev,
          [dragging.windowId]: {x: e.clientX - dragging.offsetX, y: e.clientY - dragging.offsetY}
        }));
      }
    }}
    onMouseUp={() => setDragging(null)}
  >
    
    {windowsOpen.includes("welcome-window") && (() => {
      const windowId = "welcome-window";
      const position = windowPositions[windowId] || {x: 10, y: 10};
      if (!windowPositions[windowId]) {
        setWindowPositions(prev => ({...prev, [windowId]: position}));
      }
      return <div style={{position: 'absolute', top: position.y, left: position.x, width: 200, height: "fit-content", backgroundColor: 'white', border: '1px solid #000'}}>
      <div 
        onMouseDown={(e) => setDragging({windowId, offsetX: e.clientX - position.x, offsetY: e.clientY - position.y})}
        style={{border: "1px solid #000", display: 'flex', flexDirection: 'row', justifyContent: 'space-between', cursor: 'grab', userSelect: 'none'}}>
        <p style={{margin: 0}} onClick={() => setWindowsOpen(windowsOpen.filter(window => window !== "welcome-window"))}>x</p>

       <p style={{margin: 0}}>Welcome</p>
        <p style={{margin: 0}}> </p>
      </div>
      <div>
      </div>
      
      <div style={{display: "flex", marginTop: 8, alignItems: 'center', justifyContent: 'center', flexDirection: 'column'}}>
      <div onClick={() => setIsArtistSelected(!isArtistSelected)} style={{width: 40, cursor: 'pointer', height: 20, display: 'flex', alignItems: 'center', position: 'relative', transition: 'all 0.3s ease', borderRadius: 20, border: "1px solid #000"}}>
       <div style={{position: 'absolute', top: 1, left: isArtistSelected ? 18 : 0, transition: 'all 0.3s ease', height: 16, width: 16, marginLeft: 2, marginRight: 2, borderRadius: 18, border: '1px solid black'}}>
        </div>
        <div style={{position: 'absolute', top: 1, left: isArtistSelected ? 18 : 0, transition: 'all 0.35s ease', height: 16, width: 16, marginLeft: 2, marginRight: 2, borderRadius: 18, border: '1px solid black'}}>
        </div>
        <div style={{position: 'absolute', top: 1, left: isArtistSelected ? 18 : 0, transition: 'all 0.4s ease', height: 16, width: 16, marginLeft: 2, marginRight: 2, borderRadius: 18, border: '1px solid black'}}>
        </div>
      </div>
      {isArtistSelected ? 
      <p style={{fontSize: 8, margin: 0}}>Enjoyer / <b>Artist</b></p> : 
      <p style={{fontSize: 8, margin: 0}}><b>Enjoyer</b> / Artist</p>
      } 
      </div>
      
      {!isArtistSelected && 
      <div>
      <p>
        Ship a personal site <span style={{fontSize: 8, margin: 0, fontItalic: true}}>(at least 2-3 hours of work)</span>, a fellow Hack Clubbers will mail a hand-drawn print.
      </p>
      
      <button style={{marginRight: 8}} onClick={() => window.open('https://forms.hackclub.com/t/nVTKVG73mcus', '_blank')}>Ship Site</button>

      <button onClick={() => setWindowsOpen([...windowsOpen, "print-gallery"])}>See The Prints</button>

      <p style={{fontSize: 8, margin: 0, marginTop: 8, fontItalic: true}}>You cannot recycle or reuse a past site you've made, it must be a new one that you make for this event.</p>
      
      </div>
      }
      {isArtistSelected && 
      <div>
      <p>
        If you're an artist, you can create a print and sell it to fellow Hack Clubbers this week! Hack Clubbers will "pay" you for a print of your art by shipping their project and you'll receive a cash payment for your artwork.
      </p>
      <p>
        You'll need to fulfill the order by shipping the print to the Hack Clubber. For every order you'll receive $10 (feel free to keep any remaining profit after shipping & materials). You'll have to be creative about envelopes, postage, the print itself, etc to make a product Hack Clubbers appreciate.
      </p>
      <p>If you're up for the challenge, add your print to the<br/> Hack Club, Print Club</p>
      <button onClick={() => window.open('https://github.com/hackclub/print-club', '_blank')}>Add Your Print </button>

      </div>
      }
    </div>;
    })()}

    {windowsOpen.includes("print-gallery") && (() => {
      const windowId = "print-gallery";
      const position = windowPositions[windowId] || {x: 50, y: 50};
      if (!windowPositions[windowId]) {
        setWindowPositions(prev => ({...prev, [windowId]: position}));
      }
      return <div style={{position: 'absolute', top: position.y, left: position.x, width: 200, height: "fit-content", backgroundColor: 'white', border: '1px solid #000'}}>
      <div 
        onMouseDown={(e) => setDragging({windowId, offsetX: e.clientX - position.x, offsetY: e.clientY - position.y})}
        style={{border: "1px solid #000", display: 'flex', flexDirection: 'row', justifyContent: 'space-between', cursor: 'grab', userSelect: 'none'}}>
        <p style={{margin: 0}} onClick={() => setWindowsOpen(windowsOpen.filter(window => window !== "print-gallery"))}>x</p>
 
       <p style={{margin: 0}}>Print Gallery</p>
        <p style={{margin: 0}}> </p>
      </div>
      <div style={{padding: 8}}>
          {prints.map((print, index) => (
            <div key={index} style={{marginBottom: 8, padding: 0}}>
              <img src={print.printImage} alt={print.name} style={{width: '100%', height: 'auto'}} />
              <p style={{margin: 0}}>{print.name}</p>
              <p style={{margin: 0, fontSize: 12}}>by <a href={`https://github.com/${print.madeBy}`} target="_blank" rel="noopener noreferrer" style={{textDecoration: 'underline', color: 'inherit'}}>{print.madeBy}</a></p>
            </div>
          ))}
      </div>
    </div>;
    })()}

    <div onClick={() => {
      if (hasBeenTapped) {
        setWindowsOpen([...windowsOpen, "welcome-window"]);
      }
      setHasBeenTapped(!hasBeenTapped);
    }} style={{display: 'flex', cursor: 'pointer', border: hasBeenTapped ? "1px solid #000" : "1px solid transparent", flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
      <p style={{margin: 0, pointerEvents: 'none'}}>✉️</p>
      <p style={{margin: 0, pointerEvents: 'none'}}>Print Club</p>
    </div>
  </div>;
}
