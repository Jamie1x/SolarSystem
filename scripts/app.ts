// MAIN GAME FILE

import Scene = THREE.Scene;
import Renderer = THREE.WebGLRenderer;
import PerspectiveCamera = THREE.PerspectiveCamera;
import SphereGeometry = THREE.SphereGeometry;
import PlaneGeometry = THREE.PlaneGeometry;
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
var glow: Mesh;
var mercury: Mesh;
var venus: Mesh;
var earth: Mesh;
var moon: Mesh;
var mars: Mesh;
var jupiter: Mesh;
var saturn: Mesh;
var saturnRing: Mesh;
var mesh: Mesh;
var mercuryLight: SpotLight;
var venusLight: SpotLight;
var earthLight: SpotLight;
var marsLight: SpotLight;
var jupiterLight: SpotLight;
var saturnLight: SpotLight;
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
var jupiteraxes = new THREE.Object3D;
var saturnaxes = new THREE.Object3D;
var paramaters;

function init() {
    // Instantiate a new Scene object
    scene = new Scene();

    setupRenderer(); // setup the default renderer
	
    setupCamera(); // setup the camera
	
    //Add an axes helper to the scene
    axis = new AxisHelper(20);
    scene.add(axis);

    addSun();
    //Add Sun to solar system
    /*sun = planet(new SphereGeometry(3, 20, 20), "sun.jpg",0,0,0);
    sun.castShadow = false;
    sun.receiveShadow = false;
    scene.add(sun);*/
    console.log("Added sun to scene...");
    
    //add mercury to solar system
    mercury = planet(new SphereGeometry(0.6, 20, 20), "mercury.jpg", 4, 0, 0);
    mercuryaxes.add(mercury);
    scene.add(mercuryaxes);
    console.log("added mercury to scene...");
    
    //add venus to solar system
    venus = planet(new SphereGeometry(0.8, 20, 20), "venus.jpg", 6, 0, 0);
    venusaxes.add(venus);
    scene.add(venusaxes);
    console.log("added venus to scene...");
    
    //add earth to solar system
    earth = planet(new SphereGeometry(1, 20, 20), "earth.jpg", 9, 0, 0);
    earthaxes.add(earth);
    //add moon to solar system
    moon = planet(new SphereGeometry(0.4, 20, 20), "moon.jpg", 1.5, 0, 0);
    moonaxes.add(moon);
    earth.add(moonaxes);
    scene.add(earthaxes);
    console.log("added earth and moon to scene...");
    
    //add mars to solar system
    mars = planet(new SphereGeometry(0.6, 20, 20), "mars.jpg", 13, 0, 0);
    marsaxes.add(mars);
    scene.add(marsaxes);
    console.log("added mars to scene...");
    
    //add jupiter to solar system
    jupiter = planet(new SphereGeometry(1.6, 20, 20), "jupiter.jpg", 17, 0, 0);
    jupiteraxes.add(jupiter);
    scene.add(jupiteraxes);
    console.log("added jupiter to scene...");
    
    //add saturn to solar system
    saturn = planet(new SphereGeometry(1.3, 20, 20), "saturn.jpg", 20, 0, 0);
    saturnaxes.add(saturn);
    scene.add(saturnaxes);
    console.log("added saturn to scene...");
    //add saturn's ring to solar system
    saturnRing = planet(new PlaneGeometry(5, 5), "saturnRing.png", 0, 0, 0);
    saturnRing.material.transparent = true;
    saturnRing.material.opacity = 0.5;
    saturnRing.rotation.x = -0.5 * Math.PI;
    saturn.add(saturnRing);
    
    // Add a SpotLight to murcury
    mercuryLight = targetLight(mercury);
    mercuryaxes.add(mercuryLight);
    venusLight = targetLight(venus);
    venusaxes.add(venusLight);
    earthLight = targetLight(earth);
    earthaxes.add(earthLight);
    marsLight = targetLight(mars);
    marsaxes.add(marsLight);
    jupiterLight = targetLight(jupiter);
    jupiteraxes.add(jupiterLight);
    saturnLight = targetLight(saturn);
    saturnaxes.add(saturnLight);
    
    // Add an AmbientLight to the scene
    ambientLight = new AmbientLight(0x000000);
    scene.add(ambientLight);
    console.log("Added Ambient Light to scene");
	
    // add extras
    gui = new GUI();
    paramaters = { camLocation: "solar system" }
    control = new Control(paramaters.camLocation);
    addControl(control);

    addStatsObject();

    document.body.appendChild(renderer.domElement);
    gameLoop(); // render the scene	
}

