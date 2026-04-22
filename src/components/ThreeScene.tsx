'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function ThreeScene() {
    const containerRef = useRef<HTMLDivElement>(null);
    const mouse = useRef({ x: 0, y: 0 });

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const width = window.innerWidth;
        const height = window.innerHeight;

        // Scene setup
        const scene = new THREE.Scene();
        scene.fog = new THREE.FogExp2(0x000000, 0.04);

        // Camera
        const camera = new THREE.PerspectiveCamera(65, width / height, 0.1, 1000);
        camera.position.z = 6;

        // Renderer
        const renderer = new THREE.WebGLRenderer({
            antialias: true,
            alpha: true,
            powerPreference: "high-performance"
        });
        renderer.setSize(width, height);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        container.appendChild(renderer.domElement);

        // Architectural Grid System
        const createGrid = (size: number, divisions: number, color: number) => {
            const grid = new THREE.GridHelper(size, divisions, color, color);
            grid.material.transparent = true;
            grid.material.opacity = 0.1;
            return grid;
        };

        const gridBottom = createGrid(40, 40, 0x444444);
        gridBottom.position.y = -2;
        scene.add(gridBottom);

        const gridTop = createGrid(40, 40, 0x444444);
        gridTop.position.y = 2;
        scene.add(gridTop);

        // Floating Dust Particles
        const particlesGeometry = new THREE.BufferGeometry();
        const particlesCount = 2000;
        const posArray = new Float32Array(particlesCount * 3);

        for (let i = 0; i < particlesCount * 3; i++) {
            posArray[i] = (Math.random() - 0.5) * 20;
        }

        particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
        const particlesMaterial = new THREE.PointsMaterial({
            size: 0.005,
            color: 0xffffff,
            transparent: true,
            opacity: 0.4
        });

        const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
        scene.add(particlesMesh);

        // Dynamic Lights
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.1);
        scene.add(ambientLight);

        const leftLight = new THREE.PointLight(0xffffff, 15, 15);
        leftLight.position.set(-8, 3, 3);
        scene.add(leftLight);

        const rightLight = new THREE.PointLight(0x00f3ff, 15, 15);
        rightLight.position.set(8, 3, 3);
        scene.add(rightLight);

        // Interaction Smoothness
        const targetCameraPos = new THREE.Vector3(0, 0, 6);

        const handleMouseMove = (event: MouseEvent) => {
            mouse.current.x = (event.clientX / width - 0.5) * 2;
            mouse.current.y = -(event.clientY / height - 0.5) * 2;
        };

        window.addEventListener('mousemove', handleMouseMove);

        const animateLoop = () => {
            const requestID = requestAnimationFrame(animateLoop);

            // Smooth camera interpolation
            targetCameraPos.x = mouse.current.x * 1.5;
            targetCameraPos.y = mouse.current.y * 1.5;

            camera.position.lerp(targetCameraPos, 0.03);
            camera.lookAt(0, 0, 0);

            // Subtle scene movement
            particlesMesh.rotation.y += 0.0005;
            particlesMesh.rotation.x += 0.0002;

            gridBottom.rotation.y += 0.0001;
            gridTop.rotation.y -= 0.0001;

            renderer.render(scene, camera);
            return requestID;
        };

        const requestID = animateLoop();

        const handleResize = () => {
            const w = window.innerWidth;
            const h = window.innerHeight;
            camera.aspect = w / h;
            camera.updateProjectionMatrix();
            renderer.setSize(w, h);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('resize', handleResize);
            cancelAnimationFrame(requestID);
            if (container) {
                container.removeChild(renderer.domElement);
            }
            renderer.dispose();
            particlesGeometry.dispose();
            particlesMaterial.dispose();
        };
    }, []);

    return <div ref={containerRef} className="w-full h-full" />;
}
