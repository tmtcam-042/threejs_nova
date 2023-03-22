import React, { useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { useGLTF, PerspectiveCamera } from '@react-three/drei'
import * as THREE from 'three'


// const loader = new GLTFLoader();

// loader.load('../assets/sea_keep_lonely_watcher/scene.gltf', function ( gltf) {
//   scene.add( gltf.scene );
// }, undefined, function (error) {
//   console.error(error);
// })

const mesh = new THREE.Mesh(new THREE.BoxGeometry(), new THREE.MeshBasicMaterial({ color: 'red' }))
const group = new THREE.Group()
group.add(mesh)

function Box(props) {
  // Reference provides access to THREE.mesh object
  const ref = useRef();
  // Hold state for hovered and clicked events
  const [hovered, hover] = useState(false);
  const [clicked, click] = useState(false);
  // Subscribe this component to the render loop, rotate the mesh every frame
  useFrame((state, delta) => ref.current.rotation.x += delta);
  // Return the view, these are regular ThreeJS elements expressed in JSX
  return (
    <mesh
      {...props}
      ref={ref}
      scale={clicked ? 1.5 : 1}
      onClick={(event) => click(!clicked)}
      onPointerOver={(event) => hover(true)}
      onPointerOut={(event) => hover(false)}>
      <boxGeometry args={[3, 3, 3]} />
      <meshStandardMaterial color={hovered ? 'hotpink' : 'orange'} />
    </mesh>

  )
}

function IslandTest() {
  const gltf = useGLTF('threejs_nova/my-app/public/male_model_design/');

  return (
    <primitive object = {gltf.scene} />
  )
}

export default function Models(props) {
  // const { nodes, materials } = useGLTF('../../public/sea_keep_lonely_watcher/scene.gltf')
  //const { nodes, materials } = useGLTF('http://localhost:8000/public/sea_keep_lonely_watcher/scene.gltf')
  return (
    <Canvas>
      <group {...props} dispose={null}>
        <PerspectiveCamera name="camera" fov={40} near={10} far={1000} position={[10, 0, 50]} />      
        <pointLight intensity={10} position={[100, 50, 100]} rotation={[-Math.PI / 2, 0, 0]} />
        <group position={[10, -5, 0]}>
          <mesh geometry={nodes.robot.geometry} material={materials.metal} />
          <mesh geometry={nodes.rocket.geometry} material={materials.wood} />
        </group>
      </group>
      <IslandTest />
    </Canvas>
  )
}
