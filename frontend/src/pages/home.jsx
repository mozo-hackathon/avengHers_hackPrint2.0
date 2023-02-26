import React from 'react'
import AboutUs from '../components/aboutUs'
import ContactUs from '../components/contactUs'
import Faqs from '../components/Faqs'
import Carousel1 from '../components/Carousel1'

export default function Home() {
  return (
    <div>
     
      <Carousel1/>
      <AboutUs/>
      <ContactUs/>
      <Faqs/>
    
    </div>
  )
}
