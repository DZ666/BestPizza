const uploadAllSnacks = async ()=>{
  setTimeout(()=>{
    let goods_list = document.querySelector('#snacks')
    let Goods = AllGoods
    Goods.forEach(async (Good)=>{
      Good.appendByType(goods_list, 'snack')
    })
    if (!goods_list.querySelector('.good-card__wrapper')) {
      goods_list.innerHTML = '<h2 class="no-found notification">Snacks Not Found</h2>'
    }
  }, 400)
}

$(()=>{
  uploadAllSnacks()
})

