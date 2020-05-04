'use strict';

import React, {Component} from 'react';

import {StyleSheet,Linking} from 'react-native';

import {
  ViroARScene,
  ViroText,
  ViroMaterials,
  ViroBox,
  Viro3DObject,
  ViroAmbientLight,
  ViroSpotLight,
  ViroARPlane,
  ViroARPlaneSelector,
  ViroQuad,
  ViroNode,
  ViroAnimations,
  ViroConstants,
} from 'react-viro';

var createReactClass = require('create-react-class');

var HelloWorldSceneAR = createReactClass({
  getInitialState() {
    return {
      hasARInitialized: false,
      text: 'Initializing AR...',
    };
  },

  goWiki : function(){
    Linking.openURL("https://es.wikipedia.org/wiki/Canis_lupus");
  },

  render: function () {
    return (
      <ViroARScene onTrackingUpdated={this._onTrackingUpdated}>
        <ViroAmbientLight color={'#aaaaaa'} influenceBitMask={1} />

        <ViroSpotLight
          innerAngle={5}
          outerAngle={90}
          direction={[0, -1, -0.2]}
          position={[0, 3, 1]}
          color="#aaaaaa"
          castsShadow={true}
        />

        {/* Node that contains a light, an object and a surface to catch its shadow
            notice that the dragType is "FixedToWorld" so the object can be dragged
            along real world surfaces and points. */}
        <ViroNode
          position={[0, 0, -0.5]}
          dragType="FixedToWorld"
          onDrag={() => {}}
        >
          {/* Spotlight to cast light on the object and a shadow on the surface, see
              the Viro documentation for more info on lights & shadows */}
          <ViroSpotLight
            innerAngle={5}
            outerAngle={45}
            direction={[0, -1, -0.2]}
            position={[0, 3, 0]}
            color="#ffffff"
            castsShadow={true}
            influenceBitMask={2}
            shadowMapSize={2048}
            shadowNearZ={2}
            shadowFarZ={5}
            shadowOpacity={0.7}
          />
          
            <Viro3DObject
              onClick={ this.goWiki }
              source={require('./res/wolf/Wolf_One_obj.obj')}
              position={[0, 0, 0]}
              scale={[0.5, 0.4, 0.4]}
              type="OBJ"
              lightReceivingBitMask={3}
              shadowCastingBitMask={2}
              animation={{name: '02', run: true, loop: true}}
              //transformBehaviors={['billboardY']}
              o
              resources={[
                require('./res/wolf/Wolf_One_obj.mtl'),
                require('./res/wolf/textures/Wolf_Body.jpg'),
                require('./res/wolf/textures/Wolf_Eyes_1.jpg'),
                require('./res/wolf/textures/Wolf_Eyes_2.jpg'),
                require('./res/wolf/textures/Wolf_Fur.jpg'),
              ]}
            />
          

          <ViroQuad
            rotation={[-90, 0, 0]}
            width={0.5}
            height={0.5}
            arShadowReceiver={true}
            lightReceivingBitMask={2}
          />
        </ViroNode>
      </ViroARScene>
    );
  },
  _onTrackingUpdated(state, reason) {
    // if the state changes to "TRACKING_NORMAL" for the first time, then
    // that means the AR session has initialized!
    if (
      !this.state.hasARInitialized &&
      state == ViroConstants.TRACKING_NORMAL
    ) {
      this.setState({
        hasARInitialized: true,
        text: 'Hello World!',
      });
    }
  },
});

var styles = StyleSheet.create({
  helloWorldTextStyle: {
    fontFamily: 'Arial',
    fontSize: 30,
    color: '#ffffff',
    textAlignVertical: 'center',
    textAlign: 'center',
  },
});

ViroMaterials.createMaterials({
  grid: {
    diffuseTexture: require('../res/grid_bg.jpg'),
  },
});

ViroAnimations.registerAnimations({
  rotate: {
    properties: {
      rotateY: '+=90',
    },
    duration: 250, //.25 seconds
  },
});

module.exports = HelloWorldSceneAR;
