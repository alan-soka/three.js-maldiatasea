// Seleccionar el contenedor específico
const container = document.getElementById('scene-container');

// Crear la escena
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x000000); // Fondo negro para mejor contraste

// Configurar la cámara
const camera = new THREE.PerspectiveCamera(5, container.clientWidth / container.clientHeight, 0.1, 100);
camera.position.z = 2;

// Configurar el renderizador
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(container.clientWidth, container.clientHeight);
container.appendChild(renderer.domElement);

const controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.enableDamping = true; // Suavizar los movimientos
controls.dampingFactor = 0.25;
controls.screenSpacePanning = false;
controls.minDistance = -1;
controls.maxDistance = 100;
controls.maxPolarAngle = Math.PI / 2;

// Agregar luces
// Luz ambiental para iluminación general
const ambientLight = new THREE.AmbientLight(0x000000);
scene.add(ambientLight);

// Luz direccional principal
const directionalLight = new THREE.DirectionalLight(0xff0000, 2);
directionalLight.position.set(5, 5, 5).normalize();
scene.add(directionalLight);

// Luz puntual para detalles adicionales
const pointLight1 = new THREE.PointLight(0x000033, 2,);
pointLight1.position.set(10, 10, 10);
scene.add(pointLight1);

const pointLight2 = new THREE.PointLight(0x0000FF, );
pointLight2.position.set(-10, -10, -10);
scene.add(pointLight2);

// Aquí cargamos y agregamos el modelo 3D de la nave espacial utilizando OBJLoader
const objLoader = new THREE.OBJLoader();
objLoader.load('torsofemale.obj', function (object) {
    scene.add(object);
    object.position.set(0, -0.1, 0);

    // Ajustar la rotación del objeto
    object.rotation.x = Math.PI / 2; // Rota 90 grados alrededor del eje X
    object.rotation.y = Math.PI / 1; // Alternativamente, puedes probar rotando alrededor del eje Y
    object.rotation.z = Math.PI / 1; // Alternativamente, puedes probar rotando alrededor del eje Z

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
