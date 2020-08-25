$(()=>{
  setTimeout(()=>{
    if (window.scrollY >= 0) {
      scrollTo('.preview__bottom-btn-toscroll')
      document.querySelector('.preview__bottom-btn-toscroll').querySelector('.scroll-bottom-btn').classList.add('scroll-bottom-btn-reverse')
    }
  } ,1000)
})
