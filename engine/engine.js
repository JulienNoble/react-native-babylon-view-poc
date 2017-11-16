// check if we're on iOS
const userAgent = window.navigator.userAgent.toLowerCase(),
  ios = /iphone|ipod|ipad/.test(userAgent);

// "helper" function to help you get stuff back to the app
const sendMessage = message => {
  if (window.webkit.messageHandlers.reactNative.postMessage) {
    // iOS
    window.webkit.messageHandlers.reactNative.postMessage(message);
  } else {
    // Windows (and probably Android too)
    window.postMessage(JSON.stringify(message));
  }
};

// helper log function
const log = (message, type) => {
  if (ios)
    sendMessage({
      message: `[BabylonView] ${message}`,
      type,
    });
};

// replacing console.log and error event to redirect their outputs to the app
console.log = (...args) => {
  for (let i = 0; i < args.length; i++) {
    log(`[window] ${args[i]}`, 'info');
  }
};

window.onerror = (message, url, linenumber) => {
  log(`JavaScript error: ${message} on line ${linenumber} for ${url}`, 'error');
};

// Babylon
const canvas = document.getElementById('renderCanvas');
const engine = new BABYLON.Engine(canvas);

const setup = () => {
  const scene = new BABYLON.Scene(engine);

  const camera = new BABYLON.ArcRotateCamera(
    'Camera',
    Math.PI,
    Math.PI / 4,
    10,
    BABYLON.Vector3.Zero(),
    scene,
  );
  camera.attachControl(canvas, true);

  const light = new BABYLON.HemisphericLight(
    'light',
    new BABYLON.Vector3(0, 1, 1),
    scene,
  );

  const box = BABYLON.MeshBuilder.CreateBox('box', {}, scene);

  return scene;
};

const scene = setup();

engine.runRenderLoop(() => {
  scene.render();
});

window.addEventListener('resize', () => {
  engine.resize();
});
