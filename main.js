// Seleccionar el contenedor específico
const container = document.getElementById('scene-container');

// Crear la escena
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x000000); // Fondo negro para mejor contraste

// Configurar la cámara
const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
camera.position.z = 5;

// Configurar el renderizador
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(container.clientWidth, container.clientHeight);
container.appendChild(renderer.domElement);


const controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.enableDamping = true; // Suavizar los movimientos
controls.dampingFactor = 0.25;
controls.screenSpacePanning = false;
controls.minDistance = 1;
controls.maxDistance = 100;
controls.maxPolarAngle = Math.PI / 2;



// Agregar luces
// Luz ambiental para iluminación general
const ambientLight = new THREE.AmbientLight(0x404040); 
scene.add(ambientLight);

// Luz direccional principal
const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(5, 5, 5).normalize();
scene.add(directionalLight);

// Luz puntual para detalles adicionales
const pointLight1 = new THREE.PointLight(0xffffff, 1, 100);
pointLight1.position.set(10, 10, 10);
scene.add(pointLight1);

const pointLight2 = new THREE.PointLight(0xffffff, 1, 100);
pointLight2.position.set(-10, -10, -10);
scene.add(pointLight2);

// Aquí cargamos y agregamos el modelo 3D de la nave espacial utilizando OBJLoader
const objLoader = new THREE.OBJLoader();
objLoader.load('nave.obj', function (object) {
    scene.add(object);
    object.position.set( 0, 0, 0); 
}, undefined, function (error) {
    console.error(error);
});

// Animación
function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}
animate();

// Ajustar el renderizado cuando se cambia el tamaño de la ventana
window.addEventListener('resize', () => {
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(container.clientWidth, container.clientHeight);
});

