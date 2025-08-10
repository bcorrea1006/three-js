import { color } from 'three/tsl';
import './style.css'

import * as THREE from 'three';
import { Wireframe } from 'three/examples/jsm/Addons.js';

import { OrbitControls } from 'three/examples/jsm/Addons.js';

const scene = new THREE.Scene();


// Scene setup
// field of view (degrees), aspect ratio, view frustrum
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
})

renderer.setPixelRatio( window.devicePixelRatio );
renderer.setSize( window.innerWidth, window.innerHeight );
camera.position.setZ(30);

renderer.render( scene, camera );

// Shapes
const geometry = new THREE.TorusGeometry( 10, 3, 16, 100 );
const material = new THREE.MeshStandardMaterial( {color: 0xFF6347} );
const torus = new THREE.Mesh( geometry, material );  // torus = geometry + material

// Lights
const pointLight = new THREE.PointLight(0xffffff, 20);
pointLight.position.set(5, 5, 5);
const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight, ambientLight);

// Helpers
const lightHelper = new THREE.PointLightHelper(pointLight)
const gridHelper = new THREE.GridHelper(200, 50)
scene.add(lightHelper, gridHelper)

scene.add( torus )

const controls = new OrbitControls(camera, renderer.domElement);

// NOTE: Vite requires images be in a public folder, otherwise they load white
const loader = new THREE.TextureLoader();
scene.background = loader.load( '../public/space.jpg' );

function animate() {
  requestAnimationFrame( animate );
  torus.rotation.x += 0.01;
  torus.rotation.y += 0.005;
  torus.rotation.y += 0.01;

  controls.update();

  renderer.render( scene, camera );
}

animate()

function addStar() {
  const geometry = new THREE.SphereGeometry(0.25, 24, 24);
  const material = new THREE.MeshStandardMaterial( { color:0xffffff } )
  const star = new THREE.Mesh( geometry, material );

  const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread( 100 ));

  star.position.set( x, y, z )
  scene.add( star )
}

Array(200).fill().forEach(addStar)

const benitoTexture = new THREE.TextureLoader().load('../public/profile_pic.jpeg')
const benito = new THREE.Mesh(
  new THREE.BoxGeometry(3,3,3),
  new THREE.MeshBasicMaterial( { map: benitoTexture } )
)
scene.add(benito)