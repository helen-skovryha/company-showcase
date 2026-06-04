const scene = document.querySelector('.scene');
const cube1 = document.querySelector('.cube1');
const cube2 = document.querySelector('.cube2');
const cube3 = document.querySelector('.cube3');
const cube4 = document.querySelector('.cube4');
const cube5 = document.querySelector('.cube5');
const cube6 = document.querySelector('.cube6');
const cube7 = document.querySelector('.cube7');
const cube8 = document.querySelector('.cube8');

let FrontSideFrozen = null;
let frozenClone = null;


function createFrozenClone(cube) {
  const clone = cube.cloneNode(true);

  clone.style.animation = 'none';

  const computedStyle = getComputedStyle(cube);
  const pausedTransform = computedStyle.transform
  clone.style.transform = pausedTransform;

  return clone;
}


let activeHover = null;
function mouseEnterForSides({ cube, sideIndex }) {
  const side = cube.querySelector(`.cube__side:nth-child(${sideIndex})`);

  side.addEventListener('mouseenter', () => {
    if (activeHover) return;

    const frozenClone = createFrozenClone(cube);
    const frozenSide = frozenClone.querySelector(
      `.cube__side:nth-child(${sideIndex})`
    );

    document.dispatchEvent(
    new CustomEvent('frozen-side-created', {
    detail: { frozenSide }
    })
    );

    const baseTransform = getComputedStyle(side).transform;
    const baseColor = getComputedStyle(side).backgroundColor;
    const baseFilter = getComputedStyle(side).filter;

    frozenSide.style.transform = baseTransform;
    frozenSide.style.transformOrigin = '50% 50% 0%';
    frozenSide.style.transition = 'transform 1s ease, background-color 1s ease, filter 1s ease';
    frozenSide.style.willChange = 'transform';

    cube.style.visibility = 'hidden';
    cube.parentNode.appendChild(frozenClone);
    void frozenClone.offsetWidth;

    frozenSide.style.backgroundColor = 'hsl(var(--c-clr-surface-elevated) / 0.8)';//'hsl(225 70% 40% / 0.8)';
    frozenSide.style.filter =
      'drop-shadow(0px 0px 8px hsl(var(--clr-yellow-300)))';

    const isFrontSide = sideIndex === 1;

    frozenSide.style.transform = isFrontSide
    ? `translateZ(100px) scale(2.07)`
    : `${baseTransform} translateX(50%) translateY(50%) translateZ(100px) scale(2.07)`;
    
    activeHover = {
      cube,
      side,
      frozenClone,
      frozenSide,
      baseTransform,
      baseColor,baseFilter
    };
  });
};


scene.addEventListener('mouseleave', () => {
  if (!activeHover) return;

  const {
    cube,
    frozenClone,
    frozenSide,
    baseTransform,
    baseColor,
    baseFilter
  } = activeHover;

  frozenSide.style.transform = baseTransform;
 
  frozenSide.style.backgroundColor = baseColor;
  frozenSide.style.filter = baseFilter;

  setTimeout(() => {
    frozenClone.remove();
    cube.style.visibility = 'visible';
    activeHover = null;
  }, 500);
});

const cubes = [cube1, cube2, cube3, cube4, cube5, cube6, cube7, cube8];
const sides = [1, 3, 4];

cubes.forEach(cube => {
  sides.forEach(sideIndex => {
    mouseEnterForSides({ cube, sideIndex });
  });
});

