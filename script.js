function loadInventory(){
  var categories;
  var types;
  var products;

  Promise.all([
    $.getJSON('categories.json'),
    $.getJSON('types.json'),
    $.getJSON('products.json')
  ])
  .then(function(re){
    categories = re[0].categories;
    types = re[1].types;
    products = re[2].products;
    filter(categories, types, products);
  }).catch(function(rejected){
      //console.log(rejected)
    })
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
  else if($selection === "demolition"){
    for(var key in products){
      if(products[key].id === 1){
        $filtered.push(products[key]);
      }
    }
  }
  else{
    for(var key in products){
      if(products[key].id === 2){
        $filtered.push(products[key]);
        console.log(filtered)
      }
    }
  }
  print($filtered);
}

function print(element){
  var $content = $('#json_area');
  var $info = $('<tr></tr>');

  $info.addClass('row');
  $info.html(`
    <td class = 'col-md-10'>${element.name}</td>
    <td class = 'col-md-2'>${element.id}</td>
  `)
  $content.append($info);
}

function execute(){
  loadInventory();
  filter();
  var $selection = $('#types');
  $selection.on('change', function(){
    console.log('working');
    filter();
  });
}

execute();
