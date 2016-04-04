// MAIN GAME FILE

import Scene = THREE.Scene;
import Renderer = THREE.WebGLRenderer;
import PerspectiveCamera = THREE.PerspectiveCamera;
import SphereGeometry = THREE.SphereGeometry;
import CubeGeometry = THREE.CubeGeometry;
import PlaneGeometry = THREE.PlaneGeometry;
import PhongMaterial = THREE.MeshPhongMaterial;
import BasicMaterial = THREE.MeshBasicMaterial;
import LambertMaterial = THREE.MeshLambertMaterial;
import Mesh = THREE.Mesh;
import SpotLight = THREE.SpotLight;
import PointLight = THREE.PointLight;
import DirectionalLight = THREE.DirectionalLight;
import AmbientLight = THREE.AmbientLight;
import Control = objects.Control;
import GUI = dat.GUI;
import Color = THREE.Color;
import Vector3 = THREE.Vector3;
import AxisHelper = THREE.AxisHelper;

var scene: Scene;
var renderer: Renderer;
var camera: PerspectiveCamera;
var sun: Mesh;
var sun2: Mesh;
var mercury: Mesh;
var venus: Mesh;
var earth: Mesh;
var moon: Mesh;
var mars: Mesh;
var marsMoon: Mesh;
var marsMoon2: Mesh;
var jupiter: Mesh;
var saturn: Mesh;
var saturnRing: Mesh;
var skyBox: Mesh;
var mesh: Mesh;
var sunLight: PointLight;
var mercuryLight: SpotLight;
var venusLight: SpotLight;
var earthLight: SpotLight;
var marsLight: SpotLight;
var jupiterLight: SpotLight;
var saturnLight: SpotLight;
var saturnLight2: SpotLight;
var spotLight: SpotLight;
var ambientLight: AmbientLight;
var control: Control;
var gui: GUI;
var stats: Stats;
var axis: AxisHelper;
var mercuryaxes = new THREE.Object3D;
var venusaxes = new THREE.Object3D;
var earthaxes = new THREE.Object3D;
var moonaxes = new THREE.Object3D;
var marsaxes = new THREE.Object3D;
var marsMoonaxes = new THREE.Object3D;
var marsMoon2axes = new THREE.Object3D;
var jupiteraxes = new THREE.Object3D;
var saturnaxes = new THREE.Object3D;
var saturnaxes2 = new THREE.Object3D;
var paramaters;

