/* eslint-disable react-hooks/exhaustive-deps */
import * as THREE from 'three';
import { useRef, useEffect } from 'react';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const SceneWrapper = ({ values, onClick, opened }) => {
    const canvasRef = useRef();

    useEffect(() => {
        const scene = new THREE.Scene();

        const w = canvasRef.current.offsetWidth;
        const h = canvasRef.current.offsetHeight;
        const viewSize = h;
        const aspectRatio = w / h;
        const distance = 200
        let camera = null

        const viewport = {
            left: (-aspectRatio * viewSize) / distance,
            right: (aspectRatio * viewSize) / distance,
            top: viewSize / distance,
            bottom: -viewSize / distance,
            near: 1,
            far: 1000,
        }

        if (!opened) {
            camera = new THREE.PerspectiveCamera(
                75,
                window.innerWidth / (window.innerHeight - 50),
                0.1,
                1000
            );
        } else {
            camera = new THREE.OrthographicCamera(
                viewport.left,
                viewport.right,
                viewport.top,
                viewport.bottom,
                viewport.near,
                viewport.far
            );
            camera.position.set(20, 20, 20);
            camera.rotation.order = 'YXZ';
        }

        const renderer = new THREE.WebGLRenderer({
            canvas: canvasRef.current,
            // antialias: true,
            // alpha: true
        });
        renderer.shadowMap.enabled = true;
        renderer.shadowMap.type = THREE.PCFSoftShadowMap;

        renderer.setSize(window.innerWidth, (window.innerHeight - 50));
        renderer.setPixelRatio(window.devicePixelRatio);

        const planeGeometry = new THREE.PlaneBufferGeometry(20, 20, 32);
        const planeMaterial = new THREE.MeshStandardMaterial({
            color: 0xF0F0F0,
            side: THREE.DoubleSide
        });
        const plane = new THREE.Mesh(planeGeometry, planeMaterial);
        plane.position.z = -4;
        plane.receiveShadow = true;
        scene.add(plane);


        const cubeGeometry = new THREE.BoxGeometry();
        const cubeMaterial = new THREE.MeshLambertMaterial({ color: 0x808080 });

        const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
        cube.castShadow = true;
        cube.receiveShadow = true;

        /* lighting */
        const pointLight = new THREE.DirectionalLight(0xffffff, 1, 100);
        pointLight.position.set(10, 10, 10);
        pointLight.castShadow = true;
        pointLight.shadow.bias = -0.001
        scene.add(pointLight)

        const sphereSize = 1;
        const pointLightHelper = new THREE.PointLightHelper(pointLight, sphereSize);
        scene.add(pointLightHelper);

        // const directionalLight = new THREE.DirectionalLight(0xffffff);
        // directionalLight.castShadow = true;
        // directionalLight.target = cube
        // directionalLight.shadowCameraNear = 5;
        // directionalLight.shadowCameraFar = 25;
        // directionalLight.shadowCameraRight = 10;
        // directionalLight.shadowCameraLeft = -10;
        // directionalLight.shadowCameraTop = 10;
        // directionalLight.shadowCameraBottom = -10;
        // directionalLight.shadowCameraVisible = true;
        // scene.add(directionalLight);

        const ambient = new THREE.AmbientLight(0xcccccc);
        scene.add(ambient);



        cube.scale.set(values.scalingX, values.scalingY, values.scalingZ)

        const axis = new THREE.Vector3(0, 1, 0);
        cube.rotateOnAxis(axis, Math.PI / values.rotation);

        cube.translateX(values.translationX)
        cube.translateY(values.translationY)
        cube.translateZ(values.translationZ)

        scene.add(cube);
        camera.position.x = values.x;
        camera.position.y = values.y;
        camera.position.z = values.z;

        function render() {
            renderer.render(scene, camera)
        }

        window.addEventListener('resize', onWindowResize);

        function onWindowResize() {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();

            renderer.setSize(window.innerWidth, window.innerHeight);
        }

        const controls = new OrbitControls(camera, canvasRef.current);
        controls.update();

        function animate() {
            requestAnimationFrame(animate);
            render()
        }

        animate()

        return () => {
            renderer.dispose();
            cube.geometry.dispose();
            cube.material.dispose();
        };
    }, [opened]);


    if (canvasRef) return <canvas onClick={onClick} ref={canvasRef} />;
    return null
}

export default SceneWrapper;
