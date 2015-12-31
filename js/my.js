var begin = new Date(2014,10,29,18,0,0);
var windowWidth = $(window).width();
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
	return tArr[0]+"天 "+ tArr[1]+"小时 "+tArr[2]+"分 "+tArr[3]+"秒";
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
function resetLover(num){
	if(num < 5 ){
		return;
	}
	var widthMax  = (windowWidth-40)/2;
	var widthPerSecond = (widthMax-20)/60;
	var widthNow = 20 + widthPerSecond*num;
	$(".move").animate({width: widthNow+"px"}, 900);
}
$(document).ready(function(){
	timedCount();
	$(".all").height($(window).height());
	
});