import React from 'react'
import Component13 from './Component13'
import Component12 from './Component12'
import ComponentG11 from './ComponentG11'
import ComponentG12 from './ComponentG12'
import ComponentG13 from './ComponentG13'
import ComponentGLiveContent from './ComponentGLiveContent'
import ComponentMoreHeadlines from './ComponentMoreHeadlines'
import ComponentRegular from './ComponentRegular'
import ComponentTopNews from './ComponentTopNews'
import ComponentWall3 from './ComponentWall3'

const LayoutIndex = () => {

  return (
    <>
      <div className='h-screen w-screen'>
        <Component13 />
        <Component12 />
        <ComponentG11 />
        <ComponentG12 />
        <ComponentG13 />
        <ComponentGLiveContent />
        <ComponentMoreHeadlines />
        <ComponentRegular />
        <ComponentTopNews />
        <ComponentWall3 />
        <ComponentWall3 />
      </div>
    </>
  )
}

export default LayoutIndex