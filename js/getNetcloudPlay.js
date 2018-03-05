var link = $clipboard.link;
var items = link.split('/');
items.forEach(element => {
    $console.info(element)
});
var url;
if(items[3] == 'song'){
    url = "https://api.imjad.cn/cloudmusic/?type=song&id="+items[4]
}else{
    url = "https://api.imjad.cn/cloudmusic/?type=dj&id="+items[4]
}


$http.get({
    url: url,
    handler: function(resp) {
      var data = resp.data
      $console.info(data);
      $ui.render({
        views: [
            {
                type: "web",
                props: {
                    html: "<audio id='audio' autoplay loop controls='controls'"
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
                    make.height.equalTo(100)
                    make.width.equalTo(views.super)
                }
            }
            ,
            {
                type: "button",
                props: {
                    title: "X2倍速"
                },
                events: {
                    tapped: function (sender) {
                        var webView = $("webView")
                        webView.notify("setPlayRate", { "rate": 2 })
                    }
                },
                layout: function (make) {
                    make.height.equalTo(50)
                    make.width.equalTo(100)
                    make.left.equalTo(0)
                    make.top.equalTo(120)
                }
            }
            ,
            {
                type: "button",
                props: {
                    title: "X1.25倍速"
                },
                events: {
                    tapped: function (sender) {
                        var webView = $("webView")
                        webView.notify("setPlayRate", { "rate": 1.25 })
                    }
                },
                layout: function (make) {
                    make.height.equalTo(100)
                    make.width.equalTo(100)
                    make.left.equalTo(120)
                    make.top.equalTo(120)
                }
            }
            ,
            {
                type: "button",
                props: {
                    title: "X1.5倍速"
                },
                events: {
                    tapped: function (sender) {
                        var webView = $("webView")
                        webView.notify("setPlayRate", { "rate": 1.5 })
                    }
                },
                layout: function (make) {
                    make.height.equalTo(100)
                    make.width.equalTo(100)
                    make.left.equalTo(240)
                    make.top.equalTo(120)
                }
            }
            ,
            {
                type: "button",
                props: {
                    title: "X1倍速"
                },
                events: {
                    tapped: function (sender) {
                        var webView = $("webView")
                        webView.notify("setPlayRate", { "rate": 1 })
                    }
                },
                layout: function (make) {
                    make.height.equalTo(100)
                    make.width.equalTo(100)
                    make.left.equalTo(360)
                    make.top.equalTo(120)
                }
            }
        ]
    })
    }
  })


