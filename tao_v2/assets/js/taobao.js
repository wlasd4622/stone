let time = setInterval(_ => {
  try {
    if ($ && $.fn) {
      clearInterval(time)
      $('.collection-title').append(`<button class="detectionVideo">检测视频</button>`)
      $(document).on('click', '.detectionVideo', function () {
        localStorage.setItem('wwlTask', true);
      })
    }
  } catch (err) {
    console.log(err);
  }
},30)


