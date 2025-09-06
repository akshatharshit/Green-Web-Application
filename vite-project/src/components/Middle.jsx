import React from 'react'
import Banner from './Banner'
import PlantTree from './PlantTree'
import Hero from './Hero'
import PlantCards from './PlantCards'
import Add from './AI/Add'
import AddItem from './itemcreate/AddItem'
import MoveToList from './ListingArea/MoveToList'
import AddBlogList from './Blog/AddBlogList'
import TreeModel from './TreeModel'
import ImpactStats from './ImpactStates'
import Leaderboard from './Reward/Leaderboard'
import InfoCardGrid from './UI/InfoCardGrid'
import TestimonialSlider from './UI/TestimonialSlider'
import MapView from './UI/MapView'
import TreeTimeline from './UI/TreeTimeline'
import About from './UI/About'
import Contact from './UI/Contact'
import LocationEwather from './weatherTemp/LocationEwather'
import AIPredictionCards from './AI/AIPredictionCards'

function Middle() {
  return (<>
{/*   
    <Banner/>
    <PlantTree /> */}
    <Hero/>
    <section id="ai-prediction-cards">
    <AIPredictionCards />
    </section>

    {/* <LocationEwather/> */}
    
    <AddBlogList/>
    <TestimonialSlider/>
    {/* <MapView/> */}
    <TreeTimeline/>
    <Add/>
    <Leaderboard/>
    <PlantCards/>
    <ImpactStats/>
    <InfoCardGrid/>
    <About/>
    <Contact/>
    <MoveToList/>
    <AddItem/>
    {/* <TreeModel/> */}
  </>
  )
}




export default Middle