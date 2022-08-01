/**
 * Function that loads script and returns promise awaiting the script to be loaded
 * @since 0.1.0
 * @return Promise
 */
export default async function loadAsyncScript ( url:string ):Promise<unknown> {

  const script = document.createElement( 'script' );
  const att = document.createAttribute( 'type' );
  
  att.value = 'text/javascript';
  script.setAttributeNode( att );

  const ret = new Promise( ( resolve, reject ) =>{
    script.onload = ()=>{
      resolve( 'script' + url + ' loaded' );
    };
    script.onerror = ()=>{
      reject( 'script ' + url + ' has encountered an error.' );
    };
  } );

  script.src = url;

  document.head.appendChild( script );

  return ret;

}