import React, { useEffect, useRef } from 'react';
import loadAnimations from '../functions/loadAnimation';

declare interface AnimationCompType {
  id: string
  url: string
}

/**
 * generates the Adobe Animate animation and renders it to the react component.
 * 
 * @param id string The Adobe Animate animation ID
 * @param url string The Adobe Animate animation javascript full url
 * @returns React.Component
 * @since 0.1.0
 */
const AnimationComp: React.FC<AnimationCompType> = ( { id, url} ) => {

  const animParent = useRef<HTMLDivElement>( null );

  useEffect( ()=>{
    loadAnimations( id, url, animParent.current );
  },[id, url] );
  return (
    <div 
      ref={animParent}
    ></div>
  );
};

export default AnimationComp;