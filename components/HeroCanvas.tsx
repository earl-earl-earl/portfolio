"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";

export default function HeroCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const width = container.clientWidth || 500;
    const height = container.clientHeight || 500;

    // 1. Scene setup
    const scene = new THREE.Scene();

    // 2. Camera setup
    const aspect = width / height;
    const camera = new THREE.PerspectiveCamera(45, aspect, 0.1, 100);
    camera.position.set(0, 0, aspect < 1 ? 7.5 * (1 / aspect) : 7.5);

    // 3. Renderer setup
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // 4. Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);

    const pointLightCyan = new THREE.PointLight(0x06b6d4, 3, 50);
    pointLightCyan.position.set(5, 5, 5);
    scene.add(pointLightCyan);

    const pointLightIndigo = new THREE.PointLight(0x6366f1, 3, 50);
    pointLightIndigo.position.set(-5, -5, 5);
    scene.add(pointLightIndigo);

    // Light reflecting from the screen
    const screenGlowLight = new THREE.PointLight(0x06b6d4, 1.5, 10);
    screenGlowLight.position.set(0, 0.5, 1);
    scene.add(screenGlowLight);

    // 5. Creating offscreen Canvas for the Terminal Screen Texture
    const textCanvas = document.createElement("canvas");
    textCanvas.width = 512;
    textCanvas.height = 384;
    const ctx = textCanvas.getContext("2d");

    // Code lines to simulate terminal output
    const codeSnippets = [
      "const cluster = require('cluster');",
      "const os = require('os');",
      "import { Aether } from 'orchestrator';",
      "Initializing sandboxed execution...",
      "Status: ACTIVE [127.0.0.1]",
      "DB Connect: OK (ZenithDB)",
      "Streaming captions node: ON",
      "Latency: 12ms",
      "Optimization score: 98%",
      "Memory leak audit: PASS",
      "Garbage Collector triggered.",
      "Aether orchestrating 8 agents...",
      "Waiting for next job pipeline...",
      "npm run dev --host --secure",
      "Server listening on port 3000",
      "Compilation successful in 250ms"
    ];

    const activeLines: string[] = ["$ systemctl start aether-orchestrator", "Loading environment modules..."];
    let lastLineTime = 0;

    const updateTerminalCanvas = (time: number) => {
      if (!ctx) return;

      // Add a new line every 0.8 seconds
      if (time - lastLineTime > 0.8) {
        const randomSnippet = codeSnippets[Math.floor(Math.random() * codeSnippets.length)];
        activeLines.push(randomSnippet);
        if (activeLines.length > 15) {
          activeLines.shift();
        }
        lastLineTime = time;
      }

      // Draw background
      ctx.fillStyle = "#09090e";
      ctx.fillRect(0, 0, textCanvas.width, textCanvas.height);

      // Draw bezel details / scanlines
      ctx.fillStyle = "rgba(6, 182, 212, 0.04)";
      for (let y = 0; y < textCanvas.height; y += 4) {
        ctx.fillRect(0, y, textCanvas.width, 2);
      }

      // Draw text
      ctx.font = "bold 16px monospace";
      ctx.fillStyle = "#06b6d4"; // Cyan text

      activeLines.forEach((line, index) => {
        const isCommandLine = line.startsWith("$") || line.includes("run");
        ctx.fillStyle = isCommandLine ? "#6366f1" : "#06b6d4"; // Indigo for commands, Cyan for output
        ctx.fillText(line, 20, 30 + index * 23);
      });

      // Draw blinking cursor
      if (Math.floor(time * 2) % 2 === 0) {
        const lastLineY = 30 + (activeLines.length - 1) * 23;
        const lastLineText = activeLines[activeLines.length - 1] || "";
        const textWidth = ctx.measureText(lastLineText).width;
        ctx.fillStyle = "#06b6d4";
        ctx.fillRect(20 + textWidth + 4, lastLineY - 14, 10, 16);
      }
    };

    const screenTexture = new THREE.CanvasTexture(textCanvas);

    // 6. Laptop / Terminal 3D Model Assembly
    const laptopGroup = new THREE.Group();

    // Base deck
    const baseGeo = new THREE.BoxGeometry(3.2, 0.12, 2.2);
    const baseMat = new THREE.MeshStandardMaterial({
      color: 0x1f2937, // dark gray
      roughness: 0.4,
      metalness: 0.8,
    });
    const baseMesh = new THREE.Mesh(baseGeo, baseMat);
    baseMesh.position.y = -0.7;
    laptopGroup.add(baseMesh);

    // Keyboard plate texture (simple grid pattern)
    const kbGeo = new THREE.BoxGeometry(2.8, 0.02, 1.6);
    const kbMat = new THREE.MeshStandardMaterial({
      color: 0x111827,
      roughness: 0.8,
    });
    const kbMesh = new THREE.Mesh(kbGeo, kbMat);
    kbMesh.position.set(0, -0.63, 0.1);
    laptopGroup.add(kbMesh);

    // Screen Lid (outer back shell)
    const lidGeo = new THREE.BoxGeometry(3.2, 2.2, 0.1);
    const lidMat = new THREE.MeshStandardMaterial({
      color: 0x111827,
      roughness: 0.5,
      metalness: 0.7,
    });
    const lidMesh = new THREE.Mesh(lidGeo, lidMat);
    lidMesh.position.set(0, 0.4, -0.9);
    lidMesh.rotation.x = -Math.PI / 16; // tilt back slightly
    laptopGroup.add(lidMesh);

    // Bezel & Screen Face
    const screenGeo = new THREE.PlaneGeometry(3.0, 2.0);
    const screenMat = new THREE.MeshBasicMaterial({
      map: screenTexture,
    });
    const screenMesh = new THREE.Mesh(screenGeo, screenMat);
    screenMesh.position.set(0, 0.4, -0.83);
    screenMesh.rotation.x = -Math.PI / 16;
    laptopGroup.add(screenMesh);

    // Laptop hinge cylinders
    const hingeGeo = new THREE.CylinderGeometry(0.08, 0.08, 2.6, 12);
    const hingeMat = new THREE.MeshStandardMaterial({
      color: 0x4b5563,
      metalness: 0.9,
    });
    const hingeMesh = new THREE.Mesh(hingeGeo, hingeMat);
    hingeMesh.position.set(0, -0.63, -0.9);
    hingeMesh.rotation.z = Math.PI / 2;
    laptopGroup.add(hingeMesh);

    // Scale up the entire laptop group for better visibility
    laptopGroup.scale.set(1.1, 1.1, 1.1);
    
    // Rotate to a nice isometric angle
    laptopGroup.rotation.y = -Math.PI / 6;
    laptopGroup.rotation.x = Math.PI / 16;

    scene.add(laptopGroup);

    // Outer orbit particles (to give context and premium feel)
    const particleCount = 40;
    const particleGeo = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    const particleSpeeds: number[] = [];

    for (let i = 0; i < particleCount; i++) {
      // Create random points in a shell around the laptop
      const radius = 2.5 + Math.random() * 2.0;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos((Math.random() * 2) - 1);

      particlePositions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      particlePositions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      particlePositions[i * 3 + 2] = radius * Math.cos(phi);
      
      particleSpeeds.push(0.2 + Math.random() * 0.4);
    }

    particleGeo.setAttribute("position", new THREE.BufferAttribute(particlePositions, 3));
    const particleMat = new THREE.PointsMaterial({
      size: 0.06,
      color: 0x06b6d4,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending,
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // 7. Mouse interaction tracking
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const handleMouseMove = (event: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      
      mouseX = Math.max(-1, Math.min(1, (x / rect.width) * 2 - 1));
      mouseY = Math.max(-1, Math.min(1, -(y / rect.height) * 2 + 1));
    };

    window.addEventListener("mousemove", handleMouseMove);

    // 8. Animation Loop
    const startTime = performance.now();
    let animationFrameId: number;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      const elapsedTime = (performance.now() - startTime) / 1000;

      // Update screen text canvas & texture
      updateTerminalCanvas(elapsedTime);
      screenTexture.needsUpdate = true;

      // Float / Bobbing motion
      const bob = Math.sin(elapsedTime * 1.5) * 0.15;
      laptopGroup.position.y = bob;

      // Smooth rotate towards target mouse coordinates
      targetX = mouseX * 0.25;
      targetY = mouseY * 0.15;

      // Idle spin + mouse parallax
      const targetRotY = -Math.PI / 6 + targetX;
      const targetRotX = Math.PI / 16 - targetY;
      
      laptopGroup.rotation.y += (targetRotY - laptopGroup.rotation.y) * 0.05;
      laptopGroup.rotation.x += (targetRotX - laptopGroup.rotation.x) * 0.05;

      // Slowly rotate particle ring
      particles.rotation.y = elapsedTime * 0.05;
      particles.rotation.x = elapsedTime * 0.02;

      renderer.render(scene, camera);
    };

    animate();

    // 9. Resize handler
    const handleResize = () => {
      if (!containerRef.current) return;
      const w = containerRef.current.clientWidth;
      const h = containerRef.current.clientHeight;
      
      const asp = w / h;
      camera.aspect = asp;
      camera.position.z = asp < 1 ? 7.5 * (1 / asp) : 7.5;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    const resizeObserver = new ResizeObserver(() => {
      handleResize();
    });
    resizeObserver.observe(container);

    // 10. Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("mousemove", handleMouseMove);
      resizeObserver.disconnect();
      
      // Dispose materials & geometries
      baseGeo.dispose();
      baseMat.dispose();
      kbGeo.dispose();
      kbMat.dispose();
      lidGeo.dispose();
      lidMat.dispose();
      screenGeo.dispose();
      screenMat.dispose();
      hingeGeo.dispose();
      hingeMat.dispose();
      particleGeo.dispose();
      particleMat.dispose();
      screenTexture.dispose();
      renderer.dispose();
      
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div 
      ref={containerRef} 
      className="w-full h-87.5 sm:h-112.5 md:h-125 flex items-center justify-center relative select-none"
    />
  );
}
