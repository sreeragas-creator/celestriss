import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { museumAudio } from '../utils/audio';

interface HeroGlobeProps {
  activePlanet: 'moon' | 'mars';
  onTogglePlanet: (planet: 'moon' | 'mars') => void;
  onSelectSite?: (siteName: string) => void;
}

interface Landmark {
  id: string;
  name: string;
  hardware: string;
  coordinatesDisplay: string;
  lat: number;
  lon: number;
  accentColor: string;
  beaconColor: string;
}

const LUNA_LANDMARKS: Landmark[] = [
  {
    id: 'apollo11',
    name: 'TRANQUILITY BASE',
    hardware: 'Apollo 11 Eagle',
    coordinatesDisplay: '0.6741° N, 23.4730° E',
    lat: 0.674,
    lon: 23.473,
    accentColor: '#38BDF8',
    beaconColor: '#00CFFF'
  },
  {
    id: 'apollo15',
    name: 'HADLEY RILLE',
    hardware: 'LRV-001 (Apollo 15)',
    coordinatesDisplay: '26.1322° N, 3.6339° E',
    lat: 26.132,
    lon: 3.634,
    accentColor: '#F59E0B',
    beaconColor: '#FFB800'
  }
];

const ARES_LANDMARKS: Landmark[] = [
  {
    id: 'meridiani',
    name: 'MERIDIANI PLANUM',
    hardware: 'Opportunity MER-B',
    coordinatesDisplay: '2.2570° S, 354.7640° E',
    lat: -2.257,
    lon: 354.764,
    accentColor: '#F59E0B',
    beaconColor: '#FFB800'
  },
  {
    id: 'jezero',
    name: 'JEZERO CRATER',
    hardware: 'Ingenuity Helicopter',
    coordinatesDisplay: '18.4447° N, 77.4508° E',
    lat: 18.445,
    lon: 77.451,
    accentColor: '#38BDF8',
    beaconColor: '#00CFFF'
  }
];

// Mathematical Lat/Lon to 3D Cartesian coordinates on sphere
function latLonToVector3(lat: number, lon: number, radius: number): THREE.Vector3 {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lon + 180) * (Math.PI / 180);
  return new THREE.Vector3(
    -(radius * Math.sin(phi) * Math.cos(theta)),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.sin(theta)
  );
}

