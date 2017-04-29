import './index.scss';

$(function () {
    var webgl, renderer, camera, scene, light, width, height;

    function renderWebGL() {
        initThree();
        initCamera();
        initScene();
        initLight();
        initObject();
        loop();
    }
    setTimeout(function () {
        renderWebGL();
    }, 200);

    //..初始化渲染器
    function initThree() {
        webgl = $("#container");
        width = webgl.width(), height = webgl.height();
        //生成渲染器对象(antialias抗锯齿,奇怪开启这个在Chrome里面报错)
        // renderer = new THREE.CanvasRenderer({ antialias: true });//Canvas方式绘制需要多引入几个js(有提示的)
        renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setSize(width, height);
        //renderer.domElement是canvas        
        webgl.append(renderer.domElement);    
        
    }
    //..摄影机
    function initCamera() {
        camera = new THREE.PerspectiveCamera(45, width / height, 1, 10000);
        camera.position.x = 400;//摄影机的位置坐标
        camera.position.y = 0;
        camera.position.z = 0;

        camera.up.x = 0;
        camera.up.y = 1;//摄影机的上为Y轴方向
        camera.up.z = 0;
    }
    //..场景
    function initScene() {
        scene = new THREE.Scene();
    }
    //..光源
    function initLight() {
        light = new THREE.DirectionalLight(0x0000FF, 1.0, 0);
        light.position.set(50, 50, 50);//光源位置
        scene.add(light);//光源添加到场景
    }
    //..物体
    var cube = new Array();//cube立方体
    function initObject() {
        for (var i = 0; i < 4; i++) {
            cube[i] = new THREE.Mesh(
                new THREE.CubeGeometry(50, 50, 50),//形状 （宽 高 深度）
                new THREE.MeshLambertMaterial({ color: 0x0000FF }) //材质
            );
            scene.add(cube[i]); //加入场景里面
            cube[i].position.set(0, -120 + 80 * i, 0);
        }
    }
    //6.旋转
    var t = 0;
    function loop() {
        t++;
        renderer.clear();
        cube[0].rotation.set(t / 100, 0, 0);
        cube[1].rotation.set(0, t / 100, 0);
        cube[2].rotation.set(0, 0, t / 100);

        camera.lookAt({ x: 0, y: 0, z: 0 });
        renderer.render(scene, camera);
        window.requestAnimationFrame(loop);
    }

})
