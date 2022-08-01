/*jshint esversion: 6 */
import React from 'react';

import  AnimationComp from './components/animationComp';

import './sass/backend.sass';

declare const wp:any;

declare interface wmwpaaAtributes {
  animationScriptUrl?: string
  animationId?: string
}

declare interface wmwpaaProps {
  setAttributes: ( attr:wmwpaaAtributes )=>void
  attributes: wmwpaaAtributes
  className: string
}



const { registerBlockType } = wp.blocks;
const { InspectorControls } = wp.blockEditor;
const { Fragment } = wp.element;
const { TextControl, PanelBody, PanelRow } = wp.components;


const block = registerBlockType( 'wmwpaa/block', {
  title: 'Adobe Animate animation',
  icon: 'format-image',
  category: 'layout',

  attributes: {
    animationScriptUrl: {
      type: 'text',
      value: ''
    },
    animationId: {
      type: 'text',
      value: ''
    }
  },

  edit ( props:wmwpaaProps ) {

    const {attributes, setAttributes} = props;


    return [

      <Fragment key="wmwpaa-row-specs">
        <InspectorControls>
          <PanelBody title={'Adobe Animation Settings'}>
            <PanelRow>
              <TextControl
                label="Animation script url"
                value={attributes.animationScriptUrl}
                onChange={( value: string ) => {
                  setAttributes( { animationScriptUrl: value } );
                }}
              />
            </PanelRow>
            <PanelRow>
              <TextControl
                label="Animation ID"
                value={attributes.animationId}
                onChange={( value: string ) => {
                  setAttributes( { animationId: value } );
                }}
              />
            </PanelRow>
          </PanelBody>
        </InspectorControls>
      </Fragment>,
        
      <div key={`adobe-animate-${Math.round( Math.random()*1000000 )}`} className={`${props.className} wmwpaa-block`}
        data-animationUrl={attributes.animationScriptUrl}
        data-animationId={attributes.animationId}>
        <AnimationComp id={attributes.animationId} url={attributes.animationScriptUrl} />
      </div>
    ];
  },

  save ( props:wmwpaaProps ) {

    const {className, attributes} = props;

    return (
      <div 
        className={`${className} wmwpaa-block`}
        data-animationUrl={attributes.animationScriptUrl}
        data-animationId={attributes.animationId}
      ></div>
    );
  }
} );

export {block};