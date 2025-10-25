import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import SignUpForm from '../../components/auth/SignUpForm';
import * as THREE from 'three';
import {
  EffectComposer,
  RenderPass,
  EffectPass,
  BloomEffect,
  BlendFunction,
  KernelSize
} from 'postprocessing';
import gsap from 'gsap';

const AuroraScene = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    let scene, camera, renderer, composer;
    const cloudParticles = [];

    const mount = mountRef.current;

    try {
      scene = new THREE.Scene();
      camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 1000);
      camera.position.z = 1;
      camera.rotation.set(1.16, -0.12, 0.27);

      scene.fog = new THREE.FogExp2(0x000000, 0.001);

      const ambient = new THREE.AmbientLight(0x555555);
      scene.add(ambient);

      const directionalLight = new THREE.DirectionalLight(0xffffff);
      directionalLight.position.set(0, 0, 1);
      scene.add(directionalLight);

      const lights = [
        new THREE.HemisphereLight(0xcc6600, 50, 1.7),
        new THREE.HemisphereLight(0x90ee90, 50, 1.7),
        new THREE.HemisphereLight(0x3677ac, 50, 1.7)
      ];

      lights[0].position.set(200, 300, 100);
      lights[1].position.set(100, 300, 100);
      lights[2].position.set(300, 300, 200);

      lights.forEach(light => {
        light.intensity = 0;
        scene.add(light);
      });

      let currentLightIndex = 0;
      const cycleLights = () => {
        const prevIndex = (currentLightIndex + lights.length - 1) % lights.length;
        gsap.to(lights[prevIndex], { intensity: 0, duration: 5 });
        gsap.to(lights[currentLightIndex], { intensity: 1.7, duration: 5 });
        currentLightIndex = (currentLightIndex + 1) % lights.length;
        setTimeout(cycleLights, 5000);
      };
      cycleLights();

      renderer = new THREE.WebGLRenderer({ antialias: true });
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setClearColor(scene.fog.color);
      mount.appendChild(renderer.domElement);

      const loader = new THREE.TextureLoader();
      loader.load('https://raw.githubusercontent.com/navin-navi/codepen-assets/master/images/smoke.png', (texture) => {
        const cloudGeo = new THREE.PlaneGeometry(500, 500);
        const cloudMaterial = new THREE.MeshLambertMaterial({
          map: texture,
          transparent: true
        });

        for (let p = 0; p < 50; p++) {
          const cloud = new THREE.Mesh(cloudGeo, cloudMaterial);
          cloud.position.set(Math.random() * 800 - 400, 500, Math.random() * 500 - 500);
          cloud.rotation.set(1.16, -0.12, Math.random() * 2 * Math.PI);
          cloud.material.opacity = 0.55;
          cloudParticles.push(cloud);
          scene.add(cloud);
        }
      });

      const bloomEffect = new BloomEffect({
        blendFunction: BlendFunction.COLOR_DODGE,
        kernelSize: KernelSize.SMALL,
        useLuminanceFilter: true,
        luminanceThreshold: 0.3,
        luminanceSmoothing: 0.75
      });
      bloomEffect.blendMode.opacity.value = 1.5;

      const effectPass = new EffectPass(camera, bloomEffect);
      effectPass.renderToScreen = true;

      composer = new EffectComposer(renderer);
      composer.addPass(new RenderPass(scene, camera));
      composer.addPass(effectPass);

      const render = () => {
        cloudParticles.forEach(p => {
          p.rotation.z -= 0.001;
        });
        composer.render(0.1);
        requestAnimationFrame(render);
      };
      render();
    } catch (error) {
      console.error("WebGL init error:", error);
    }

    return () => {
      if (renderer && renderer.domElement) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div ref={mountRef} className="fixed inset-0 z-0" />;
};

const SignUpPage = () => {
  return (
    <div className="relative min-h-screen ">
      <AuroraScene />

      <div className="relative z-10 min-h-screen flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="mt-[-80px] sm:mx-auto sm:w-full sm:max-w-md shadow-md">
  
          <div className="bg-[rgba(8,8,8,0.7)] shadow-[1px_1px_20px_rgba(0,0,0,0.5)] py-8 px-4 sm:rounded-lg sm:px-10">
            <SignUpForm />

            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300" />
                </div>
				<br />
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 pt-6 text-gray-300">Already a user?</span>
                </div>
              </div>
              <div className="mt-6">
                <Link
                  to="/login"
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-blue-600 bg-white hover:bg-gray-50"
                >
                  Log in
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
