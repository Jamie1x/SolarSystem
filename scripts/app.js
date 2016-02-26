// MAIN GAME FILE
var Scene = THREE.Scene;
var Renderer = THREE.WebGLRenderer;
var PerspectiveCamera = THREE.PerspectiveCamera;
var SphereGeometry = THREE.SphereGeometry;
var CubeGeometry = THREE.CubeGeometry;
var PlaneGeometry = THREE.PlaneGeometry;
var PhongMaterial = THREE.MeshPhongMaterial;
var BasicMaterial = THREE.MeshBasicMaterial;
var LambertMaterial = THREE.MeshLambertMaterial;
var Mesh = THREE.Mesh;
var SpotLight = THREE.SpotLight;
var PointLight = THREE.PointLight;
var DirectionalLight = THREE.DirectionalLight;
var AmbientLight = THREE.AmbientLight;
var Control = objects.Control;
var GUI = dat.GUI;
var Color = THREE.Color;
var Vector3 = THREE.Vector3;
var AxisHelper = THREE.AxisHelper;
var scene;
var renderer;
var camera;
var sun;
var mercury;
var venus;
var earth;
var moon;
var mars;
var marsMoon;
var marsMoon2;
var jupiter;
var saturn;
var saturnRing;
var skyBox;
var mesh;
var mercuryLight;
var venusLight;
var earthLight;
var marsLight;
var jupiterLight;
var saturnLight;
var spotLight;
var ambientLight;
var control;
var gui;
var stats;
var axis;
var mercuryaxes = new THREE.Object3D;
var venusaxes = new THREE.Object3D;
var earthaxes = new THREE.Object3D;
var moonaxes = new THREE.Object3D;
var marsaxes = new THREE.Object3D;
var marsMoonaxes = new THREE.Object3D;
var marsMoon2axes = new THREE.Object3D;
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
    //Add Sun to solar system
    var sphereGeometry = new SphereGeometry(3, 20, 20);
    var sunMat = new BasicMaterial();
    sunMat.map = THREE.ImageUtils.loadTexture('../content/sun.jpg');
    sun = new Mesh(sphereGeometry, sunMat);
    scene.add(sun);
    console.log("Added sun to scene...");
    //Add mercury to solar system
    mercury = planet(new SphereGeometry(0.6, 20, 20), "mercury.jpg", 4, 0, 0);
    mercuryaxes.add(mercury);
    scene.add(mercuryaxes);
    console.log("added mercury to scene...");
    //Add venus to solar system
    venus = planet(new SphereGeometry(0.8, 20, 20), "venus.jpg", 6, 0, 0);
    venusaxes.add(venus);
    scene.add(venusaxes);
    console.log("added venus to scene...");
    //Add earth to solar system
    earth = planet(new SphereGeometry(1, 20, 20), "earth.jpg", 9, 0, 0);
    earthaxes.add(earth);
    //Add moon to earth
    moon = planet(new SphereGeometry(0.2, 20, 20), "moon.jpg", 2, 0, 0);
    moonaxes.add(moon);
    earth.add(moonaxes);
    scene.add(earthaxes);
    console.log("added earth and moon to scene...");
    //Add mars to solar system
    mars = planet(new SphereGeometry(0.6, 20, 20), "mars.jpg", 13, 0, 0);
    marsaxes.add(mars);
    //Add moon to mars
    marsMoon = planet(new SphereGeometry(0.1, 20, 20), "moon.jpg", 0, 0, 0.8);
    marsMoonaxes.add(marsMoon);
    mars.add(marsMoonaxes);
    //Add second moon to mars
    marsMoon2 = planet(new SphereGeometry(0.15, 20, 20), "moon.jpg", 1.2, 0, 0);
    marsMoon2axes.add(marsMoon2);
    mars.add(marsMoon2axes);
    scene.add(marsaxes);
    console.log("added mars to scene...");
    //Add jupiter to solar system
    jupiter = planet(new SphereGeometry(1.6, 20, 20), "jupiter.jpg", 17, 0, 0);
    jupiteraxes.add(jupiter);
    scene.add(jupiteraxes);
    console.log("added jupiter to scene...");
    //Add saturn to solar system
    saturn = planet(new SphereGeometry(1.3, 20, 20), "saturn.jpg", 20, 0, 0);
    saturnaxes.add(saturn);
    scene.add(saturnaxes);
    //Add saturn's ring to solar system
    saturnRing = planet(new PlaneGeometry(5, 5), "saturnRing.png", 0, 0, 0);
    saturnRing.material.transparent = true;
    saturnRing.material.opacity = 0.5;
    saturnRing.rotation.x = -0.5 * Math.PI;
    saturn.add(saturnRing);
    console.log("added saturn to scene...");
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
    console.log("Added Ambient Light to scene");
    //Add a skyBox for a starry background
    var cubeGeometry = new CubeGeometry(50, 50, 50);
    var skyMat = new LambertMaterial();
    skyMat.map = THREE.ImageUtils.loadTexture('../content/stars.jpg');
    skyBox = new Mesh(cubeGeometry, skyMat);
    skyBox.material.transparent = true;
    skyBox.material.opacity = 0.5;
    skyBox.material.side = THREE.BackSide;
    scene.add(skyBox);
    //Add extras
    gui = new GUI();
    paramaters = { camLocation: "solar system" };
    control = new Control(paramaters.camLocation);
    addControl(control);
    addStatsObject();
    document.body.appendChild(renderer.domElement);
    gameLoop(); // render the scene	
}
//Function for creating textured planets
function planet(geom, imageFile, x, y, z) {
    var texture = THREE.ImageUtils.loadTexture("../content/" + imageFile);
    var mat = new PhongMaterial();
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
    spotLight = new SpotLight(0xffffff, 2);
    spotLight.target = object;
    spotLight.castShadow = true;
    spotLight.shadowCameraNear = 1;
    spotLight.shadowMapWidth = 2048;
    spotLight.shadowMapHeight = 2048;
    return spotLight;
}
//Add planets to the controller
function addControl(controlObject) {
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
function gameLoop() {
    stats.update();
    //Render using requestAnimationFrame
    requestAnimationFrame(gameLoop);
    //Set planet rotation speeds
    mercuryaxes.rotation.y += 0.01;
    mercury.rotation.y += 0.01;
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
    saturnaxes.rotation.y += 0.0005;
    saturn.rotation.y += 0.0005;
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
//Setup default renderer
function setupRenderer() {
    renderer = new Renderer();
    renderer.setClearColor(0x000000, 1.0);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMapType = THREE.PCFSoftShadowMap;
    renderer.shadowMapEnabled = true;
    console.log("Finished setting up Renderer...");
}
//Setup main camera for the scene
function setupCamera() {
    camera = new PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.x = 15;
    camera.position.y = 16;
    camera.position.z = 25;
    camera.lookAt(scene.position);
    console.log("Finished setting up Camera...");
}

//# sourceMappingURL=app.js.map
