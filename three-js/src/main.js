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
const pointLight = new THREE.PointLight(0xffffff, 50);
pointLight.position.set(3, 3, 3);
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
const bgTexture = loader.load( '../public/space.jpg' );
bgTexture.colorSpace = THREE.SRGBColorSpace;
scene.background = bgTexture;

// Camera stuff

function moveCamera() {

  const t = document.body.getBoundingClientRect().top;
  moon.rotation.x += 0.05;
  moon.rotation.y += 0.0075;
  moon.rotation.z += 0.05;

  benito.rotation.y += 0.01;
  benito.rotation.z += 0.01;

  camera.position.x = t * -0.01;
  camera.position.y = t * -0.0002;
  camera.position.z = t * -0.0002;
}

document.body.onscroll = moveCamera

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

// moon
const moonTexture = new THREE.TextureLoader().load('../public/moon.jpg');
const normalTexture = new THREE.TextureLoader().load('../public/normal.jpg');

const moon = new THREE.Mesh(
  new THREE.SphereGeometry( 3, 32, 32),
  new THREE.MeshStandardMaterial({
    map: moonTexture,
    normalMap: normalTexture,
  } )
)

scene.add(moon)

moon.position.z = 30
moon.position.setX(-10);