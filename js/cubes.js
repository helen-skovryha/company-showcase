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

let currentSide;//  for making side visible globally
let frozenSideForGlobalScope;

function mouseEnterForSides({ cube, sideIndex }) {
  const side = cube.querySelector(`.cube__side:nth-child(${sideIndex})`);

  function handlerForSidesOnEvent(e) {
       if (activeHover) return;

    const frozenClone = createFrozenClone(cube);
    const frozenSide = frozenClone.querySelector(
      `.cube__side:nth-child(${sideIndex})`
    );
    frozenSideForGlobalScope = frozenSide;
    
    frozenSide.addEventListener('focusout', e => {
      if (!frozenSide.contains(e.relatedTarget)) {
    
      requestAnimationFrame(() => {

       const allSides = [
         ...document.querySelectorAll('.cube__side')
         ];
       const currentIndex = allSides.indexOf(currentSide);
       const nextSide = allSides[currentIndex + 1];
   
       setTimeout(() => {
          handlerForSidesWhenLeave();
          setTimeout(() => {
            if (openingModal) {
              openingModal = false;
              return;
            }   
            nextSide?.focus();
           
          }, 550);//sets focus after transition is finished and clone deleted (original cube is hidden, so its sides are hidden, nextside is null, focus falls to body)
       }, 0);
      });
        
      }
    });

    document.dispatchEvent(//for modal
       new CustomEvent('frozen-side-created', {
         detail: { frozenSide }
       })
    );

    currentSide = cube.querySelector(`.cube__side:nth-child(${sideIndex})`);//  for making side visible globally, to target not cloned cube-side-btn-open

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

    frozenSide.style.backgroundColor = 'hsl(var(--c-clr-surface-elevated) / 0.8)';
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
  };
  
  side.addEventListener('mouseenter', handlerForSidesOnEvent);
  side.addEventListener('keydown', e => {
    if (e.key === 'Enter' || e.keyCode === 32) {
      handlerForSidesOnEvent();
      frozenSideForGlobalScope.querySelector('.modal-cube-side-btn-open').focus();
    };
  });
};

function handlerForSidesWhenLeave(e) {
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
}

scene.addEventListener('mouseleave', handlerForSidesWhenLeave);


const cubes = [cube1, cube2, cube3, cube4, cube5, cube6, cube7, cube8];
const sides = [1, 3, 4];

cubes.forEach(cube => {
  sides.forEach(sideIndex => {
    mouseEnterForSides({ cube, sideIndex });
  });
});

    