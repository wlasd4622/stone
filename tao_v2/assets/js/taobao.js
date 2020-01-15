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
        let audioContainer = $('.audioContainer')
        if (!audioContainer) {
          audioContainer = $('<div>')
          audioContainer.addClass('audioContainer')
          audioContainer.append(`
            <div class="wrap">
              <div class="c_close"><button class="close">close</button></div>
              <div class="c_liframe">
                <iframe></iframe>
              </div>
            </div>
          `)
          $('body').append(audioContainer)

          audioContainer.find('iframe').attr('src', 'http://vjs.zencdn.net/v/oceans.mp4')
        }
      }).on('click', '.c_close', function () {
        $('.audioContainer').remove();
      })
    }
  } catch (err) {
    console.log(err);
  }
}, 300)


