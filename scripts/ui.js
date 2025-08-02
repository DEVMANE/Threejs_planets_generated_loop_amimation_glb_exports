import * as THREE from 'three';
import { GUI } from 'three/addons/libs/lil-gui.module.min.js';

function randomInRange(min, max) {
  return Math.random() * (max - min) + min;
}

const presets = {
  'Star': {
    radius: [25, 40],
    type: [3],
    rotationSpeed: [0.15, 0.3],
    amplitude: [2, 2],
    sharpness: [10, 10],
    period: [0, 0],
    octaves: [16, 16],
    colors: [
        { r: 1, g: 0.9, b: 0.4 }, { r: 1, g: 0.5, b: 0.2 }, { r: 1, g: 0.2, b: 0 },
        { r: 0.9, g: 0.1, b: 0 }, { r: 0.7, g: 0, b: 0 }, { r: 0.0, g: 0.2, b: 1 }
    ],
    bloom: { threshold: [0, 0], strength: [1, 1], radius: [0, 0] },
    lighting: { ambient: [0.398, 0.5], diffuse: [0, 2], specular: [1, 1], shininess: [0, 0] },
    bump: { strength: [2, 2], offset: [0, 0] },
    liquid: { waveStrength: [1, 1], specularIntensity: [5, 5], shininess: [0, 0] }
  },
  'Neutron Star': {
    radius: [5, 15],
    type: [1],
    rotationSpeed: [30, 500],
    amplitude: [0.1, 0.2],
    sharpness: [1.0, 2.5],
    period: [0.4, 0.8],
    octaves: [2, 4],
    colors: [
        { r: 0.8, g: 0.9, b: 1 }, { r: 0.9, g: 1, b: 1 }, { r: 1, g: 1, b: 1 },
        { r: 0.9, g: 0.9, b: 1 }, { r: 0.8, g: 0.8, b: 1 }
    ],
    bloom: { threshold: [0.8, 1], strength: [1.0, 1.5], radius: [1.3, 1.6] },
    lighting: { specular: [0.2, 0.4], shininess: [5, 10] },
    bump: { strength: [0.0, 0.1], offset: [0.001, 0.002] }
  },
  'Asteroid': {
    radius: [5, 12],
    type: [2],
    amplitude: [1, 1.01],
    sharpness: [0.18, 0.19],
    period: [0.32, 0.8],
    octaves: 16,
    offset: 2,
    Persistence: [0.475, 0.6],
    lacunarity: 3,
    colors: [
        { r: 0.5, g: 0.45, b: 0.4 }, { r: 0.6, g: 0.55, b: 0.5 }, { r: 0.7, g: 0.65, b: 0.6 },
        { r: 0.55, g: 0.5, b: 0.45 }, { r: 0.45, g: 0.4, b: 0.35 }
    ],
    bloom: { threshold: [0, 0.1], strength: [0.1, 0.2], radius: [0.1, 0.2] },
    lighting: { ambient: [0.0062, 0.01], diffuse: [1,1.0001] ,specular: [0.2, 0.5], shininess: [2, 8] },
    bump: { strength: [1.8, 2], offset: [0.001, 0.008] }
  },
  'Shooting Star (Comet)': {
      radius: [6, 9],
      type: [1],
      amplitude: [0.2, 0.4],
      sharpness: [1.5, 3.0],
      period: [0.9, 1.8],
      octaves: [4, 7],
      colors: [
          { r: 0.7, g: 0.8, b: 1.0 }, { r: 0.8, g: 0.9, b: 1.0 }, { r: 0.9, g: 0.95, b: 1.0 },
          { r: 1.0, g: 1.0, b: 1.0 }, { r: 0.9, g: 0.9, b: 0.9 }
      ],
      bloom: { threshold: [0.7, 0.9], strength: [0.8, 1.2], radius: [1.0, 1.3] },
      lighting: { specular: [0.8, 1.8], shininess: [10, 20] },
      bump: { strength: [0.2, 0.4], offset: [0.001, 0.005] }
  },
  'Moon': {
      radius: [8, 12],
      type: [3],
      amplitude: [0.3, 0.6],
      sharpness: [2.0, 4.0],
      period: [0.4, 0.8],
      octaves: [7, 9],
      colors: [
          { r: 0.6, g: 0.6, b: 0.6 }, { r: 0.7, g: 0.7, b: 0.7 }, { r: 0.8, g: 0.8, b: 0.8 },
          { r: 0.75, g: 0.75, b: 0.75 }, { r: 0.65, g: 0.65, b: 0.65 }
      ],
      bloom: { threshold: [0.1, 0.2], strength: [0.15, 0.25], radius: [0.2, 0.3] },
    lighting: { specular: [0.3, 0.6], shininess: [3, 9] },
    bump: { strength: [0.4, 0.7], offset: [0.001, 0.006] }
  },
  'Rocky Planet': {
    radius: [15, 22],
    type: [2, 3],
    amplitude: [0.6, 1.1],
    sharpness: [0.1, 1.0],
    period: [0.768, 1.1],
    octaves: [7, 10],
    colors: [
      { r: 0.2, g: 0.1, b: 0.1 }, 
      { r: 0.3, g: 0.2, b: 0.2 }, 
      { r: 0.5, g: 0.4, b: 0.3 }, 
      { r: 0.1, g: 0.3, b: 0.2 }, 
      { r: 0.2, g: 0.4, b: 0.3 }
    ],
    bloom: { threshold: [0.1, 0.2], strength: [0.2, 0.3], radius: [0.4, 0.5] },
    lighting: { specular: [0.0, 0.0], shininess: [50, 50] },
    bump: { strength: [0.3, 0.6], offset: [0.001, 0.005] },
    rotationSpeed: [0.042, 0.25]
  },
  'Liquid Planet': {
    radius: [15, 22],
    type: [2, 3],
    amplitude: [0.6, 1.1],
    sharpness: [1.5, 3.5],
    period: [0.5, 1.1],
    octaves: [7, 10],
    colors: [
      { r: 0.0, g: 0.1, b: 0.8 }, 
      { r: 0.1, g: 0.8, b: 0.2 }, 
      { r: 0.8, g: 0.2, b: 0.1 }, 
      { r: 0.2, g: 0.8, b: 0.8 }, 
      { r: 0.8, g: 0.2, b: 0.8 }
    ],
    bloom: { threshold: [0.1, 0.2], strength: [0.2, 0.3], radius: [0.4, 0.5] },
    lighting: { specular: [0.5, 1.5], shininess: [5, 15] },
    bump: { strength: [0.3, 0.6], offset: [0.001, 0.005] },
    liquid: { waveStrength: [0.1, 0.3], specularIntensity: [1.0, 2.0], shininess: [20, 40] }
  },
  'Aquaplanet': {
    radius: [18, 25],
    type: [1, 2],
    amplitude: [0.2, 0.4],
    sharpness: [0.8, 2.2],
    period: [0.9, 1.6],
    octaves: [5, 8],
    colors: [
      { r: 0.0, g: 0.1, b: 0.3 }, { r: 0.1, g: 0.5, b: 0.2 }, { r: 0.5, g: 0.2, b: 0.8 },
      { r: 0.8, g: 0.1, b: 0.2 }, { r: 0.2, g: 0.9, b: 0.9 }
    ],
    bloom: { threshold: [0.2, 0.3], strength: [0.3, 0.4], radius: [0.4, 0.6] },
    lighting: { specular: [1.0, 2.5], shininess: [15, 25] },
    bump: { strength: [0.1, 0.3], offset: [0.001, 0.004] }
  },
  'Gas Planet': {
      radius: [30, 50],
      type: [1],
      amplitude: [0.1, 0.3],
      sharpness: [1.0, 2.0],
      period: [1.2, 2.0],
      octaves: [3, 5],
      colors: [
          { r: 0.8, g: 0.7, b: 0.6 }, { r: 0.6, g: 0.5, b: 0.4 }, { r: 0.9, g: 0.8, b: 0.7 },
          { r: 0.7, g: 0.6, b: 0.5 }, { r: 0.85, g: 0.75, b: 0.65 }
      ],
      bloom: { threshold: [0.1, 0.2], strength: [0.2, 0.3], radius: [0.5, 0.7] },
      lighting: { specular: [0.1, 0.3], shininess: [2, 8] },
      bump: { strength: [0.0, 0.1], offset: [0.001, 0.003] }
  },
};

