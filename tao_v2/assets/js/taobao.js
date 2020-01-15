let time = setInterval(_ => {
  console.log(111);
  try {
    if ($ && $.fn) {
      console.log(6666);
      clearInterval(time)
      $('.collection-title,#mainsrp-sortbar').append(`<button class="detectionVideo">检测视频</button>`)
      $(document).on('click', '.detectionVideo', function () {
        localStorage.setItem('wwlTask', true);
      })
    }
  } catch (err) {
    console.log(err);
  }
}, 300)


