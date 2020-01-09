let time = setInterval(_ => {
  if ($ && $.fn) {
    clearInterval(time)
    $('.collection-title').append(`<button class="detectionVideo">检测视频</button>`)
    $(document).on('click', '.detectionVideo', function () {
      localStorage.setItem('wwlTask', true);
    })
  }
})


