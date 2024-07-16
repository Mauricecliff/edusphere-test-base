import React from 'react'
import Hero from './landing-page/sections/Hero'
import PlatformFeatures from './landing-page/sections/Platform-Features'
import Community from './landing-page/sections/Community'
import Empower from './landing-page/sections/Empower'
import Material from './landing-page/sections/Material'

export default function LandingPage() {
  return (
    <div className="px-5">
        <Hero />
        <PlatformFeatures /> 
        <Community />
        <Empower />
        <Material />
    </div>
  )
    
}
