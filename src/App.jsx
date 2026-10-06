import { lazy, Suspense, useState } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import LoadingEnvelope from './components/LoadingEnvelope'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import CoupleStory from './components/CoupleStory'
import Countdown from './components/Countdown'
import EventSchedule from './components/EventSchedule'
import Gallery from './components/Gallery'
import Venue from './components/Venue'
import RSVPForm from './components/RSVPForm'
import WishesWall from './components/WishesWall'
import FamilySection from './components/FamilySection'
import FinaleSection from './components/FinaleSection'
import Footer from './components/Footer'
import MusicPlayer from './components/MusicPlayer'
import AIAssistant from './components/AIAssistant'
import CursorTrail from './components/CursorTrail'
import FlyingButterflies from './components/FlyingButterflies'
import Marquee from './components/Marquee'
import Experience3D from './components/Experience3D'
import VideoShowcase from './components/VideoShowcase'
import useSceneControls from './hooks/useSceneControls'
import useActiveSection from './hooks/useActiveSection'
import useBackgroundMusic from './hooks/useBackgroundMusic'
import { couple, heroPoster, music as musicTrack } from './data/weddingData'

const SceneCanvas = lazy(() => import('./components/SceneCanvas'))
const InvitationPage = lazy(() => import('./components/InvitationPage'))

function MainPage({ music }) {
  const location = useLocation()
  const sceneControls = useSceneControls()
  const activeSection = useActiveSection()
  const [entered, setEntered] = useState(location.state?.skipEnvelope || false)

  return (
    <AnimatePresence mode="wait" initial={false}>
      {!entered ? (
        <motion.div
          key="envelope"
          className="fixed inset-0 z-[200]"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <LoadingEnvelope onEnter={() => setEntered(true)} onMusicStart={music.toggle} />
        </motion.div>
      ) : (
        <motion.div
          key="celebration"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.1, ease: 'easeOut' }}
        >
          <div className="relative">
            <div className="fixed inset-0 z-0 overflow-hidden">
              <img
                src={heroPoster}
                alt=""
                aria-hidden="true"
                className="absolute inset-0 h-full w-full object-cover opacity-[0.95] sm:object-contain"
                style={{ objectPosition: 'center 48%' }}
              />
              <div
                className="absolute inset-0"
                style={{
                  background:
                    'radial-gradient(circle at 50% 28%, rgba(42,15,20,0.08) 0%, rgba(26,9,13,0.22) 60%, rgba(20,7,10,0.4) 100%)',
                }}
              />
              <Suspense fallback={null}>
                <SceneCanvas controls={sceneControls} activeSection={activeSection} className="absolute inset-0" />
              </Suspense>
            </div>

            <CursorTrail />
            <FlyingButterflies />
            <Navbar />
            <MusicPlayer music={music} />
            <AIAssistant />

            <main className="relative z-10">
              <Hero />
              <Marquee text={`${couple.hashtag}  ·  ${couple.weddingDateDisplay}  ·  Save The Date  ·  `} />
              <Experience3D />
              <CoupleStory />
              <Countdown />
              <EventSchedule />
              <Gallery />
              <VideoShowcase />
              <Venue />
              <FamilySection />
              <RSVPForm />
              <WishesWall />
              <FinaleSection />
            </main>

            <Footer />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default function App() {
  const music = useBackgroundMusic(musicTrack.src)

  return (
    <Routes>
      <Route
        path="/invitation"
        element={
          <Suspense fallback={null}>
            <InvitationPage music={music} />
          </Suspense>
        }
      />
      <Route path="*" element={<MainPage music={music} />} />
    </Routes>
  )
}
