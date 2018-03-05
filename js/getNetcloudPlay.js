var link = $clipboard.link;
var items = link.split('/');
var url;
if(items[3] == 'song'){
    url = "https://api.imjad.cn/cloudmusic/?type=song&id="+items[4]
}else{
    url = "https://api.imjad.cn/cloudmusic/?type=dj&id="+items[4]
}
if(!items[4]){
    $ui.alert({
        title: "失败",
        message: "没有获取到id："+link,
    })
    return;
}

$http.get({
    url: url,
    handler: function(resp) {
      var data = resp.data
      $console.info(JSON.stringify(data));
      $ui.render({
        views: [
            {
                type: "web",
                props: {
                    html: "<audio style='width:100%;height:30px' id='audio' autoplay loop controls='controls'"
                        + " src='"+data.data[0].url+"'></audio>"
                },
                events: {
                    setPlayRate: function (object) {
                        $console.info("enter set playrate:" + object.rate)
                        var audio = document.getElementById("audio");
                        audio.playbackRate = object.rate;
                    }
                },
                layout: function (make, views) {
                    make.top.equalTo(0);
                    make.height.equalTo(200)
                    make.width.equalTo(views.super)
                }
            }
            ,
            {
                type: "button",
                props: {
                    title: "设置"
                },
                events: {
                    tapped: function (sender) {
                        var webView = $("web")
                        var slider = $("slider")
                        $console.info("enter set playrate:" + slider)
                        webView.notify("setPlayRate", { "rate": slider.value })
                    }
                },
                layout: function (make) {
                    make.height.equalTo(50)
                    make.width.equalTo(100)
                    make.left.equalTo(0)
                    make.top.equalTo(220)
                }
            }
            ,
            {
                type: "slider",
                props: {
                  value: 1,
                  max: 2.0,
                  min: 1.0
                },
                layout: function(make, view) {
                    make.height.equalTo(50)
                    make.width.equalTo(views.super)
                    make.left.equalTo(0)
                    make.top.equalTo(340)
                }
              }
            
        ]
    })
    }
  })
