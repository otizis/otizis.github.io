var fc;function Animator(){var a=this;writeDebug("Animator()");this.tweens=[];this.tweens["default"]=[1,2,3,4,5,6,7,8,9,10,9,8,7,6,5,4,3,2,1];this.tweens.blast=[12,12,11,10,10,9,8,7,6,5,4,3,2,1];this.tweens.fade=[10,10,10,10,10,10,10,10,10,10];this.queue=[];this.queue.IDs=[];this.active=false;this.timer=null;this.createTween=function(j,c,g){g=g||"default";var f=[j];var e=j;var h=c-j;var b=a.tweens[g].length;for(var d=0;d<b;d++){e+=h*a.tweens[g][d]*0.01;f[d]={};f[d].data=e;f[d].event=null}return f};this.enqueue=function(e,b,c){var d;if(!b){writeDebug("animator.enqueue(): missing fMethod")}if(typeof(a.queue.IDs[e.oID])=="undefined"){d=a.queue.length;a.queue.IDs[e.oID]=d;a.queue[d]=e}else{d=a.queue.IDs[e.oID];a.queue[d].active=true;a.queue[d].frame=0}e.active=true;a.queue[d]._method=b;a.queue[d]._oncomplete=c?c:null};this.animate=function(){var c=0;for(var b=a.queue.length;b--;){if(a.queue[b].active){a.queue[b]._method();c++}}if(c===0&&a.timer){a.stop()}else{}};this.start=function(){if(a.timer||a.active){return false}a.active=true;a.timer=setInterval(a.animate,fc.intervalRate)};this.stop=function(){clearInterval(a.timer);a.timer=null;a.active=false;a.queue=[];a.queue.IDs=[]}}function FireworksController(){var a=this;this.intervalRate=20;this.DEBUG=true;this.oFW=null;this.isIE=!!(navigator.userAgent.match(/msie/i));this.isOpera=!!(navigator.userAgent.match(/opera/i));if(this.isOpera){this.isIE=false}this.fireworks=[];this.animator=null;this.gOID=0;this.particleTypes=6;this.particleXY=10;this.tweenFade=[100,90,80,70,60,50,40,30,20,10,0];this.isSafari=!!(navigator.appVersion.match(/webkit/i));this.canvasX=null;this.canvasY=null;this.screenY=null;a.scrollY=null;a.getWindowCoords=function(){a.canvasX=(document.documentElement.clientWidth||document.body.clientWidth||document.body.scrollWidth);a.canvasY=(document.documentElement.clientHeight||document.body.clientHeight||document.body.scrollHeight);a.screenY=a.canvasY;a.scrollY=parseInt(window.scrollY||document.documentElement.scrollTop||document.body.scrollTop,10);a.canvasY+=a.scrollY};this.getWindowCoordsAlt=function(){a.canvasX=window.innerWidth-16;a.canvasY=window.innerHeight;a.screenY=a.canvasY;a.scrollY=parseInt(window.scrollY||document.documentElement.scrollTop||document.body.scrollTop,10);a.canvasY+=a.scrollY};this.getPanX=function(b){b=parseInt(b,10);var c=b/a.canvasX;if(c<0.4){c*=-1}else{if(c>=0.4&&c<=0.6){c=0.5}}c=parseInt(c*100,10);return c};this.isEmpty=function(b){return(typeof(b)=="undefined"||(b===null&&b!==0)||(b===""&&b!==0)||b=="null")};this.init=function(){a.oFW=document.getElementById("fw");a.oFP=document.getElementById("fp");if(typeof(enableDebugMode)!="undefined"&&(a.DEBUG||window.location.toString().toLowerCase().indexOf("debug")>=0)){enableDebugMode()}a.getWindowCoords();a.animator=new Animator()};this.destructor=function(){for(var b=a.fireworks.length;b--;){a.fireworks[b]=null}a.fireworks=null};if(this.isSafari||this.isOpera){this.getWindowCoords=this.getWindowCoordsAlt}}function Firework(j,h,g,q,o,k,d,c,f,m,b){var n=this;this.oID="fp"+(fc.gOID++);var a="";for(var e=0;e<arguments.length-1;e++){a+=arguments[e]+","}a+=arguments[e];writeDebug("firework("+a+")");this.oC=j;this.o=fc.oFW.cloneNode(!fc.isIE?true:false);this.particles=[];this.vX=-1;this.vY=-4;this.x=h;this.y=g;this.allowRandom=m;this.obeyBoundaries=b;this.frame=0;this.tween=[];this.active=false;this.moveTo=function(i,p){n.o.style.left=i+"px";n.o.style.top=p+"px";n.x=i;n.y=p};this.slideTo=function(i,p){n.tween=[fc.animator.createTween(n.x,i,"blast"),fc.animator.createTween(n.y,p,"blast")];fc.animator.enqueue(n,n.animate,n.aniExplode)};this.aniExplode=function(){n.o.style.background="none";n.o.style.border="none";for(var r=n.particles.length;--r;){n.particles[r].o.style.display="block";fc.animator.enqueue(n.particles[r],n.particles[r].animate)}n.particles[r].o.style.display="block";fc.animator.enqueue(n.particles[r],n.particles[r].animate,n.beginFade);var p="boom"+parseInt(Math.random()*8,10)};this.beginFade=function(){n.tween=fc.animator.createTween(1,0,"fade");fc.animator.enqueue(n,n.aniFade,n.destructor)};this.aniFade=function(){for(var p=n.particles.length;p--;){n.particles[p].moveRel();n.particles[p].nextState();n.particles[p].setOpacity(fc.tweenFade[n.frame])}if(n.frame++>=n.tween.length){n.active=false;n.frame=0;if(n._oncomplete){n._oncomplete()}n._oncomplete=null;return false}return true};this.destructor=function(){writeDebug("firework.destructor()");for(var p=n.particles.length;p--;){n.particles[p].destructor();n.particles[p]=null}n.particles=null;n.oC.removeChild(n.o);n.o=null;n.oC=null};this.animate=function(){n.moveTo(n.tween[0][n.frame].data,n.tween[1][n.frame].data,"burst");if(n.frame++>=n.tween[0].length-1){n.active=false;n.frame=0;if(n._oncomplete){n._oncomplete()}n._oncomplete=null;return false}return true};this.createBurst=function(B,r,p,C){writeDebug("firework.createBurst("+B+","+r+","+p+","+C+")");var w=0,v=0;var x=0;var y=p/B;var A=y;var t=0;var u=0;var F=(n.allowRandom?(0.33+Math.random()):1);var s=[];var E=Math.random()>0.5;var z=[C,B>1?parseInt(Math.random()*fc.particleTypes,10):C];var D=null;for(w=0;w<B;w++){s[w]=parseInt(r*(w+1)/B*1/B,10)||1;t=u;u=360/s[w];D=z[w%2];for(v=0;v<s[w];v++){n.particles[x]=new FireworkParticle(n.o,n.allowRandom,D,q,o,n.obeyBoundaries);n.particles[x].slideTo(A*Math.cos(t*Math.PI/180),A*F*Math.sin(t*Math.PI/180));t+=u;x++}A+=y}};n.oC.appendChild(n.o);n.moveTo(n.x,n.y);n.createBurst(f,c,d,k);n.slideTo(q,o);var l="fire"+parseInt(Math.random()*2,10);fc.animator.start()}function FireworkParticle(a,c,g,f,e,d){var b=this;this.oC=a;this.oID="fp"+(fc.gOID++);this.o=fc.oFP.cloneNode(true);this.obeyBoundaries=d;this.type=null;this.oImg=this.o.getElementsByTagName("img")[0];this.oImg._src=this.oImg.src;this.o.style.display="none";this.baseX=f;this.baseY=e;this.x=0;this.y=0;this.vx=0;this.vy=0;this.frame=0;this.tween=[];this.active=null;this.tweenType="blast";this.states=[];this.state=parseInt(Math.random()*3,10);this.isRandom=c;this._mt=5;this.moveTo=function(h,i){b.o.style.left=h+"px";b.o.style.top=i+"px";b.vx=h-b.x;b.vy=i-b.y;b.x=h;b.y=i};this.moveRel=function(){var l=b.x+b.vx;var j=b.y+b.vy;if(b.obeyBoundaries){var k=fc.canvasX-b.baseX-fc.particleXY;var i=fc.canvasY-b.baseY-fc.particleXY;var h=fc.scrollY;if(b.vx>=0){if(l>=k){b.vx*=-1}}else{if(b.vx<0&&l+b.baseX<=0){b.vx*=-1}}if(b.vy>=0){if(j>=i){b.vy*=-1}}else{if(b.vy<0){if(j+b.baseY-h<=0){b.vy*=-1}}}}b.moveTo(b.x+b.vx,b.y+b.vy)};this.setOpacity=function(h){b.oImg.style.marginLeft=-100+(h*fc.particleXY/10)+"px"};this.nextState=function(){var h=b.o.style.visibility;if(b.state==2&&h!="hidden"){b.o.style.visibility="hidden"}else{if(b.state!=2&&h=="hidden"){b.o.style.visibility="visible"}}b.state=parseInt(Math.random()*3,10)};this.slideTo=function(h,p){if(b.isRandom){h+=(h*0.2*(Math.random()>0.5?1:-1));p+=(p*0.2*(Math.random()>0.5?1:-1))}b.tween=[fc.animator.createTween(b.x,h,b.tweenType),fc.animator.createTween(b.y,p,b.tweenType)];var m=fc.canvasX-fc.particleXY;var k=fc.canvasY-fc.particleXY;var j=fc.particleXY-b.baseX;var q=fc.scrollY;var o=null;var n=null;if(b.obeyBoundaries){for(var l=b.tween[0].length;l--;){o=b.tween[0][l].data+b.baseX;n=b.tween[1][l].data+b.baseY;if(o>=m){b.tween[0][l].data-=(o-m)*2}else{if(o<0){b.tween[0][l].data-=(o*2)}}if(n>=k){b.tween[1][l].data-=(n-k)*2}else{if(n-q<=0){b.tween[1][l].data-=(n-q)*2}}}}};this.animate=function(){var i=b.tween[0][b.frame].data;var h=b.tween[1][b.frame].data;b.moveTo(i,h);if(b.frame++>=b.tween[0].length-1){if(b._oncomplete){b._oncomplete()}b._oncomplete=null;b.active=false;b.frame=0;return false}else{if(b.frame>10){b.nextState()}}return true};this.destructor=function(){b.oImg=null;b.oC.removeChild(b.o);b.oC=null;b.o=null};this.setType=function(h){b.type=h;b.oImg.style.marginTop=-(fc.particleXY*h)+"px"};b.setType(g);b.oC.appendChild(b.o)}function createFirework(c,b,f,k,h,g,m,l,j,a){var e="";for(var d in arguments){if(arguments.hasOwnProperty(d)){e+=d+","}}writeDebug("createFirework("+e+")");if(fc.isEmpty(h)){h=parseInt(Math.random()*fc.canvasX,10)}else{h=parseInt(fc.canvasX*h/100,10)}if(fc.isEmpty(g)){g=fc.canvasY-fc.particleXY}else{g=fc.canvasY-fc.screenY+parseInt(fc.screenY*g/100,10)}if(fc.isEmpty(m)){m=parseInt(fc.canvasX*0.1+(Math.random()*fc.canvasX*0.8),10)}else{m=parseInt(fc.canvasX*m/100,10)}if(fc.isEmpty(l)){l=fc.canvasY-parseInt(Math.random()*fc.screenY,10)}else{l=fc.canvasY-parseInt(fc.screenY*(100-l)/100,10)}if(fc.isEmpty(k)){k=parseInt(Math.random()*fc.particleTypes,10)}if(fc.isEmpty(c)){c=64+parseInt(Math.random()*fc.screenY*0.75,10)}else{if(c.toString().indexOf("%")>=0){c=parseInt(parseInt(c,10)/100*fc.screenY,10)}else{if(c.toString().indexOf(".")>=0){c=parseInt(c*fc.screenY,10)}else{c=parseInt(c*fc.screenY/100,10)}}}if(fc.isEmpty(b)){b=4+parseInt(Math.random()*64,10)}if(fc.isEmpty(f)){f=Math.random()>0.5?2:1}if(fc.isEmpty(j)){j=Math.random()>0.5}if(fc.isEmpty(a)){a=Math.random()>0.5}fc.getWindowCoords();fc.fireworks[fc.fireworks.length]=new Firework(document.getElementById("fireContainer"),h,g,m,l,k,c,b,f,j,a)}fc=new FireworksController();if(typeof(writeDebug)=="undefined"){window.writeDebug=function(){return false}}function addEventHandler(c,b,a){return(typeof(attachEvent)=="undefined"?c.addEventListener(b,a,false):c.attachEvent("on"+b,a))}function removeEventHandler(c,b,a){return(typeof(attachEvent)=="undefined"?c.removeEventListener(b,a,false):c.detachEvent("on"+b,a))}addEventHandler(window,"resize",fc.getWindowCoords);addEventHandler(window,"scroll",fc.getWindowCoords);addEventHandler(window,"load",fc.init);addEventHandler(window,"unload",fc.destructor);