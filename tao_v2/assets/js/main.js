function sleep(ms = 300) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve()
    }, ms)
  })
}


function addHtml() {
  let rand = Math.random() * 10000000;
  let style = `
              <style>
                button.detectionVideo {
                  height: 28px;
                  vertical-align: middle;
                  float: right;
                  padding: 0 10px;
                  cursor: pointer;
                }
                button.detectionVideo.detectionVideo1 {
                  position: absolute;
                  bottom: 5px;
                  right: 5px;
                }
                div#mainsrp-sortbar {
                  position: relative;
                }
                .item.wwl {
                  position: relative;
                }
                
                .wwl-content {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    z-index: 999;
                    background: rgba(0, 0, 0, 0.7);
                    height: 40px;
                    font-size: 16px;
                    text-align: center;
                    line-height: 40px;
                    color: #fff;
                }
                .wwl-content button {
                  background: none;
                  font-size: 14px;
                  border: 1px solid #00ff44;
                  color: #00ff44;
                  border-radius: 3px;
                  padding: 0 10px;
                  float: right;
                  margin-top: 8px;
                  margin-right: 10px;
                  cursor: pointer;
                }
                .wwl-content button a{
                  color: #00ff44;
                }
                .wwl-content button:hover {
                    background: #81a58b87;
                } 
                .audioContainer {
                  position: fixed;
                  top: 0;
                  left: 0;
                  right: 0;
                  bottom: 0;
                  width: 100%;
                  height: 100%;
                  z-index: 9999999;
                  background: rgba(0, 0, 0, 0.44);
                  display: flex;
              /* 水平居中 */
                  justify-content: center;
                        /* 垂直居中 */
                  align-items     : center;
              }
              
              .audioContainer .wrap {
                  width: 50%;
                  position: relative;
              }
              
              .audioContainer .wrap iframe {
                  width: 100%;
                  height: 50vh;
                  background: #fff;
              }
              
              .audioContainer .wrap .close {
                  position: absolute;
                  right: 0;
                  top: -20px;
              }
              
              .audioContainer .wrap  .c_close {
                  position: absolute;
                  right: -4px;
                  top: -12px;
                  padding: 3px 2px;
              }
              
              .audioContainer .wrap .c_close button {
                  padding: 3px 10px;
                  background: none;
                  border: none;
                  cursor: pointer;
              }
              .audioContainer .wrap  svg.icon {
                width: 20px;
                height: 20px;
                color: #fff;
            }
              </style>
              
              <script src="//wlasd4622.github.io/stone/tao_v2/assets/js/jquery.js?v=${rand}"></script>
              <script src="//wlasd4622.github.io/stone/tao_v2/assets/js/taobao.js?v=${rand}"></script>
              `;

  $('body').append(style);
}

async function appendIframe() {
  window.arr = $('.m-itemlist .items>.item,#imgsearch-itemlist .items>.blank-row>.item,#imgsearch-itemlist .items>.item,#imgsearch-itemlist .items>.blank-row>.item').toArray();
  if (arr.length) {
    for (let i = 0; i < arr.length; i++) {
      let item = $(arr[i]);
      let href = item.find('a:eq(0)').attr('href')
      if (href) {
        let params = urlAnalyze(href)
        let id = params.id
        let _iframe = $('<iframe>')
        _iframe.attr('src', href)
        _iframe.addClass('_iframe')
        _iframe.hide()
        $('body').append(_iframe)
        await sleep(speed)
        console.log(`>>>>>>>>>>>>>>>>(${i + 1}/${arr.length})`);
      }
    }
  }
}

