$(function () {
    function progressBar(preloadImg) {
        if (preloadImg == undefined) {
            preloadImg = []
        }
        /*获得页面的所有图片地址*/
        var imgs = document.getElementsByTagName("img");
        for (var i = 0; i < imgs.length; i++) {
            preloadImg.push(imgs[i].src);
        }

        preloadImg = $.unique(preloadImg);


        let image = [],
            loadedSize = 0,//图片加载的进度
            imageSize = preloadImg.length;

        var timer = null;


        timer = setInterval(function () {
            /*根据图片加载已加载个数，更新进度条*/
            var curCompletePercent = parseInt(loadedSize / imageSize * 100);

            updateProcess(curCompletePercent);

            if (curCompletePercent >= 99) {
                setTimeout(function () {
                    clearInterval(timer);
                    $("#loader").hide()
                    setTimeout(function () {
                        $(".sudoku").fadeIn();
                    }, 300)
                }, 300)
            }
        }, 300)


        loadingResource(preloadImg)


        function updateProcess(curCompletePercent) {
            var progr = $("#progress")
            var percent = $("#countText")
            progr.css("width", curCompletePercent + "%")
            percent.text(curCompletePercent + "%")
        }

        function loadingResource(preloadImg) {
            for (let i = 0; i < preloadImg.length; i++) {
                var oImg = new Image(); //新建一个图片对象
                oImg.onload = function () {
                    image.push(preloadImg[i])
                    loadedSize++;
                    console.log("load success........." + preloadImg[i])
                }
                oImg.onerror = function () {
                    loadedSize++;
                    image.push(preloadImg[i])
                    console.log('fail to load image.....' + preloadImg[i]);
                };
                oImg.src = preloadImg[i];//给图片对象添加路径  注意这条代码必须加在onload的后面
            }
        }
    }
    $.progressBar = progressBar;
})