define(function(require, exports, module) {
    var debug = true
    var log = debug ? console.log.bind(console) : function() {}

    layui.use(['element', 'carousel', 'jquery', 'laypage', 'form'], function(){
        var $ = layui.$

        // 轮播图
        var carousel = layui.carousel
        carousel.render({
            elem: '#slide',
            width: '650px',//设置容器宽度,
            height: '450px',
            arrow: 'always', //始终显示箭头
        })

        var laypage = layui.laypage
        laypage.render({
            elem: 'page',
            count: data.length,
            limit: 5,
            theme: '#FF5722',
            jump: function(obj) {
                var jumpData = data.slice((obj.curr - 1) * obj.limit, obj.limit * obj.curr)
                renderData('#result-list', '#list-tpl', jumpData)
            },
        })

        var moreLaypage = layui.laypage
        moreLaypage.render({
            elem: 'more-page',
            count: data.length,
            limit: 5,
            theme: '#FF5722',
            jump: function(obj) {
                var jumpMoreData = data.slice((obj.curr - 1) * obj.limit, obj.limit * obj.curr)
                renderData('#more-list', '#more-tpl', jumpMoreData)
            },
        })

        var form = layui.form
        form.on('submit(*)', function(data){
            showPage('.search')
            return false;
        })

        // var element = layui.element
        // element.on('nav(tap)', function(ele){
        //     var target = $(ele)
        //     target.addClass('blue-bg')
        // })

        function renderData(container, tpl, data) {
            $(container).empty().append(juicer($(tpl)[0].text, {data: data}));
        }

        // 要显示的元素选择器，如 '.search'
        function showPage(ele) {
            $('.index').hide()
            $(ele).show()
        }

        // 鼠标 hover 显示三角形箭头
        $('.layui-nav-item').hover(function(event){
            log('eve', event.target)
            var target = $(event.target).find('span')
            log('in')
            target.show('fast')
        },function(event){
            log('out')
            var target = $(event.target).find('span')
            target.hide('fast')
        })

    })
})
