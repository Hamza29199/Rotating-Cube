'use-strict'; //to enable better error handling

import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import Expo, {createTHREEViewClass} from 'expo';

const THREE = require('three');
const ThreeView = createTHREEViewClass(THREE); //enables us to use ThreeView
//component for displaying three.js stuff

export default class App extends React.Component{
//the following function is where i place the three.js code as it "mounts"
//those objects on the app interface
componentWillMount(){

  this.scene = new THREE.Scene();
   this.cam  = new THREE.PerspectiveCamera(85, window.innerWidth, window.innerHeight, 0.5, 1000);
  this.renderer = new THREE.WebGLRenderer();
  this.renderer.setSize(window.innerWidth, window.innerHeight);

  this.shape = new THREE.BoxGeometry(1,1,1);
  this.colour = new THREE.MeshBasicMaterial({color: '#450000'});
  this.object = new THREE.Mesh(this.shape, this.colour);
  this.cam.position.z = 5;
  
  this.scene.add(this.object);


}

  tick = dt =>{
    this.object.rotation.y += dt*1;    //dt stands for delta time, time passed since last frame
      this.object.rotation.x += dt*3;
  }
  render() {
    return (
      <View style = {styles.container}>
      <ThreeView
      style = {{flex:1}}
     scene= {this.scene}
      cam={this.cam}
      tick = {this.tick}
      />
      </View>
    );
  }
}
//creating the style for the backgrond below
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
Expo.registerRootComponent(App);
