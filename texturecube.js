import './index.scss';

$(function () {
    var renderer, camera, scene, light, width, height, webgl, cube;
    var texture_placeholder;
    function renderWebGL() {
        initRenderer();
        initCamera();
        initScene();
        initLight();
        initObject();

        loop();
    }

    setTimeout(function () {
        renderWebGL();
    }, 200);
    function initRenderer() {
        webgl = $('#container');
        width = webgl.width();
        height = webgl.height();
        renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setSize(width, height);
        webgl.append(renderer.domElement);
    }
    function initCamera() {
        camera = new THREE.PerspectiveCamera(45, width / height, 1, 10000);
        camera.position.x = 0;//摄影机的位置坐标
        camera.position.y = 0;
        camera.position.z = 20;

        camera.up.x = 0;
        camera.up.y = 1;//摄影机的上为Y轴方向
        camera.up.z = 0;

        camera.lookAt({ x: 0, y: 0, z: 0 });
    }
    function initScene() {
        scene = new THREE.Scene();
    }
    function initLight() {
        light = new THREE.DirectionalLight(0x0000FF, 1.0, 0);
        light.position.set(50, 50, 50);//光源位置        
        scene.add(light);//光源添加到场景
    }

    function initObject() {
        moreFaces();//内部多面贴图(为了设计师提供不了拼接大图而准备)
        return;
        //装载图片等素材
        var texture = new THREE.TextureLoader().load('texture/crate.gif');
        var textureAry = [], materials = [];
        for (var i = 1; i <= 6; i++) {
            textureAry.push(new THREE.TextureLoader().load('texture/' + i + '.jpg'));
        }
        for (var j = 0; j < 6; j++) {
            materials.push([new THREE.MeshBasicMaterial({ map: textureAry[j] })]);
        }
        cube = new THREE.Mesh(
            new THREE.CubeGeometry(50, 50, 50),//形状 （宽 高 深度）
            // new THREE.MeshLambertMaterial({ color: 0x0000FF }) //材质         
            new THREE.MeshBasicMaterial({ map: texture }) //材质 
        )
        scene.add(cube);
        cube.position.x = 0;
        cube.position.y = 0;
        cube.position.z = 0;
        scene.add(cube);
    }

    function loadTexture(path) {
        var texture = new THREE.Texture(texture_placeholder);
        var material = new THREE.MeshBasicMaterial({ map: texture, overdraw: 0.5 });
        var image = new Image();
        image.onload = function () {
            texture.image = this;
            texture.needsUpdate = true;
        };
        image.src = path;
        return material;
    }

    function moreFaces() {
        var geometry = new THREE.BoxGeometry(20, 20, 20);
        var material = [];
        var materials = [
            loadTexture('texture/1.jpg'),
            loadTexture('texture/2.jpg'),
            loadTexture('texture/3.jpg'),
            loadTexture('texture/4.jpg'),
            loadTexture('texture/5.jpg'),
            loadTexture('texture/6.jpg')];

        cube = new THREE.Mesh(geometry, materials);
        cube.scale.x = - 1;//支持内部渲染
        scene.add(cube);
        renderer.clear();
        renderer.render(scene, camera);
    }
    function loop() {
        requestAnimationFrame(loop);
        renderer.clear();
        cube.rotation.x += 0.01;
        renderer.render(scene, camera);
    }
})