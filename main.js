// Create a scene
const scene = new THREE.Scene();

// Create a camera
const camera = new THREE.PerspectiveCamera(
  45,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

camera.position.set(0, 0, 70);

const renderer = new THREE.WebGLRenderer();
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
const pointLight = new THREE.PointLight(0xffffff, 1.5, 200); // White light with intensity 1
pointLight.position.set(0, 0, 60); // Position the light at (5, 5, 5)
scene.add(pointLight);

const textureLoader = new THREE.TextureLoader();

const diffuseMap = textureLoader.load("https://i.ibb.co/pQ44vJK/49936-def.png");
const normalMap = textureLoader.load(
  "https://res.cloudinary.com/vermaabhishek128/image/upload/v1736421055/v1yx4hkqopnvhivvdyzn.png"
);
const roughnessMap = textureLoader.load(
  "https://res.cloudinary.com/vermaabhishek128/image/upload/v1736421056/ukajnv2dfycjnm1mngxo.png"
);

const geometry = new THREE.PlaneGeometry(30, 55);
const material = new THREE.MeshStandardMaterial({
  map: diffuseMap,
  normalMap: normalMap,
  roughnessMap: roughnessMap,
  roughness: 0.64,
});
const plane = new THREE.Mesh(geometry, material);
scene.add(plane);

const controls = new THREE.OrbitControls(camera, renderer.domElement);

controls.minDistance = 1; // Minimum zoom distance
controls.maxDistance = 70; // Maximum zoom distance

// Rotation restrictions
controls.minPolarAngle = Math.PI / 3; // Lower limit of polar angle (vertical rotation)
controls.maxPolarAngle = Math.PI / 1.5; // Upper limit of polar angle
controls.minAzimuthAngle = -Math.PI / 4; // Left limit of azimuth angle (horizontal rotation)
controls.maxAzimuthAngle = Math.PI / 4; // Right limit of azimuth angle

// Animation loop
function animate() {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
}
animate();
