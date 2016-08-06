function loadCategories(){
  return new Promise(function(resolve, reject){
    $.ajax({
      url: 'categories.json'
    }).done(function(data){
      resolve(data);
    }).fail(function(xhr, status, error){
      reject(error);
    });
  })
};

function loadTypes(){
  return new Promise(function(resolve, reject){
    $.ajax({
      url: 'types.json'
    }).done(function(data){
      resolve(data);
    }).fail(function(xhr, status, error){
      reject(error);
    })
  })
}

function loadProducts(){
  return new Promise(function(resolve, reject){
    $.ajax({
      url: 'products.json'
    }).done(function(data){
      resolve(data)
    }).fail(function(xhr, status, error){
      reject(error);
    })
  })
}

function load(){
  var categories;
  var types;
  var products;

  loadCategories()
    .then(function(data1){
      categories = data1;
        console.log(categories)
          return loadTypes(data1);
    })
    .then(function(data2){
      types = data2;
        console.log(types)
          return loadProducts(data2);
    })
    .then(function(data3){
      products = data3;
        console.log(products);
    })
    .then(function(){
      filter(categories, types, products);
    });
}

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
    for(var key in products[0]){
      if(products[key].id === 1){
        $filtered.push(products[0][key]);
      }
    }
  }
  else if($selection === 'wmd'){
    for(var key in products){
      if(products[key].id === 2){
        $filtered.push(products[key]);
        console.log(filtered)
      }
    }
  }
  else{
    for(var key in products){
      $filtered += products[key];
    }
  }
  console.log($filtered)
  print($filtered);
}

function print(element){
  var $content = $('#json_area');
  var $info = $('<tr></tr>');
  element.forEach(function(item){
    $info.addClass('row');
    $info.html(`
      <td class = 'col-md-10'>${item.name}</td>
      <td class = 'col-md-2'>${item.id}</td>
    `)
    $content.append($info);
  })
}

function execute(){
  load();
  var $selection = $('#types');
  $selection.on('change', function(){
    load();
    console.log('working');
    filter()
  });
}

execute();
