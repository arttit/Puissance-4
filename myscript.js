(function($){
	$.fn.puissance4=function(options){
		$('body').append('<script defer src="https://use.fontawesome.com/releases/v5.0.4/js/all.js"></script>');
		$('body').append('<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">');
		var div = $('<div id="game">');
		$('div').append(div)
		var div_prompt = $('<div id="prompt">');
		var title = $('<h3 style="text-align:center;color:black;margin-top:5px">Puissance 4</h3>');
		var btn_play = $('<button style="margin-left:50px;color:black;width:200px" class="btn btn-success button-play"><span class="fas fa-gamepad"></span><p style="display: inline"> Commencer la partie </p><span class="fas fa-gamepad"></span></button>');
		var btn_back = $('<button style="margin-left:85px;;color:black;margin-top:50px;position:absolute" class="btn btn-secondary"><span class="fas fa-undo"></span> Dernier coup</button>');
		var checkbox = $('<br/><input style="margin-left:115px" type="checkbox" id="checkbox_ia"/><h5 style="margin-left:135px;margin-top:-18px;color:black">IA ?</h5>');
		$('#game').after(div_prompt);
		$('#prompt').append(title);
		$('#prompt').append(btn_play);
		$('#prompt').append(checkbox);
		$('#prompt').append(btn_back);
		var options_default={
			size: {
				"x": "7",
				"y": "6",
			},
			color:{
				"p1": 'blue',
				"p2": 'red',
			},
		};
		var default_css={
			css: {
				"margin-left": "20px",
				"margin-right": "auto",
				"margin-top": "40px",
				"width": "auto",
				"height": "auto",
				"border": "2px solid black",
				"line-height": "0",
				"float": "left"
			},
		};
		var default_prompt_css={
			css:{
				"float":"left",
				"border": "2px solid black",
				"height": "200px",
				"width": "300px",
				"margin-top": "40px",
				"margin-left": "50px",
				"background-color": "#3078d8"
			},
		};
		div_prompt.css(default_prompt_css.css);
		if(default_css.css){
			div.css(default_css.css);
		}
		if(options){
			if(options.x){
				if(options.y > 6){var x = options.x;}else{var x = options_default.size.x;}
			}
			if(options.y){
				if(options.y > 6){var y = options.y;}else{var y = options_default.size.y;}
			}
			else{
				var x = options_default.size.x;
				var y = options_default.size.y;
			}
		}else{
			var x = options_default.size.x;
			var y = options_default.size.y;
		}
		function set_game(){
			for (var z = 0; z < y; z++) {
				var tr_insert = document.createElement('tr');
				tr_insert.setAttribute('class','tr'+z);
				$('#game').append(tr_insert);
				for (var i = 0; i < x; i++) {
					var div_insert = document.createElement('td');
					div_insert.setAttribute('class','case'+z+'-'+i);
					$('.tr'+z).append(div_insert);
					if($('.case'+z+'-'+i).firstChild){
						continue;
					}else{
						var case_insert = document.createElement('img');
						case_insert.setAttribute('src','case.gif');
						if(x>15 && y>15){
							case_insert.setAttribute('width','25');
							case_insert.setAttribute('height','25');
						}if(x>=30 && y>=30){
							case_insert.setAttribute('width','15');
							case_insert.setAttribute('height','15');
						}if(x<=15 && y<=15){
							case_insert.setAttribute('width','50');
							case_insert.setAttribute('height','50');
						}
						case_insert.setAttribute('style','position: relative; z-index:10');
						case_insert.setAttribute('id',''+z+'-'+i);
						$('.case'+z+'-'+i).append(case_insert);
					}
				}	
			}
		}
		set_game.call();
		var game=[];
		var count_pos=0;
		var count_pos_f=0;
		function coin($y,$player){
			var count_coin_one=0;
			var count_coin_two=1;
			var color;
			if(options){
				if(options.player1 && options.player2){
					if(options.player1 != options.player2){
						if($player=='p1'){color=options.player1}else{color=options.player2;}
					}else{if($player=='p1'){color=options_default.color.p1}else{color=options_default.color.p2;}}
				}else{
					if($player=='p1'){color=options_default.color.p1}else{color=options_default.color.p2;}
				}
			}else{
				if($player=='p1'){color=options_default.color.p1}else{color=options_default.color.p2;}
			}
			var res_case_split = $y.split('-');
			var res_case = res_case_split[1];
			var res_col = res_case_split[0].substr(4,3);

			for (var j = 0; j < y; j++) {
				if($('.case'+(parseFloat(res_col)+j)+'-'+res_case).children().length==1){
					$y='case'+(parseFloat(res_col)+j)+'-'+res_case;
				}
				if($('.case'+(res_col-count_coin_one)+'-'+res_case).children().length==2){
					$y='case'+(res_col-count_coin_two)+'-'+res_case;
				}
				count_coin_one++;
				count_coin_two++;
			}
			var res_col_substr = $y.substr(4,5);
			var res_col_split = res_col_substr.split('-');
			var res_col = res_col_split[0];;
			var coin_b = document.createElement('div');
			coin_b.setAttribute('class','coin-'+$player+'-'+$y+'  coins');
			if(x>15 && y>15){
				coin_b.setAttribute('style','width: 25px; height: 25px; background-color:'+color+'; position:absolute;border-radius:50px');
			}if(x>=30 && y>=30){
				coin_b.setAttribute('style','width: 15px; height: 15px; background-color:'+color+'; position:absolute;border-radius:50px');
			}if(x<=15 && y<=15){
				coin_b.setAttribute('style','width: 50px; height: 50px; background-color:'+color+'; position:absolute;border-radius:50px');
			}
			$('.'+$y).prepend(coin_b);
			var elem = $('.coin-'+$player+'-'+$y);
			var pos=0;
			var pos_f= [];
			for (var i = 0; i < y; i++) {
				if(x>15 && y>15){
					if(i==0){pos_f[0]=40;}else
					pos_f[i]=pos_f[i-1]+25;
				}if(x>=30 && y>=30){
					if(i==0){pos_f[0]=43;}else
					pos_f[i]=pos_f[i-1]+15;
				}if(x<=15 && y<=15){
					if(i==0){pos_f[0]=40;}else
					pos_f[i]=pos_f[i-1]+50;	
				}
			}
			if(x>=30 && y>=30){
				var id = setInterval(frame, 1);
				function frame(){
					if (pos == pos_f[res_col]) {
						clearInterval(id);
					} else {
						pos=pos+1;
						elem[0].style.top = pos + 'px';
					}
				}
			}
			if(x>15 && y>15 && x<30 && y<30){
				var id = setInterval(frame, 25);
				function frame(){
					if (pos == pos_f[res_col]) {
						clearInterval(id);
					}else{
						if(count_pos %2 == 0){
							pos=pos+05;
							elem[0].style.top = pos + 'px';
							count_pos++;
						}else{
							pos=pos+05;
							elem[0].style.top = pos + 'px';
							count_pos++;
						}
					}
				}
			}if(x<=15 && y<=15){
				var id = setInterval(frame, 10);
				function frame(){
					if (pos == pos_f[res_col]) {
						clearInterval(id);
					} else {
						pos=pos+10;
						elem[0].style.top = pos + 'px';
					}
				}
			}
			game[$y]=$player;
			check_win.call(game);
			full();
		}
		var ia_active;
		var prompt_hint=0;
		function is_checked_ia(){
			var checked_ia = $('#checkbox_ia').is(':checked');
			if(checked_ia == true){
				ia_active = true;
			}else{ia_active=false;}
			if(prompt_hint==0){
				$('#prompt').append('<h4 id="hint" style="border:1px solid #0013a4;position:absolute;margin-left:310px;border-radius:25%;padding:8px;margin-top:-80px">Pour faire jouer l\'IA vous devez </br> cliquer n\'importe où sur la grille</h4>');
				prompt_hint++;
			}
		}
		var p=0;
		var player;
		var validate_click=true;
		var clickBtn=0;
		var play;
		if(options){
			if(options.player1 != options.player2){
				if(options.player1 && options.player2){color1=options.player1;color2=options.player2;}
			}else{color1=options_default.color.p1;color2=options_default.color.p2;}
		}else{
			color1=options_default.color.p1;
			color2=options_default.color.p2;
		}
		$('.btn-secondary').click(function(){
			if(play==true){
				if(player=='p1'){var coin_removed=p1.pop();}
				if(player=='p2'){var coin_removed=p2.pop();}
				$('.coin-'+player+'-case'+coin_removed).remove();
				if(player=='p1'){
					player='p2';
					$('.prompt_player').remove();
					$('#prompt').append('<h4 class="prompt_player" style="color:'+color1+'";margin-top:20px;margin-left:40px"><span class="fas fa-play"></span> <span class="fas fa-child"></span> Joueur 1 à toi de jouer !</h4>');
				}else{
					player='p1';
					$('.prompt_player').remove();
					$('#prompt').append('<h4 class="prompt_player" style="color:'+color2+'";margin-top:20px;margin-left:40px"><span class="fas fa-play"></span> <span class="fas fa-child"></span> Joueur 2 à toi de jouer !</h4>');
				}
				p++;
			}
		})
		$('.button-play').click(function(){
			if(clickBtn%2==0){
				$('.fa-gamepad').toggleClass('fa-gamepad fa-hand-paper');
				$('p').text(' Abandonner la partie ');
				$('.btn-success').toggleClass('btn-success btn-danger');
				validate_click=true;
				$('.coins').remove();
				play=true;
			}else{
				$('.fa-hand-paper').toggleClass('fa-hand-paper fa-gamepad');
				$('p').text(' Commencer la partie ');
				$('.btn-danger').toggleClass('btn-danger btn-success');
				$('.coins').remove();
				play=false;
			}
			clickBtn++;
		})
		$('td').click(function(e){
			is_checked_ia();
			if(play == true){
				var clicked = e.target;
				var col_clicked = clicked.id.split('-');
				if($('.case0-'+col_clicked[1])[0].children.length == 2){
					return;
				}
				if(validate_click===true){
					if(p%2==0){
						player='p1';
						$('.prompt_player').remove();
						$('#prompt').append('<h4 class="prompt_player" style="color:'+color2+'";margin-top:20px;margin-left:40px"><span class="fas fa-play"></span> <span class="fas fa-child"></span> Joueur 2 à toi de jouer !</h4>');
						var clicked = $(this)[0];
						var click_on= clicked.className;
						coin(click_on,player);
						p++;
					}
					else{
						if(ia_active == true){
							p++;
							IA();
						}else{
							player='p2';
							$('.prompt_player').remove();
							$('#prompt').append('<h4 class="prompt_player" style="color:'+color1+'";margin-top:20px;margin-left:40px"><span class="fas fa-play"></span> <span class="fas fa-child"></span> Joueur 1 à toi de jouer !</h4>');
							var clicked = $(this)[0];
							var click_on= clicked.className;
							coin(click_on,player);
							p++;
						}
					}
				}
			}
		})
		var full_col=[];
		function full(){
			var count_full=0;
			for (var i = 0; i < x; i++) {
				if($('.case0-'+i)[0].children.length == 2){
					full_col[i]='full';
				}
			}
			for ( var i=0; i< full_col.length; i++ ) {
				if (full_col[i] !== full_col[i+1]){
				}else{count_full++;}
			}
			if(count_full==(x-1)){
				window.alert('Partie nulle ! losers');
				count_full=0;
				full_col=[];
			}
		}
		var p1=[];
		var p2=[];
		var count_line=0;
		var count_col=0;
		var count_diag=0;
		var count_diag_left=0;
		var validator=false;
		var Player_one=0;
		var Player_two=0;
		var full_col_ia=false;
		var i =0;
		function IA(){
			var p1_length = p1.length;
			var last_coin_p1 = p1[p1_length-1];
			var randx = Math.floor((Math.random() * y) + 0);
			var randy = Math.floor((Math.random() * x) + 0);
			var split_case_p1 = last_coin_p1.split('-');
			if($('.case0-'+split_case_p1[1])[0].children.length == 2){
				full_col_ia = true;
			}
			var col_more = split_case_p1[1]*1+1*1;
			var col_min = split_case_p1[1]*1-1*1;
			/*Careful pour check p1 >3 en ligne */
			if(careful === true){
				if(col_more > x || $('.case'+split_case_p1[0]+'-'+col_more)[0].children.length == 2){
					var IA_click = "case"+split_case_p1[0]+'-'+col_min;
				}
				else if (col_min < x || $('.case'+split_case_p1[0]+'-'+col_min)[0].children.length == 2){
					var IA_click = "case"+split_case_p1[0]+'-'+col_more;
				}else{
					var IA_click = "case"+split_case_p1[0]+'-'+split_case_p1[1];
				}
				careful=false;
			}else {
				if(full_col_ia === true){
					var IA_click = "case"+randy+'-'+randx;
				}else{
					var IA_click = "case"+split_case_p1[0]+'-'+split_case_p1[1];
				}
			}
			player="p2";
			coin(IA_click,player);
		}
		function check_win($tab){
			for (var val in game) {
				var res_col = val.substr(4,1);
				var res_case = val.substr(5,5);
				if(game[val]=="p1"){
					if(p1.lastIndexOf(res_col+res_case)=="-1")
						p1.push(res_col+res_case);
				}
				if(game[val]=="p2"){
					if(p2.lastIndexOf(res_col+res_case)=="-1")
						p2.push(res_col+res_case);
				}
			}
			check_line(p1,p2);
			check_col(p1,p2);
			check_diag_right(p1,p2);
			check_diag_left(p1,p2);
			if(validator != false){
				$('.prompt_player').remove();
				if($('#result').length==0){
					$('#prompt').after('<div style="background-color:#3078d8;border:2px solid black;border-top:0;width:300px;height:150px;display:inline-block;margin-top:240px;margin-left:-300px"id="result"></div>')
					$('#result').append('<h3 style="text-align:center;color:black">Resultats :<h3>');
					$('#result').append('<h4 style="margin-top:20px;margin-left:20px;color:'+color1+'" id="result_p1">Joueur 1 :</h4>');
					$('#result').append('<h4 style="margin-top:20px;margin-left:20px;color:'+color2+'" id="result_p2">Joueur 2 :</h4>');
				}
				if(validator=='Player 1'){
					$('#prompt').append('<h4 class="prompt_player" style="margin-top:20px;margin-left:40px;color:gold"><span class="fas fa-play"></span> <span class="fas fa-child"></span> Joueur 1 à gagné ! <span class="fas fa-trophy"></span></h4>');
					window.alert('Joueur 1 à gagné !');
					Player_one++;
					$('#result_p1').append(' <span style="color:gold" class="fas fa-trophy"></span>');
				}
				if(validator=='Player 2'){
					$('#prompt').append('<h4 class="prompt_player" style="margin-top:20px;margin-left:40px;color:gold"><span class="fas fa-play"></span> <span class="fas fa-child"></span> Joueur 2 à gagné ! <span class="fas fa-trophy"></span></h4>');
					window.alert('Joueur 2 à gagné !');
					Player_two++;
					$('#result_p2').append(' <span style="color:gold" class="fas fa-trophy"></span>');
				}
				$('.fa-hand-paper').toggleClass('fa-hand-paper fa-gamepad');
				$('p').text(' Commencer la partie ');
				$('.btn-danger').toggleClass('btn-danger btn-success');
				validator=false;
				play=false;
				validate_click=false;
				clickBtn++;
			}
		}
		var careful=false;
		function check_line(p1,p2){
			var array_line=[];
			for (var i = 0; i < x; i++) {
				array_line.push(0);
			}
			if(count_line%2==0){
				var lastind = p1.slice(-1)[0];
				var split_lastind = lastind.split('-');
				var line_num = split_lastind[0];
				var line = $('.tr'+line_num);
				count_line++;
			}else{
				var lastind = p2.slice(-1)[0];
				var split_lastind = lastind.split('-');
				var line_num = split_lastind[0];
				var line = $('.tr'+line_num);
				count_line++;
			}
			for (var i = 0; i < line[0].children.length; i++) {
				if(line[0].children[i].children.length == 2){
					var class_Name = line[0].children[i].children[0].className;
					if(class_Name.substr(5,2) == 'p1'){
						var class_substr = class_Name.substr(12,5);
						var class_split = class_substr.split('-');
						var col_res = class_split[1];
						var col=col_res.trim();
						array_line[col]= 'p1';
					}
					if(class_Name.substr(5,2) == 'p2'){
						var class_substr = class_Name.substr(12,5);
						var class_split = class_substr.split('-');
						var col_res = class_split[1];
						var col=col_res.trim();
						array_line[col]= 'p2';
					}
				}
			}
			for(var p=0; p < array_line.length; p++){
				if(array_line[p]== 'p1'){
					if(array_line[p+1]== 'p1'){
						if(array_line[p+2]== 'p1'){
							careful=true;
							if(array_line[p+3]== 'p1'){
								validator='Player 1';
							}
						}
					}
				}
				if(array_line[p]== 'p2'){
					if(array_line[p+1]== 'p2'){
						if(array_line[p+2]== 'p2'){
							if(array_line[p+3]== 'p2'){
								validator='Player 2';
							}
						}
					}
				}
			}
		}
		function check_col(p1,p2){
			if(count_col%2==0){
				var lastindex = p1.slice(-1)[0];
				var lastindex_split = lastindex.split('-');
				var col_num = lastindex_split[1];
				count_col++;
			}else{
				var lastindex = p2.slice(-1)[0];
				var lastindex_split = lastindex.split('-');
				var col_num = lastindex_split[1];
				count_col++;
			}
			for (var c = y-1 ; c >= 0; c--) {
				if(typeof $('.case'+c+'-'+col_num)[0] != 'undefined'){
					if($('.case'+c+'-'+col_num)[0].children.length == 2){
						if($('.case'+c+'-'+col_num)[0].children[0].className.substr(5,2) == 'p1'){
							if(typeof $('.case'+(c-1)+'-'+col_num)[0] != 'undefined'){
								if($('.case'+(c-1)+'-'+col_num)[0].children.length == 2){
									if($('.case'+(c-1)+'-'+col_num)[0].children[0].className.substr(5,2) == 'p1'){
										if(typeof $('.case'+(c-1)+'-'+col_num)[0] != 'undefined'){
											if($('.case'+(c-2)+'-'+col_num)[0].children.length == 2){
												if($('.case'+(c-2)+'-'+col_num)[0].children[0].className.substr(5,2) == 'p1'){
													if(typeof $('.case'+(c-1)+'-'+col_num)[0] != 'undefined'){
														if($('.case'+(c-3)+'-'+col_num)[0].children.length == 2){
															if($('.case'+(c-3)+'-'+col_num)[0].children[0].className.substr(5,2) == 'p1'){
																validator = 'Player 1';	
															}
														}
													}
												}
											}
										}
									}
								}
							}
						}
					}
				}
				if(typeof $('.case'+c+'-'+col_num)[0] != 'undefined'){
					if($('.case'+c+'-'+col_num)[0].children.length == 2){
						if($('.case'+c+'-'+col_num)[0].children[0].className.substr(5,2) == 'p2'){
							if(typeof $('.case'+(c-1)+'-'+col_num)[0] != 'undefined'){
								if($('.case'+(c-1)+'-'+col_num)[0].children.length == 2){
									if($('.case'+(c-1)+'-'+col_num)[0].children[0].className.substr(5,2) == 'p2'){
										if(typeof $('.case'+(c-1)+'-'+col_num)[0] != 'undefined'){
											if($('.case'+(c-2)+'-'+col_num)[0].children.length == 2){
												if($('.case'+(c-2)+'-'+col_num)[0].children[0].className.substr(5,2) == 'p2'){
													if(typeof $('.case'+(c-1)+'-'+col_num)[0] != 'undefined'){
														if($('.case'+(c-3)+'-'+col_num)[0].children.length == 2){
															if($('.case'+(c-3)+'-'+col_num)[0].children[0].className.substr(5,2) == 'p2'){
																validator = 'Player 2';	
															}
														}
													}
												}
											}
										}
									}
								}
							}
						}
					}
				}
			}
		}
		function check_diag_right(p1,p2){
			if(count_diag%2==0){
				var last = p1.slice(-1)[0];
				var last_split = last.split('-');
				var col_num = last_split[1];
				var line_num = last_split[0];
				count_diag++;
			}else{
				var last = p2.slice(-1)[0];
				var last_split = last.split('-');
				var col_num = last_split[1];
				var line_num = last_split[0];
				count_diag++;
			}
			for (var i = y-1 ; i >= 0; i--) {
				if($('.case'+i+'-'+col_num)[0].children.length == 2){
					if($('.case'+i+'-'+col_num)[0].children[0].className.substr(5,2) == 'p1'){
						if(typeof $('.case'+(i-1)+'-'+(parseInt(col_num)+parseFloat(1)))[0] !== 'undefined'){
							if($('.case'+(i-1)+'-'+(parseInt(col_num)+parseFloat(1)))[0].children.length == 2){
								if($('.case'+(i-1)+'-'+(parseInt(col_num)+parseFloat(1)))[0].children[0].className.substr(5,2) == 'p1'){
									if(typeof $('.case'+(i-2)+'-'+(parseInt(col_num)+parseFloat(2)))[0] !== 'undefined'){
										if($('.case'+(i-2)+'-'+(parseInt(col_num)+parseFloat(2)))[0].children.length == 2){
											if($('.case'+(i-2)+'-'+(parseInt(col_num)+parseFloat(2)))[0].children[0].className.substr(5,2) == 'p1'){
												if(typeof $('.case'+(i-3)+'-'+(parseInt(col_num)+parseFloat(3)))[0] !== 'undefined'){
													if($('.case'+(i-3)+'-'+(parseInt(col_num)+parseFloat(3)))[0].children.length == 2){
														if($('.case'+(i-3)+'-'+(parseInt(col_num)+parseFloat(3)))[0].children[0].className.substr(5,2) == 'p1'){
															validator = 'Player 1';
														}
													}
												}		
											}
										}
									}
								}
							}
						}
						if(typeof $('.case'+(i+1)+'-'+(parseInt(col_num)-parseFloat(1)))[0] !== 'undefined'){
							if($('.case'+(i+1)+'-'+(parseInt(col_num)-parseFloat(1)))[0].children.length == 2){
								if($('.case'+(i+1)+'-'+(parseInt(col_num)-parseFloat(1)))[0].children[0].className.substr(5,2) == 'p1'){
									if(typeof $('.case'+(i+2)+'-'+(parseInt(col_num)-parseFloat(2)))[0] !== 'undefined'){
										if($('.case'+(i+2)+'-'+(parseInt(col_num)-parseFloat(2)))[0].children.length == 2){
											if($('.case'+(i+2)+'-'+(parseInt(col_num)-parseFloat(2)))[0].children[0].className.substr(5,2) == 'p1'){
												if(typeof $('.case'+(i+3)+'-'+(parseInt(col_num)-parseFloat(3)))[0] !== 'undefined'){
													if($('.case'+(i+3)+'-'+(parseInt(col_num)-parseFloat(3)))[0].children.length == 2){
														if($('.case'+(i+3)+'-'+(parseInt(col_num)-parseFloat(3)))[0].children[0].className.substr(5,2) == 'p1'){
															validator = 'Player 1';
														}
													}
												}
											}
										}
									}
								}
							}
						}	
					}
				}
				if($('.case'+i+'-'+col_num)[0].children.length == 2){
					if($('.case'+i+'-'+col_num)[0].children[0].className.substr(5,2) == 'p2'){
						if(typeof $('.case'+(i-1)+'-'+(parseInt(col_num)+parseFloat(1)))[0] !== 'undefined'){
							if($('.case'+(i-1)+'-'+(parseInt(col_num)+parseFloat(1)))[0].children.length == 2){
								if($('.case'+(i-1)+'-'+(parseInt(col_num)+parseFloat(1)))[0].children[0].className.substr(5,2) == 'p2'){
									if(typeof $('.case'+(i-2)+'-'+(parseInt(col_num)+parseFloat(2)))[0] !== 'undefined'){
										if($('.case'+(i-2)+'-'+(parseInt(col_num)+parseFloat(2)))[0].children.length == 2){
											if($('.case'+(i-2)+'-'+(parseInt(col_num)+parseFloat(2)))[0].children[0].className.substr(5,2) == 'p2'){
												if(typeof $('.case'+(i-3)+'-'+(parseInt(col_num)+parseFloat(3)))[0] !== 'undefined'){
													if($('.case'+(i-3)+'-'+(parseInt(col_num)+parseFloat(3)))[0].children.length == 2){
														if($('.case'+(i-3)+'-'+(parseInt(col_num)+parseFloat(3)))[0].children[0].className.substr(5,2) == 'p2'){
															validator = 'Player 2';
														}
													}
												}
											}
										}
									}
								}
							}
						}
						if(typeof $('.case'+(i+1)+'-'+(parseInt(col_num)-parseFloat(1)))[0] !== 'undefined'){
							if($('.case'+(i+1)+'-'+(parseInt(col_num)-parseFloat(1)))[0].children.length == 2){
								if($('.case'+(i+1)+'-'+(parseInt(col_num)-parseFloat(1)))[0].children[0].className.substr(5,2) == 'p2'){
									if(typeof $('.case'+(i+2)+'-'+(parseInt(col_num)-parseFloat(2)))[0] !== 'undefined'){
										if($('.case'+(i+2)+'-'+(parseInt(col_num)-parseFloat(2)))[0].children.length == 2){
											if($('.case'+(i+2)+'-'+(parseInt(col_num)-parseFloat(2)))[0].children[0].className.substr(5,2) == 'p2'){
												if(typeof $('.case'+(i+3)+'-'+(parseInt(col_num)-parseFloat(3)))[0] !== 'undefined'){
													if($('.case'+(i+3)+'-'+(parseInt(col_num)-parseFloat(3)))[0].children.length == 2){
														if($('.case'+(i+3)+'-'+(parseInt(col_num)-parseFloat(3)))[0].children[0].className.substr(5,2) == 'p2'){
															validator = 'Player 2';
														}
													}
												}
											}
										}
									}
								}
							}
						}	
					}
				}
			}
		}	
		function check_diag_left(p1,p2){
			if(count_diag_left%2==0){
				var l_index = p1.slice(-1)[0];
				var l_index_split = l_index.split('-');
				var col_num = l_index_split[1];
				var line_num = l_index_split[0];
				count_diag_left++;
			}else{
				var l_index = p2.slice(-1)[0];
				var l_index_split = l_index.split('-');
				var col_num = l_index_split[1];
				var line_num = l_index_split[0];
				count_diag_left++;
			}
			for (var i = y-1 ; i >= 0; i--) {
				if($('.case'+i+'-'+col_num)[0].children.length == 2){
					if($('.case'+i+'-'+col_num)[0].children[0].className.substr(5,2) == 'p1'){
						if(typeof $('.case'+(i-1)+'-'+(parseInt(col_num)-parseFloat(1)))[0] !== 'undefined'){
							if($('.case'+(i-1)+'-'+(parseInt(col_num)-parseFloat(1)))[0].children.length == 2){
								if($('.case'+(i-1)+'-'+(parseInt(col_num)-parseFloat(1)))[0].children[0].className.substr(5,2) == 'p1'){
									if(typeof $('.case'+(i-2)+'-'+(parseInt(col_num)-parseFloat(2)))[0] !== 'undefined'){
										if($('.case'+(i-2)+'-'+(parseInt(col_num)-parseFloat(2)))[0].children.length == 2){
											if($('.case'+(i-2)+'-'+(parseInt(col_num)-parseFloat(2)))[0].children[0].className.substr(5,2) == 'p1'){
												if(typeof $('.case'+(i-3)+'-'+(parseInt(col_num)-parseFloat(3)))[0] !== 'undefined'){
													if($('.case'+(i-3)+'-'+(parseInt(col_num)-parseFloat(3)))[0].children.length == 2){
														if($('.case'+(i-3)+'-'+(parseInt(col_num)-parseFloat(3)))[0].children[0].className.substr(5,2) == 'p1'){
															validator = 'Player 1';
														}
													}
												}		
											}
										}
									}
								}
							}
						}
						if(typeof $('.case'+(i+1)+'-'+(parseInt(col_num)+parseFloat(1)))[0] !== 'undefined'){
							if($('.case'+(i+1)+'-'+(parseInt(col_num)+parseFloat(1)))[0].children.length == 2){
								if($('.case'+(i+1)+'-'+(parseInt(col_num)+parseFloat(1)))[0].children[0].className.substr(5,2) == 'p1'){
									if(typeof $('.case'+(i+2)+'-'+(parseInt(col_num)+parseFloat(2)))[0] !== 'undefined'){
										if($('.case'+(i+2)+'-'+(parseInt(col_num)+parseFloat(2)))[0].children.length == 2){
											if($('.case'+(i+2)+'-'+(parseInt(col_num)+parseFloat(2)))[0].children[0].className.substr(5,2) == 'p1'){
												if(typeof $('.case'+(i+3)+'-'+(parseInt(col_num)+parseFloat(3)))[0] !== 'undefined'){
													if($('.case'+(i+3)+'-'+(parseInt(col_num)+parseFloat(3)))[0].children.length == 2){
														if($('.case'+(i+3)+'-'+(parseInt(col_num)+parseFloat(3)))[0].children[0].className.substr(5,2) == 'p1'){
															validator = 'Player 1';
														}
													}
												}
											}
										}
									}
								}
							}
						}	
					}
				}
				if($('.case'+i+'-'+col_num)[0].children.length == 2){
					if($('.case'+i+'-'+col_num)[0].children[0].className.substr(5,2) == 'p2'){
						if(typeof $('.case'+(i-1)+'-'+(parseInt(col_num)-parseFloat(1)))[0] !== 'undefined'){
							if($('.case'+(i-1)+'-'+(parseInt(col_num)-parseFloat(1)))[0].children.length == 2){
								if($('.case'+(i-1)+'-'+(parseInt(col_num)-parseFloat(1)))[0].children[0].className.substr(5,2) == 'p2'){
									if(typeof $('.case'+(i-2)+'-'+(parseInt(col_num)-parseFloat(2)))[0] !== 'undefined'){
										if($('.case'+(i-2)+'-'+(parseInt(col_num)-parseFloat(2)))[0].children.length == 2){
											if($('.case'+(i-2)+'-'+(parseInt(col_num)-parseFloat(2)))[0].children[0].className.substr(5,2) == 'p2'){
												if(typeof $('.case'+(i-3)+'-'+(parseInt(col_num)-parseFloat(3)))[0] !== 'undefined'){
													if($('.case'+(i-3)+'-'+(parseInt(col_num)-parseFloat(3)))[0].children.length == 2){
														if($('.case'+(i-3)+'-'+(parseInt(col_num)-parseFloat(3)))[0].children[0].className.substr(5,2) == 'p2'){
															validator = 'Player 2';
														}
													}
												}
											}
										}
									}
								}
							}
						}
						if(typeof $('.case'+(i+1)+'-'+(parseInt(col_num)+parseFloat(1)))[0] !== 'undefined'){
							if($('.case'+(i+1)+'-'+(parseInt(col_num)+parseFloat(1)))[0].children.length == 2){
								if($('.case'+(i+1)+'-'+(parseInt(col_num)+parseFloat(1)))[0].children[0].className.substr(5,2) == 'p2'){
									if(typeof $('.case'+(i+2)+'-'+(parseInt(col_num)+parseFloat(2)))[0] !== 'undefined'){
										if($('.case'+(i+2)+'-'+(parseInt(col_num)+parseFloat(2)))[0].children.length == 2){
											if($('.case'+(i+2)+'-'+(parseInt(col_num)+parseFloat(2)))[0].children[0].className.substr(5,2) == 'p2'){
												if(typeof $('.case'+(i+3)+'-'+(parseInt(col_num)+parseFloat(3)))[0] !== 'undefined'){
													if($('.case'+(i+3)+'-'+(parseInt(col_num)+parseFloat(3)))[0].children.length == 2){
														if($('.case'+(i+3)+'-'+(parseInt(col_num)+parseFloat(3)))[0].children[0].className.substr(5,2) == 'p2'){
															validator = 'Player 2';
														}
													}
												}
											}
										}
									}
								}
							}
						}	
					}
				}
			}
		}
	}
})(jQuery);