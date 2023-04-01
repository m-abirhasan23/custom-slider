const slide = document.querySelector('.slide')
const root = document.querySelector(":root")
let slideIndex = 1;
let isMoving = false;
// process images 
function processImages(item) {
  return `<img src="${item.image}" alt="${item.alt}"/>`

}

// move slide 
function moveSlide() {
  slide.style.transform = `translateX(-${slideIndex * 100}%)`;
  const slideArray = [ ...slide.querySelectorAll('img') ];
  root.style.setProperty('--side-progress', `${(100 / (slideArray.length - 3)) * (slideIndex - 1)}%`)

}

// move when clicked 

function moveHandler(direction) {
  isMoving = true
  slide.style.transition = `transform 400ms ease-in-out`
  direction !== 'right' ? (slideIndex -= 1) : (slideIndex += 1)
  moveSlide()
}

// keyboard arrow handler 
window.addEventListener("keyup", e => {
  if (isMoving) return;
  switch (e.key) {
    case 'ArrowLeft':
      moveHandler()
      break;
    case 'ArrowRight':
      moveHandler('right')
      break;
    default:
      break;
  }
})
// fetch images 
async function fetchImages() {
  await fetch('sliderData.json')
    .then((res) => {
      if (!res.ok) {
        throw new Error('Network is not okay')
      }
      return res.json();
    })
    .then((data) => {
      // clone 1st & last image 
      data.push(data[ 0 ]);
      data.unshift(data[ data.length - 2 ])
      console.log(data);
      // show slider 
      slide.innerHTML = data.map(processImages).join('')
      moveSlide()
    })

    .catch((e) => {
      console.error('There has been a problem with your fetch operation:', e);
    })
}


fetchImages()




// event handlers 

const btnRight = document.querySelector('.slider-btn-right')
const btnLeft = document.querySelector('.slider-btn-left')
// console.log(btnRight,btnLeft);

btnRight.addEventListener("click", () => {
  if (isMoving) return;
  moveHandler('right')
})
btnLeft.addEventListener("click", () => {
  if (isMoving) return;


  moveHandler()
})

slide.addEventListener("transitionend", () => {
  isMoving = false
  const slidesArray = [ ...slide.querySelectorAll('img') ];
  console.log(slideIndex);

  if (slideIndex === 0) {
    slide.style.transition = 'none';
    slideIndex = slidesArray.length - 2;
    console.log(slideIndex);
    moveSlide()
  }
  if (slideIndex === slidesArray.length - 1) {
    slide.style.transition = 'none';
    slideIndex = 1;
    moveSlide()
  }
})

