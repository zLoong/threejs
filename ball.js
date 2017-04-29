import './index.scss';

$(function () {
    var webgl, renderer, camera, scene, light, width, height;
    function renderWebGL() {
        initRenderer();
        initCamera();
        initScene();
        initLight();
        initObject();

        renderer.clear();
        renderer.render(scene,camera);
    }
    setTimeout(function () {
        renderWebGL();
    }, 200);

    //..渲染器
    function initRenderer() {
        webgl = $('#container');
        width = webgl.width(), height = webgl.height();
        renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setSize(width, height);
        webgl.append(renderer.domElement);
        //renderer.setClearColorHex(0xFFFFFF, 1.0);
    }
    //..摄像机
    function initCamera() {
        //透视投影的相机,默认情况相机的上方向为Y轴，右方向X轴，沿着Z轴朝里
        camera = new THREE.PerspectiveCamera(45, width / height, 1, 5000);
        //设置相机位置坐标
        camera.position.x = 0;
        camera.position.y = 50;
        camera.position.z = 100;

        camera.up.x = 0;
        camera.up.y = 1;//Y轴为上
        camera.up.z = 0;

        //视野中心坐标
        camera.lookAt({ x: 0, y: 0, z: 0 });
    }

    //..场景
    function initScene() {
        scene = new THREE.Scene();
    }

    //..光源
    function initLight() {
        //设置一个平行光源
        light = new THREE.DirectionalLight(0xffff00, 1.0, 0);
        //光源向量
        light.position.set(200, 200, 200);
        scene.add(light);
    }

    //..物体
    var sphere;
    function initObject() {
        sphere = new THREE.Mesh(
            new THREE.SphereGeometry(10, 10),
            new THREE.MeshLambertMaterial({ color: 0x00ff00 }) //材质
        );
        scene.add(sphere);
        sphere.position.set(0, 0, 0);
    }
});