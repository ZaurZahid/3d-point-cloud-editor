/* eslint-disable react-hooks/exhaustive-deps */
import * as THREE from 'three';
import { useRef, useEffect } from 'react';

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

        const renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current });

        renderer.setSize(window.innerWidth, (window.innerHeight - 50));
        renderer.setPixelRatio(window.devicePixelRatio);

        const geometry = new THREE.BoxGeometry();
        const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });

        const cube = new THREE.Mesh(geometry, material);


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

        // function animate() {
        //     requestAnimationFrame(animate);

        //     cube.rotation.x += 0.01;
        //     cube.rotation.y += 0.01;

        //     render()
        // }

        // animate()

        render()

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
