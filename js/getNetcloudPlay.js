var link = $clipboard.link;
var items = link.split('/');
var url;
if (items[3] == 'song') {
    url = "https://api.imjad.cn/cloudmusic/?type=song&id=" + items[4]
} else {
    url = "https://api.imjad.cn/cloudmusic/?type=dj&id=" + items[4]
}
if (!items[4]) {
    $ui.alert({
        title: "失败",
        message: "没有获取到id：" + link,
    })
    return;
}

$http.get({
    url: url,
    handler: function (resp) {
        var data = resp.data
        $console.info(JSON.stringify(data));
        $ui.render({
            views: [
                {
                    type: "web",
                    props: {
                        html: "<audio style='width:100%;height:30px' id='audio' autoplay loop controls='controls'"
                            + " src='" + data.data[0].url + "'></audio>",
                        script: function () {
                            function setPlayRate(params) {
                                document.getElementById("audio").playbackRate = params.rate;
                            }
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
                    type: "stepper",
                    props: {
                        max: 20,
                        min: 5,
                        value: 10
                    },
                    layout: function (make, view) {
                        make.centerX.equalTo(view.super)
                        make.top.equalTo(240)
                    },
                    events: {
                        changed: function (sender) {
                            $console.info(JSON.stringify(sender));
                            $("label").text=1.5
                            $("web").eval(
                                {
                                    script: 'document.getElementById("audio").playbackRate=' + 1.5
                                }
                            )
                        }
                    }
                },
                {
                    type: "label",
                    props: {
                      text: "1",
                      align: $align.center
                    },
                    layout: function(make, view) {
                      make.center.equalTo(view.super)
                      make.top.equalTo(400)
                    }
                  }

            ]
        })
    }
})


