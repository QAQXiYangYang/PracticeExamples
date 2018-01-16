URLStatic = 'http://test.service.rgbvr.com/';
URLPost = URLStatic + 'showserver/rest/';
URLFile = 'http://testimage.qn.rgbvr.com/'; //图片

URLStatic = 'https://test.wawa.rgbvr.com/';//测试地址  正式服 https://service.wawa.rgbvr.com/
URLPost = URLStatic + 'wawaServer/rest/';
URLFile = 'http://images.qn.rgbvr.com/'; //图片

URLto = 'http://test.service.rgbvr.com/';//跳转详情页的地址

//判断浏览器类型
+(function () {

    //微信ID
    var wxID = 'wxb392bbab97dca39f';
    var wxTip = document.getElementById('wxTip');
    var download = document.getElementById('download');
    var phoneType = '';
    var u = navigator.userAgent;//获取浏览器信息
    if(is_weixin()){
//            phoneType = 'wx';
        if (u.indexOf('Android') > -1||u.indexOf('Linux') > -1){
            phoneType = 'wx';
        }else if(u.indexOf('iPhone')){
            phoneType = 'iphone'
        }
    }else if (u.indexOf('Android') > -1) {//安卓手机
        phoneType = 'android';
    } else if(u.indexOf('Linux') > -1){//安卓手机
        phoneType = 'android';
    }else if(u.indexOf('iPhone') > -1){//苹果手机
        phoneType = 'iphone'
    }

//是否在微信内打开
    function is_weixin() {
        var ua = u.toLowerCase();
        if (ua.match(/MicroMessenger/i) == "micromessenger") {
            return true;
        }else {
            return false;
        }
    }

    //下载点击事件
    download.onclick = function () {
        if(phoneType=='wx'){
            wxTip.setAttribute('style','display:block');
        }else if(phoneType == 'android'){
            window.location.href = 'https://service.wawa.rgbvr.com/wawaServer/rest/version/download?channel=h5wawa';
        }else if(phoneType == 'iphone'){
//                alert(" Android版本已上线，iOS版本敬请期待！");
            window.location.href = 'https://itunes.apple.com/us/app/%E6%AC%A2%E4%B9%90%E6%8A%93%E5%A8%83%E5%A8%83/id1281524555?ls=1&mt=8';
        }
    };

    //触摸屏幕取消模态框
    wxTip.onclick = function () {
        wxTip.setAttribute('style','display:none');
    };

    //使页面占满整屏幕
    var bgImg = document.getElementById('bg');
    var bgWidth = window.innerWidth;
    var bgHeight = window.innerHeight;
    var code = document.getElementById('code');
    var inviteCode = document.getElementsByClassName('inviteCode')[0];

    bgImg.setAttribute('style','width:'+bgWidth+'px;height:'+bgHeight+'px');


    if ('addEventListener' in document) {
        document.addEventListener('DOMContentLoaded', function () {
            FastClick.attach(document.body);
        }, false);
    }

    //获取地址栏邀请码
    function GetQueryString(name)
    {
        var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if(r!=null)return  r[2];
        inviteCode.setAttribute('style','display:none');
        return null;
    }
    code.innerHTML = GetQueryString('code');


    //实现微信内分享自定义图标和内容
    if (is_weixin()){
        $.ajax({
            type:'post',
            url:'https://wawa.rgbvr.com/wawaServer/rest/misc/weixin/js/config',
            data:JSON.stringify({
                'wxAppId':wxID,
                'url':location.href
            }),
            contentType:"application/json",
            success:function (result) {
                wx.config({
                    debug: false,
                    appId: wxID,
                    timestamp: result.data.timestamp,
                    nonceStr: result.data.nonceStr,
                    signature: result.data.signature,
//                timestamp: "1502980698",
//                nonceStr: "87d52963-01da-4102-8a23-555e2e132c73",
//                signature: "36912a5d32d52c8954ad5f212ecddf3a3171408a",
                    jsApiList: [
                        'checkJsApi',//判断当前客户端版本是否支持指定JS接口
                        'onMenuShareTimeline',
                        'onMenuShareAppMessage'] // 功能列表，我们要使用JS-SDK的什么功能
                });

                wx.ready(function(){
                    // 获取“分享到朋友圈”按钮点击状态及自定义分享内容接口
                    wx.onMenuShareTimeline({
                        title: "欢乐抓娃娃 - 免费手机抓娃娃，全国包邮，输入我的邀请码"+(GetQueryString('code')||'831127')+"，登录就送娃娃币！", // 分享标题
                        link: location.href,
                        imgUrl: "https://images.qn.rgbvr.com/misc/1502894024145image_20170816223344" // 分享图标

                    });
                    // 获取“分享给朋友”按钮点击状态及自定义分享内容接口
                    wx.onMenuShareAppMessage({
                        title: '欢乐抓娃娃', // 分享标题
                        desc: "免费手机抓娃娃，全国包邮，输入我的邀请码"+(GetQueryString('code')||'831127')+"，登录就送娃娃币！", // 分享描述
                        link: location.href,
                        imgUrl: "https://images.qn.rgbvr.com/misc/1502894024145image_20170816223344", // 分享图标
                        type: 'link', // 分享类型,music、video或link，不填默认为link
                        success: function (res) {
//                                alert('success');
                        },
                        cancel: function (res) {
//                                alert('已取消');
                        },
                        fail: function (res) {
//                                alert(res.errMsg);
                        }

                    });

                });
                //        wx.error(function (res) {
                //            alert('微信获取失败'+res)
                //        })
// config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，
// 所以如果需要在 页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。
// 对于用户触发时才调用的接口，则可以直接调用，不需要放在ready 函数中。
            },
            /*error:function (res) {
                alert('请求失败'+res)
            }*/

        })
    }

    //手动给页面添加<meta property="og:description" content="免费手机抓娃娃，全国包邮，输入我的邀请码%s，登录就送娃娃币！">
    var meta = '<meta property="og:description" content="免费手机抓娃娃，全国包邮，输入我的邀请码'+(GetQueryString('code')||'831127')+'，登录就送娃娃币！">';
    var meta1 = '<meta name="description" itemprop="description" content="免费手机抓娃娃，全国包邮，输入我的邀请码'+(GetQueryString('code')||'831127')+'，登录就送娃娃币！">';
    $('head').prepend(meta);
    $('head').prepend(meta1);

}())
//判断浏览器类型
+(function () {

    //微信ID
    var wxID = 'wxb392bbab97dca39f';
    var wxTip = document.getElementById('wxTip');
    var download = document.getElementById('download');
    var phoneType = '';
    var u = navigator.userAgent;//获取浏览器信息
    if(is_weixin()){
//            phoneType = 'wx';
        if (u.indexOf('Android') > -1||u.indexOf('Linux') > -1){
            phoneType = 'wx';
        }else if(u.indexOf('iPhone')){
            phoneType = 'iphone'
        }
    }else if (u.indexOf('Android') > -1) {//安卓手机
        phoneType = 'android';
    } else if(u.indexOf('Linux') > -1){//安卓手机
        phoneType = 'android';
    }else if(u.indexOf('iPhone') > -1){//苹果手机
        phoneType = 'iphone'
    }

//是否在微信内打开
    function is_weixin() {
        var ua = u.toLowerCase();
        if (ua.match(/MicroMessenger/i) == "micromessenger") {
            return true;
        }else {
            return false;
        }
    }

    //下载点击事件
    download.onclick = function () {
        if(phoneType=='wx'){
            wxTip.setAttribute('style','display:block');
        }else if(phoneType == 'android'){
            window.location.href = 'https://service.wawa.rgbvr.com/wawaServer/rest/version/download?channel=baiduzhuanqu';
        }else if(phoneType == 'iphone'){
//                alert(" Android版本已上线，iOS版本敬请期待！");
            window.location.href = 'https://itunes.apple.com/us/app/%E6%AC%A2%E4%B9%90%E6%8A%93%E5%A8%83%E5%A8%83/id1281524555?ls=1&mt=8';
        }
    };

    //触摸屏幕取消模态框
    wxTip.onclick = function () {
        wxTip.setAttribute('style','display:none');
    };

    //使页面占满整屏幕
    var bgImg = document.getElementById('bg');
    var bgWidth = window.innerWidth;
    var bgHeight = window.innerHeight;
    var code = document.getElementById('code');
    var inviteCode = document.getElementsByClassName('inviteCode')[0];

    bgImg.setAttribute('style','width:'+bgWidth+'px;height:'+bgHeight+'px');


    if ('addEventListener' in document) {
        document.addEventListener('DOMContentLoaded', function () {
            FastClick.attach(document.body);
        }, false);
    }

    //获取地址栏邀请码
    function GetQueryString(name)
    {
        var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if(r!=null)return  r[2];
        inviteCode.setAttribute('style','display:none');
        return null;
    }
    code.innerHTML = GetQueryString('code');


    //实现微信内分享自定义图标和内容
    if (is_weixin()){
        $.ajax({
            type:'post',
            url:'https://wawa.rgbvr.com/wawaServer/rest/misc/weixin/js/config',
            data:JSON.stringify({
                'wxAppId':wxID,
                'url':location.href
            }),
            contentType:"application/json",
            success:function (result) {
                wx.config({
                    debug: false,
                    appId: wxID,
                    timestamp: result.data.timestamp,
                    nonceStr: result.data.nonceStr,
                    signature: result.data.signature,
//                timestamp: "1502980698",
//                nonceStr: "87d52963-01da-4102-8a23-555e2e132c73",
//                signature: "36912a5d32d52c8954ad5f212ecddf3a3171408a",
                    jsApiList: [
                        'checkJsApi',//判断当前客户端版本是否支持指定JS接口
                        'onMenuShareTimeline',
                        'onMenuShareAppMessage'] // 功能列表，我们要使用JS-SDK的什么功能
                });

                wx.ready(function(){
                    // 获取“分享到朋友圈”按钮点击状态及自定义分享内容接口
                    wx.onMenuShareTimeline({
                        title: "欢乐抓娃娃 - 免费手机抓娃娃，全国包邮，输入我的邀请码"+(GetQueryString('code')||'831127')+"，登录就送娃娃币！", // 分享标题
                        link: location.href,
                        imgUrl: "https://images.qn.rgbvr.com/misc/1502894024145image_20170816223344" // 分享图标

                    });
                    // 获取“分享给朋友”按钮点击状态及自定义分享内容接口
                    wx.onMenuShareAppMessage({
                        title: '欢乐抓娃娃', // 分享标题
                        desc: "免费手机抓娃娃，全国包邮，输入我的邀请码"+(GetQueryString('code')||'831127')+"，登录就送娃娃币！", // 分享描述
                        link: location.href,
                        imgUrl: "https://images.qn.rgbvr.com/misc/1502894024145image_20170816223344", // 分享图标
                        type: 'link', // 分享类型,music、video或link，不填默认为link
                        success: function (res) {
//                                alert('success');
                        },
                        cancel: function (res) {
//                                alert('已取消');
                        },
                        fail: function (res) {
//                                alert(res.errMsg);
                        }

                    });

                });
                //        wx.error(function (res) {
                //            alert('微信获取失败'+res)
                //        })
// config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，
// 所以如果需要在 页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。
// 对于用户触发时才调用的接口，则可以直接调用，不需要放在ready 函数中。
            },
            /*error:function (res) {
                alert('请求失败'+res)
            }*/

        })
    }

    //手动给页面添加<meta property="og:description" content="免费手机抓娃娃，全国包邮，输入我的邀请码%s，登录就送娃娃币！">
    var meta = '<meta property="og:description" content="免费手机抓娃娃，全国包邮，输入我的邀请码'+(GetQueryString('code')||'831127')+'，登录就送娃娃币！">';
    var meta1 = '<meta name="description" itemprop="description" content="免费手机抓娃娃，全国包邮，输入我的邀请码'+(GetQueryString('code')||'831127')+'，登录就送娃娃币！">';
    $('head').prepend(meta);
    $('head').prepend(meta1);

}())
//判断浏览器类型
+(function () {

    //微信ID
    var wxID = 'wxb392bbab97dca39f';
    var wxTip = document.getElementById('wxTip');
    var download = document.getElementById('download');
    var phoneType = '';
    var u = navigator.userAgent;//获取浏览器信息
    if(is_weixin()){
//            phoneType = 'wx';
        if (u.indexOf('Android') > -1||u.indexOf('Linux') > -1){
            phoneType = 'wx';
        }else if(u.indexOf('iPhone')){
            phoneType = 'iphone'
        }
    }else if (u.indexOf('Android') > -1) {//安卓手机
        phoneType = 'android';
    } else if(u.indexOf('Linux') > -1){//安卓手机
        phoneType = 'android';
    }else if(u.indexOf('iPhone') > -1){//苹果手机
        phoneType = 'iphone'
    }

//是否在微信内打开
    function is_weixin() {
        var ua = u.toLowerCase();
        if (ua.match(/MicroMessenger/i) == "micromessenger") {
            return true;
        }else {
            return false;
        }
    }

    //下载点击事件
    download.onclick = function () {
        if(phoneType=='wx'){
            wxTip.setAttribute('style','display:block');
        }else if(phoneType == 'android'){
            window.location.href = 'https://service.wawa.rgbvr.com/wawaServer/rest/version/download?channel=h5wawa';
        }else if(phoneType == 'iphone'){
//                alert(" Android版本已上线，iOS版本敬请期待！");
            window.location.href = 'https://itunes.apple.com/us/app/%E6%AC%A2%E4%B9%90%E6%8A%93%E5%A8%83%E5%A8%83/id1281524555?ls=1&mt=8';
        }
    };

    //触摸屏幕取消模态框
    wxTip.onclick = function () {
        wxTip.setAttribute('style','display:none');
    };

    //使页面占满整屏幕
    var bgImg = document.getElementById('bg');
    var bgWidth = window.innerWidth;
    var bgHeight = window.innerHeight;
    var code = document.getElementById('code');
    var inviteCode = document.getElementsByClassName('inviteCode')[0];

   // bgImg.setAttribute('style','width:'+bgWidth+'px;height:'+bgHeight+'px');


    if ('addEventListener' in document) {
        document.addEventListener('DOMContentLoaded', function () {
            FastClick.attach(document.body);
        }, false);
    }

    //获取地址栏邀请码
    function GetQueryString(name)
    {
        var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if(r!=null)return  r[2];
        inviteCode.setAttribute('style','visibility: hidden');
        return null;
    }
    code.innerHTML = GetQueryString('code');


    //实现微信内分享自定义图标和内容
    if (is_weixin()){
        $.ajax({
            type:'post',
            url:'https://wawa.rgbvr.com/wawaServer/rest/misc/weixin/js/config',
            data:JSON.stringify({
                'wxAppId':wxID,
                'url':location.href
            }),
            contentType:"application/json",
            success:function (result) {
                wx.config({
                    debug: false,
                    appId: wxID,
                    timestamp: result.data.timestamp,
                    nonceStr: result.data.nonceStr,
                    signature: result.data.signature,
//                timestamp: "1502980698",
//                nonceStr: "87d52963-01da-4102-8a23-555e2e132c73",
//                signature: "36912a5d32d52c8954ad5f212ecddf3a3171408a",
                    jsApiList: [
                        'checkJsApi',//判断当前客户端版本是否支持指定JS接口
                        'onMenuShareTimeline',
                        'onMenuShareAppMessage'] // 功能列表，我们要使用JS-SDK的什么功能
                });

                wx.ready(function(){
                    // 获取“分享到朋友圈”按钮点击状态及自定义分享内容接口
                    wx.onMenuShareTimeline({
                        title: "欢乐抓娃娃 -  一元特价抓娃娃，全国包邮，输入我的邀请码"+(GetQueryString('code')||'831127')+"，登录就送娃娃币！", // 分享标题
                        link: location.href,
                        imgUrl: "https://images.qn.rgbvr.com/misc/1502894024145image_20170816223344" // 分享图标

                    });
                    // 获取“分享给朋友”按钮点击状态及自定义分享内容接口
                    wx.onMenuShareAppMessage({
                        title: '欢乐抓娃娃', // 分享标题
                        desc: "免费手机抓娃娃，全国包邮，输入我的邀请码"+(GetQueryString('code')||'831127')+"，登录就送娃娃币！", // 分享描述
                        link: location.href,
                        imgUrl: "https://images.qn.rgbvr.com/misc/1502894024145image_20170816223344", // 分享图标
                        type: 'link', // 分享类型,music、video或link，不填默认为link
                        success: function (res) {
//                                alert('success');
                        },
                        cancel: function (res) {
//                                alert('已取消');
                        },
                        fail: function (res) {
//                                alert(res.errMsg);
                        }

                    });

                });
                //        wx.error(function (res) {
                //            alert('微信获取失败'+res)
                //        })
// config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，
// 所以如果需要在 页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。
// 对于用户触发时才调用的接口，则可以直接调用，不需要放在ready 函数中。
            },
            /*error:function (res) {
             alert('请求失败'+res)
             }*/

        })
    }

    //手动给页面添加<meta property="og:description" content="免费手机抓娃娃，全国包邮，输入我的邀请码%s，登录就送娃娃币！">
    var meta = '<meta property="og:description" content="免费手机抓娃娃，全国包邮，输入我的邀请码'+(GetQueryString('code')||'831127')+'，登录就送娃娃币！">';
    var meta1 = '<meta name="description" itemprop="description" content="免费手机抓娃娃，全国包邮，输入我的邀请码'+(GetQueryString('code')||'831127')+'，登录就送娃娃币！">';
    $('head').prepend(meta);
    $('head').prepend(meta1);

}())
//判断浏览器类型
+(function () {

    //微信ID
    var wxID = 'wxb392bbab97dca39f';
    var wxTip = document.getElementById('wxTip');
    var download = document.getElementById('download');
    var phoneType = '';
    var u = navigator.userAgent;//获取浏览器信息
    if(is_weixin()){
//            phoneType = 'wx';
        if (u.indexOf('Android') > -1||u.indexOf('Linux') > -1){
            phoneType = 'wx';
        }else if(u.indexOf('iPhone')){
            phoneType = 'iphone'
        }
    }else if (u.indexOf('Android') > -1) {//安卓手机
        phoneType = 'android';
    } else if(u.indexOf('Linux') > -1){//安卓手机
        phoneType = 'android';
    }else if(u.indexOf('iPhone') > -1){//苹果手机
        phoneType = 'iphone'
    }

//是否在微信内打开
    function is_weixin() {
        var ua = u.toLowerCase();
        if (ua.match(/MicroMessenger/i) == "micromessenger") {
            return true;
        }else {
            return false;
        }
    }

    //下载点击事件
    download.onclick = function () {
        if(phoneType=='wx'){
            wxTip.setAttribute('style','display:block');
        }else if(phoneType == 'android'){
            window.location.href = 'https://service.wawa.rgbvr.com/wawaServer/rest/version/download?channel=guangdiantongh5';
        }else if(phoneType == 'iphone'){
//                alert(" Android版本已上线，iOS版本敬请期待！");
            window.location.href = 'https://itunes.apple.com/us/app/%E6%AC%A2%E4%B9%90%E6%8A%93%E5%A8%83%E5%A8%83/id1281524555?ls=1&mt=8';
        }
    };

    //触摸屏幕取消模态框
    wxTip.onclick = function () {
        wxTip.setAttribute('style','display:none');
    };

    //使页面占满整屏幕
    var bgImg = document.getElementById('bg');
    var bgWidth = window.innerWidth;
    var bgHeight = window.innerHeight;
    var code = document.getElementById('code');
    var inviteCode = document.getElementsByClassName('inviteCode')[0];

   // bgImg.setAttribute('style','width:'+bgWidth+'px;height:'+bgHeight+'px');


    if ('addEventListener' in document) {
        document.addEventListener('DOMContentLoaded', function () {
            FastClick.attach(document.body);
        }, false);
    }

    //获取地址栏邀请码
    function GetQueryString(name)
    {
        var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if(r!=null)return  r[2];
        inviteCode.setAttribute('style','display:none');
        return null;
    }
    code.innerHTML = GetQueryString('code');


    //实现微信内分享自定义图标和内容
    if (is_weixin()){
        $.ajax({
            type:'post',
            url:'https://wawa.rgbvr.com/wawaServer/rest/misc/weixin/js/config',
            data:JSON.stringify({
                'wxAppId':wxID,
                'url':location.href
            }),
            contentType:"application/json",
            success:function (result) {
                wx.config({
                    debug: false,
                    appId: wxID,
                    timestamp: result.data.timestamp,
                    nonceStr: result.data.nonceStr,
                    signature: result.data.signature,
//                timestamp: "1502980698",
//                nonceStr: "87d52963-01da-4102-8a23-555e2e132c73",
//                signature: "36912a5d32d52c8954ad5f212ecddf3a3171408a",
                    jsApiList: [
                        'checkJsApi',//判断当前客户端版本是否支持指定JS接口
                        'onMenuShareTimeline',
                        'onMenuShareAppMessage'] // 功能列表，我们要使用JS-SDK的什么功能
                });

                wx.ready(function(){
                    // 获取“分享到朋友圈”按钮点击状态及自定义分享内容接口
                    wx.onMenuShareTimeline({
                        title: "欢乐抓娃娃 - 免费手机抓娃娃，全国包邮，输入我的邀请码"+(GetQueryString('code')||'831127')+"，登录就送娃娃币！", // 分享标题
                        link: location.href,
                        imgUrl: "https://images.qn.rgbvr.com/misc/1502894024145image_20170816223344" // 分享图标

                    });
                    // 获取“分享给朋友”按钮点击状态及自定义分享内容接口
                    wx.onMenuShareAppMessage({
                        title: '欢乐抓娃娃', // 分享标题
                        desc: "免费手机抓娃娃，全国包邮，输入我的邀请码"+(GetQueryString('code')||'831127')+"，登录就送娃娃币！", // 分享描述
                        link: location.href,
                        imgUrl: "https://images.qn.rgbvr.com/misc/1502894024145image_20170816223344", // 分享图标
                        type: 'link', // 分享类型,music、video或link，不填默认为link
                        success: function (res) {
//                                alert('success');
                        },
                        cancel: function (res) {
//                                alert('已取消');
                        },
                        fail: function (res) {
//                                alert(res.errMsg);
                        }

                    });

                });
                //        wx.error(function (res) {
                //            alert('微信获取失败'+res)
                //        })
// config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，
// 所以如果需要在 页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。
// 对于用户触发时才调用的接口，则可以直接调用，不需要放在ready 函数中。
            },
            /*error:function (res) {
             alert('请求失败'+res)
             }*/

        })
    }

    //手动给页面添加<meta property="og:description" content="免费手机抓娃娃，全国包邮，输入我的邀请码%s，登录就送娃娃币！">
    var meta = '<meta property="og:description" content="免费手机抓娃娃，全国包邮，输入我的邀请码'+(GetQueryString('code')||'831127')+'，登录就送娃娃币！">';
    var meta1 = '<meta name="description" itemprop="description" content="免费手机抓娃娃，全国包邮，输入我的邀请码'+(GetQueryString('code')||'831127')+'，登录就送娃娃币！">';
    $('head').prepend(meta);
    $('head').prepend(meta1);

}())
//判断浏览器类型
+(function () {

    //微信ID
    var wxID = 'wxb392bbab97dca39f';
    var wxTip = document.getElementById('wxTip');
    var download = document.getElementById('download');
    var phoneType = '';
    var u = navigator.userAgent;//获取浏览器信息
    if(is_weixin()){
//            phoneType = 'wx';
        if (u.indexOf('Android') > -1||u.indexOf('Linux') > -1){
            phoneType = 'wx';
        }else if(u.indexOf('iPhone')){
            phoneType = 'iphone'
        }
    }else if (u.indexOf('Android') > -1) {//安卓手机
        phoneType = 'android';
    } else if(u.indexOf('Linux') > -1){//安卓手机
        phoneType = 'android';
    }else if(u.indexOf('iPhone') > -1){//苹果手机
        phoneType = 'iphone'
    }

//是否在微信内打开
    function is_weixin() {
        var ua = u.toLowerCase();
        if (ua.match(/MicroMessenger/i) == "micromessenger") {
            return true;
        }else {
            return false;
        }
    }

    //下载点击事件
    download.onclick = function () {
        if(phoneType=='wx'){
            wxTip.setAttribute('style','display:block');
        }else if(phoneType == 'android'){
            window.location.href = 'https://service.wawa.rgbvr.com/wawaServer/rest/version/download?channel=h5wawa';
            <!--百度统计-->
            _hmt.push(['_trackEvent', 'download', 'click', 'android'])


        }else if(phoneType == 'iphone'){
//                alert(" Android版本已上线，iOS版本敬请期待！");
            window.location.href = 'https://itunes.apple.com/us/app/%E6%AC%A2%E4%B9%90%E6%8A%93%E5%A8%83%E5%A8%83/id1281524555?ls=1&mt=8';
            <!--百度统计-->
            _hmt.push(['_trackEvent', 'download', 'click', 'ios'])

        }
    };

    //触摸屏幕取消模态框
    wxTip.onclick = function () {
        wxTip.setAttribute('style','display:none');
    };

    //使页面占满整屏幕
    var bgImg = document.getElementById('bg');
    var bgWidth = window.innerWidth;
    var bgHeight = window.innerHeight;
    var code = document.getElementById('code');
    var inviteCode = document.getElementsByClassName('inviteCode')[0];

   // bgImg.setAttribute('style','width:'+bgWidth+'px;height:'+bgHeight+'px');


    if ('addEventListener' in document) {
        document.addEventListener('DOMContentLoaded', function () {
            FastClick.attach(document.body);
        }, false);
    }

    //获取地址栏邀请码
    function GetQueryString(name)
    {
        var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if(r!=null)return  r[2];
        inviteCode.setAttribute('style','display:none');
        return null;
    }
    code.innerHTML = GetQueryString('code');


    //实现微信内分享自定义图标和内容
    if (is_weixin()){
        $.ajax({
            type:'post',
            url:'https://wawa.rgbvr.com/wawaServer/rest/misc/weixin/js/config',
            data:JSON.stringify({
                'wxAppId':wxID,
                'url':location.href
            }),
            contentType:"application/json",
            success:function (result) {
                wx.config({
                    debug: false,
                    appId: wxID,
                    timestamp: result.data.timestamp,
                    nonceStr: result.data.nonceStr,
                    signature: result.data.signature,
//                timestamp: "1502980698",
//                nonceStr: "87d52963-01da-4102-8a23-555e2e132c73",
//                signature: "36912a5d32d52c8954ad5f212ecddf3a3171408a",
                    jsApiList: [
                        'checkJsApi',//判断当前客户端版本是否支持指定JS接口
                        'onMenuShareTimeline',
                        'onMenuShareAppMessage'] // 功能列表，我们要使用JS-SDK的什么功能
                });

                wx.ready(function(){
                    // 获取“分享到朋友圈”按钮点击状态及自定义分享内容接口
                    wx.onMenuShareTimeline({
                        title: "欢乐抓娃娃 -  一元特价抓娃娃，全国包邮，输入我的邀请码"+(GetQueryString('code')||'831127')+"，登录就送娃娃币！", // 分享标题
                        link: location.href,
                        imgUrl: "https://images.qn.rgbvr.com/misc/1502894024145image_20170816223344" // 分享图标

                    });
                    // 获取“分享给朋友”按钮点击状态及自定义分享内容接口
                    wx.onMenuShareAppMessage({
                        title: '欢乐抓娃娃', // 分享标题
                        desc: "免费手机抓娃娃，全国包邮，输入我的邀请码"+(GetQueryString('code')||'831127')+"，登录就送娃娃币！", // 分享描述
                        link: location.href,
                        imgUrl: "https://images.qn.rgbvr.com/misc/1502894024145image_20170816223344", // 分享图标
                        type: 'link', // 分享类型,music、video或link，不填默认为link
                        success: function (res) {
//                                alert('success');
                        },
                        cancel: function (res) {
//                                alert('已取消');
                        },
                        fail: function (res) {
//                                alert(res.errMsg);
                        }

                    });

                });
                //        wx.error(function (res) {
                //            alert('微信获取失败'+res)
                //        })
// config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，
// 所以如果需要在 页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。
// 对于用户触发时才调用的接口，则可以直接调用，不需要放在ready 函数中。
            },
            /*error:function (res) {
             alert('请求失败'+res)
             }*/

        })
    }

    //手动给页面添加<meta property="og:description" content="免费手机抓娃娃，全国包邮，输入我的邀请码%s，登录就送娃娃币！">
    var meta = '<meta property="og:description" content="免费手机抓娃娃，全国包邮，输入我的邀请码'+(GetQueryString('code')||'831127')+'，登录就送娃娃币！">';
    var meta1 = '<meta name="description" itemprop="description" content="免费手机抓娃娃，全国包邮，输入我的邀请码'+(GetQueryString('code')||'831127')+'，登录就送娃娃币！">';
    $('head').prepend(meta);
    $('head').prepend(meta1);

}())
//判断浏览器类型
+(function () {

    //微信ID
    var wxID = 'wxb392bbab97dca39f';
    var wxTip = document.getElementById('wxTip');
    var download = document.getElementById('download');
    var phoneType = '';
    var u = navigator.userAgent;//获取浏览器信息
    if(is_weixin()){
//            phoneType = 'wx';
        if (u.indexOf('Android') > -1||u.indexOf('Linux') > -1){
            phoneType = 'wx';
        }else if(u.indexOf('iPhone')){
            phoneType = 'iphone'
        }
    }else if (u.indexOf('Android') > -1) {//安卓手机
        phoneType = 'android';
    } else if(u.indexOf('Linux') > -1){//安卓手机
        phoneType = 'android';
    }else if(u.indexOf('iPhone') > -1){//苹果手机
        phoneType = 'iphone'
    }

//是否在微信内打开
    function is_weixin() {
        var ua = u.toLowerCase();
        if (ua.match(/MicroMessenger/i) == "micromessenger") {
            return true;
        }else {
            return false;
        }
    }

    //下载点击事件
    download.onclick = function () {
        if(phoneType=='wx'){
            wxTip.setAttribute('style','display:block');
        }else if(phoneType == 'android'){
            window.location.href = 'https://service.wawa.rgbvr.com/wawaServer/rest/version/download?channel=sohuhuisuan';
        }else if(phoneType == 'iphone'){
//                alert(" Android版本已上线，iOS版本敬请期待！");
            window.location.href = 'https://itunes.apple.com/us/app/%E6%AC%A2%E4%B9%90%E6%8A%93%E5%A8%83%E5%A8%83/id1281524555?ls=1&mt=8';
        }
    };

    //触摸屏幕取消模态框
    wxTip.onclick = function () {
        wxTip.setAttribute('style','display:none');
    };

    //使页面占满整屏幕
    var bgImg = document.getElementById('bg');
    var bgWidth = window.innerWidth;
    var bgHeight = window.innerHeight;
    var code = document.getElementById('code');
    var inviteCode = document.getElementsByClassName('inviteCode')[0];

   // bgImg.setAttribute('style','width:'+bgWidth+'px;height:'+bgHeight+'px');


    if ('addEventListener' in document) {
        document.addEventListener('DOMContentLoaded', function () {
            FastClick.attach(document.body);
        }, false);
    }

    //获取地址栏邀请码
    function GetQueryString(name)
    {
        var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if(r!=null)return  r[2];
        inviteCode.setAttribute('style','display:none');
        return null;
    }
    code.innerHTML = GetQueryString('code');


    //实现微信内分享自定义图标和内容
    if (is_weixin()){
        $.ajax({
            type:'post',
            url:'https://wawa.rgbvr.com/wawaServer/rest/misc/weixin/js/config',
            data:JSON.stringify({
                'wxAppId':wxID,
                'url':location.href
            }),
            contentType:"application/json",
            success:function (result) {
                wx.config({
                    debug: false,
                    appId: wxID,
                    timestamp: result.data.timestamp,
                    nonceStr: result.data.nonceStr,
                    signature: result.data.signature,
//                timestamp: "1502980698",
//                nonceStr: "87d52963-01da-4102-8a23-555e2e132c73",
//                signature: "36912a5d32d52c8954ad5f212ecddf3a3171408a",
                    jsApiList: [
                        'checkJsApi',//判断当前客户端版本是否支持指定JS接口
                        'onMenuShareTimeline',
                        'onMenuShareAppMessage'] // 功能列表，我们要使用JS-SDK的什么功能
                });

                wx.ready(function(){
                    // 获取“分享到朋友圈”按钮点击状态及自定义分享内容接口
                    wx.onMenuShareTimeline({
                        title: "欢乐抓娃娃 - 免费手机抓娃娃，全国包邮，输入我的邀请码"+(GetQueryString('code')||'831127')+"，登录就送娃娃币！", // 分享标题
                        link: location.href,
                        imgUrl: "https://images.qn.rgbvr.com/misc/1502894024145image_20170816223344" // 分享图标

                    });
                    // 获取“分享给朋友”按钮点击状态及自定义分享内容接口
                    wx.onMenuShareAppMessage({
                        title: '欢乐抓娃娃', // 分享标题
                        desc: "免费手机抓娃娃，全国包邮，输入我的邀请码"+(GetQueryString('code')||'831127')+"，登录就送娃娃币！", // 分享描述
                        link: location.href,
                        imgUrl: "https://images.qn.rgbvr.com/misc/1502894024145image_20170816223344", // 分享图标
                        type: 'link', // 分享类型,music、video或link，不填默认为link
                        success: function (res) {
//                                alert('success');
                        },
                        cancel: function (res) {
//                                alert('已取消');
                        },
                        fail: function (res) {
//                                alert(res.errMsg);
                        }

                    });

                });
                //        wx.error(function (res) {
                //            alert('微信获取失败'+res)
                //        })
// config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，
// 所以如果需要在 页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。
// 对于用户触发时才调用的接口，则可以直接调用，不需要放在ready 函数中。
            },
            /*error:function (res) {
             alert('请求失败'+res)
             }*/

        })
    }

    //手动给页面添加<meta property="og:description" content="免费手机抓娃娃，全国包邮，输入我的邀请码%s，登录就送娃娃币！">
    var meta = '<meta property="og:description" content="免费手机抓娃娃，全国包邮，输入我的邀请码'+(GetQueryString('code')||'831127')+'，登录就送娃娃币！">';
    var meta1 = '<meta name="description" itemprop="description" content="免费手机抓娃娃，全国包邮，输入我的邀请码'+(GetQueryString('code')||'831127')+'，登录就送娃娃币！">';
    $('head').prepend(meta);
    $('head').prepend(meta1);

}())
//判断浏览器类型
+(function () {

    //微信ID
    var wxID = 'wxb392bbab97dca39f';
    var wxTip = document.getElementById('wxTip');
    var download = $(".download");
    var phoneType = '';
    var u = navigator.userAgent;//获取浏览器信息
    if(is_weixin()){
//            phoneType = 'wx';
        if (u.indexOf('Android') > -1||u.indexOf('Linux') > -1){
            phoneType = 'wx';
        }else if(u.indexOf('iPhone')){
            phoneType = 'iphone'
        }
    }else if (u.indexOf('Android') > -1) {//安卓手机
        phoneType = 'android';
    } else if(u.indexOf('Linux') > -1){//安卓手机
        phoneType = 'android';
    }else if(u.indexOf('iPhone') > -1){//苹果手机
        phoneType = 'iphone'
    }

//是否在微信内打开
    function is_weixin() {
        var ua = u.toLowerCase();
        if (ua.match(/MicroMessenger/i) == "micromessenger") {
            return true;
        }else {
            return false;
        }
    }

    //下载点击事件
    download.click(function () {
        if(phoneType=='wx'){
            wxTip.setAttribute('style','display:block');
        }else if(phoneType == 'android'){
            window.location.href = 'http://wawa.download.rgbvr.com/HappyWawa/apk/1.8.7/bilibili/bilibili_HappyWawa_1.8.7_440_20171225173003_release.apk';
            <!--百度统计-->
            _hmt.push(['_trackEvent', 'download', 'click', 'android'])


        }else if(phoneType == 'iphone'){
//                alert(" Android版本已上线，iOS版本敬请期待！");
            window.location.href = 'https://itunes.apple.com/us/app/%E6%AC%A2%E4%B9%90%E6%8A%93%E5%A8%83%E5%A8%83/id1281524555?ls=1&mt=8';
            <!--百度统计-->
            _hmt.push(['_trackEvent', 'download', 'click', 'ios'])

        }
    })

    //触摸屏幕取消模态框
    wxTip.onclick = function () {
        wxTip.setAttribute('style','display:none');
    };

    //使页面占满整屏幕
    var bgImg = document.getElementById('bg');
    var bgWidth = window.innerWidth;
    var bgHeight = window.innerHeight;
    var code = document.getElementById('code');
    var inviteCode = document.getElementsByClassName('inviteCode')[0];

   // bgImg.setAttribute('style','width:'+bgWidth+'px;height:'+bgHeight+'px');


    if ('addEventListener' in document) {
        document.addEventListener('DOMContentLoaded', function () {
            FastClick.attach(document.body);
        }, false);
    }



    //实现微信内分享自定义图标和内容
    if (is_weixin()){
        $.ajax({
            type:'post',
            url:'https://wawa.rgbvr.com/wawaServer/rest/misc/weixin/js/config',
            data:JSON.stringify({
                'wxAppId':wxID,
                'url':location.href
            }),
            contentType:"application/json",
            success:function (result) {
                wx.config({
                    debug: false,
                    appId: wxID,
                    timestamp: result.data.timestamp,
                    nonceStr: result.data.nonceStr,
                    signature: result.data.signature,
//                timestamp: "1502980698",
//                nonceStr: "87d52963-01da-4102-8a23-555e2e132c73",
//                signature: "36912a5d32d52c8954ad5f212ecddf3a3171408a",
                    jsApiList: [
                        'checkJsApi',//判断当前客户端版本是否支持指定JS接口
                        'onMenuShareTimeline',
                        'onMenuShareAppMessage'] // 功能列表，我们要使用JS-SDK的什么功能
                });

                wx.ready(function(){
                    // 获取“分享到朋友圈”按钮点击状态及自定义分享内容接口
                    wx.onMenuShareTimeline({
                        title: "欢乐抓娃娃 -  一元特价抓娃娃，全国包邮，输入我的邀请码"+(GetQueryString('code')||'831127')+"，登录就送娃娃币！", // 分享标题
                        link: location.href,
                        imgUrl: "https://images.qn.rgbvr.com/misc/1502894024145image_20170816223344" // 分享图标

                    });
                    // 获取“分享给朋友”按钮点击状态及自定义分享内容接口
                    wx.onMenuShareAppMessage({
                        title: '欢乐抓娃娃', // 分享标题
                        desc: "免费手机抓娃娃，全国包邮，输入我的邀请码"+(GetQueryString('code')||'831127')+"，登录就送娃娃币！", // 分享描述
                        link: location.href,
                        imgUrl: "https://images.qn.rgbvr.com/misc/1502894024145image_20170816223344", // 分享图标
                        type: 'link', // 分享类型,music、video或link，不填默认为link
                        success: function (res) {
//                                alert('success');
                        },
                        cancel: function (res) {
//                                alert('已取消');
                        },
                        fail: function (res) {
//                                alert(res.errMsg);
                        }

                    });

                });
                //        wx.error(function (res) {
                //            alert('微信获取失败'+res)
                //        })
// config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，
// 所以如果需要在 页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。
// 对于用户触发时才调用的接口，则可以直接调用，不需要放在ready 函数中。
            },
            /*error:function (res) {
             alert('请求失败'+res)
             }*/

        })
    }

}())
//判断浏览器类型
+(function () {

    //微信ID
    var wxID = 'wxb392bbab97dca39f';
    var wxTip = document.getElementById('wxTip');
    var download = $(".download");
    var phoneType = '';
    var u = navigator.userAgent;//获取浏览器信息
    if(is_weixin()){
//            phoneType = 'wx';
        if (u.indexOf('Android') > -1||u.indexOf('Linux') > -1){
            phoneType = 'wx';
        }else if(u.indexOf('iPhone')){
            phoneType = 'iphone'
        }
    }else if (u.indexOf('Android') > -1) {//安卓手机
        phoneType = 'android';
    } else if(u.indexOf('Linux') > -1){//安卓手机
        phoneType = 'android';
    }else if(u.indexOf('iPhone') > -1){//苹果手机
        phoneType = 'iphone'
    }

//是否在微信内打开
    function is_weixin() {
        var ua = u.toLowerCase();
        if (ua.match(/MicroMessenger/i) == "micromessenger") {
            return true;
        }else {
            return false;
        }
    }

    //下载点击事件
    download.click(function () {
        if(phoneType=='wx'){
            wxTip.setAttribute('style','display:block');
        }else if(phoneType == 'android'){
            window.location.href = 'https://service.wawa.rgbvr.com/wawaServer/rest/version/download?channel=meiyou';
            <!--百度统计-->
            _hmt.push(['_trackEvent', 'download', 'click', 'android'])


        }else if(phoneType == 'iphone'){
//                alert(" Android版本已上线，iOS版本敬请期待！");
            window.location.href = 'https://itunes.apple.com/us/app/%E6%AC%A2%E4%B9%90%E6%8A%93%E5%A8%83%E5%A8%83/id1281524555?ls=1&mt=8';
            <!--百度统计-->
            _hmt.push(['_trackEvent', 'download', 'click', 'ios'])

        }
    })

    //触摸屏幕取消模态框
    wxTip.onclick = function () {
        wxTip.setAttribute('style','display:none');
    };

    //使页面占满整屏幕
    var bgImg = document.getElementById('bg');
    var bgWidth = window.innerWidth;
    var bgHeight = window.innerHeight;
    var code = document.getElementById('code');
    var inviteCode = document.getElementsByClassName('inviteCode')[0];

   // bgImg.setAttribute('style','width:'+bgWidth+'px;height:'+bgHeight+'px');


    if ('addEventListener' in document) {
        document.addEventListener('DOMContentLoaded', function () {
            FastClick.attach(document.body);
        }, false);
    }



    //实现微信内分享自定义图标和内容
    if (is_weixin()){
        $.ajax({
            type:'post',
            url:'https://wawa.rgbvr.com/wawaServer/rest/misc/weixin/js/config',
            data:JSON.stringify({
                'wxAppId':wxID,
                'url':location.href
            }),
            contentType:"application/json",
            success:function (result) {
                wx.config({
                    debug: false,
                    appId: wxID,
                    timestamp: result.data.timestamp,
                    nonceStr: result.data.nonceStr,
                    signature: result.data.signature,
//                timestamp: "1502980698",
//                nonceStr: "87d52963-01da-4102-8a23-555e2e132c73",
//                signature: "36912a5d32d52c8954ad5f212ecddf3a3171408a",
                    jsApiList: [
                        'checkJsApi',//判断当前客户端版本是否支持指定JS接口
                        'onMenuShareTimeline',
                        'onMenuShareAppMessage'] // 功能列表，我们要使用JS-SDK的什么功能
                });

                wx.ready(function(){
                    // 获取“分享到朋友圈”按钮点击状态及自定义分享内容接口
                    wx.onMenuShareTimeline({
                        title: "欢乐抓娃娃 -  一元特价抓娃娃，全国包邮，输入我的邀请码"+(GetQueryString('code')||'831127')+"，登录就送娃娃币！", // 分享标题
                        link: location.href,
                        imgUrl: "https://images.qn.rgbvr.com/misc/1502894024145image_20170816223344" // 分享图标

                    });
                    // 获取“分享给朋友”按钮点击状态及自定义分享内容接口
                    wx.onMenuShareAppMessage({
                        title: '欢乐抓娃娃', // 分享标题
                        desc: "免费手机抓娃娃，全国包邮，输入我的邀请码"+(GetQueryString('code')||'831127')+"，登录就送娃娃币！", // 分享描述
                        link: location.href,
                        imgUrl: "https://images.qn.rgbvr.com/misc/1502894024145image_20170816223344", // 分享图标
                        type: 'link', // 分享类型,music、video或link，不填默认为link
                        success: function (res) {
//                                alert('success');
                        },
                        cancel: function (res) {
//                                alert('已取消');
                        },
                        fail: function (res) {
//                                alert(res.errMsg);
                        }

                    });

                });
                //        wx.error(function (res) {
                //            alert('微信获取失败'+res)
                //        })
// config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，
// 所以如果需要在 页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。
// 对于用户触发时才调用的接口，则可以直接调用，不需要放在ready 函数中。
            },
            /*error:function (res) {
             alert('请求失败'+res)
             }*/

        })
    }

}())
//判断浏览器类型
+(function () {
    //微信ID
    var wxID = 'wxb392bbab97dca39f';
    var wxTip = document.getElementById('wxTip');
    var download = document.getElementById('download');
    var phoneType = '';
    var u = navigator.userAgent;//获取浏览器信息
    if(is_weixin()){
//            phoneType = 'wx';
        if (u.indexOf('Android') > -1||u.indexOf('Linux') > -1){
            phoneType = 'wx';
        }else if(u.indexOf('iPhone')){
            phoneType = 'iphone'
        }
    }else if (u.indexOf('Android') > -1) {//安卓手机
        phoneType = 'android';
    } else if(u.indexOf('Linux') > -1){//安卓手机
        phoneType = 'android';
    }else if(u.indexOf('iPhone') > -1){//苹果手机
        phoneType = 'iphone'
    }

//是否在微信内打开
    function is_weixin() {
        var ua = u.toLowerCase();
        if (ua.match(/MicroMessenger/i) == "micromessenger") {
            return true;
        }else {
            return false;
        }
    }

    //整页下载事件
    var bgDownload = document.getElementsByClassName("bg-download")[0]
    bgDownload.onclick=function () {
        if(phoneType=='wx'){
            wxTip.setAttribute('style','display:block');
        }else if(phoneType == 'android'){
            window.location.href = 'https://service.wawa.rgbvr.com/wawaServer/rest/version/download?channel=weibofst';
        }else if(phoneType == 'iphone'){
//                alert(" Android版本已上线，iOS版本敬请期待！");
            window.location.href = 'https://itunes.apple.com/us/app/%E6%AC%A2%E4%B9%90%E6%8A%93%E5%A8%83%E5%A8%83/id1281524555?ls=1&mt=8';
        }
    }

    //触摸屏幕取消模态框
    wxTip.onclick = function () {
        wxTip.setAttribute('style','display:none');
    };

    //使页面占满整屏幕
    var bgImg = document.getElementById('bg');
    var bgWidth = window.innerWidth;
    var bgHeight = window.innerHeight;
    var code = document.getElementById('code');
    var inviteCode = document.getElementsByClassName('inviteCode')[0];

    bgImg.setAttribute('style','width:'+bgWidth+'px;height:'+bgHeight+'px');


    if ('addEventListener' in document) {
        document.addEventListener('DOMContentLoaded', function () {
            FastClick.attach(document.body);
        }, false);
    }

    //获取地址栏邀请码
    function GetQueryString(name)
    {
        var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if(r!=null)return  r[2];
        inviteCode.setAttribute('style','display:none');
        return null;
    }
    code.innerHTML = GetQueryString('code');


    //实现微信内分享自定义图标和内容
    if (is_weixin()){
        $.ajax({
            type:'post',
            url:'https://wawa.rgbvr.com/wawaServer/rest/misc/weixin/js/config',
            data:JSON.stringify({
                'wxAppId':wxID,
                'url':location.href
            }),
            contentType:"application/json",
            success:function (result) {
                wx.config({
                    debug: false,
                    appId: wxID,
                    timestamp: result.data.timestamp,
                    nonceStr: result.data.nonceStr,
                    signature: result.data.signature,
//                timestamp: "1502980698",
//                nonceStr: "87d52963-01da-4102-8a23-555e2e132c73",
//                signature: "36912a5d32d52c8954ad5f212ecddf3a3171408a",
                    jsApiList: [
                        'checkJsApi',//判断当前客户端版本是否支持指定JS接口
                        'onMenuShareTimeline',
                        'onMenuShareAppMessage'] // 功能列表，我们要使用JS-SDK的什么功能
                });

                wx.ready(function(){
                    // 获取“分享到朋友圈”按钮点击状态及自定义分享内容接口
                    wx.onMenuShareTimeline({
                        title: "欢乐抓娃娃 - 免费手机抓娃娃，全国包邮，输入我的邀请码"+(GetQueryString('code')||'831127')+"，登录就送娃娃币！", // 分享标题
                        link: location.href,
                        imgUrl: "https://images.qn.rgbvr.com/misc/1502894024145image_20170816223344" // 分享图标

                    });
                    // 获取“分享给朋友”按钮点击状态及自定义分享内容接口
                    wx.onMenuShareAppMessage({
                        title: '欢乐抓娃娃', // 分享标题
                        desc: "免费手机抓娃娃，全国包邮，输入我的邀请码"+(GetQueryString('code')||'831127')+"，登录就送娃娃币！", // 分享描述
                        link: location.href,
                        imgUrl: "https://images.qn.rgbvr.com/misc/1502894024145image_20170816223344", // 分享图标
                        type: 'link', // 分享类型,music、video或link，不填默认为link
                        success: function (res) {
//                                alert('success');
                        },
                        cancel: function (res) {
//                                alert('已取消');
                        },
                        fail: function (res) {
//                                alert(res.errMsg);
                        }
                    });
                });
            },
        })
    }


}())
(function(){
    var width = document.documentElement.clientWidth/16;
    var styleN = document.createElement('style');
    styleN.innerHTML = 'html{font-size:'+ width +'px !important;}'
    document.head.appendChild(styleN);
})();

