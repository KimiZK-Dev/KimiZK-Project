document.addEventListener('DOMContentLoaded', () => {
  var textWrapper = document.querySelector('.textEff');

  if (textWrapper) {
    // Wrap each letter in a span
    textWrapper.innerHTML = textWrapper.textContent.replace(/\S/g, "<span class='letter'>$&</span>");

    // Create the animation timeline
    anime.timeline({ loop: true })
      .add({
        targets: '.textEff .letter',
        scale: [4, 1],
        opacity: [0, 1],
        translateZ: 0,
        easing: "easeOutExpo",
        duration: 950,
        delay: (el, i) => 70 * i
      }).add({
        targets: '.textEff', // Adjusted to animate the same element as above
        opacity: 0,
        duration: 1000,
        easing: "easeOutExpo",
        delay: 1000
      });
  } else {
    console.error('Element with class "textEff" not found.');
  }
});
