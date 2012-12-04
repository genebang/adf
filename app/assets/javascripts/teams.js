// # Place all the behaviors and hooks related to the matching controller here.
// # All this logic will automatically be available in application.js.
// # You can use CoffeeScript in this file: http://jashkenas.github.com/coffee-script/

$(document).ready( function() {
  // $('.position_PG').show();
  // $('.position_C').hide();
  // $('.position_SG').hide();
  // $('.position_SF').hide();
  // $('.position_PF').hide();
  $('#position_list').on('change', function(){
    if (event.target.value === "ALL") {
      $('[class^=position_]').show();
    } else {
      console.log(event)
      $('.position_PG').hide();
      $('.position_C').hide();
      $('.position_SG').hide();
      $('.position_SF').hide();
      $('.position_PF').hide();
      $('.position_' + event.target.value).show();
    }
  });
});


$(document).ready(function() {
    $('input:checkbox').change(function() {
        var raw_player_name = $(this).parent().next().text();
        var player_name_text = raw_player_name.trim()
        var player_name = player_name_text.toLowerCase().replace(/\./g,'').replace(/\'/,'').split(' ').join('_');
        if ($(this).attr('checked')) {
            var img = $('.empty_player_img').first();
            var player_name_div = $(img).parent().find('div');
            $(player_name_div).html(player_name_text);
            $(img).addClass(player_name);
            $(img).removeClass('empty_player_img');
            $(img).attr('src', "http://i.cdn.turner.com/nba/nba/media/act_" + player_name + ".jpg");
        }
        else {
            var img = $('.' + player_name);
            var player_name_div = $(img).parent().find('div');
            $(player_name_div).html("Player");
            $(img).removeClass(player_name);
            $(img).addClass('empty_player_img');
            $(img).attr('src', '/assets/empty_profile.png');
        }

    });

});

jQuery.fn.sortElements = (function(){
    
    var sort = [].sort;
    
    return function(comparator, getSortable) {
        
        getSortable = getSortable || function(){return this;};
        
        var placements = this.map(function(){
            
            var sortElement = getSortable.call(this),
                parentNode = sortElement.parentNode,
                nextSibling = parentNode.insertBefore(
                    document.createTextNode(''),
                    sortElement.nextSibling
                );
            
            return function() {
                
                if (parentNode === this) {
                    throw new Error(
                        "You can't sort elements if any one is a descendant of another."
                    );
                }
                parentNode.insertBefore(this, nextSibling);
                parentNode.removeChild(nextSibling);
            };
            
        });
        return sort.call(this, comparator).each(function(i){
            placements[i].call(getSortable.call(this));
        });
    };
    
})();

// $document.ready(function(){


// });

// $('.player_table #players').sortElements(function(a, b){
//     return $(a).text() > $(b).text() ? 1 : -1;
// });
