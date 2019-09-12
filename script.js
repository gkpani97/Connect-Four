var user1, user2;

var userColor1 = 'rgb(14, 101, 173)';
var userColor2 = 'rgb(173, 14, 46)';
var currentPlayer = 1;

var playerVal = 1;

var userColor = {
	'1' : userColor1,
	'-1' : userColor2
};

var userList = {
	'1' : user1,
	'-1' : user2
	}

var originalState = $('#start').clone();



$("#start").click(function(){
 	user1 = prompt("Enter your name, O courageous Knight, the one nearer to me!!");
	user2 = prompt("Enter your name too, O courageous Knight standing far!!");
	userList[1] = user1;
	userList[-1] = user2;

	playerToggle();

})




function toggleUser1(){
	$('#blackboard').css('color', userColor2);
	$('#blackboard').text(user1 + " throw your chip. It\'s your turn, Sir");
	playerToggle();

}



function throwChip(colValue,color){
	for(var i = 5 ; i > -1 ; i--){
		if((returnColor(i,colValue) !== userColor1) && (returnColor(i,colValue) !== userColor2)){
			changeColor(i , colValue, color);
			break;}
	}
}



function playerToggle(){
	var col;
	$('button#start').fadeOut("fast");
	$('table tr td button').click(function(){
  	col = $(this).parent().parent().children().index($(this).parent());
  	throwChip(col , userColor[currentPlayer.toString()]);
  	checkWin();
  	currentPlayer*= -1;
  })  	
}




function returnColor(row, col){
	return $('table tr').eq(row).find('td').eq(col).find('button').css('background-color');
}



function changeColor(row, col, color){
	return $('table tr').eq(row).find('td').eq(col).find('button').css('background-color', color);
}


function checkHorizontalWin(){
	for(var i = 5; i > -1; i--){
		for(var j = 5; j > 2; j--){
			if ((returnColor(i, j) === returnColor(i , j-1)) && (returnColor(i, j) === returnColor(i , j-2)) && (returnColor(i, j) === returnColor(i , j-3)) && (returnColor(i, j) === 	userColor['1'])){
				winCelebration(1);
				break;
			}
			else if ((returnColor(i, j) === returnColor(i , j-1)) && (returnColor(i, j) === returnColor(i , j-2)) && (returnColor(i, j) === returnColor(i , j-3)) && (returnColor(i, j) ===	userColor['-1'])){
				winCelebration(-1);
				break;
			}
		}
	}
}


function checkVerticalWin(){
	for(var i = 5; i > 2 ; i--){
		for(var j = 0; j < 6 ; j++){
			if((returnColor(i, j) === returnColor(i - 1 , j)) && (returnColor(i, j) === returnColor(i - 2 , j)) && (returnColor(i, j) === returnColor(i - 3 , j)) && (returnColor(i, j) === userColor['1'])){
				winCelebration(1);
				break;
			}
			else if((returnColor(i, j) === returnColor(i - 1 , j)) && (returnColor(i, j) === returnColor(i - 2 , j)) && (returnColor(i, j) === returnColor(i - 3 , j)) && (returnColor(i, j) === userColor['-1'])){
				winCelebration(-1);
				break;
			}			
		}
	}
}



function checkDiagonalWinNSlope(){
	for(var i = 5; i > 2; i--){
		for(var j = 5; j > 2; j--){
			if((returnColor(i, j) === returnColor(i - 1 , j - 1)) && (returnColor(i, j) === returnColor(i - 2 , j - 2)) && (returnColor(i, j) === returnColor(i - 3 , j - 3)) && (returnColor(i, j) === userColor['1'])){
				winCelebration(1);
				break;
			}
			else if((returnColor(i, j) === returnColor(i - 1 , j - 1)) && (returnColor(i, j) === returnColor(i - 2 , j - 2)) && (returnColor(i, j) === returnColor(i - 3 , j - 3)) && (returnColor(i, j)  === userColor['-1'])){
				winCelebration(-1);
				break;
			}		
		}
	}
}
function checkDiagonalWinPSlope(){
	for(var i = 5; i > 2; i--){
		for(var j = 0; j < 3; j++){
			if((returnColor(i, j) === returnColor(i - 1 , j + 1)) && (returnColor(i, j) === returnColor(i - 2 , j + 2)) && (returnColor(i, j) === returnColor(i - 3 , j + 3)) && (returnColor(i, j) === userColor['1'])){
				winCelebration(1);
				break;
			}
			else if((returnColor(i, j) === returnColor(i - 1 , j + 1)) && (returnColor(i, j) === returnColor(i - 2 , j + 2)) && (returnColor(i, j) === returnColor(i - 3 , j + 3)) && (returnColor(i, j)  === userColor['-1'])){
				winCelebration(-1);
				break;
			}		
		}
	}
}
 


function checkWin(){
	checkHorizontalWin();
	checkVerticalWin();
	checkDiagonalWinNSlope();
	checkDiagonalWinPSlope();
}

function winCelebration(playerNum){
	$('#bottomBlock').fadeOut("fast");
	$('h4').fadeOut("fast");
	$('h2').html('<span id=\'playerName\'>'+userList[playerNum]+'</span>'+'<br>wins');
	$('h5').text('REFRESH TO PLAY AGAIN!!');
	$('h5').css('color', 'orange');
	$('h2').css('color', 'yellow');
	setInterval("changeHeadColor()",10*62);
}

function setRandomColor(){
	var selectSet = "0123456789ABCDEF";
	var colorVal = "#"
	for(var i = 0 ; i < 6 ; i++){
		colorVal+=selectSet[Math.floor(Math.random()*16)];
	}
	return colorVal;
}

function changeHeadColor(){


	$('#playerName').css('color',setRandomColor());
}

setInterval("changeHeadColor()",10*32);