function init() {
    // Instantiate a new Scene object
    scene = new Scene();

    setupRenderer(); // setup the default renderer
	
    setupCamera(); // setup the camera
	
    //Add an axes helper to the scene
    axis = new AxisHelper(20);
    scene.add(axis);

    //Add Sun to solar system
    var sphereGeometry = new SphereGeometry(3, 20, 20);
    var sunMat = new BasicMaterial();
    sunMat.map = THREE.ImageUtils.loadTexture('../content/sun.jpg');
    sun = new Mesh(sphereGeometry, sunMat);
    scene.add(sun);
    
    //Add mercury to solar system
    mercury = planet(new SphereGeometry(0.6, 20, 20), "mercury.jpg", 0, 0, -4);
    mercuryaxes.add(mercury);
    scene.add(mercuryaxes);
    
    //Add venus to solar system
    venus = planet(new SphereGeometry(0.8, 20, 20), "venus.jpg", 0, 0, -6);
    venusaxes.add(venus);
    scene.add(venusaxes);
    
    //Add earth to solar system
    earth = planet(new SphereGeometry(1, 20, 20), "earth.jpg", 0, 0, -9);
    earthaxes.add(earth);
    //Add moon to earth
    moon = planet(new SphereGeometry(0.2, 20, 20), "moon.jpg", 0, 0, -2);
    moonaxes.add(moon);
    earth.add(moonaxes);
    scene.add(earthaxes);
    
    //Add mars to solar system
    mars = planet(new SphereGeometry(0.6, 20, 20), "mars.jpg", 0, 0, -13);
    marsaxes.add(mars);
    //Add moon to mars
    marsMoon = planet(new SphereGeometry(0.1, 20, 20), "moon.jpg", 0.8, 0, 0);
    marsMoonaxes.add(marsMoon);
    mars.add(marsMoonaxes);
    //Add second moon to mars
    marsMoon2 = planet(new SphereGeometry(0.15, 20, 20), "moon.jpg", 0, 0, -1.2);
    marsMoon2axes.add(marsMoon2);
    mars.add(marsMoon2axes);
    scene.add(marsaxes);
    
    //Add jupiter to solar system
    jupiter = planet(new SphereGeometry(1.6, 20, 20), "jupiter.jpg", 0, 0, -17);
    jupiteraxes.add(jupiter);
    scene.add(jupiteraxes);
    
    //Add saturn to solar system
    saturn = planet(new SphereGeometry(1.3, 20, 20), "saturn.jpg", 0, 0, -20);
    saturnaxes.add(saturn);
    //Add saturn's ring to solar system
    saturnRing = planet(new PlaneGeometry(5, 5), "saturnRing.png", 0, 0, 0);
    saturnRing.material.transparent = true;
    saturnRing.material.opacity = 0.5;
    saturnRing.rotation.x = -0.5 * Math.PI;
    saturn.add(saturnRing);
    scene.add(saturnaxes);
    //Add second axes to rotate around second sun
    saturnaxes2.position.set(0, 0, -40);
    saturnaxes2.rotation.y = Math.PI;
    scene.add(saturnaxes2);
    
    //Add a second sun
    var sphereGeometry = new SphereGeometry(3, 20, 20);
    var sunMat2 = new BasicMaterial();
    sunMat2.map = THREE.ImageUtils.loadTexture('../content/sun.jpg');
    sun2 = new Mesh(sphereGeometry, sunMat2);
    sun2.position.set(0, 0, -40);
    scene.add(sun2);
    
    //Add light to sun
    sunLight = new PointLight(0xffffff, 2, 22);
    scene.add(sunLight);
    
    //Add light to second sun
    var sunLight2 = new PointLight(0xffffff, 2, 22);
    sunLight2.position.set(0,0,-40);
    scene.add(sunLight2);
    
    //Add a SpotLight to follow each planet
    mercuryLight = targetLight(mercury);
    scene.add(mercuryLight);
    venusLight = targetLight(venus);
    scene.add(venusLight);
    earthLight = targetLight(earth);
    scene.add(earthLight);
    marsLight = targetLight(mars);
    scene.add(marsLight);
    jupiterLight = targetLight(jupiter);
    scene.add(jupiterLight);
    saturnLight = targetLight(saturn);
    scene.add(saturnLight);
    
    //Add an AmbientLight to the scene
    ambientLight = new AmbientLight(0x0f0f0f);
    scene.add(ambientLight);
    
    //Add a skyBox for a starry background
    var cubeGeometry = new CubeGeometry(150, 150, 150);
    var skyMat = new BasicMaterial();
    skyMat.map = THREE.ImageUtils.loadTexture('../content/stars.jpg');
    skyBox = new Mesh(cubeGeometry, skyMat);
    skyBox.material.transparent = true;
    skyBox.material.opacity = 0.5;
    skyBox.material.side = THREE.BackSide;
    scene.add(skyBox);
	
    //Add extras
    gui = new GUI();
    paramaters = { camLocation: "solar system" }
    control = new Control(paramaters.camLocation);
    addControl(control);

    addStatsObject();

    document.body.appendChild(renderer.domElement);
    gameLoop(); // render the scene	
}

//Function for creating textured planets
function planet(geom, imageFile, x, y, z) {
    var texture = THREE.ImageUtils.loadTexture("../content/" + imageFile)
    var mat = new LambertMaterial();
    mat.map = texture;

    mesh = new Mesh(geom, mat);
    mesh.position.x = x;
    mesh.position.y = y;
    mesh.position.z = z;
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    return mesh;
}

//Function for creating spotlights to follow planets
function targetLight(object) {
    spotLight = new SpotLight(0xffffff, 0.1, 22);
    spotLight.target = object;
    spotLight.castShadow = true;
    spotLight.shadowCameraNear = 1;
    spotLight.shadowCameraFar = 22;
    spotLight.shadowMapWidth = 2048;
    spotLight.shadowMapHeight = 2048;
    return spotLight;
}

//Add planets to the controller
function addControl(controlObject: Control): void {
    var camLocation = gui.add(paramaters, 'camLocation', [
        "solar system",
        "mercury",
        "venus",
        "earth",
        "mars",
        "jupiter",
        "saturn"
    ]);
}

function addStatsObject() {
    stats = new Stats();
    stats.setMode(0);
    stats.domElement.style.position = 'absolute';
    stats.domElement.style.left = '0px';
    stats.domElement.style.top = '0px';
    document.body.appendChild(stats.domElement);
}

