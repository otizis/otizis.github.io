var begin = new Date(2014,10,29,18,0,0);

function getDJS(now){
	var date = new Date(begin.getTime());
	var year  = date.getFullYear();
	var years = 0;
	while(date < now){
		year += 1;
		years++;
		date.setFullYear(year);
	}
	$("#years").html(years);
	return getYQZG(now,date);
}
function getYQZG(begin,end){
	var dur = (end.getTime() - begin.getTime())/1000;

	var dayModel = castArr(dur , (60*60*24));
	var hourModel = castArr(dayModel.left,(60*60));
	var minModel = castArr(hourModel.left, 60);
	var second = castArr(minModel.left, 1);
	return [dayModel.time,hourModel.time,minModel.time,second.time];
}
function format(tArr){
	var disHour = addZero(tArr[1]);
	var disMin = addZero(tArr[2]);
	var disSec = addZero(tArr[3]);
	return tArr[0]+"天 "+ disHour+"小时 "+disMin+"分 "+disSec+"秒";
}
function addZero(num){
	if(num < 10){
		return "0" + num;
	}
	return num+"";
}

function castArr(time , cast){
	var left = time % cast;
	var c = (time - left)/cast;
	return {'time':c,'left':left};
}
function timedCount()
{
	var now = new Date();
	var t=getYQZG(begin,now);
	$("#djs").html(format(getDJS(now)));
	$("#yqzg").html(format(t));
	if(t[3] == 0){
		fireworks();
	}
	resetLover(t[3]);
	setTimeout("timedCount()",1000);
}
function fireworks(){
	var r= 4 + parseInt(Math.random()*6);
	for(var i=r; i--;)
	{
		setTimeout('createFirework(8,14,2,null,null,null,null,null,Math.random()>0.5,true)',(i+1)*(1+parseInt(Math.random()*1000)));
	}
}
var windowWidth ;
function resetLover(num){
	var index = num;
	if(num == 59|| num < 5){
		index = 0;
	}
	var widthMax  = (windowWidth-1)/2 - 40;
	var widthNow = (windowWidth-1)/2 - (widthMax/60)*index;
	//console.log("windowWidth"+windowWidth+","+"widthMax"+widthMax+",widthNow"+widthNow);
	$(".move").animate({width: widthNow+"px"}, 950);
}
$(document).ready(function(){
	timedCount();
	$(".all").height($(window).height());
	$(".all").click(function (){
		createFirework(8,14,2,null,null,null,null,null,Math.random()>0.5,true);
	});
	var bottomHeight = $(".bottom").height();
	$(".move").css("margin-top",((bottomHeight - 40)/2) + "px");
	windowWidth= $(".bottom").width();
});