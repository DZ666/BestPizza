const uploadAllPizza = async ()=>{
  setTimeout(()=>{
    let goods_list = document.querySelector('#all-goods')
    let Goods = AllGoods
    Goods.forEach(async (Good)=>{
      Good.append(goods_list)
    })
  }, 400)
}

$(()=>{
  uploadAllPizza()
})

