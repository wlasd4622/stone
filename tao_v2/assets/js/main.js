function sleep(ms = 300) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve()
    }, ms)
  })
}


function addHtml() {
  let style = `
              <style>
                button.detectionVideo {
                  height: 28px;
                  vertical-align: middle;
                  float: right;
                  padding: 0 10px;
                  cursor: pointer;
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
              </style>
              
              <script>
                alert(6666)
                console.log(666)
                window.aasdfa=()=>{
  console.log(123)

                }
              </script>
              `;

  $('body').append(style);
}

async function appendIframe() {
  window.arr = $('#imgsearch-itemlist .items>.item,#imgsearch-itemlist .items>.blank-row>.item').toArray();
  if (arr.length) {
    for (let i = 0; i < arr.length; i++) {
      let item = $(arr[i]);
      let href = item.find('a:eq(0)').attr('href')
      if (href) {
        let params = urlAnalyze(href)
        let id = params.id
        // let _iframe = $('<iframe>')
        // _iframe.attr('src', src)
        // _iframe.addClass('_iframe')
        // _iframe.hide()
        // $('body').append(_iframe)
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
        if (keys && keys.length) {
          $('.wwl-content').remove();
          // 添加class
          window.arr = $('#imgsearch-itemlist .items>.item,#imgsearch-itemlist .items>.blank-row>.item').toArray();
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
            let content = $('a[trace-nid=' + key + ']:eq(0)').parents('.item').find('.wwl-content');
            if (!content.data('status')) {
              content.data('status', 1)
              let data = res.goodsMap[key]
              let html = ''
              if (data.videoSrc) {
                html = `
                    <button class="play" data-src="${data.videoSrc}">
                      <a href="${data.videoSrc}" target="_blank">play</a>
                    </button>
                  `
              } else {
                html = `<div>未检测到视频</div>`
              }
              content.html(html)
            }
          })
        }
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

window.detectionVideo = async () => {
  console.log(6666);
  let htmlHeight = $('html').height()
  for (let i = 0; i < 5; i++) {
    let top = (htmlHeight / 5) * (i + 1)
    $("html,body").animate({ scrollTop: top }, 400);
    await sleep(600)
  }

  $("html,body").animate({ scrollTop: 0 }, 1000);
  console.log(`>>>`, 'taobao.com/search');
  window.arr = $('#imgsearch-itemlist .items>.item,#imgsearch-itemlist .items>.blank-row>.item').toArray();
  // 发送消息
  
  appendIframe()
  updateData();
}

(async () => {
  await sleep(1000)
  if (location.href.includes('taobao.com/search')) {
    addHtml();
    $('.collection-title').append(`<button class="detectionVideo" onclick="detectionVideo">检测视频</button>`)
  } else if (location.href.includes("/item.htm")) {
    $(function () {
      setTimeout(_ => {
        let videoSrc = '';
        if ($('.lib-video:eq(0)').length && $('.lib-video source').length) {
          videoSrc = $('.lib-video:eq(0) source').attr('src')
        }
        // 发送消息
        chrome.extension.sendRequest({
          type: 'setVideo',
          videoSrc,
          title: $('.tb-detail-hd h1').text().trim() || $('.tb-main-title').text().trim() || '',
          href: location.href,
          ...urlAnalyze(location.href)
        });
      }, 1000)
    })
  }
})();