//Setup main game loop
function gameLoop(): void {
    stats.update();
	
    //Render using requestAnimationFrame
    requestAnimationFrame(gameLoop);
    //Set planet rotation speeds
    mercuryaxes.rotation.y += 0.01;
    mercury.rotation.y += 0.01
    venusaxes.rotation.y += 0.005;
    venus.rotation.y += 0.005;
    earthaxes.rotation.y += 0.004;
    earth.rotation.y += 0.004;
    moonaxes.rotation.y += 0.01;
    moon.rotation.y += 0.01;
    marsaxes.rotation.y += 0.002;
    mars.rotation.y += 0.002;
    marsMoonaxes.rotation.y += 0.01;
    marsMoon.rotation.y += 0.01;
    marsMoon2axes.rotation.y += 0.005;
    marsMoon2.rotation.y += 0.005;
    jupiteraxes.rotation.y += 0.001;
    jupiter.rotation.y += 0.001;
    saturnaxes.rotation.y += 0.007;
    saturn.rotation.y += 0.007;
    saturnaxes2.rotation.y += -0.007;
    
    //switches to other sun after orbiting 360 degrees around first sun
    if (saturnaxes.rotation.y >= Math.PI * 2) {
        saturnaxes2.add(saturn);
    }
    //switches back to first sun if sun has not rotated 360 degrees
    else {
        saturnaxes.add(saturn);
    }
    //resets suns rotation after spinning 720 degrees, for continuous loop
    if (saturnaxes.rotation.y >= Math.PI * 4) {
        saturnaxes.rotation.y = 0;
    }
    if (saturnaxes2.rotation.y <= -(Math.PI * 4)) {
        saturnaxes2.rotation.y = 0;
    }

    //Update camera location from controller
    var value = paramaters.camLocation;
    if (value == "solar system") {
        camera.position.x = 15;
        camera.position.y = 16;
        camera.position.z = 25;
        camera.lookAt(scene.position);
        scene.add(camera);
    }
    else if (value == "mercury") {
        camera.position.x = mercury.position.x + 1;
        camera.position.y = mercury.position.y + 1;
        camera.position.z = mercury.position.z + 1;
        camera.lookAt(new Vector3(mercury.position.x, mercury.position.y, mercury.position.z));
        mercuryaxes.add(camera);
    }
    else if (value == "venus") {
        camera.position.x = venus.position.x + 2;
        camera.position.y = venus.position.y + 1;
        camera.position.z = venus.position.z + 1;
        camera.lookAt(new Vector3(venus.position.x, venus.position.y, venus.position.z));
        venusaxes.add(camera);
    }
    else if (value == "earth") {
        camera.position.x = earth.position.x + 2.5;
        camera.position.y = earth.position.y + 1;
        camera.position.z = earth.position.z + 1;
        camera.lookAt(new Vector3(earth.position.x, earth.position.y, earth.position.z));
        earthaxes.add(camera);
    }
    else if (value == "mars") {
        camera.position.x = mars.position.x + 1.5;
        camera.position.y = mars.position.y + 1;
        camera.position.z = mars.position.z + 1;
        camera.lookAt(new Vector3(mars.position.x, mars.position.y, mars.position.z));
        marsaxes.add(camera);
    }
    else if (value == "jupiter") {
        camera.position.x = jupiter.position.x + 5;
        camera.position.y = jupiter.position.y + 1;
        camera.position.z = jupiter.position.z + 1;
        camera.lookAt(new Vector3(jupiter.position.x, jupiter.position.y, jupiter.position.z));
        jupiteraxes.add(camera);
    }
    else if (value == "saturn") {
        camera.lookAt(new Vector3(saturn.position.x, saturn.position.y, saturn.position.z));
        //move camera when orbiting different sun
        if (saturnaxes.rotation.y >= Math.PI * 2) {
            camera.position.x = saturn.position.x - 4;
            camera.position.y = saturn.position.y + 1;
            camera.position.z = saturn.position.z - 1;
            saturnaxes2.add(camera);
        }
        else {
            camera.position.x = saturn.position.x + 4;
            camera.position.y = saturn.position.y + 1;
            camera.position.z = saturn.position.z + 1;
            saturnaxes.add(camera);
        }
    }

    renderer.render(scene, camera);
}

//Setup default renderer
function setupRenderer(): void {
    renderer = new Renderer();
    renderer.setClearColor(0x000000, 1.0);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMapType = THREE.PCFSoftShadowMap;
    renderer.shadowMapEnabled = true;
}

//Setup main camera for the scene
function setupCamera(): void {
    camera = new PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.x = 15;
    camera.position.y = 16;
    camera.position.z = 25;
    camera.lookAt(scene.position);
}
