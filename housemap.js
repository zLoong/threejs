import './index.scss';

$(function () {
    var camera, scene, renderer;
    var cube, sphere, torus, material;
    var count = 0;
    var lon = 0, lat = 0;
    var phi = 0, theta = 0;
    var textureLoader = new THREE.TextureLoader();
    textureLoader.load('texture/2294472375_24a3b8ef46_o.jpg', function (texture) {
        texture.mapping = THREE.UVMapping;
        init(texture);
        animate();
    });

    function init(texture) {
        var webgl = $('#container');
        var width = webgl.width(), height = webgl.height();
        camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 1000);
        scene = new THREE.Scene();
        
        var mesh = new THREE.Mesh(new THREE.SphereBufferGeometry(500, 32, 16), new THREE.MeshBasicMaterial({ map: texture }));
        // var mesh = new THREE.Mesh(new THREE.CubeGeometry(500,32,16), new THREE.MeshBasicMaterial({ map: texture }));
        mesh.scale.x = -1;
        scene.add(mesh);

        renderer = new THREE.WebGLRenderer();
        renderer.setSize(width, height);
        webgl.append(renderer.domElement);
    }

    function animate() {
        requestAnimationFrame(animate);
        render();
    }

    function render() {
        var time = Date.now();
        lon += .15;
        lat = Math.max(- 85, Math.min(85, lat));
        phi = THREE.Math.degToRad(90 - lat);
        theta = THREE.Math.degToRad(lon);


        camera.position.x = 100 * Math.sin(phi) * Math.cos(theta);
        camera.position.y = 100 * Math.cos(phi);
        camera.position.z = 100 * Math.sin(phi) * Math.sin(theta);

        camera.lookAt(scene.position);
        count++;
        renderer.render(scene, camera);
    }
})