; (function (win, lib) {

    var doc = win.document;

    var docEl = doc.documentElement;

    var metaEl = doc.querySelector('meta[name="viewport"]');

    var flexibleEl = doc.querySelector('meta[name="flexible"]');

    var dpr = 0;

    var scale = 0;

    var tid;

    var flexible = lib.flexible || (lib.flexible = {});



    if (metaEl) {

        console.warn('将根据已有的meta标签来设置缩放比例');

        var match = metaEl.getAttribute('content').match(/initial\-scale=([\d\.]+)/);

        if (match) {

            scale = parseFloat(match[1]);

            dpr = parseInt(1 / scale);

        }

    } else if (flexibleEl) {

        var content = flexibleEl.getAttribute('content');

        if (content) {

            var initialDpr = content.match(/initial\-dpr=([\d\.]+)/);

            var maximumDpr = content.match(/maximum\-dpr=([\d\.]+)/);

            if (initialDpr) {

                dpr = parseFloat(initialDpr[1]);

                scale = parseFloat((1 / dpr).toFixed(2));

            }

            if (maximumDpr) {

                dpr = parseFloat(maximumDpr[1]);

                scale = parseFloat((1 / dpr).toFixed(2));

            }

        }

    }



    if (!dpr && !scale) {

        var isAndroid = win.navigator.appVersion.match(/android/gi);

        var isIPhone = win.navigator.appVersion.match(/iphone/gi);

        var devicePixelRatio = win.devicePixelRatio;

        if (isIPhone) {

            // iOS下，对于2倍和3倍的屏幕，用2倍的方案，其余的用1倍方案

            if (devicePixelRatio >= 3 && (!dpr || dpr >= 3)) {

                dpr = 3;

            } else if (devicePixelRatio >= 2 && (!dpr || dpr >= 2)) {

                dpr = 2;

            } else {

                dpr = 1;

            }

        } else {

            //其它设备下，仍使用1倍的方案

            dpr = 1;

        }

        scale = 1 / dpr;

    }



    docEl.setAttribute('data-dpr', dpr);

    if (!metaEl) {

        metaEl = doc.createElement('meta');

        metaEl.setAttribute('name', 'viewport');

        metaEl.setAttribute('content', 'initial-scale=' + scale + ', maximum-scale=' + scale + ', minimum-scale=' + scale + ', user-scalable=0');

        if (docEl.firstElementChild) {

            docEl.firstElementChild.appendChild(metaEl);

        } else {

            var wrap = doc.createElement('div');

            wrap.appendChild(metaEl);

            doc.write(wrap.innerHTML);

        }

    }



    function refreshRem() {

        var width = docEl.getBoundingClientRect().width;

        /*if (width / dpr > 540) {

         width = 540 * dpr;

         }*/

        //淘宝方式1rem代表设计稿的十分之一
        // var rem = width / 10;

        // // 另一种方式，1rem改成设计稿上的100px，设计稿为750
        var designWidth = 750;
        var rem = width / designWidth * 100;

        docEl.style.fontSize = rem + 'px';

        flexible.rem = win.rem = rem;

    }



    win.addEventListener('resize', function () {

        clearTimeout(tid);

        tid = setTimeout(refreshRem, 300);

    }, false);

    win.addEventListener('pageshow', function (e) {

        if (e.persisted) {

            clearTimeout(tid);

            tid = setTimeout(refreshRem, 300);

        }

    }, false);



    if (doc.readyState === 'complete') {

        doc.body.style.fontSize = 12 * dpr + 'px';

    } else {

        doc.addEventListener('DOMContentLoaded', function (e) {

            doc.body.style.fontSize = 12 * dpr + 'px';

        }, false);

    }





    refreshRem();



    flexible.dpr = win.dpr = dpr;

    flexible.refreshRem = refreshRem;

    flexible.rem2px = function (d) {

        var val = parseFloat(d) * this.rem;

        if (typeof d === 'string' && d.match(/rem$/)) {

            val += 'px';

        }

        return val;

    }

    flexible.px2rem = function (d) {

        var val = parseFloat(d) / this.rem;

        if (typeof d === 'string' && d.match(/px$/)) {

            val += 'rem';

        }

        return val;

    }



})(window, window['lib'] || (window['lib'] = {}));

