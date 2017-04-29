import './index.scss';

$(function () {
    var scene, webgl, renderer, light, camera, width, height;
    scene = new THREE.Scene();

    webgl = $('#container');
    width = webgl.width(); height = webgl.height();
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(width, height);
    webgl.append(renderer.domElement);
    renderer.setClearColor(0x000000);

    camera = new THREE.PerspectiveCamera(45, width / height, 1, 10000);
    camera.position.x = 20;
    camera.position.y = 20;
    camera.position.z = 20;
    camera.up.x = 0;
    camera.up.y = 1;
    camera.up.z = 0;

    //..坐标
    var axis = new THREE.AxisHelper(20);
    scene.add(axis);
    //..平面
    var planeGeometry = new THREE.PlaneGeometry(60, 20, 1, 1);
    var planeMeterial = new THREE.MeshBasicMaterial({ color: 0xCCCCCC });
    var plane = new THREE.Mesh(planeGeometry, planeMeterial);
    plane.rotation.x = -0.5 * Math.PI;
    plane.position.x = 0;
    plane.position.y = 0;
    plane.position.z = 0;
    scene.add(plane);

    //..立方体
    var cubeGeometry = new THREE.CubeGeometry(4, 4, 4);
    var cubeMaterial = new THREE.MeshBasicMaterial({ color: 0xFF0000, wireframe: true });
    var cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
    cube.position.x = -4;
    cube.position.y = 4;
    cube.position.z = 0;
    scene.add(cube);

    //..球体
    var sphereGeometry = new THREE.SphereGeometry(4, 10, 10);//半径，经纬
    var sphereMaterial = new THREE.MeshBasicMaterial({ color: 0x7777FF, wireframe: true });
    var sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
    sphere.position.x = 5;
    sphere.position.y = 4;
    sphere.position.z = -5;
    scene.add(sphere);


    camera.lookAt(scene.position);
    renderer.clear();
    renderer.render(scene, camera);

})