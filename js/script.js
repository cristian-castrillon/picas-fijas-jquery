function shuffle(a) {
  var j, x, i
  for (i = a.length; i; i--) {
      j = Math.floor(Math.random() * i)
      x = a[i - 1]
      a[i - 1] = a[j]
      a[j] = x
  }
  return a
}

function hasDuplicates(array) {
  return (new Set(array)).size !== array.length;
}

function paintTable(value, picas, fijas) {
  var row = '<tr><td>' + value + '</td><td>' + picas + '</td><td>' + fijas + '</td></tr>'
  $('tbody').prepend(row)
}

function newGame () {
  if (confirm('¡Ganaste! \nPresiona OK para comenzar un juego nuevo o Cancel para cerrar este mensaje.')) {
    location.reload()
  }
}

$(document).ready(function () {
  var nums = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
  var num = shuffle(nums).slice(0, 4)
  console.log(num.join(''))
  // console.log(num)

  $('#number').keypress(function (event) {
    var key = event.which
    var val, val_arr
    var picas = 0
    var fijas = 0

    if (key === 13) {
      val = $(this).val()
      val_arr = Array.from(val.toString()).map(Number)
      if (val.length !== 4 || hasDuplicates(val_arr)) {
        $('span').css('color', 'red')
        return
      }
      $('span').css('color', '')
      // console.log(val)      
      $(this).val('')
      if (num.join('') === val) {
        $.when(paintTable(val, picas, 4)).then(function () {
          newGame()
        })
      } else {
        // console.log(val_arr)
        // console.log(picas, fijas)
        val_arr.forEach(function(value, index) {
          // console.log(value, index)
          if (num.indexOf(value) !== -1) {
            // console.log(num.indexOf(value))
            if (num[index] === value) {
              fijas++
            } else {
              picas++
            }
          }
        })
        // console.log(picas, fijas)
        paintTable(val, picas, fijas)
      }
    }
  })
})