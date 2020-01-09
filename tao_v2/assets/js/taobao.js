setTimeout(_ => {
  $(function () {
    $('.collection-title').append(`<button class="detectionVideo">检测视频</button>`)
    $(document).on('click', '.detectionVideo', function () {
      console.log('5656');
      localStorage.setItem('wwlTask', true);
    })
  })
},1000)


