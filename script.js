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
  var category;
  var all_cat = []
  if($selection === 'fireworks'){
    for(var key in types){
      if(types[key].id === 0){
        category = categories[0].name
        $filtered.push(types[key]);
      }
    }
  }

  else if($selection === 'demolition'){
    for(var key in types){
      if(types[key].id === 1){
        category = categories[1].name
        $filtered.push(types[key]);
    console.log("demolition--->", $filtered)
      }
    }
  }

  else if($selection === 'wmd'){
    for(var key in types){
      if(types[key].id === 2){
        category = categories[2].name
        $filtered.push(types[key]);
        console.log($filtered)
      }
    }
  }

  else{
    for(var key in types){
      $filtered.push(types[key]);
      all_cat.push(types[key].id);
      determineCat(all_cat, category)
    }
  }

  console.log($filtered, category)
  print($filtered, category);
}

function print(element, categories){
  var $content = $('#json_area');
  $content.html("");
  element.forEach(function(item){
    var $info = $('<tr></tr>');
    $info.addClass('row');
    $info.html(`
      <td class='col-md-10'>${item.name}</td>
      <td class='col-md-2'>${categories}</td>
    `)
    $content.append($info);
  })
}

function filterForm(){
  var change = document.getElementById('types');
  change.addEventListener('change', function(){
    filter(categories, types, products)
  })
}

function determineCat(array, variable){
  for(var i = 0; i < array.length; i++){
    if(array[i] === 0){
      variable = 'Fireworks'
    }
    else if(array[i] === 1){
      variable === "Demolition"
    }
    else{
      variable === "Weapons of Mass Destruction"
    }
  }
}
