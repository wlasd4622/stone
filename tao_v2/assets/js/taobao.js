let time = setInterval(_ => {
  try {
    if ($ && $.fn) {
      clearInterval(time)
      $('#mainsrp-sortbar').append(`<button class="detectionVideo detectionVideo1">检测视频</button>`)
      $('collection-title').append(`<button class="detectionVideo ">检测视频</button>`)
      $(document).on('click', '.detectionVideo', function () {
        localStorage.setItem('wwlTask', true);
      }).on('click', '.wwlplay', function () {
        let audioContainer = $('.audioContainer')
        if (!audioContainer.length) {
          audioContainer = $('<div>')
          audioContainer.addClass('audioContainer')
          audioContainer.append(`
            <div class="wrap">
              <div class="c_close"><button class="close"><svg t="1579073004140" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1926" width="128" height="128"><path d="M578.05 512l330.27-330.26a46.71 46.71 0 1 0-66.05-66.05L512 446 181.74 115.68a46.71 46.71 0 0 0-66.05 66.05L445.95 512 115.68 842.27a46.71 46.71 0 0 0 66.05 66.05L512 578.06l330.26 330.27a46.71 46.71 0 0 0 66.05-66.05z" p-id="1927"></path></svg></button></div>
              <div class="c_liframe">
                <video autoplay="true" src="${$(this).data().src}" controls="controls">
                your browser does not support the video tag
                </video>
              </div>
            </div>
          `)
          $('body').append(audioContainer)
        }
      }).on('click', '.c_close', function () {
        $('.audioContainer').remove();
      })
    }
  } catch (err) {
    console.log(err);
  }
}, 300)


