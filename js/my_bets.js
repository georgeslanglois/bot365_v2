$(document).ready(function(){


//Se não estiver numa tela do MyBets, não faz nada
if (!location.hash.includes('MyBets')) return;



console.log('MyBets');

var myBetsList;

//Loope principal
setInterval(function(){
	login();
	
	//Se não estiver no Live Now, coloca 
	if ( $('.myb-OpenBetFallbackHeader_DropDownSelector').text()!='Unsettled' ) $('.myb-OpenBetFallbackHeader_Button:contains(Unsettled)').click();
	
	
	myBetsList=[];
	
	$('.myb-OpenBetItem').each(function(){  
		myBetsList.push({
			mercado: $(this).find('.myb-OpenBetParticipant_MarketDescription').text(),
            match: $(this).find('.myb-OpenBetParticipant_FixtureDescription').clone().children().remove().end().text(),	
			cash_out_return: Number($(this).find('.myb-CloseBetButton_Return').text().split(' ')[0]),
			obj: $(this)
		});

	});
	
	myBetsList.sort(function(a,b){
		if(a.mercado+a.match==b.mercado+b.match) return 0;
		return a.mercado+a.match>b.mercado+b.match ? 1 :-1;
	});
	
	localStorage['myBetsList']=JSON.stringify(myBetsList);
	localStorage['myBetsLastUpdate']=(+new Date());
	
	
	
},1000);


//Se encontrar alguma aposta duplicada tenta fazer o cash out e reiniciar
setInterval(function(){

	
	for(var i=0; i<myBetsList.length-1; i++){		
		if(myBetsList[i].mercado+myBetsList[i].match==myBetsList[i+1].mercado+myBetsList[i+1].match){
			$('.myb-OpenBetItem:contains('+myBetsList[i].mercado+'):contains('+myBetsList[i].match+'):eq(0) .myb-CloseBetButton_Return').click();
			setTimeout(function(){
				$('.myb-OpenBetItem:contains('+myBetsList[i].mercado+'):contains('+myBetsList[i].match+'):eq(0) .myb-CloseBetButton_Return').dblclick();
			},500);
			
			setTimeout(function(){
				location.reload();
			},15000)
		}
	}

},20000);


//Reinicia a aba mybets a cada 3 minutos
setInterval(function(){
    location.reload();
},3*60*1000 );
	
});
