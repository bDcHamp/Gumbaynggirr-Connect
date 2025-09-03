import React, { useState, useEffect, useRef } from 'react';

// --- Helper Functions & Data ---

// Helper to get days in a month for the calendar
const getDaysInMonth = (year, month) => {
  return new Date(year, month + 1, 0).getDate();
};

const getFirstDayOfMonth = (year, month) => {
  return new Date(year, month, 1).getDay();
};

// --- SVG Icons ---
// Using inline SVGs to keep everything in one file and avoid external dependencies.
const HomeIcon = ({ className = "w-6 h-6" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
    <polyline points="9 22 9 12 15 12 15 22" />
  </svg>
);

const CalendarIcon = ({ className = "w-6 h-6" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
    <line x1="16" x2="16" y1="2" y2="6" />
    <line x1="8" x2="8" y1="2" y2="6" />
    <line x1="3" x2="21" y1="10" y2="10" />
  </svg>
);

const UsersIcon = ({ className = "w-6 h-6" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);

const HeartIcon = ({ className = "w-6 h-6" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
  </svg>
);

const MapPinIcon = ({ className = "w-6 h-6" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" />
    </svg>
);

const MicIcon = ({ className = "w-6 h-6" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" /><path d="M19 10v2a7 7 0 0 1-14 0v-2" /><line x1="12" y1="19" x2="12" y2="23" /><line x1="8" y1="23" x2="16" y2="23" />
    </svg>
);

const WifiOffIcon = ({ className = "w-6 h-6" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <line x1="1" y1="1" x2="23" y2="23" /><path d="M16.72 11.06A10.94 10.94 0 0 1 19 12.55" /><path d="M5 12.55a10.94 10.94 0 0 1 5.17-2.39" /><path d="M10.71 5.05A16 16 0 0 1 22.58 9" /><path d="M1.42 9a15.91 15.91 0 0 1 4.7-2.88" /><path d="M8.53 16.11a6 6 0 0 1 6.95 0" /><line x1="12" y1="20" x2="12.01" y2="20" />
    </svg>
);

const ClockIcon = ({ className = "w-5 h-5" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
  </svg>
);

const UserIcon = ({ className = "w-5 h-5" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" />
  </svg>
);

const MoreIcon = ({ className = "w-6 h-6" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <circle cx="12" cy="12" r="1" /><circle cx="19" cy="12" r="1" /><circle cx="5" cy="12" r="1" />
  </svg>
);

// --- Custom Hook for Microphone Logic ---
const useMicrophone = () => {
    const [permissionStatus, setPermissionStatus] = useState('idle'); // idle, pending, granted, denied
    const [recordingStatus, setRecordingStatus] = useState('inactive'); // inactive, recording
    const [audioURL, setAudioURL] = useState('');
    const [error, setError] = useState(null);
    const mediaRecorderRef = useRef(null);
    const audioChunksRef = useRef([]);

    const getPermission = async () => {
        setPermissionStatus('pending');
        setError(null);
        try {
            await navigator.mediaDevices.getUserMedia({ audio: true });
            setPermissionStatus('granted');
            return true;
        } catch (err) {
            setError(err);
            setPermissionStatus('denied');
            return false;
        }
    };

    const startRecording = async () => {
        const isPermissionGranted = await getPermission();
        if (!isPermissionGranted) {
            console.error("Microphone permission denied.");
            return;
        }

        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        mediaRecorderRef.current = new MediaRecorder(stream);
        audioChunksRef.current = [];

        mediaRecorderRef.current.ondataavailable = event => {
            audioChunksRef.current.push(event.data);
        };

        mediaRecorderRef.current.onstop = () => {
            const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
            const url = URL.createObjectURL(audioBlob);
            setAudioURL(url);
            stream.getTracks().forEach(track => track.stop()); // Stop the stream
        };

        mediaRecorderRef.current.start();
        setRecordingStatus('recording');
    };

    const stopRecording = () => {
        if (mediaRecorderRef.current) {
            mediaRecorderRef.current.stop();
            setRecordingStatus('inactive');
        }
    };

    return { permissionStatus, recordingStatus, audioURL, error, startRecording, stopRecording };
};


// --- Reusable UI Components ---

const Card = ({ children, className = "" }) => (
  <div className={`bg-white rounded-xl shadow-md overflow-hidden p-6 mb-6 ${className}`}>
    {children}
  </div>
);

const Button = ({ children, onClick, className = "", disabled = false }) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className={`w-full bg-teal-600 hover:bg-teal-700 text-white font-bold py-3 px-4 rounded-lg transition duration-300 ease-in-out transform hover:scale-105 disabled:bg-gray-400 disabled:cursor-not-allowed ${className}`}
  >
    {children}
  </button>
);

const Input = ({ placeholder, type = "text" }) => (
    <input
      type={type}
      placeholder={placeholder}
      className="w-full px-4 py-3 bg-gray-100 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-teal-500 transition"
    />
);

// --- Page Components ---

const HomePage = ({ onNavigate }) => (
  <div>
    <div className="relative h-48 bg-teal-800 rounded-xl mb-6 overflow-hidden">
      <img src="https://placehold.co/600x400/0F766E/FFFFFF?text=Muurrbuy&font=lora" className="absolute inset-0 w-full h-full object-cover opacity-30" alt="Cultural pattern" />
      <div className="relative h-full flex flex-col justify-center items-center text-white p-4 text-center">
        <h1 className="text-4xl font-bold">Muurrbuy</h1>
        <p className="text-lg mt-1">Language & Culture Co-operative</p>
      </div>
    </div>
    
    <Card>
      <h2 className="text-2xl font-bold text-gray-800 mb-3">Welcome</h2>
      <p className="text-gray-600 leading-relaxed">
        Strengthening community connection, culture, and language revival. This app is your mobile-first gateway to access information, events, and updates from the Muurrbuy Aboriginal Language and Culture Co-operative.
      </p>
    </Card>

    <Card>
        <div className="flex items-start space-x-4 mb-4">
            <div className="text-teal-600">
                <CalendarIcon className="w-8 h-8"/>
            </div>
            <div>
                <h2 className="text-xl font-bold text-gray-800">View Community Events</h2>
                <p className="text-gray-600">Stay connected to culture</p>
            </div>
        </div>
        <Button onClick={() => onNavigate('events')}>
            Open Calendar
        </Button>
    </Card>

    <Card>
      <h2 className="text-2xl font-bold text-gray-800 mb-3">Our Mission</h2>
      <p className="text-gray-600 leading-relaxed">
        We are focused on the revival and maintenance of the Aboriginal languages of NSW, particularly Gumbaynggirr. We provide a space for community to learn, share, and celebrate our rich cultural heritage.
      </p>
    </Card>
  </div>
);

// --- Mock Data ---
const dummyEvents = [
    {
        id: 1,
        day: 17,
        title: 'Gumbaynggirr Language Circle',
        time: '10:00-12:00',
        fullDate: 'Fri, 17 Jan',
        location: 'Bowraville Community Hall',
        mapLink: 'https://www.google.com/maps/search/?api=1&query=Bowraville+Community+Hall',
        host: 'Elder Mary Johnson',
        about: 'Join us for our weekly language circle where we practice Gumbaynggirr language and phrases in a supportive community environment.',
        toBring: 'Notebook, water bottle, and an open heart ready to learn.',
        significance: 'Language circles are essential for keeping our mother tongue alive and passing it on to future generations.'
    },
    {
        id: 2,
        day: 22,
        title: 'Community Weaving',
        time: '13:00-15:00',
        fullDate: 'Wed, 22 Jan',
        location: 'Nambucca Heads Arts Centre',
        mapLink: 'https://www.google.com/maps/search/?api=1&query=Nambucca+Heads+Arts+Centre',
        host: 'Aunty Grace',
        about: 'Learn traditional weaving techniques passed down through generations. All materials provided.',
        toBring: 'Just yourself and a willingness to learn!',
        significance: 'Weaving is a way to connect with culture, country, and community.'
    }
];

const CulturalVoiceNote = ({ title }) => {
    const { permissionStatus, recordingStatus, audioURL, error, startRecording, stopRecording } = useMicrophone();

    return (
        <Card className="!p-4 !mb-4">
            <h3 className="font-bold mb-2">Cultural Voice Note</h3>
            <p className="text-sm text-stone-600 mb-4">Record your thoughts about {title}.</p>
            
            <div className="flex flex-col items-center">
                {recordingStatus === 'inactive' ? (
                    <Button onClick={startRecording} disabled={permissionStatus === 'pending'}>
                        {permissionStatus === 'pending' ? 'Waiting...' : 'Start Recording'}
                    </Button>
                ) : (
                    <Button onClick={stopRecording} className="bg-red-600 hover:bg-red-700">
                        Stop Recording
                    </Button>
                )}

                {permissionStatus === 'denied' && (
                    <p className="text-red-500 text-sm mt-2">Microphone access was denied. Please enable it in your browser settings.</p>
                )}
                {error && <p className="text-red-500 text-sm mt-2">An error occurred: {error.message}</p>}

                {audioURL && (
                    <div className="mt-4 w-full">
                        <p className="text-sm font-semibold mb-2">Listen to your recording:</p>
                        <audio src={audioURL} controls className="w-full"></audio>
                    </div>
                )}
            </div>

            <div className="bg-stone-100 p-3 rounded-lg mt-4 text-sm text-stone-500">
                <p className="font-semibold">Cultural Note:</p>
                <p>Voice recordings help preserve our thoughts and reflections about cultural events. These notes are stored locally on your device.</p>
            </div>
        </Card>
    );
};


const EventDetailPage = ({ event, onBack }) => {
    return (
        <div className="bg-stone-50 text-stone-800">
            <button onClick={onBack} className="text-teal-600 font-semibold mb-4">&larr; Back to Calendar</button>
            <div className="text-center mb-6">
                <div className="inline-block bg-red-500 rounded-full p-3 mb-4">
                     <MicIcon className="w-8 h-8 text-white" />
                </div>
                <h1 className="text-2xl font-bold">{event.title}</h1>
            </div>
            <div className="text-stone-700 space-y-6 mb-6">
                <div className="flex items-center">
                    <div className="w-16 h-16 bg-teal-500/10 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                        <ClockIcon className="w-10 h-10 text-teal-600" />
                    </div>
                    <div className="text-lg">
                        <p>{event.fullDate}</p>
                        <p className="font-bold">{event.time}</p>
                    </div>
                </div>
                <div className="flex items-center">
                    <div className="w-16 h-16 bg-teal-500/10 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                        <MapPinIcon className="w-10 h-10 text-teal-600" />
                    </div>
                    <p className="text-lg font-bold">{event.location}</p>
                </div>
                <div className="flex items-center">
                     <div className="w-16 h-16 bg-teal-500/10 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                        <UserIcon className="w-10 h-10 text-teal-600" />
                    </div>
                    <p className="text-lg font-bold">{event.host}</p>
                </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-6 text-center text-sm">
                <button className="bg-white p-3 rounded-lg shadow-sm">Save</button>
                <a href={event.mapLink} target="_blank" rel="noopener noreferrer" className="bg-white p-3 rounded-lg shadow-sm inline-block">Map</a>
                <button className="bg-white p-3 rounded-lg shadow-sm">Record</button>
                <button className="bg-white p-3 rounded-lg shadow-sm">Offline</button>
            </div>

            <div className="space-y-4">
                 <Card className="!p-4 !mb-4">
                    <h3 className="font-bold mb-2">Location & Directions</h3>
                    <p className="text-sm text-stone-600">{event.location}</p>
                    <div className="bg-stone-100 p-3 rounded-lg mt-2 text-sm text-stone-500">
                        <p className="font-semibold">Getting to Country:</p>
                        <p>This event is held on traditional Gumbaynggirr land. Please travel safely and respectfully through our Country.</p>
                    </div>
                 </Card>

                 <CulturalVoiceNote title={event.title} />

                 <Card className="!p-4 !mb-4">
                    <h3 className="font-bold mb-2">About this gathering</h3>
                    <p className="text-sm text-stone-600">{event.about}</p>
                 </Card>
                 <Card className="!p-4 !mb-4">
                    <h3 className="font-bold mb-2">What to bring</h3>
                    <p className="text-sm text-stone-600">{event.toBring}</p>
                 </Card>
                 <Card className="!p-4 !mb-4">
                    <h3 className="font-bold mb-2">Cultural significance</h3>
                    <p className="text-sm text-stone-600">{event.significance}</p>
                 </Card>
            </div>
        </div>
    );
};


const EventsPage = ({ onSelectEvent }) => {
  const [date, setDate] = useState(new Date(2025, 0, 1)); // Set to Jan 2025 for demo data

  const year = date.getFullYear();
  const month = date.getMonth();
  const monthName = date.toLocaleString('default', { month: 'long' });

  const eventsByDay = dummyEvents.reduce((acc, event) => {
      acc[event.day] = event;
      return acc;
  }, {});

  const renderCalendar = () => {
    const daysInMonth = getDaysInMonth(year, month);
    const firstDay = getFirstDayOfMonth(year, month);
    const calendarDays = [];

    for (let i = 0; i < firstDay; i++) {
      calendarDays.push(<div key={`empty-${i}`} className="p-2"></div>);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const event = eventsByDay[day];
      const calendarDay = (
        <div key={day} className={`text-center p-2 rounded-lg ${event ? 'bg-teal-100 border border-teal-200 cursor-pointer hover:bg-teal-200' : ''}`} onClick={() => event && onSelectEvent(event.id)}>
          <span className="font-medium text-gray-700">{day}</span>
          {event && <p className="text-xs text-teal-700 mt-1 truncate">{event.title}</p>}
        </div>
      );
      calendarDays.push(calendarDay);
    }

    return calendarDays;
  };
  
  const goToPreviousMonth = () => setDate(new Date(year, month - 1, 1));
  const goToNextMonth = () => setDate(new Date(year, month + 1, 1));

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Events Calendar</h1>
      <Card>
        <div className="flex items-center justify-between mb-4">
          <button onClick={goToPreviousMonth} className="p-2 rounded-full hover:bg-gray-100">&larr;</button>
          <h2 className="text-xl font-bold text-gray-800">{monthName} {year}</h2>
          <button onClick={goToNextMonth} className="p-2 rounded-full hover:bg-gray-100">&rarr;</button>
        </div>
        <div className="grid grid-cols-7 gap-2 text-sm text-center font-semibold text-gray-500 mb-2">
          <div>S</div><div>M</div><div>T</div><div>W</div><div>T</div><div>F</div><div>S</div>
        </div>
        <div className="grid grid-cols-7 gap-2">
          {renderCalendar()}
        </div>
      </Card>
      
      <div className="mt-6">
          <h3 className="text-xl font-bold text-gray-800 mb-3">Upcoming Events</h3>
          <ul className="space-y-3">
              {dummyEvents.map(event => (
                  <li key={event.id} className="bg-white p-4 rounded-lg shadow-sm flex items-center cursor-pointer hover:shadow-md" onClick={() => onSelectEvent(event.id)}>
                      <div className="bg-teal-500 text-white rounded-lg w-12 h-12 flex flex-col justify-center items-center mr-4">
                          <span className="text-xs font-bold">{monthName.substring(0,3)}</span>
                          <span className="text-lg font-bold">{event.day}</span>
                      </div>
                      <p className="text-gray-700 font-medium">{event.title}</p>
                  </li>
              ))}
          </ul>
      </div>
    </div>
  );
};

const CommunityPage = () => {
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmitted(true);
        setTimeout(() => setSubmitted(false), 3000);
    };

    return (
        <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Join Our Community</h1>
            {submitted && (<div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg relative mb-6">Thank you! Your form has been submitted.</div>)}
            <Card>
                <form onSubmit={handleSubmit}>
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">Newsletter Sign-up</h2>
                    <div className="space-y-4">
                       <Input placeholder="Your Name" />
                       <Input placeholder="Your Email Address" type="email" />
                    </div>
                    <Button className="mt-6">Subscribe</Button>
                </form>
            </Card>
            <Card>
                <form onSubmit={handleSubmit}>
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">Volunteer</h2>
                    <div className="space-y-4">
                        <Input placeholder="Your Name" />
                        <Input placeholder="Your Email Address" type="email" />
                        <textarea placeholder="Tell us how you'd like to contribute..." className="w-full h-24 px-4 py-3 bg-gray-100 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-teal-500 transition"></textarea>
                    </div>
                    <Button className="mt-6">Submit Interest</Button>
                </form>
            </Card>
        </div>
    );
};

const DonatePage = () => {
    const [selectedAmount, setSelectedAmount] = useState(50);
    const amounts = [10, 25, 50, 100];
    return (
        <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Support Our Mission</h1>
            <Card>
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Secure Donations</h2>
                <p className="text-gray-600 mb-6">Your contribution helps us preserve and revitalise our language and culture.</p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
                    {amounts.map(amount => (<button key={amount} onClick={() => setSelectedAmount(amount)} className={`p-4 rounded-lg border-2 text-xl font-bold transition ${selectedAmount === amount ? 'bg-teal-600 border-teal-600 text-white' : 'bg-gray-100 border-gray-200 text-gray-800 hover:border-teal-400'}`}>${amount}</button>))}
                </div>
                <div className="flex items-center mb-6">
                    <span className="text-2xl font-bold text-gray-500 mr-2">$</span>
                    <input type="number" value={selectedAmount} onChange={(e) => setSelectedAmount(parseInt(e.target.value, 10))} className="w-full text-2xl font-bold p-3 bg-gray-100 rounded-lg border-none focus:outline-none focus:ring-2 focus:ring-teal-500"/>
                </div>
                <Button onClick={() => alert(`Thank you for your donation of $${selectedAmount}!`)}>Donate ${selectedAmount}</Button>
                 <p className="text-xs text-gray-400 mt-4 text-center">Powered by Stripe for secure payments.</p>
            </Card>
        </div>
    );
};

const PlaceholderPage = ({ title, icon, children }) => (
    <div>
        <div className="text-center text-teal-600 mb-6">
            {React.cloneElement(icon, { className: "w-16 h-16 mx-auto" })}
        </div>
        <h1 className="text-3xl font-bold text-gray-800 mb-4 text-center">{title}</h1>
        <Card>
            <p className="text-gray-600 leading-relaxed text-center">{children}</p>
        </Card>
    </div>
);

const VoiceNotesPage = () => {
    const { permissionStatus, recordingStatus, audioURL, error, startRecording, stopRecording } = useMicrophone();
    
    return (
         <div>
            <div className="text-center text-teal-600 mb-6">
                <MicIcon className="w-16 h-16 mx-auto" />
            </div>
            <h1 className="text-3xl font-bold text-gray-800 mb-4 text-center">Voice Notes</h1>
            <Card>
                <p className="text-gray-600 leading-relaxed text-center mb-6">Record your thoughts, practice language pronunciation, or save cultural stories. Your notes are saved locally on your device.</p>
                <div className="flex flex-col items-center">
                    {recordingStatus === 'inactive' ? (
                        <Button onClick={startRecording} disabled={permissionStatus === 'pending'}>
                            {permissionStatus === 'pending' ? 'Requesting Permission...' : 'Start New Recording'}
                        </Button>
                    ) : (
                        <Button onClick={stopRecording} className="bg-red-600 hover:bg-red-700">
                            Stop Recording
                        </Button>
                    )}
                    
                    {permissionStatus === 'denied' && (
                        <p className="text-red-500 text-sm mt-2 text-center">Microphone access was denied. Please enable it in your browser settings to record audio.</p>
                    )}
                    {error && <p className="text-red-500 text-sm mt-2">An error occurred: {error.message}</p>}

                    {audioURL && (
                        <div className="mt-6 w-full">
                            <h3 className="text-lg font-semibold mb-2 text-center">Your Latest Recording</h3>
                            <audio src={audioURL} controls className="w-full"></audio>
                        </div>
                    )}
                </div>
            </Card>
        </div>
    );
};


const MorePage = ({ onNavigate }) => (
    <div>
        <h1 className="text-3xl font-bold text-gray-800 mb-6">More</h1>
        <div className="space-y-4">
            <Card className="!p-0">
                <button onClick={() => onNavigate('donate')} className="w-full text-left p-6 flex items-center hover:bg-gray-50 transition-colors rounded-xl">
                    <HeartIcon className="w-6 h-6 mr-4 text-teal-600"/>
                    <span className="text-lg font-semibold text-gray-800">Support Our Mission</span>
                </button>
            </Card>
            <Card className="!p-0">
                 <button onClick={() => onNavigate('notes')} className="w-full text-left p-6 flex items-center hover:bg-gray-50 transition-colors rounded-xl">
                    <MicIcon className="w-6 h-6 mr-4 text-teal-600"/>
                    <span className="text-lg font-semibold text-gray-800">Voice Notes</span>
                </button>
            </Card>
            <Card className="!p-0">
                 <button onClick={() => onNavigate('offline')} className="w-full text-left p-6 flex items-center hover:bg-gray-50 transition-colors rounded-xl">
                    <WifiOffIcon className="w-6 h-6 mr-4 text-teal-600"/>
                    <span className="text-lg font-semibold text-gray-800">Offline Status</span>
                </button>
            </Card>
        </div>
    </div>
);


// --- Main App Component ---

export default function App() {
    const [view, setView] = useState({ page: 'home', id: null });

    const navigateTo = (page, id = null) => setView({ page, id });

    const renderPage = () => {
        switch (view.page) {
            case 'home':
                return <HomePage onNavigate={navigateTo} />;
            case 'events':
                return <EventsPage onSelectEvent={(id) => navigateTo('eventDetail', id)} />;
            case 'eventDetail':
                const event = dummyEvents.find(e => e.id === view.id);
                return <EventDetailPage event={event} onBack={() => navigateTo('events')} />;
            case 'locations':
                return <PlaceholderPage title="Locations" icon={<MapPinIcon />}>Find community venues, cultural sites, and event locations. This feature will integrate with maps to provide directions. (Functionality coming soon)</PlaceholderPage>;
            case 'notes':
                return <VoiceNotesPage />;
            case 'community':
                return <CommunityPage />;
            case 'offline':
                return <PlaceholderPage title="Offline Ready" icon={<WifiOffIcon />}>This app is a PWA (Progressive Web App). Key information and features are available even when you're offline, ensuring you always have access.</PlaceholderPage>;
            case 'donate':
                return <DonatePage />;
            case 'more':
                return <MorePage onNavigate={navigateTo} />;
            default:
                return <HomePage />;
        }
    };

    const NavItem = ({ page, icon, label }) => (
        <button onClick={() => navigateTo(page)} className={`flex flex-col items-center justify-center w-full pt-2 pb-1 transition-colors duration-200 ${view.page === page ? 'text-teal-600' : 'text-gray-500 hover:text-teal-500'}`}>
            {icon}
            <span className="text-xs mt-1">{label}</span>
        </button>
    );

    return (
        <div className="font-sans bg-gray-50 min-h-screen">
            <div className="container mx-auto max-w-lg bg-gray-50 shadow-lg flex flex-col" style={{ minHeight: '100vh' }}>
                <main className="flex-grow p-4 sm:p-6 pb-24">
                    {renderPage()}
                </main>
                <nav className="fixed bottom-0 left-0 right-0 max-w-lg mx-auto bg-white border-t border-gray-200 shadow-up grid grid-cols-5">
                    <NavItem page="home" label="Home" icon={<HomeIcon />} />
                    <NavItem page="events" label="Events" icon={<CalendarIcon />} />
                    <NavItem page="locations" label="Locations" icon={<MapPinIcon />} />
                    <NavItem page="community" label="Community" icon={<UsersIcon />} />
                    <NavItem page="more" label="More" icon={<MoreIcon />} />
                </nav>
            </div>
        </div>
    );
}