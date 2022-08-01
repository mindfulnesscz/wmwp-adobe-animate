import loadAnimation from './functions/loadAnimation';
import './sass/frontend.sass';

/**
 * This is the frontend display layer of WMWP Adobe Animate plugin
 *  
 * We grab .wmwpaa-block and read its data attributes which are passed to loadAnimation function. 
 * This funciton grabs target element, aa id and the source javascript file url 
 * and injects the animation into that element.
 **/
document.addEventListener( 'DOMContentLoaded', ()=>{
  const el = document.querySelector( '.wmwpaa-block' ) as HTMLDivElement;
  const id = el.getAttribute( 'data-animationid' );
  const url = el.getAttribute( 'data-animationurl' );

  loadAnimation( id, url, el );

} );