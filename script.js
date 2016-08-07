var categories, types, products

Promise.all([
  $.getJSON('categories.json')
    .then(function(r){
      categories=r.categories
    }),
  $.getJSON('types.json')
    .then(function(r){
      types=r.types
    }),
  $.getJSON('products.json')
  .then(function(r){
    products=r.products[0]
  }).then(function(){
    filter(categories, types, products)
    filterForm()
    // console.log(products)
    // console.log(types)
    // console.log(categories)
  })
])

function filter(categories, types, products){
  var $filtered = [];
  var $selection = $('#types').val();
  if($selection === 'fireworks'){
    for(var key in products){
      if(products[key].id === 0){
        $filtered.push(products[key]);
      }
    }
  }

  else if($selection === 'demolition'){
    for(var key in products){
      if(products[key].id === 1){
        $filtered.push(products[key]);
    console.log("demoltion--------->", $filtered)
      }
    }
  }

  else if($selection === 'wmd'){
    for(var key in products){
      if(products[key].id === 2){
        $filtered.push(products[key]);
        console.log($filtered)
      }
    }
  }

  else{
    for(var key in products){
      $filtered.push(products[key]);
    }
  }

  console.log($filtered)
  print($filtered);
}

function print(element){
  var $content = $('#json_area');
  $content.html("");
  element.forEach(function(item){
    var $info = $('<tr></tr>');
    $info.addClass('row');
    $info.html(`
      <td class='col-md-10'>${item.name}</td>
      <td class='col-md-2'>${item.id}</td>
    `)
    $content.append($info);
  })
}

function filterForm(){
  var change = document.getElementById('types');
  change.addEventListener('change', function(){
    console.log('working')
    filter(categories, types, products)
  })
}
