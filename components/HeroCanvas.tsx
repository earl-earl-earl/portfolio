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

    // Simulated code lines to type out
    const codeLines = [
      "// Antigravity AI IDE",
      "import { Antigravity } from 'antigravity';",
      "import { Canvas } from '@react-three/fiber';",
      "",
      "export default function Portfolio() {",
      "  const agent = new Antigravity({",
      "    model: 'Gemini 3.5 Flash',",
      "    mode: 'planning'",
      "  });",
      "",
      "  return (",
      "    <Workspace>",
      "      <Editor file='HeroCanvas.tsx' />",
      "      <AgentPanel status='editing' />",
      "    </Workspace>",
      "  );",
      "}"
    ];

    const assistantLog = [
      "User: make laptop code in IDE",
      "Antigravity: Analyzing files...",
      "Antigravity: Planning edit...",
      "Tool: replace_file_content",
      "Antigravity: Writing code...",
      "Antigravity: Running linter...",
      "Antigravity: Build successful! ✨"
    ];

    let tick = 0;

    const drawHighlightedText = (text: string, x: number, y: number) => {
      if (!ctx) return;
      // split by spaces, words, and symbols to apply highlighting
      const tokens = text.split(/(\s+|=|>|<|\(|\)|\{|\}|\[|\]|;|,|\.|\/|'[^']*'|"[^"]*")/g);
      let currentX = x;
      tokens.forEach(token => {
        if (!token) return;
        if (/^\s+$/.test(token)) {
          currentX += ctx.measureText(token).width;
        } else if (token.startsWith("'") || token.startsWith('"')) {
          ctx.fillStyle = "#10b981"; // Green for strings
          ctx.fillText(token, currentX, y);
          currentX += ctx.measureText(token).width;
        } else if (token.startsWith("//")) {
          ctx.fillStyle = "#6b7280"; // Gray for comments
          ctx.fillText(token, currentX, y);
          currentX += ctx.measureText(token).width;
        } else if (/^(import|from|export|default|function|const|new|return|class|interface|type|as)$/.test(token)) {
          ctx.fillStyle = "#ec4899"; // Pink for keywords
          ctx.fillText(token, currentX, y);
          currentX += ctx.measureText(token).width;
        } else if (/^[A-Z][a-zA-Z0-9]*$/.test(token)) {
          ctx.fillStyle = "#f59e0b"; // Amber for components/classes
          ctx.fillText(token, currentX, y);
          currentX += ctx.measureText(token).width;
        } else {
          ctx.fillStyle = "#e2e8f0"; // Off-white for standard text
          ctx.fillText(token, currentX, y);
          currentX += ctx.measureText(token).width;
        }
      });
    };

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const updateTerminalCanvas = (time: number) => {
      if (!ctx) return;

      tick++;
      const charsToType = Math.floor(tick / 1.2);
      
      let charCounter = charsToType;
      let lineIdx = 0;
      const tempTypedLines: string[] = [];

      while (lineIdx < codeLines.length && charCounter > 0) {
        const line = codeLines[lineIdx];
        if (charCounter >= line.length + 1) {
          tempTypedLines.push(line);
          charCounter -= (line.length + 1);
          lineIdx++;
        } else {
          tempTypedLines.push(line.substring(0, charCounter));
          charCounter = 0;
        }
      }

      // Reset loop after finishing typing and showing complete state for a while
      const totalCodeLength = codeLines.reduce((acc, l) => acc + l.length + 1, 0);
      if (charsToType > totalCodeLength + 150) {
        tick = 0;
      }

      // 1. Draw Main Background
      ctx.fillStyle = "#09090b";
      ctx.fillRect(0, 0, textCanvas.width, textCanvas.height);

      // 2. Draw Left Sidebar (File Explorer)
      ctx.fillStyle = "#0f0f13";
      ctx.fillRect(0, 0, 110, textCanvas.height - 20);
      
      // Sidebar separator border
      ctx.fillStyle = "#1f1f2e";
      ctx.fillRect(110, 0, 1, textCanvas.height - 20);

      // Title
      ctx.font = "bold 9px monospace";
      ctx.fillStyle = "#71717a";
      ctx.fillText("PORTFOLIO", 10, 18);

      // File Tree list
      ctx.font = "10px monospace";
      ctx.fillStyle = "#a1a1aa";
      ctx.fillText("📁 components", 10, 36);
      
      // Active file highlighting
      ctx.fillStyle = "rgba(6, 182, 212, 0.1)";
      ctx.fillRect(5, 45, 100, 16);
      ctx.fillStyle = "#06b6d4";
      ctx.fillText("📄 HeroCanvas.tsx", 18, 56);
      
      ctx.fillStyle = "#a1a1aa";
      ctx.fillText("📁 app", 10, 76);
      ctx.fillText("📄 page.tsx", 18, 92);
      ctx.fillText("📄 globals.css", 18, 108);
      ctx.fillText("📄 package.json", 10, 126);

      // 3. Draw Tabs Bar
      ctx.fillStyle = "#0f0f13";
      ctx.fillRect(111, 0, textCanvas.width - 111, 24);
      
      // Active tab (HeroCanvas.tsx)
      ctx.fillStyle = "#09090b";
      ctx.fillRect(111, 0, 110, 24);
      ctx.fillStyle = "#06b6d4";
      ctx.font = "bold 10px monospace";
      ctx.fillText("HeroCanvas.tsx", 120, 15);
      // active line
      ctx.fillRect(111, 22, 110, 2);

      // Inactive tab (globals.css)
      ctx.fillStyle = "#71717a";
      ctx.font = "10px monospace";
      ctx.fillText("globals.css", 235, 15);

      // Border bottom for tab bar
      ctx.fillStyle = "#1f1f2e";
      ctx.fillRect(111, 23, textCanvas.width - 111, 1);

      // 4. Draw Editor Pane (Code Lines)
      ctx.font = "11px monospace";
      
      // Draw Line Numbers & Code lines
      tempTypedLines.forEach((line, index) => {
        const yCoord = 42 + index * 16;
        
        // Line number
        ctx.fillStyle = "#3f3f46";
        ctx.fillText(String(index + 1).padStart(2, " "), 118, yCoord);
        
        // Highlighted code line
        drawHighlightedText(line, 142, yCoord);
      });

      // Cursor blinking
      if (tempTypedLines.length > 0) {
        const lastLineIdx = tempTypedLines.length - 1;
        const lastLineText = tempTypedLines[lastLineIdx];
        ctx.font = "11px monospace";
        const textWidth = ctx.measureText(lastLineText).width;
        const cursorY = 42 + lastLineIdx * 16;
        if (Math.floor(tick / 15) % 2 === 0) {
          ctx.fillStyle = "#06b6d4";
          ctx.fillRect(142 + textWidth + 1, cursorY - 9, 6, 11);
        }
      }

      // 5. Draw Right Panel (Antigravity Assistant)
      const assistantX = 352;
      const assistantWidth = textCanvas.width - assistantX;
      
      ctx.fillStyle = "#0c0d12";
      ctx.fillRect(assistantX, 0, assistantWidth, textCanvas.height - 20);
      
      // Left border
      ctx.fillStyle = "#1f1f2e";
      ctx.fillRect(assistantX, 0, 1, textCanvas.height - 20);

      // Assistant Header
      ctx.fillStyle = "#11131e";
      ctx.fillRect(assistantX + 1, 0, assistantWidth - 1, 24);
      ctx.fillStyle = "#06b6d4";
      ctx.font = "bold 9px monospace";
      ctx.fillText("🤖 ANTIGRAVITY", assistantX + 10, 15);
      
      // Header border
      ctx.fillStyle = "#1f1f2e";
      ctx.fillRect(assistantX + 1, 23, assistantWidth - 1, 1);

      // Assistant Log Steps
      const logThresholds = [15, 60, 120, 180, 240, 300, 360];
      ctx.font = "9px monospace";
      
      let logY = 38;
      for (let i = 0; i < assistantLog.length; i++) {
        if (charsToType >= logThresholds[i]) {
          const logText = assistantLog[i];
          if (logText.startsWith("User:")) {
            ctx.fillStyle = "#a1a1aa";
          } else if (logText.startsWith("Antigravity:")) {
            ctx.fillStyle = "#06b6d4";
          } else if (logText.startsWith("Tool:")) {
            ctx.fillStyle = "#fbbf24";
          } else {
            ctx.fillStyle = "#10b981"; // Success status
          }
          
          // Print logs with basic word wrapping for narrow panel
          const words = logText.split(" ");
          let currentLogLine = "";
          words.forEach(word => {
            const testLine = currentLogLine + word + " ";
            const testWidth = ctx.measureText(testLine).width;
            if (testWidth > assistantWidth - 16 && currentLogLine !== "") {
              ctx.fillText(currentLogLine, assistantX + 8, logY);
              logY += 12;
              currentLogLine = word + " ";
            } else {
              currentLogLine = testLine;
            }
          });
          ctx.fillText(currentLogLine, assistantX + 8, logY);
          logY += 14;
        }
      }

      // 6. Draw Bottom Status Bar
      ctx.fillStyle = "#0d0e12";
      ctx.fillRect(0, textCanvas.height - 20, textCanvas.width, 20);
      
      // Top border
      ctx.fillStyle = "#1f1f2e";
      ctx.fillRect(0, textCanvas.height - 20, textCanvas.width, 1);

      // Glowing dot & status
      ctx.beginPath();
      ctx.arc(10, textCanvas.height - 10, 3, 0, Math.PI * 2);
      ctx.fillStyle = "#06b6d4";
      ctx.fill();

      ctx.fillStyle = "#06b6d4";
      ctx.font = "9px monospace";
      ctx.fillText("Antigravity: ACTIVE", 18, textCanvas.height - 7);

      ctx.fillStyle = "#71717a";
      ctx.fillText("TypeScript JSX", textCanvas.width - 95, textCanvas.height - 7);
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
