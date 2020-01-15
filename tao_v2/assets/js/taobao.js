var wwlTtime = setInterval(_ => {
  try {
    if ($ && $.fn) {
      clearInterval(wwlTtime)
      $('body').append(`<button class="detectionVideo ">检测视频</button>`)
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
                <video autoplay="true" style="width: 100%;height: 100%;max-height:80vh;" src="${$(this).data().src}" controls="controls">
                your browser does not support the video tag
                </video>
              </div>
            </div>
          `)
          $('body').append(audioContainer)
        }
      }).on('click', '.c_close', function () {
        $('.audioContainer').remove();
      }).on('click', '.wwldownload', function () {
        var src = $(this).data().src;
        wwlDowmload(src)
      })
    }
  } catch (err) {
    console.log(err);
  }
}, 300)


function wwlDowmload(src = "") {
  var filename = src.split('/').pop()
  var x = new XMLHttpRequest();
  x.open("GET", src, true);
  x.responseType = 'blob';
  x.onload = function (e) { downFile(x.response, filename); }
  x.send();
  function downFile(content, filename) {
    // 创建隐藏的可下载链接
    var eleLink = document.createElement('a');
    eleLink.download = filename;
    eleLink.style.display = 'none';
    // 字符内容转变成blob地址
    var blob = new Blob([content]);
    eleLink.href = URL.createObjectURL(blob);
    // 触发点击
    document.body.appendChild(eleLink);
    eleLink.click();
    // 然后移除
    document.body.removeChild(eleLink);
  };
}


