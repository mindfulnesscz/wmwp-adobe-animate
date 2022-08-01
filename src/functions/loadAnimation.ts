import loadAsyncScript from './loadAsyncScript';
import '../types/types';

declare const AdobeAn:any;
declare const createjs:any;


/**
 * Renders the Adobe Animate animation from url to given DIV element with given Adobe Animation CC ID.
 * 
 * @param id string the id of andobe animate animation 
 * @param url string full url adress to adoba animate animate generated javascript
 * @param el HTMLDivElement the element to render the animation into
 * @return void
 * @since 0.1
 */
export default function loadAnimation ( id: string, url:string, el:HTMLDivElement ):void {


  // Loop them
  console.log( el );


  // Clean inside
  el.innerHTML = '';


  console.log( id );
  console.log( url );


  // Check if all is good with data ( TODO: better data checking)
  if( id && url && id != '' && url != '' ) {

    // Build DOM Environment
    const elCanvas = document.createElement( 'canvas' );
    const elOverCont = document.createElement( 'div' );

    elCanvas.classList.add( 'wmwpaa-canvas' );
    elOverCont.classList.add( 'wmwpaa-dom-overlay-container' );

    el.appendChild( elCanvas );
    el.appendChild( elOverCont );

    const makeResponsive = ( lib:any, isResp:boolean, respDim:string, isScale:boolean, scaleType:number, domContainers:Array<any> ) => {
      let lastW:number, lastH:number, lastS=1;

      const resizeCanvas = () => {
        const w = lib.properties.width, h = lib.properties.height;
        const iw = document.getElementsByTagName( 'body' )[0].clientWidth, ih=document.getElementsByTagName( 'body' )[0].clientHeight;
        const pRatio = window.devicePixelRatio || 1, xRatio=iw/w, yRatio=ih/h;
        let sRatio=1;
        
        if( isResp ) {
          if( ( respDim=='width'&&lastW==iw ) || ( respDim=='height'&&lastH==ih ) ) {
            sRatio = lastS;
          }
          else if( !isScale ) {
            if( iw<w || ih<h )
              sRatio = Math.min( xRatio, yRatio );
          }
          else if( scaleType==1 ) {
            sRatio = Math.min( xRatio, yRatio );
          }
          else if( scaleType==2 ) {
            sRatio = Math.max( xRatio, yRatio );
          }
        }
        domContainers[0].width = w * pRatio * sRatio;
        domContainers[0].height = h * pRatio * sRatio;
        domContainers.forEach( function ( container ) {
          container.style.width = w * sRatio + 'px';
          container.style.height = h * sRatio + 'px';
        } );
        window.stage.scaleX = pRatio*sRatio;
        window.stage.scaleY = pRatio*sRatio;
        lastW = iw; lastH = ih; lastS = sRatio;
        window.stage.tickOnUpdate = false;
        window.stage.update();
        window.stage.tickOnUpdate = true;
      };

      window.addEventListener( 'resize', resizeCanvas );
      resizeCanvas();
    };


    // Script loading
    loadAsyncScript( url ).then( ()=>{

      // All good script loaded and added
      const comp = AdobeAn.getComposition( id );
        
      const lib = comp.getLibrary();

      const exportRoot = new lib.wmwpanim();

      window.stage = new lib.Stage( elCanvas );	
    
      //Code to support hidpi screens and responsive scaling.
      makeResponsive( lib, true, 'both', false, 2, [elCanvas, el, elOverCont] );	







      AdobeAn.compositionLoaded( lib.properties.id );

      //Registers the "tick" event listener.
      window.stage.addChild( exportRoot );
      createjs.Ticker.framerate = lib.properties.fps;
      createjs.Ticker.addEventListener( 'tick', window.stage );

    }, ()=>{

      // Script failed to load
      throw new DOMException( 'Loading script from '+url+' failed. Adobe Animate animation could not be loaded.' );
    } );

  }
  else
    console.log( 'data not filled completely' );
  //throw new DOMException( 'There has been an error building the Adobe animate animation. Id or URL is missing from parameters.' );

  
}
