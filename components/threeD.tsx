// import React, { useRef, useState } from 'react'
// import { Canvas, useFrame } from '@react-three/fiber/native'
// import { View, Text, StyleSheet, Image, Dimensions, ScrollView, AppRegistry, Platform } from 'react-native';
// function Box(props) {
//   const mesh = useRef(null)
//   const [hovered, setHover] = useState(false)
//   const [active, setActive] = useState(false)
//   useFrame((state, delta) => (mesh.current.rotation.x += 0.01))
//   return (
//     <mesh
//       {...props}
//       ref={mesh}
//       scale={active ? 1.5 : 1}
//       onClick={(event) => setActive(!active)}
//       onPointerOver={(event) => setHover(true)}
//       onPointerOut={(event) => setHover(false)}>
//       <boxGeometry args={[1, 1, 1]} />
//       <meshStandardMaterial color={hovered ? 'hotpink' : 'orange'} />
//     </mesh>
//   )
// }
// export default function App() {
//   return (
//     <Canvas>
//     <ambientLight />
//     <pointLight position={[10, 10, 10]} />
//     <Box position={[-1.2, 0, 0]} />
//     <Box position={[1.2, 0, 0]} />
//   </Canvas>
//   )
// }

import React, { Suspense } from 'react'
import { useFrame, Canvas } from '@react-three/fiber/native'
import { useGLTF, Environment } from '@react-three/drei/native'
//const iphoneModelPathD = require('../assets/3D/delonghi-kettle/source/delonghi_kettle.glb')
//D:\Growth RTS\Mobile-App-IOS\Mobile-Apps-IOS\assets\3D\delonghi-kettle\source
import iphoneModelPath from '../assets/3D/delonghi-kettle/source/foxy.glb'

function Model({ url, ...rest }) {
  const { scene } = useGLTF(url)
  useFrame(() => (scene.rotation.y += 0.01))
  return <primitive {...rest} object={scene} />
}

export default function App() {
  return (
    <Canvas gl={{ physicallyCorrectLights: true }} camera={{ position: [-6, 0, 16], fov: 36 }}>
      <color attach="background" args={[0xe2f4df]} />
      <ambientLight />
      <directionalLight intensity={1.1} position={[0.5, 0, 0.866]} />
      <directionalLight intensity={0.8} position={[-6, 2, 2]} />
      <Suspense>
        <Environment preset="park" />
        <Model url={iphoneModelPath} />
      </Suspense>
    </Canvas>
  )
}