function addSun() {
    // Add the SUN
    var geometry = new THREE.SphereGeometry(3, 20, 20);
    var material = new THREE.MeshBasicMaterial({
        map: THREE.ImageUtils.loadTexture('../content/sun.jpg')
    });
    sun = new THREE.Mesh(geometry, material);
    sun.position.set(0, 0, 0);
    sun.castShadow = false;
    sun.receiveShadow = false;

    scene.add(sun);

    for (var i = 5; i >= 1; i--) {
        var sunGlow = new THREE.Mesh(
            new THREE.SphereGeometry(0.5 + 0.1 / i, 32, 32),
            new THREE.MeshBasicMaterial({
                color: 0xFCD440,
                //color: 0x0000FF,
                map: THREE.ImageUtils.loadTexture('../content/sun.jpg'),
                transparent: true,
                opacity: 0.05 * i
            })
        );
        sunGlow.position = sun.position;
        scene.add(sunGlow);
    }
}

//function for creating textured planets
function planet(geom, imageFile, x, y, z) {
    var texture = THREE.ImageUtils.loadTexture("../content/" + imageFile)
    var mat = new THREE.MeshBasicMaterial();
    mat.map = texture;

    mesh = new Mesh(geom, mat);
    mesh.position.x = x;
    mesh.position.y = y;
    mesh.position.z = z;
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    return mesh;
}

//function for creating spotlights to follow planets
function targetLight(object) {
    spotLight = new SpotLight(0xffffff, 2, 1000, Math.PI);
    //spotLight.position.set(object.position.x - 5, 0, 0);
    spotLight.target = object;
    spotLight.castShadow = true;
    spotLight.shadowCameraNear = 1;
    spotLight.shadowMapWidth = 2048;
    spotLight.shadowMapHeight = 2048;
    return spotLight;
}

//Add controls to the controller
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

// Setup main game loop
function gameLoop(): void {
    stats.update();
	
    // render using requestAnimationFrame
    requestAnimationFrame(gameLoop);
    //set planet rotation speeds
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
    jupiteraxes.rotation.y += 0.001;
    jupiter.rotation.y += 0.001;
    saturnaxes.rotation.y += 0.0005;
    saturn.rotation.y += 0.0005;

    var value = paramaters.camLocation;
    var newCam;
    if (value == "solar system") {
        camera.position.x = 15;
        camera.position.y = 16;
        camera.position.z = 25;
        camera.lookAt(scene.position);
        scene.add(camera);
    }
    else if (value == "mercury") {
        camera.position.x = mercury.position.x - 1;
        camera.position.y = mercury.position.y + 1;
        camera.position.z = mercury.position.z + 1;
        camera.lookAt(new Vector3(mercury.position.x, mercury.position.y, mercury.position.z));
        mercuryaxes.add(camera);
    }
    else if (value == "venus") {
        camera.position.x = venus.position.x - 1;
        camera.position.y = venus.position.y + 1;
        camera.position.z = venus.position.z + 2;
        camera.lookAt(new Vector3(venus.position.x, venus.position.y, venus.position.z));
        venusaxes.add(camera);
    }
    else if (value == "earth") {
        camera.position.x = earth.position.x - 1;
        camera.position.y = earth.position.y + 1;
        camera.position.z = earth.position.z + 2.5;
        camera.lookAt(new Vector3(earth.position.x, earth.position.y, earth.position.z));
        earthaxes.add(camera);
    }
    else if (value == "mars") {
        camera.position.x = mars.position.x - 1;
        camera.position.y = mars.position.y + 1;
        camera.position.z = mars.position.z + 1.5;
        camera.lookAt(new Vector3(mars.position.x, mars.position.y, mars.position.z));
        marsaxes.add(camera);
    }
    else if (value == "jupiter") {
        camera.position.x = jupiter.position.x - 1;
        camera.position.y = jupiter.position.y + 1;
        camera.position.z = jupiter.position.z + 5;
        camera.lookAt(new Vector3(jupiter.position.x, jupiter.position.y, jupiter.position.z));
        jupiteraxes.add(camera);
    }
    else if (value == "saturn") {
        camera.position.x = saturn.position.x - 1;
        camera.position.y = saturn.position.y + 1;
        camera.position.z = saturn.position.z + 4;
        camera.lookAt(new Vector3(saturn.position.x, saturn.position.y, saturn.position.z));
        saturnaxes.add(camera);
    }

    renderer.render(scene, camera);
}

// Setup default renderer
function setupRenderer(): void {
    renderer = new Renderer();
    renderer.setClearColor(0x000000, 1.0);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMapType = THREE.PCFSoftShadowMap;
    renderer.shadowMapEnabled = true;
    console.log("Finished setting up Renderer...");
}

// Setup main camera for the scene
function setupCamera(): void {
    camera = new PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.x = 15;
    camera.position.y = 16;
    camera.position.z = 25;
    camera.lookAt(scene.position);
    console.log("Finished setting up Camera...");
}
