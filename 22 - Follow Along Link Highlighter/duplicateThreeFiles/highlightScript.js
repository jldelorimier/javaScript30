const triggers = document.querySelectorAll('a'); //(1) Get our triggers, i.e. things that when we hover over them, we need a background behind it. Let's start with every link on the page. 
const highlight = document.createElement('span'); // (2) Then we have to get a highlight. We are going to make this element ourselves. 
highlight.classList.add('highlight') // (3) Add the class of highlight to the 'span' element we just created.
document.body.append(highlight); // (4) Put the class of highlight we just made into the DOM. Now if you check the inspect > console for this, you will see a <span class="highlight"></span> element as the last element inside of the body element of the HTML. Now the highlight span element exists, but it's not being applied anywhere on the page. We have to tell it where to apply itself, and we will do that inside the highlightLink function.

function highlightLink(){
  console.log(this) //this here is each of the <a href=></a> elements.
  const linkCoords = this.getBoundingClientRect(); // (6) Now we need to figure out how big is the element that we're hovering over, and where on the page it is. To do this, we are going to use a method called getBoundingClientRect, i.e. "get the bounds of the rectangle of this 'client'." This will return an object that we can call the bottom, the top, the left, the right, etc from.  
  console.log(linkCoords)
  const coords = { // We're going to make our own coordinates to fix the issue where the highlighter is offset by how much you've scrolled down.
    width: linkCoords.width,
    height: linkCoords.height,
    top: linkCoords.top + window.scrollY,
    left: linkCoords.left + window.scrollX
  }
  highlight.style.width = `${coords.width}px`;
  highlight.style.height = `${coords.height}px`; // now the width and height (mostly just the width since the heights here are all the same) of the <span class="highlight"> element inside its new style= attribute will change dynamically as you move your mouse over different <a href></a> elements 
  highlight.style.transform = `translate(${coords.left}px, ${coords.top}px)`; // He used linkCoords.left and .top, but I used .x and .y. Mine seems to be working fine. BUT NOTE if you scroll down a little bit and then use this (either his way or my way), the highlight field is going to be offset by how much you've scrolled. You can fix this here by simply taking how far a person has scrolled down and then take that away from our "actual item."
} // (5) Now listen for someone who enters into the link.

triggers.forEach(a => a.addEventListener('mouseenter', highlightLink)); // Listen for the mouseEnter event on each of our triggers 