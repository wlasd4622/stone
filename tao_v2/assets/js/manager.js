$(() => {
  let speed = localStorage.getItem('speed') || 1000;
  $('input').val(speed)
  $("input").on('input', function () {
    localStorage.setItem('speed', $(this).val())
  })
})