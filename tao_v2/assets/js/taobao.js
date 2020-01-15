let time = setInterval(_ => {
  console.log(111);
  try {
    if ($ && $.fn) {
      console.log(6666);
      clearInterval(time)
      $('#mainsrp-sortbar').append(`<button class="detectionVideo detectionVideo1">检测视频</button>`)
      $('collection-title').append(`<button class="detectionVideo ">检测视频</button>`)
      $(document).on('click', '.detectionVideo', function () {
        localStorage.setItem('wwlTask', true);
      }).on('click', '.wwlplay', function () {
        console.log(6666);
      })
    }
  } catch (err) {
    console.log(err);
  }
}, 300)


