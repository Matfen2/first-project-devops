import { useState } from 'react'
import {
  Background,
  StatusBadge,
  Hero,
  Pipeline,
  TechTags,
  CTAButtons,
  DockerSection,
  Footer
} from './components'

function App() {
  const [isDockerOpen, setIsDockerOpen] = useState(false)

  return (
    <div className="min-h-screen bg-[#0a0f1a] flex flex-col items-center justify-center px-4 py-16 relative overflow-hidden">
      {/* Background Effects */}
      <Background />

      {/* Main Content */}
      <div className="relative z-10 max-w-3xl w-full">
        <StatusBadge />
        <Hero />
        <Pipeline />
        <TechTags />
        <CTAButtons 
          isDockerOpen={isDockerOpen} 
          setIsDockerOpen={setIsDockerOpen} 
        />
        <DockerSection isOpen={isDockerOpen} />
        <Footer />
      </div>
    </div>
  )
}

export default App