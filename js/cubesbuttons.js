let sceneRotateX = -54.7;//0
let sceneRotateY = -50;//added for visual z axis alignment
let sceneRotateZ = -50;


function updateSceneTransform() {
  scene.style.transform =
    `rotateX(${sceneRotateX}deg) rotateY(${sceneRotateY}deg) rotateZ(${sceneRotateZ}deg)`;
}

const rx = document.getElementById('rx');
const ry = document.getElementById('ry');
const rz = document.getElementById('rz');

rx.addEventListener('input', () => {
  sceneRotateX = parseFloat(rx.value);
  updateSceneTransform();
});
ry.addEventListener('input', () => {
  sceneRotateY = parseFloat(ry.value);
  updateSceneTransform();
});


rz.addEventListener('input', () => {
  sceneRotateZ = parseFloat(rz.value);
  updateSceneTransform();
});

const pauseCubes = document.getElementById('pause-or-rotate-cubes-btn');

let isPaused = false;

pauseCubes.textContent = 'Pause';


function pauseRotateButton(){
  pauseCubes.addEventListener('click', () => {
  isPaused = !isPaused;

  scene.querySelectorAll('.cube').forEach(el => {
    if (isPaused) {
      el.classList.remove('rotating');
      pauseCubes.textContent = 'Rotate';
      pauseCubes.classList.toggle('pause-cubes-btn', isPaused);

} else {
      el.classList.add('rotating');
      pauseCubes.textContent = 'Pause';
      pauseCubes.classList.toggle('pause-cubes-btn', isPaused);
}
  });
});
}

pauseRotateButton();


const eachcube = document.querySelectorAll('.cube');
const sectioncubes = document.querySelector('.cubes-section');


function stopCubes() {
  eachcube.forEach(cube => cube.classList.remove('rotating'));
}

function startCubes() {
  eachcube.forEach(cube => cube.classList.add('rotating'));
}
function pauseCubesWhenLeave() {
  eachcube.forEach(cube => {
    sectioncubes.addEventListener('mouseenter', () => {
if (!isPaused) {
      startCubes();
    }
      
    });
    sectioncubes.addEventListener('mouseleave', () => {
      stopCubes();
    });
  
    sectioncubes.addEventListener('focus', () => {
      startCubes();
    });
    sectioncubes.addEventListener('blur', () => {
      stopCubes();
    });
  
  });
}


pauseCubesWhenLeave(isPaused);

let isDragging = false;
let lastX = 0;
let lastY = 0;
scene.addEventListener('mousedown', e => {
  isDragging = true;
  lastX = e.clientX;
  lastY = e.clientY;
});

window.addEventListener('mousemove', e => {
  if (!isDragging) return;

  const deltaX = e.clientX - lastX;
  const deltaY = e.clientY - lastY;

  sceneRotateY += deltaX * 0.5;
  sceneRotateX -= deltaY * 0.5;

  lastX = e.clientX;
  lastY = e.clientY;

  updateSceneTransform();
});

window.addEventListener('mouseup', () => {
  isDragging = false;
});

scene.addEventListener('touchstart', e => {
  isDragging = true;
  lastX = e.touches[0].clientX;
  lastY = e.touches[0].clientY;
});

scene.addEventListener('touchmove', e => {
  if (!isDragging) return;
  const deltaX = e.touches[0].clientX - lastX;
  const deltaY = e.touches[0].clientY - lastY;

  sceneRotateY += deltaX * 0.5;
  sceneRotateX -= deltaY * 0.5;

  lastX = e.touches[0].clientX;
  lastY = e.touches[0].clientY;

  updateSceneTransform();
});

scene.addEventListener('touchend', () => {
  isDragging = false;
});