export default function createUI(planetParams, atmosphereParams, atmosphere, bloomPass, planet) {
  const gui = new GUI();
  gui.title("Celestial Controls");

  const celestialState = {
    objectType: 'Star' // Default to Star
  };

  const randomize = () => {
    planet.visible = true;

    const objectType = celestialState.objectType;
    const preset = presets[objectType];
    if (!preset) return;

    planetParams.radius.value = randomInRange(...preset.radius);
    atmosphereParams.radius.value = planetParams.radius.value;

    const typeIndex = Math.floor(Math.random() * preset.type.length);
    planetParams.type.value = preset.type[typeIndex];
    
    // Set default terrain parameters
    planetParams.amplitude.value = randomInRange(...preset.amplitude);
    planetParams.sharpness.value = randomInRange(...preset.sharpness);
    planetParams.period.value = randomInRange(...preset.period);
    planetParams.octaves.value = Math.floor(
      Array.isArray(preset.octaves)
        ? randomInRange(...preset.octaves)
        : randomInRange(preset.octaves, preset.octaves)
    );
    planetParams.offset.value = randomInRange(-1, 1);
    planetParams.persistence.value = randomInRange(0.4, 0.6);
    planetParams.lacunarity.value = randomInRange(1.8, 2.2);

    // Apply specific constraints for Rocky Planet
    if (objectType === 'Rocky Planet') {
      planetParams.lacunarity.value = 3.0;
      if (planetParams.type.value === 2) {
        planetParams.amplitude.value = randomInRange(0.918, 1.2);
        planetParams.sharpness.value = randomInRange(2.12, 2.64);
        planetParams.period.value = randomInRange(0.684, 1.2);
        planetParams.liquidShininess.value = 100;
        planetParams.octaves.value = 16;
        planetParams.offset.value = randomInRange(-0.222, 2.0);
        planetParams.persistence.value = randomInRange(0.366, 0.459);
      } else if (planetParams.type.value === 3) {
        planetParams.amplitude.value = randomInRange(1.2, 1.5);
        planetParams.sharpness.value = randomInRange(3.0, 5.0);
        planetParams.offset.value = randomInRange(0.333, 2.0);
        planetParams.persistence.value = randomInRange(0.4, 0.44);
      }
    }

    // Apply specific constraints for Star
    if (objectType === 'Star') {
      planetParams.liquidWaveStrength.value = 1.0;
      planetParams.liquidSpecularIntensity.value = 5.0;
      planetParams.liquidShininess.value = 0.0;
      planetParams.amplitude.value = 2.0;
      planetParams.sharpness.value = 10.0;
      planetParams.period.value = 0.0;
      planetParams.octaves.value = 16;
      planetParams.offset.value = randomInRange(-1, 2);
      planetParams.persistence.value = 0.0;
      planetParams.lacunarity.value = 1.0;
      planetParams.ambientIntensity.value = randomInRange(0.346, 0.5);
      planetParams.diffuseIntensity.value = randomInRange(0, 2);
      planetParams.specularIntensity.value = 1.0;
      planetParams.shininess.value = 0.0;
      planetParams.bumpStrength.value = 2.0;
      planetParams.bumpOffset.value = 0.0;
      atmosphereParams.opacity.value = 1.0;
      bloomPass.threshold = 0.0;
      bloomPass.strength = 1.0;
      bloomPass.radius = 0.0;
    }

    
    
    for (let i = 0; i < 5; i++) {
      const colorPreset = preset.colors[Math.floor(Math.random() * preset.colors.length)];
      const colorParam = planetParams[`color${i+1}`].value;
      colorParam.setRGB(
        Math.max(0, Math.min(1, colorPreset.r + randomInRange(-0.2, 0.2))),
        Math.max(0, Math.min(1, colorPreset.g + randomInRange(-0.2, 0.2))),
        Math.max(0, Math.min(1, colorPreset.b + randomInRange(-0.2, 0.2)))
      );
    }

    if (objectType !== 'Star') {
      bloomPass.threshold = randomInRange(...preset.bloom.threshold);
      bloomPass.strength = randomInRange(...preset.bloom.strength);
      bloomPass.radius = randomInRange(...preset.bloom.radius);

      const lighting = preset.lighting;
      planetParams.ambientIntensity.value = 0.062;
      planetParams.diffuseIntensity.value = 1.0;
      planetParams.specularIntensity.value = randomInRange(...lighting.specular);
      planetParams.shininess.value = randomInRange(...lighting.shininess);

      if (preset.bump) {
        planetParams.bumpStrength.value = randomInRange(...preset.bump.strength);
        planetParams.bumpOffset.value = randomInRange(...preset.bump.offset);
      }
      
      if (preset.liquid) {
        planetParams.liquidWaveStrength.value = randomInRange(...preset.liquid.waveStrength);
        planetParams.liquidSpecularIntensity.value = randomInRange(...preset.liquid.specularIntensity);
        planetParams.liquidShininess.value = randomInRange(...preset.liquid.shininess);
      }
    }

    if (preset.rotationSpeed) {
      const rotationSpeed = randomInRange(...preset.rotationSpeed);
      planetParams.rotationSpeed.value = rotationSpeed;
      atmosphereParams.rotationSpeed.value = rotationSpeed;
    } else {
      planetParams.rotationSpeed.value = randomInRange(0, 0.5);
      atmosphereParams.rotationSpeed.value = randomInRange(0, 0.5);
    }

    const transitions = [randomInRange(0,3), randomInRange(0,3), randomInRange(0,3), randomInRange(0,3)];
    transitions.sort((a,b) => a-b);
    planetParams.transition2.value = transitions[0];
    planetParams.transition3.value = transitions[1];
    planetParams.transition4.value = transitions[2];
    planetParams.transition5.value = transitions[3];
    
    planetParams.blend12.value = randomInRange(0.1, 0.3);
    planetParams.blend23.value = randomInRange(0.1, 0.3);
    planetParams.blend34.value = randomInRange(0.1, 0.3);
    planetParams.blend45.value = randomInRange(0.1, 0.3);
    
    // Apply specific constraints for Neutron Star
    if (objectType === 'Neutron Star') {
      planetParams.liquidWaveStrength.value = 1.0;
      planetParams.liquidSpecularIntensity.value = 5.0;
      planetParams.liquidShininess.value = 0.0;
      planetParams.amplitude.value = 0;
      planetParams.sharpness.value = 0;
      planetParams.period.value = 0.0;
      planetParams.octaves.value = 16;
      planetParams.offset.value = 2;
      planetParams.persistence.value = 1;
      planetParams.lacunarity.value = 3;
      planetParams.ambientIntensity.value = randomInRange(0, 2);
      planetParams.diffuseIntensity.value = randomInRange(1, 2);
      planetParams.specularIntensity.value = 2;
      planetParams.shininess.value = 0.0;
      planetParams.bumpStrength.value = 0.371;
      planetParams.bumpOffset.value = 0.0;
      atmosphereParams.opacity.value = randomInRange(0, 1);
      bloomPass.threshold = 0.0;
      bloomPass.strength =randomInRange(0.5, 1);
      bloomPass.radius = 0.0;
    }

    if (objectType === 'Asteroid' || objectType === 'Moon') {
      atmosphere.visible = false;
    } else {
      atmosphere.visible = true;
      atmosphereParams.opacity.value = randomInRange(0.3, 0.6);
      atmosphereParams.color.value = new THREE.Color(Math.random(), Math.random(), Math.random());
    }

    gui.controllersRecursive().forEach(c => c.updateDisplay());
    atmosphere.update();
  };

  gui.add(celestialState, 'objectType', Object.keys(presets)).name('Celestial Object').onChange(randomize);

  const planetFolder = gui.addFolder('Planet');
  planetFolder.add(planetParams.radius, 'value', 1, 50).name('Radius').onChange(() => {
    atmosphereParams.radius.value = planetParams.radius.value;
    atmosphere.update();
  });
  planetFolder.add(planetParams.type, 'value', { 'Type 1': 1, 'Type 2': 2, 'Type 3': 3 }).name('Type');

  const planetRotationFolder = planetFolder.addFolder('Rotation');
  planetRotationFolder.add(planetParams.rotationSpeed, 'value', 0, 500).name('Speed');
  planetRotationFolder.add(planetParams.rotationDirection, 'value', { X: 'x', Y: 'y', Z: 'z' }).name('Direction');

  const liquidLayerFolder = gui.addFolder('Liquid Layer');
  liquidLayerFolder.add(planetParams.liquidWaveStrength, 'value', 0, 1).name('Wave Strength');
  liquidLayerFolder.add(planetParams.liquidSpecularIntensity, 'value', 0, 5).name('Specular Intensity');
  liquidLayerFolder.add(planetParams.liquidShininess, 'value', 0, 100).name('Shininess');

  const terrainFolder = gui.addFolder('Terrain');
  terrainFolder.add(planetParams.amplitude, 'value', 0, 2).name('Amplitude');
  terrainFolder.add(planetParams.sharpness, 'value', 0, 10).name('Sharpness');
  terrainFolder.add(planetParams.period, 'value', 0, 2).name('Period');
  terrainFolder.add(planetParams.octaves, 'value', 1, 16).name('Octaves');
  terrainFolder.add(planetParams.offset, 'value', -1, 2).name('Offset');
  terrainFolder.add(planetParams.persistence, 'value', 0, 1).name('Persistence');
  terrainFolder.add(planetParams.lacunarity, 'value', 1, 3).name('Lacunarity');

  const colorFolder = gui.addFolder('Colors');
  colorFolder.addColor(planetParams.color1, 'value').name('Color 1');
  colorFolder.addColor(planetParams.color2, 'value').name('Color 2');
  colorFolder.addColor(planetParams.color3, 'value').name('Color 3');
  colorFolder.addColor(planetParams.color4, 'value').name('Color 4');
  colorFolder.addColor(planetParams.color5, 'value').name('Color 5');

  const transitionFolder = gui.addFolder('Transitions');
  transitionFolder.add(planetParams.transition2, 'value', 0, 3).name('Transition 2');
  transitionFolder.add(planetParams.transition3, 'value', 0, 3).name('Transition 3');
  transitionFolder.add(planetParams.transition4, 'value', 0, 3).name('Transition 4');
  transitionFolder.add(planetParams.transition5, 'value', 0, 3).name('Transition 5');
  transitionFolder.add(planetParams.blend12, 'value', 0, 1).name('Blend 1-2');
  transitionFolder.add(planetParams.blend23, 'value', 0, 1).name('Blend 2-3');
  transitionFolder.add(planetParams.blend34, 'value', 0, 1).name('Blend 3-4');
  transitionFolder.add(planetParams.blend45, 'value', 0, 1).name('Blend 4-5');

  const lightingFolder = gui.addFolder('Lighting');
  lightingFolder.add(planetParams.ambientIntensity, 'value', 0, 2).name('Ambient');
  lightingFolder.add(planetParams.diffuseIntensity, 'value', 0, 2).name('Diffuse');
  lightingFolder.add(planetParams.specularIntensity, 'value', 0, 2).name('Specular');
  lightingFolder.add(planetParams.shininess, 'value', 0, 50).name('Shininess');

  const bumpFolder = gui.addFolder('Bump');
  bumpFolder.add(planetParams.bumpStrength, 'value', 0, 2).name('Strength');
  bumpFolder.add(planetParams.bumpOffset, 'value', 0, 0.01).name('Offset');

  const atmosphereFolder = gui.addFolder('Atmosphere');
  atmosphereFolder.add(atmosphereParams.opacity, 'value', 0, 1).name('Opacity');
  atmosphereFolder.addColor(atmosphereParams.color, 'value').name('Color');
  
  const atmosphereRotationFolder = atmosphereFolder.addFolder('Rotation');
  atmosphereRotationFolder.add(atmosphereParams.rotationSpeed, 'value', 0, 500).name('Speed');
  atmosphereRotationFolder.add(atmosphereParams.rotationDirection, 'value', { X: 'x', Y: 'y', Z: 'z' }).name('Direction');

  const bloomFolder = gui.addFolder('Bloom');
  bloomFolder.add(bloomPass, 'threshold', 0, 1).name('Threshold');
  bloomFolder.add(bloomPass, 'strength', 0, 2).name('Strength');
  bloomFolder.add(bloomPass, 'radius', 0, 2).name('Radius');

  const randomnessButton = gui.add({ randomize: randomize }, 'randomize').name('Generate');
  randomnessButton.domElement.parentElement.parentElement.classList.add('cyber-button-container');

  // Initial generation on load
  randomize();
    
}