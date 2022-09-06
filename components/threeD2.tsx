import { ExpoWebGLRenderingContext, GLView } from 'expo-gl';
import { resolveAsync } from 'expo-asset-utils';
import * as FileSystem from 'expo-file-system';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { decode } from 'base64-arraybuffer';
import { Renderer, TextureLoader, loadObjAsync, loadTextureAsync } from 'expo-three';
import OrbitControlsView from 'expo-three-orbit-controls';
import { useFrame, Canvas } from '@react-three/fiber/native'
import { useGLTF, Environment } from '@react-three/drei/native'
import { Asset } from 'expo-asset'
import * as React from 'react';
import {
  AmbientLight,
  BoxGeometry,
  Fog,
  GridHelper,
  Mesh,
  MeshStandardMaterial,
  PerspectiveCamera,
  PointLight,
  Scene,
  SpotLight,
  Camera,
} from 'three';

function Model({ url, ...rest }) {
  const { scene } = useGLTF(url)
  useFrame(() => (scene.rotation.y += 0.01))
  return <primitive {...rest} object={scene} />
}

import ThreeDModel from '../assets/3D/delonghi-kettle/source/foxy.glb'

// this was actually copied from node_modules\expo-three\build\loaders\loadModelsAsync.js
async function loadFileAsync({ asset, funcName }) {
  if (!asset) {
    throw new Error(`ExpoTHREE.${funcName}: Cannot parse a null asset`);
  }
  return (await resolveAsync(asset)).localUri ?? null;
}

// newly added method 
export async function loadFbxAsync({ asset, onAssetRequested }) {
  const uri = await loadFileAsync({
    asset,
    funcName: 'loadFbxAsync',
  });
  if (!uri) return;
  const base64 = await FileSystem.readAsStringAsync(uri, {
    encoding: FileSystem.EncodingType.Base64,
  });
  const arrayBuffer = decode(base64);
  const loader = new FBXLoader();
  return loader.parse(arrayBuffer, onAssetRequested);
}

// newly added method
export async function loadGLTFAsync({ asset, onAssetRequested }) {
  const uri = await loadFileAsync({
    asset,
    funcName: 'loadGLTFAsync',
  });
  if (!uri) return;
  const base64 = await FileSystem.readAsStringAsync(uri, {
    encoding: FileSystem.EncodingType.Base64,
  });
  const arrayBuffer = decode(base64);
  const loader = new GLTFLoader();
  return new Promise((resolve, reject) => {
    loader.parse(
      arrayBuffer,
      onAssetRequested,
      result => {
        resolve(result);
      },
      err => {
        reject(err);
      },
    );
  });
}

export default function App() {
  const [camera, setCamera] = React.useState<Camera | null>(null);

  let timeout;

  React.useEffect(() => {
    // Clear the animation loop when the component unmounts
    return () => clearTimeout(timeout);
  }, []);

  const onContextCreate = async (gl: ExpoWebGLRenderingContext) => {
    const { drawingBufferWidth: width, drawingBufferHeight: height } = gl;
    const sceneColor = 0x6ad6f0;

    // Create a WebGLRenderer without a DOM element
    const renderer = new Renderer({ gl });
    renderer.setSize(width, height);
    renderer.setClearColor(sceneColor);

    const camera = new PerspectiveCamera(70, width / height, 0.01, 1000);
    camera.position.set(2, 5, 5);

    setCamera(camera);

    const scene = new Scene();
    scene.fog = new Fog(sceneColor, 1, 10000);
    scene.add(new GridHelper(10, 10));

    const ambientLight = new AmbientLight(0x101010);
    scene.add(ambientLight);

    const pointLight = new PointLight(0xffffff, 2, 1000, 1);
    pointLight.position.set(0, 200, 200);
    scene.add(pointLight);

    const spotLight = new SpotLight(0xffffff, 0.5);
    spotLight.position.set(0, 500, 100);
    spotLight.lookAt(scene.position);
    scene.add(spotLight);

    const texture = await loadTextureAsync({
      asset: require('../assets/3D/delonghi-kettle/source/house/textures/house.xpng'),
    });

    const obj = await loadObjAsync({
      asset: require('../assets/3D/delonghi-kettle/source/house/house.obj')
    });

    // const obj = await loadGLTFAsync({
    //   asset: require('../assets/3D/delonghi-kettle/source/house/source/DibesferGardenHouse.glb')
    // });

    obj.traverse(function(object) {
      if (object instanceof THREE.Mesh) {
        object.material.map = texture;
      }
    });

    const cube = new IconMesh();
    scene.add(obj);

    camera.lookAt(obj.position);

    function update() {
      obj.rotation.y = 0;
      obj.rotation.x = 0;
    }

    // Setup an animation loop
    const render = () => {
      timeout = requestAnimationFrame(render);
      update();
      renderer.render(scene, camera);

      // ref.current.getControls()?.update();
      gl.endFrameEXP();
    };
    render();
  };

  return (
    <OrbitControlsView style={{ flex: 1 }} camera={camera}>
      <GLView style={{ flex: 1 }} onContextCreate={onContextCreate} key="d" />
    </OrbitControlsView>
  );
}

class IconMesh extends Mesh {
  constructor() {
    super(
      new BoxGeometry(1.0, 1.0, 1.0),
      new MeshStandardMaterial({
        map: new TextureLoader().load(
          'https://pbs.twimg.com/profile_images/1203624639538302976/h-rvrjWy_400x400.jpg'
        ),
      })
    );
  }
}