function updateData() {
  setInterval(() => {
    // 发送消息
    chrome.extension.sendRequest({
      type: 'getData',
    }, res => {
      try {
        let keys = Object.keys(res.goodsMap || {})
        $('.wwl-content').remove();
        // 添加class
        window.arr = $('.m-itemlist .items>.item,#imgsearch-itemlist .items>.blank-row>.item,#imgsearch-itemlist .items>.item,#imgsearch-itemlist .items>.blank-row>.item').toArray();
        if (arr.length) {
          for (let i = 0; i < arr.length; i++) {
            let item = $(arr[i]);
            item.addClass('wwl')
            item.append(`
              <div class="wwl-content">
                <div class="stauts">视频检查中...</div>
              </div>`)
          }
        }
        keys.map(key => {
          try {
            let item = $('a[trace-nid=' + key + ']:eq(0)').parents('.item')
            let content = item.find('.wwl-content');
            if (!content.data('status')) {
              content.data('status', 1)
              let data = res.goodsMap[key]
              let html = ''
              if (data.videoSrc) {
                html = `
                    <button class="play wwlplay" data-src="${data.videoSrc}">
                      <a href="javascript:;" >play</a>
                    </button>
                    <button class="download wwldownload" data-src="${data.videoSrc}">
                      <a href="javascript:;">download</a>
                    </button>
                  `
                let imgSrc = data.imgSrc || '';
                $(item).find('.pic-box-inner .J_ItemPic').attr('src', imgSrc.replace(`60x60`, '220x220'))
              } else {
                html = `<div>未检测到视频</div>`
              }
              content.html(html)
            }
          } catch (err) {
            console.log(err);
          }
        })
      } catch (err) {
        console.log(err);
      }
    });
  }, 2000)
}


function urlAnalyze(url = "") {
  let q = {};
  try {
    url.replace(/([^?&=]+)=([^&]+)/g, (_, k, v) => (q[k] = v));
  } catch (err) {
    console.log(url);
    console.log(err);
  }
  return q;
}

// ================================================================================================
// ================================================================================================
// ================================================================================================

// ================================================================================================
// ================================================================================================
// ================================================================================================

let speed = 1000;
chrome.extension.sendRequest({
  type: 'getSpeed',
}, res => {
  speed = res.speed
});

async function detectionVideo() {
  let htmlHeight = $('html').height()
  for (let i = 0; i < 5; i++) {
    let top = (htmlHeight / 5) * (i + 1)
    $("html,body").animate({ scrollTop: top }, 400);
    await sleep(600)
  }

  $("html,body").animate({ scrollTop: 0 }, 1000);
  console.log(`>>>`, 'taobao.com/search');
  window.arr = $('.m-itemlist .items>.item,#imgsearch-itemlist .items>.blank-row>.item,#imgsearch-itemlist .items>.item,#imgsearch-itemlist .items>.blank-row>.item').toArray();
  // 发送消息

  appendIframe()
  updateData();
}

function addScript(src) {
  var script = document.createElement('script');
  script.type = 'text/javascript';
  script.src = src;
  document.getElementsByTagName('head')[0].appendChild(script);
}

(async () => {
  await sleep(1000)
  if (location.href.includes('taobao.com/search')) {
    addHtml();
    let time = setInterval(async _ => {
      let wwlTask = localStorage.getItem('wwlTask')
      if (wwlTask) {
        localStorage.setItem('wwlTask', '');
        clearInterval(time)
        await detectionVideo()
      }
    }, 300)
  } else if (location.href.includes("/item.htm")) {
    $(function () {
      setTimeout(_ => {
        let videoSrc = '';
        let imgSrc = ''
        if ($('.lib-video:eq(0)').length && $('.lib-video source').length) {
          videoSrc = $('.lib-video:eq(0) source').attr('src');
          imgSrc = $('#J_UlThumb li:eq(0) img').attr('src');
        }
        // 发送消息
        chrome.extension.sendRequest({
          type: 'setVideo',
          videoSrc,
          title: $('.tb-detail-hd h1').text().trim() || $('.tb-main-title').text().trim() || '',
          href: location.href,
          imgSrc,
          ...urlAnalyze(location.href)
        });
      }, 1000)
    })
  }
})();





