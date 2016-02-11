// MAIN GAME FILE

import Scene = THREE.Scene;
import Renderer = THREE.WebGLRenderer;
import PerspectiveCamera = THREE.PerspectiveCamera;
import CubeGeometry = THREE.CubeGeometry;
import SphereGeometry = THREE.SphereGeometry;
import PlaneGeometry = THREE.PlaneGeometry;
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
var cubeGeometry: CubeGeometry;
var sphereGeometry: SphereGeometry;
var planeGeometry: PlaneGeometry;
var cubeMaterial: LambertMaterial;
var sphereMaterial: LambertMaterial;
var planeMaterial: LambertMaterial;
var head: Mesh;
var body: Mesh;
var leftSleeve: Mesh;
var rightSleeve: Mesh;
var leftArm: Mesh;
var rightArm: Mesh;
var leftLeg: Mesh;
var rightLeg: Mesh;
var plane: Mesh;
var spotLight: SpotLight;
var pointLight: PointLight;
var ambientLight: AmbientLight;
var control: Control;
var gui: GUI;
var stats:Stats;
var axis: AxisHelper;
var person = new THREE.Object3D();

function init() {
    // Instantiate a new Scene object
	scene = new Scene();
	
	setupRenderer(); // setup the default renderer
	
	setupCamera(); // setup the camera
	
    //Add an axes helper to the scene
    axis = new AxisHelper(20);
    scene.add(axis);
    
    //Create head
	sphereGeometry = new SphereGeometry(0.75, 32, 32);
	sphereMaterial = new LambertMaterial({color:0xffcc99});
	head = new Mesh(sphereGeometry, sphereMaterial);
    head.position.x = 0;
    head.position.y = 4.9;
    head.position.z = 0;
	head.castShadow = true;
    head.receiveShadow = true;
	person.add(head);//Add head to group
	console.log("Added head to scene...");
    
    //Create body
	cubeGeometry = new CubeGeometry(2, 2.5, 1);
	cubeMaterial = new LambertMaterial({color:0x00ff00});
	body = new Mesh(cubeGeometry, cubeMaterial);
    body.position.x = 0;
    body.position.y = 3;
    body.position.z = 0;
	body.castShadow = true;
    body.receiveShadow = true;
	person.add(body); //Add body to group
	console.log("Added body to scene...");
    
    //Create leftSleeve
	cubeGeometry = new CubeGeometry(1, 1, 1);
	cubeMaterial = new LambertMaterial({color:0x00ff00});
	leftSleeve = new Mesh(cubeGeometry, cubeMaterial);
    leftSleeve.position.x = 1;
    leftSleeve.position.y = 3.75;
    leftSleeve.position.z = 0;
	leftSleeve.castShadow = true;
    leftSleeve.receiveShadow = true;
	person.add(leftSleeve);//Add sleeve to group
	console.log("Added leftSleeve to scene...");
    
    //Create rightSleeve
	cubeGeometry = new CubeGeometry(1, 1, 1);
	cubeMaterial = new LambertMaterial({color:0x00ff00});
	rightSleeve = new Mesh(cubeGeometry, cubeMaterial);
    rightSleeve.position.x = -1;
    rightSleeve.position.y = 3.75;
    rightSleeve.position.z = 0;
	rightSleeve.castShadow = true;
    rightSleeve.receiveShadow = true;
	person.add(rightSleeve);//Add sleeve to group
	console.log("Added rightSleeve to scene...");
    
    //Create leftArm
	cubeGeometry = new CubeGeometry(2, 0.5, 0.5);
	cubeMaterial = new LambertMaterial({color:0xffcc99});
	leftArm = new Mesh(cubeGeometry, cubeMaterial);
    leftArm.position.x = 1.75;
    leftArm.position.y = 3.75;
    leftArm.position.z = 0;
	leftArm.castShadow = true;
    leftArm.receiveShadow = true;
	person.add(leftArm);//Add arm to group
	console.log("Added leftArm to scene...");
    
    //Create rightArm
	cubeGeometry = new CubeGeometry(2, 0.5, 0.5);
	cubeMaterial = new LambertMaterial({color:0xffcc99});
	rightArm = new Mesh(cubeGeometry, cubeMaterial);
    rightArm.position.x = -1.75;
    rightArm.position.y = 3.75;
    rightArm.position.z = 0;
	rightArm.castShadow = true;
    rightArm.receiveShadow = true;
	person.add(rightArm);//Add arm to group
	console.log("Added rightArm to scene...");
    
    //Create leftLeg
	cubeGeometry = new CubeGeometry(0.5, 2, 0.5);
	cubeMaterial = new LambertMaterial({color:0x0000ff});
	leftLeg = new Mesh(cubeGeometry, cubeMaterial);
    leftLeg.position.x = 0.7;
    leftLeg.position.y = 1;
    leftLeg.position.z = 0;
	leftLeg.castShadow = true;
    leftLeg.receiveShadow = true;
	person.add(leftLeg);//Add leg to group
	console.log("Added leftLeg to scene...");
    
    //Create rightLeg
	cubeGeometry = new CubeGeometry(0.5, 2, 0.5);
	cubeMaterial = new LambertMaterial({color:0x0000ff});
	rightLeg = new Mesh(cubeGeometry, cubeMaterial);
    rightLeg.position.x = -0.7;
    rightLeg.position.y = 1;
    rightLeg.position.z = 0;
	rightLeg.castShadow = true;
    rightLeg.receiveShadow = true;
	person.add(rightLeg);//Add leg to group
	console.log("Added rightLeg to scene...");
    
    //Add person to scene
    scene.add(person);
	
    //Add a Plane to the Scene
	planeGeometry = new PlaneGeometry(20, 20);
	planeMaterial = new LambertMaterial({color:0xffffff});
	plane = new Mesh(planeGeometry, planeMaterial);
	plane.receiveShadow = true;
	plane.rotation.x = -0.5 * Math.PI;
	scene.add(plane);
	console.log("Added Plane Primative to scene...");
    
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
	//set character color from controller
	body.material.color = new Color(control.shirtColor);
	leftSleeve.material.color = new Color(control.shirtColor);
	rightSleeve.material.color = new Color(control.shirtColor);
	leftLeg.material.color = new Color(control.pantsColor);
	rightLeg.material.color = new Color(control.pantsColor);
    //set character rotation speed
    person.rotation.x += control.rotationSpeedx / 1000;
    person.rotation.y += control.rotationSpeedy / 1000;
    person.rotation.z += control.rotationSpeedz / 1000;
	
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
