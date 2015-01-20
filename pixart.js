$(document).ready(function() {

	var swatchColors = ['red', 'orange', 'yellow', 'green', 'blue', 'purple', '#E7E5DB']

	var down = false;
	$(document).mousedown(function() {
	    down = true;
	}).mouseup(function() {
	    down = false;  
	});

	for(var i = 0; i < 8000; i++){
		$('<div></div>').addClass('square').appendTo('body');
	}

	for(var i = 0; i < swatchColors.length; i++){
		$('<div></div>')
			.addClass('swatch')
			.attr('id', 'swatch-' + (i + 1))
			.css('background-color', swatchColors[i])
			.appendTo('.swatches');
	}

	for(var i = 0; i < 3; i++){
		$('<div></div>')
			.addClass('swatch')
			.attr('id', 'history-' + (i + 1))
			.appendTo('.history');
	}

	$('.swatches, .history').children().on('click', function(){
		var color = $(this).css('background-color');
		setBrush(color);
	});

	$('#clear').on('click', function(){
		$('.square').css('background-color', '#E7E5DB');
	});

	$('form').on('submit', function(e){
		e.preventDefault();
		var color = "#" + $('#color-field').val();
		setBrush(color);
	});

	$('.square').on('mouseover click', function(event){
		var brushColor = $('.brush').css('background-color');
		if (event.type == 'mouseover') {
			if(down) {
				$(this).css('background-color', brushColor);
			}
		} else if (event.type == 'click') {
			$(this).css('background-color', brushColor);
		}
	})

	function setBrush(color){
		var noChange = (color == $('.brush').css('background-color'))
		if (noChange) {
			return false;
		}

		var lastBrushColor = $('.brush').css('background-color');
		$('.brush').css('background-color', color);
		var historySwatches = $('.history').children();

		$.each(historySwatches, function(i, e){
			var next = $(e).next();
			var nextColor = next.css('background-color');
			$(e).css('background-color', nextColor);
		});
		
		historySwatches.last().css('background-color', lastBrushColor);

	}
});