//判断浏览器类型
+(function () {

    //微信ID
    var wxID = 'wxb392bbab97dca39f';
    var wxTip = document.getElementById('wxTip');
    var download = document.getElementById('download');
    var phoneType = '';
    var u = navigator.userAgent;//获取浏览器信息
    if(is_weixin()){
//            phoneType = 'wx';
        if (u.indexOf('Android') > -1||u.indexOf('Linux') > -1){
            phoneType = 'wx';
        }else if(u.indexOf('iPhone')){
            phoneType = 'iphone'
        }
    }else if (u.indexOf('Android') > -1) {//安卓手机
        phoneType = 'android';
    } else if(u.indexOf('Linux') > -1){//安卓手机
        phoneType = 'android';
    }else if(u.indexOf('iPhone') > -1){//苹果手机
        phoneType = 'iphone'
    }

//是否在微信内打开
    function is_weixin() {
        var ua = u.toLowerCase();
        if (ua.match(/MicroMessenger/i) == "micromessenger") {
            return true;
        }else {
            return false;
        }
    }

    //下载点击事件
    download.onclick = function () {
        if(phoneType=='wx'){
            wxTip.setAttribute('style','display:block');
        }else if(phoneType == 'android'){
            window.location.href = 'https://service.wawa.rgbvr.com/wawaServer/rest/version/download?channel=h5wawa';
        }else if(phoneType == 'iphone'){
//                alert(" Android版本已上线，iOS版本敬请期待！");
            window.location.href = 'https://itunes.apple.com/us/app/%E6%AC%A2%E4%B9%90%E6%8A%93%E5%A8%83%E5%A8%83/id1281524555?ls=1&mt=8';
        }
    };

    //触摸屏幕取消模态框
    wxTip.onclick = function () {
        wxTip.setAttribute('style','display:none');
    };

    //使页面占满整屏幕
    var bgImg = document.getElementById('bg');
    var bgWidth = window.innerWidth;
    var bgHeight = window.innerHeight;
    var code = document.getElementById('code');
    var inviteCode = document.getElementsByClassName('inviteCode')[0];

    // bgImg.setAttribute('style','width:'+bgWidth+'px;height:'+bgHeight+'px');


    if ('addEventListener' in document) {
        document.addEventListener('DOMContentLoaded', function () {
            FastClick.attach(document.body);
        }, false);
    }

    //获取地址栏邀请码
    function GetQueryString(name)
    {
        var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if(r!=null)return  r[2];
        inviteCode.setAttribute('style','display:none');
        return null;
    }
    code.innerHTML = GetQueryString('code');
    //分享到app外
    if(typeof(dsBridge) == 'undefined'){
        //console.log(GetQueryString('code'));
        window.location.href ="http://wawa.rgbvr.com/activity/happy_wawa_invitationActivity_shareout.html?code="+GetQueryString('code')
    }
//客户端打开
    else {
        $('#bg').css('margin-bottom','2rem');
    }

    //实现微信内分享自定义图标和内容
    if (is_weixin()){
        $.ajax({
            type:'post',
            url:'https://wawa.rgbvr.com/wawaServer/rest/misc/weixin/js/config',
            data:JSON.stringify({
                'wxAppId':wxID,
                'url':location.href
            }),
            contentType:"application/json",
            success:function (result) {
                wx.config({
                    debug: false,
                    appId: wxID,
                    timestamp: result.data.timestamp,
                    nonceStr: result.data.nonceStr,
                    signature: result.data.signature,
//                timestamp: "1502980698",
//                nonceStr: "87d52963-01da-4102-8a23-555e2e132c73",
//                signature: "36912a5d32d52c8954ad5f212ecddf3a3171408a",
                    jsApiList: [
                        'checkJsApi',//判断当前客户端版本是否支持指定JS接口
                        'onMenuShareTimeline',
                        'onMenuShareAppMessage'] // 功能列表，我们要使用JS-SDK的什么功能
                });

                wx.ready(function(){
                    // 获取“分享到朋友圈”按钮点击状态及自定义分享内容接口
                    wx.onMenuShareTimeline({
                        title: "欢乐抓娃娃 -  一元特价抓娃娃，全国包邮，输入我的邀请码"+(GetQueryString('code')||'831127')+"，登录就送娃娃币！", // 分享标题
                        link: location.href,
                        imgUrl: "https://images.qn.rgbvr.com/misc/1502894024145image_20170816223344" // 分享图标

                    });
                    // 获取“分享给朋友”按钮点击状态及自定义分享内容接口
                    wx.onMenuShareAppMessage({
                        title: '欢乐抓娃娃', // 分享标题
                        desc: "免费手机抓娃娃，全国包邮，输入我的邀请码"+(GetQueryString('code')||'831127')+"，登录就送娃娃币！", // 分享描述
                        link: location.href,
                        imgUrl: "https://images.qn.rgbvr.com/misc/1502894024145image_20170816223344", // 分享图标
                        type: 'link', // 分享类型,music、video或link，不填默认为link
                        success: function (res) {
//                                alert('success');
                        },
                        cancel: function (res) {
//                                alert('已取消');
                        },
                        fail: function (res) {
//                                alert(res.errMsg);
                        }

                    });

                });
                //        wx.error(function (res) {
                //            alert('微信获取失败'+res)
                //        })
// config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，
// 所以如果需要在 页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。
// 对于用户触发时才调用的接口，则可以直接调用，不需要放在ready 函数中。
            },
            /*error:function (res) {
             alert('请求失败'+res)
             }*/

        })
    }

    //手动给页面添加<meta property="og:description" content="免费手机抓娃娃，全国包邮，输入我的邀请码%s，登录就送娃娃币！">
    var meta = '<meta property="og:description" content="免费手机抓娃娃，全国包邮，输入我的邀请码'+(GetQueryString('code')||'831127')+'，登录就送娃娃币！">';
    var meta1 = '<meta name="description" itemprop="description" content="免费手机抓娃娃，全国包邮，输入我的邀请码'+(GetQueryString('code')||'831127')+'，登录就送娃娃币！">';
    $('head').prepend(meta);
    $('head').prepend(meta1);

}())