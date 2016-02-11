// MAIN GAME FILE

import Scene = THREE.Scene;
import Renderer = THREE.WebGLRenderer;
import PerspectiveCamera = THREE.PerspectiveCamera;
import SphereGeometry = THREE.SphereGeometry;
import LambertMaterial = THREE.MeshLambertMaterial;
import Mesh = THREE.Mesh;
import SpotLight = THREE.SpotLight;
import PointLight = THREE.PointLight;
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
var plane: Mesh;
var spotLight: SpotLight;
var pointLight: PointLight;
var ambientLight: AmbientLight;
var control: Control;
var gui: GUI;
var stats:Stats;
var axis: AxisHelper;

function init() {
    // Instantiate a new Scene object
	scene = new Scene();
	
	setupRenderer(); // setup the default renderer
	
	setupCamera(); // setup the camera
	
    //Add an axes helper to the scene
    axis = new AxisHelper(20);
    scene.add(axis);
    
    //Add Sun to solar system
	/*sphereGeometry = new SphereGeometry(0.75, 32, 32);
	sphereMaterial = new LambertMaterial({color:0xffcc99});
	sun = new Mesh(sphereGeometry, sphereMaterial);
    sun.position.x = 0;
    sun.position.y = 4.9;
    sun.position.z = 0;
	sun.castShadow = true;
    sun.receiveShadow = true;
	scene.add(sun);//Add sun to scene
	console.log("Added sun to scene...");*/
    
    sun = createMesh(new SphereGeometry(5, 20, 20), "sun.jpg");
    sun.castShadow = true;
    sun.receiveShadow = true;
    scene.add(sun);
    
    // Add an AmbientLight to the scene
    ambientLight = new AmbientLight(0x0f0f0f);
    ambientLight.castShadow = false;
    scene.add(ambientLight);
    console.log("Added Ambient Light to scene");
	
	// Add a SpotLight to the scene
	spotLight = new SpotLight(0xffffff);
	spotLight.position.set (10, 15, 10);
    spotLight.target;
	spotLight.castShadow = true;
    spotLight.shadowCameraNear = 1;
	scene.add(spotLight);
	console.log("Added Spot Light to Scene");
	
	// add extras
	gui = new GUI();
	control = new Control(0, 0, 0, 0xff0000, 0x0000ff);
	addControl(control);
	
	addStatsObject();
	
	document.body.appendChild(renderer.domElement);
	gameLoop(); // render the scene	
}

//function for creating textured planets
function createMesh(geom, imageFile) {
    var texture = THREE.ImageUtils.loadTexture("../content/" + imageFile)
    var mat = new THREE.MeshPhongMaterial();
    mat.map = texture;

    var mesh = new THREE.Mesh(geom, mat);
    return mesh;
}

//Add controls to the controller
function addControl(controlObject: Control):void {
	gui.add(controlObject, 'rotationSpeedx',-10,10);
    gui.add(controlObject, 'rotationSpeedy',-10,10);
    gui.add(controlObject, 'rotationSpeedz',-10,10);
	gui.addColor(controlObject, 'shirtColor');
    gui.addColor(controlObject, 'pantsColor');
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
function gameLoop():void {
	stats.update();
	
	// render using requestAnimationFrame
	requestAnimationFrame(gameLoop);
    //set character rotation speed
    sun.rotation.x += control.rotationSpeedx / 1000;
    sun.rotation.y += control.rotationSpeedy / 1000;
    sun.rotation.z += control.rotationSpeedz / 1000;
	
	renderer.render(scene, camera);
}

// Setup default renderer
function setupRenderer():void {
	renderer = new Renderer();
	renderer.setClearColor(0xCCCCCC, 1.0);
	renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMapType = THREE.PCFSoftShadowMap;
	renderer.shadowMapEnabled = true;
	console.log("Finished setting up Renderer...");
}

// Setup main camera for the scene
function setupCamera():void {
	camera = new PerspectiveCamera(45, window.innerWidth/window.innerHeight, 0.1, 1000);
	camera.position.x =15;
	camera.position.y = 16;
	camera.position.z = 25;
	camera.lookAt(scene.position);
	console.log("Finished setting up Camera...");
}