// Custom Fresnel Shader for realistic atmospheric rim separation
const FresnelShader = {
  uniforms: {
    glowColor: { value: new THREE.Color(0x38bdf8) }
  },
  vertexShader: `
    varying vec3 vNormal;
    varying vec3 vPosition;
    void main() {
      vNormal = normalize(normalMatrix * normal);
      vPosition = (modelViewMatrix * vec4(position, 1.0)).xyz;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  fragmentShader: `
    uniform vec3 glowColor;
    varying vec3 vNormal;
    varying vec3 vPosition;
    void main() {
      vec3 viewDir = normalize(-vPosition);
      float fresnel = pow(1.0 - max(dot(viewDir, vNormal), 0.0), 3.2);
      gl_FragColor = vec4(glowColor, fresnel * 0.72);
    }
  `
};

export const HeroGlobe: React.FC<HeroGlobeProps> = ({
  activePlanet,
  onTogglePlanet,
  onSelectSite
}) => {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const sphereRef = useRef<THREE.Mesh | null>(null);
  const materialRef = useRef<THREE.MeshStandardMaterial | null>(null);
  const atmosphereRef = useRef<THREE.ShaderMaterial | null>(null);
  const ring1Ref = useRef<THREE.Mesh | null>(null);
  const ring2Ref = useRef<THREE.Mesh | null>(null);
  const controlsRef = useRef<OrbitControls | null>(null);

  // Store 2D screen projected coordinate points
  const [pinPositions, setPinPositions] = useState<Record<string, { x: number; y: number; visible: boolean }>>({});
  const [containerDimensions, setContainerDimensions] = useState<{ width: number; height: number }>({ width: 500, height: 500 });

  const landmarks = activePlanet === 'moon' ? LUNA_LANDMARKS : ARES_LANDMARKS;

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Dimensions
    const width = container.clientWidth || 500;
    const height = container.clientHeight || 500;
    setContainerDimensions({ width, height });

    // 1. Scene & Camera
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.set(0, 0, 4.8);

    // 2. High-Performance WebGL Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.05;
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    container.appendChild(renderer.domElement);

    // 3. OrbitControls (Smooth Damping enabled, Zoom disabled to protect page scroll)
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableZoom = false;
    controls.enablePan = false;
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.rotateSpeed = 0.6;
    controlsRef.current = controls;

    // 4. Dramatic Space Lighting
    // Strong Directional Sunlight at top-left [-5, 3, 5]
    const sunLight = new THREE.DirectionalLight(0xffffff, 2.5);
    sunLight.position.set(-5, 3, 5);
    scene.add(sunLight);

    // Dim Ambient Fill Light (0.15) so the dark side retains faint crater details
    const ambientLight = new THREE.AmbientLight(0x222a3d, 0.15);
    scene.add(ambientLight);

    // Secondary subtle rim bounce light
    const bounceLight = new THREE.DirectionalLight(0x0f172a, 0.25);
    bounceLight.position.set(5, -2, -3);
    scene.add(bounceLight);

    // 5. Texture Loader
    const textureLoader = new THREE.TextureLoader();

    // Local NASA surface textures with CDN fallback
    const moonTexture = textureLoader.load(
      '/images/textures/moon_map.jpg',
      undefined,
      undefined,
      () => {
        textureLoader.load('https://cdn.jsdelivr.net/gh/mrdoob/three.js@dev/examples/textures/planets/moon_1024.jpg', (tex) => {
          if (materialRef.current) materialRef.current.map = tex;
        });
      }
    );
    const moonBump = textureLoader.load(
      '/images/textures/moon_bump.jpg',
      undefined,
      undefined,
      () => {
        textureLoader.load('https://raw.githubusercontent.com/jeromeetienne/threex.planets/master/images/moonbump1k.jpg', (tex) => {
          if (materialRef.current) materialRef.current.bumpMap = tex;
        });
      }
    );

    const marsTexture = textureLoader.load(
      '/images/textures/mars_map.jpg',
      undefined,
      undefined,
      () => {
        textureLoader.load('https://raw.githubusercontent.com/jeromeetienne/threex.planets/master/images/marsmap1k.jpg', (tex) => {
          if (materialRef.current && activePlanet === 'mars') materialRef.current.map = tex;
        });
      }
    );
    const marsBump = textureLoader.load(
      '/images/textures/mars_bump.jpg',
      undefined,
      undefined,
      () => {
        textureLoader.load('https://raw.githubusercontent.com/jeromeetienne/threex.planets/master/images/marsbump1k.jpg', (tex) => {
          if (materialRef.current && activePlanet === 'mars') materialRef.current.bumpMap = tex;
        });
      }
    );

    // 6. Photorealistic PBR Sphere Material
    const SPHERE_RADIUS = 1.48;
    const geometry = new THREE.SphereGeometry(SPHERE_RADIUS, 64, 64);
    const material = new THREE.MeshStandardMaterial({
      map: activePlanet === 'moon' ? moonTexture : marsTexture,
      bumpMap: activePlanet === 'moon' ? moonBump : marsBump,
      bumpScale: 0.04,
      roughness: 0.9,
      metalness: 0.0
    });
    materialRef.current = material;

    const sphere = new THREE.Mesh(geometry, material);
    sphere.rotation.y = 1.8;
    scene.add(sphere);
    sphereRef.current = sphere;

    // 7. Outer Atmospheric Rim-Light Halo (Custom Fresnel Shader)
    const atmosphereMat = new THREE.ShaderMaterial({
      uniforms: {
        glowColor: {
          value: new THREE.Color(activePlanet === 'moon' ? 0x38bdf8 : 0xf97316)
        }
      },
      vertexShader: FresnelShader.vertexShader,
      fragmentShader: FresnelShader.fragmentShader,
      side: THREE.BackSide,
      blending: THREE.AdditiveBlending,
      transparent: true
    });
    atmosphereRef.current = atmosphereMat;

    const atmosphere = new THREE.Mesh(
      new THREE.SphereGeometry(SPHERE_RADIUS * 1.04, 64, 64),
      atmosphereMat
    );
    scene.add(atmosphere);

    // 8. Semi-Transparent Orbital Trajectory Rings
    const ringMat1 = new THREE.MeshBasicMaterial({
      color: activePlanet === 'moon' ? 0x38bdf8 : 0xf59e0b,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.15
    });
    const ring1 = new THREE.Mesh(new THREE.RingGeometry(2.05, 2.065, 96), ringMat1);
    ring1.rotation.x = Math.PI / 2.3;
    ring1.rotation.y = -0.22;
    scene.add(ring1);
    ring1Ref.current = ring1;

    const ringMat2 = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.08
    });
    const ring2 = new THREE.Mesh(new THREE.RingGeometry(2.35, 2.365, 96), ringMat2);
    ring2.rotation.x = -Math.PI / 2.5;
    ring2.rotation.y = 0.35;
    scene.add(ring2);
    ring2Ref.current = ring2;

    // 9. Resize Handler
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth || 500;
      const h = container.clientHeight || 500;
      setContainerDimensions({ width: w, height: h });
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    // 10. Animation & Render Loop with 3D Coordinate Projection
    let animId: number;
    const animate = () => {
      animId = requestAnimationFrame(animate);

      // Slow orbital auto-rotation
      sphere.rotation.y += 0.0012;
      ring1.rotation.z += 0.0006;
      ring2.rotation.z -= 0.0004;

      controls.update();

      // Project surface coordinates to 2D screen positions
      const currentLandmarks = activePlanet === 'moon' ? LUNA_LANDMARKS : ARES_LANDMARKS;
      const nextPositions: Record<string, { x: number; y: number; visible: boolean }> = {};

      const currentWidth = container.clientWidth || 500;
      const currentHeight = container.clientHeight || 500;
      const halfWidth = currentWidth / 2;
      const halfHeight = currentHeight / 2;

      currentLandmarks.forEach((landmark) => {
        // Base local position on sphere
        const localPos = latLonToVector3(landmark.lat, landmark.lon, SPHERE_RADIUS);
        
        // Apply sphere's current rotation
        const worldPos = localPos.clone().applyEuler(sphere.rotation);
        
        // Visibility test: dot product with camera direction
        const cameraDir = camera.position.clone().sub(worldPos).normalize();
        const surfaceNormal = worldPos.clone().normalize();
        const dot = surfaceNormal.dot(cameraDir);
        const isVisible = dot > 0.08; // Only visible on front facing hemisphere

        // Project to NDC
        const projected = worldPos.clone().project(camera);

        // Convert NDC to screen pixel coordinates
        const screenX = projected.x * halfWidth + halfWidth;
        const screenY = -projected.y * halfHeight + halfHeight;

        nextPositions[landmark.id] = {
          x: screenX,
          y: screenY,
          visible: isVisible
        };
      });

      setPinPositions(nextPositions);

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      controls.dispose();
      renderer.dispose();
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [activePlanet]);

  // Update textures and shaders smoothly when switching between LUNA and ARES
  useEffect(() => {
    if (!materialRef.current || !atmosphereRef.current) return;

    const textureLoader = new THREE.TextureLoader();

    if (activePlanet === 'moon') {
      const map = textureLoader.load('/images/textures/moon_map.jpg');
      const bump = textureLoader.load('/images/textures/moon_bump.jpg');
      materialRef.current.map = map;
      materialRef.current.bumpMap = bump;
      materialRef.current.bumpScale = 0.04;
      materialRef.current.needsUpdate = true;

      atmosphereRef.current.uniforms.glowColor.value.setHex(0x38bdf8);

      if (ring1Ref.current) {
        (ring1Ref.current.material as THREE.MeshBasicMaterial).color.setHex(0x38bdf8);
      }
    } else {
      const map = textureLoader.load('/images/textures/mars_map.jpg');
      const bump = textureLoader.load('/images/textures/mars_bump.jpg');
      materialRef.current.map = map;
      materialRef.current.bumpMap = bump;
      materialRef.current.bumpScale = 0.045;
      materialRef.current.needsUpdate = true;

      atmosphereRef.current.uniforms.glowColor.value.setHex(0xf97316);

      if (ring1Ref.current) {
        (ring1Ref.current.material as THREE.MeshBasicMaterial).color.setHex(0xf59e0b);
      }
    }
  }, [activePlanet]);

  return (
    <div className="relative w-full h-[440px] sm:h-[500px] lg:h-[560px] flex items-center justify-center select-none font-sans">
      
      {/* Three.js WebGL Mount Target */}
      <div 
        ref={mountRef} 
        className="w-full h-full cursor-grab active:cursor-grabbing flex items-center justify-center relative z-0"
      />

      {/* SVG Leader Lines Connected Exactly to 3D Projected Crater Surface Points */}
      <svg 
        className="absolute inset-0 w-full h-full pointer-events-none z-10 overflow-visible"
        viewBox={`0 0 ${containerDimensions.width} ${containerDimensions.height}`}
      >
        {/* Leader Line to Tag 1 (Top Right) */}
        {landmarks[0] && pinPositions[landmarks[0].id]?.visible && (
          <g>
            {/* Pulsing Target Dot on 3D Surface */}
            <circle
              cx={pinPositions[landmarks[0].id].x}
              cy={pinPositions[landmarks[0].id].y}
              r="4"
              fill={landmarks[0].beaconColor}
              className="drop-shadow-[0_0_8px_rgba(0,207,255,0.9)]"
            />
            <circle
              cx={pinPositions[landmarks[0].id].x}
              cy={pinPositions[landmarks[0].id].y}
              r="9"
              fill="none"
              stroke={landmarks[0].beaconColor}
              strokeWidth="1.2"
              className="animate-ping opacity-75"
            />

            {/* Connecting Laser Leader Line to Top Right Glass Tag */}
            <line
              x1={pinPositions[landmarks[0].id].x}
              y1={pinPositions[landmarks[0].id].y}
              x2={pinPositions[landmarks[0].id].x + 45}
              y2={pinPositions[landmarks[0].id].y - 35}
              stroke={landmarks[0].accentColor}
              strokeWidth="1.2"
              strokeDasharray="3 3"
              opacity="0.85"
            />
            <circle
              cx={pinPositions[landmarks[0].id].x + 45}
              cy={pinPositions[landmarks[0].id].y - 35}
              r="2"
              fill={landmarks[0].accentColor}
            />
          </g>
        )}

        {/* Leader Line to Tag 2 (Bottom Left) */}
        {landmarks[1] && pinPositions[landmarks[1].id]?.visible && (
          <g>
            {/* Pulsing Target Dot on 3D Surface */}
            <circle
              cx={pinPositions[landmarks[1].id].x}
              cy={pinPositions[landmarks[1].id].y}
              r="4"
              fill={landmarks[1].beaconColor}
              className="drop-shadow-[0_0_8px_rgba(255,184,0,0.9)]"
            />
            <circle
              cx={pinPositions[landmarks[1].id].x}
              cy={pinPositions[landmarks[1].id].y}
              r="9"
              fill="none"
              stroke={landmarks[1].beaconColor}
              strokeWidth="1.2"
              className="animate-ping opacity-75"
            />

            {/* Connecting Laser Leader Line to Bottom Left Glass Tag */}
            <line
              x1={pinPositions[landmarks[1].id].x}
              y1={pinPositions[landmarks[1].id].y}
              x2={pinPositions[landmarks[1].id].x - 45}
              y2={pinPositions[landmarks[1].id].y + 35}
              stroke={landmarks[1].accentColor}
              strokeWidth="1.2"
              strokeDasharray="3 3"
              opacity="0.85"
            />
            <circle
              cx={pinPositions[landmarks[1].id].x - 45}
              cy={pinPositions[landmarks[1].id].y + 35}
              r="2"
              fill={landmarks[1].accentColor}
            />
          </g>
        )}
      </svg>

      {/* Floating Glass Telemetry Information Tag 1 (Top Right) */}
      <div 
        onClick={() => {
          museumAudio.playClick(950);
          if (onSelectSite) onSelectSite(landmarks[0]?.name || '');
        }}
        className="absolute top-3 sm:top-8 right-2 sm:right-4 bg-[#050812]/90 backdrop-blur-md px-4 py-2.5 rounded-2xl text-left font-mono text-[11px] border border-white/10 shadow-[0_15px_35px_rgba(0,0,0,0.9)] z-20 cursor-pointer hover:border-cyan-400/50 transition-all group hover:scale-105"
      >
        <div className="flex items-center gap-2 text-slate-400 text-[10px] uppercase tracking-wider">
          <span 
            className="w-2 h-2 rounded-full animate-pulse shadow-[0_0_8px_rgba(0,207,255,0.8)]"
            style={{ backgroundColor: landmarks[0]?.beaconColor }}
          />
          <span className="group-hover:text-cyan-300 transition-colors font-medium">{landmarks[0]?.name}</span>
        </div>
        <div className="text-white font-medium mt-1 text-xs truncate max-w-[190px]">
          {landmarks[0]?.hardware}
        </div>
        <div className="text-[10px] text-slate-400 font-mono mt-0.5">
          {landmarks[0]?.coordinatesDisplay}
        </div>
      </div>

      {/* Floating Glass Telemetry Information Tag 2 (Bottom Left) */}
      <div 
        onClick={() => {
          museumAudio.playClick(950);
          if (onSelectSite) onSelectSite(landmarks[1]?.name || '');
        }}
        className="absolute bottom-12 sm:bottom-16 left-2 sm:left-4 bg-[#050812]/90 backdrop-blur-md px-4 py-2.5 rounded-2xl text-left font-mono text-[11px] border border-white/10 shadow-[0_15px_35px_rgba(0,0,0,0.9)] z-20 cursor-pointer hover:border-amber-400/50 transition-all group hover:scale-105 hidden xs:block"
      >
        <div className="flex items-center gap-2 text-slate-400 text-[10px] uppercase tracking-wider">
          <span 
            className="w-2 h-2 rounded-full animate-pulse shadow-[0_0_8px_rgba(255,184,0,0.8)]"
            style={{ backgroundColor: landmarks[1]?.beaconColor }}
          />
          <span className="group-hover:text-amber-300 transition-colors font-medium">{landmarks[1]?.name}</span>
        </div>
        <div className="text-white font-medium mt-1 text-xs truncate max-w-[190px]">
          {landmarks[1]?.hardware}
        </div>
        <div className="text-[10px] text-slate-400 font-mono mt-0.5">
          {landmarks[1]?.coordinatesDisplay}
        </div>
      </div>

      {/* Interactive Floating Glass Celestial Planet Selector Widget (Bottom Center) */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 bg-[#050812]/92 backdrop-blur-xl p-1.5 rounded-full border border-white/10 flex items-center gap-1.5 z-30 shadow-[0_12px_30px_rgba(0,0,0,0.95)]">
        <button
          onClick={() => {
            museumAudio.playClick(900);
            onTogglePlanet('moon');
          }}
          className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-mono tracking-widest uppercase transition-all ${
            activePlanet === 'moon'
              ? 'bg-white/20 text-white font-bold border border-white/30 shadow-[0_0_15px_rgba(255,255,255,0.25)]'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <span className={`w-1.5 h-1.5 rounded-full ${activePlanet === 'moon' ? 'bg-cyan-400 shadow-[0_0_6px_rgba(56,189,248,0.8)]' : 'bg-slate-500'}`} />
          <span>LUNA</span>
        </button>

        <button
          onClick={() => {
            museumAudio.playClick(750);
            onTogglePlanet('mars');
          }}
          className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-mono tracking-widest uppercase transition-all ${
            activePlanet === 'mars'
              ? 'bg-amber-500/25 text-amber-300 font-bold border border-amber-400/50 shadow-[0_0_15px_rgba(245,158,11,0.4)]'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <span className={`w-1.5 h-1.5 rounded-full ${activePlanet === 'mars' ? 'bg-amber-400 shadow-[0_0_6px_rgba(245,158,11,0.8)]' : 'bg-slate-500'}`} />
          <span>ARES</span>
        </button>
      </div>

    </div>
  );
};
