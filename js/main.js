require.config({
    urlArgs: `v=${app.version}`,
    baseUrl: 'js/lib',
});

require(['jquery'], function ($) {
    /**
     * 存储获取数据函数
     * @function get 存储数据
     * @function set 获取数据
     */
    var store = {
        /**
         * 存储名称为key的val数据
         * @param {String} key 键值
         * @param {String} val 数据
         */
        set: function (key, val) {
            if (!val) {
                return;
            }
            try {
                var json = JSON.stringify(val);
                if (typeof JSON.parse(json) === 'object') {
                    // 验证一下是否为JSON字符串防止保存错误
                    localStorage.setItem(key, json);
                }
            } catch (e) {
                return false;
            }
        },
        /**
         * 获取名称为key的数据
         * @param {String} key 键值
         */
        get: function (key) {
            if (this.has(key)) {
                return JSON.parse(localStorage.getItem(key));
            }
        },
        has: function (key) {
            if (localStorage.getItem(key)) {
                return true;
            } else {
                return false;
            }
        },
        del: function (key) {
            localStorage.removeItem(key);
        },
    };

    var settingsFn = function (storage) {
        this.storage = {
            engines: 'quark',
            bookcolor: 'black',
            searchHistory: true,
        };
        this.storage = $.extend({}, this.storage, storage);
    };
    settingsFn.prototype = {
        getJson: function () {
            return this.storage;
        },
        // 读取设置项
        get: function (key) {
            return this.storage[key];
        },
        // 设置设置项并应用
        set: function (key, val) {
            this.storage[key] = val;
            store.set('setData', this.storage);
            this.apply();
        },
        // 应用设置项
        apply: function () {
            var that = this;
            // 样式细圆
            if (that.get('styleThin')) {
                $('body').addClass('styleThin');
            }
            $('.ornament-input-group').removeAttr('style');
            // 加载LOGO
            if (that.get('logo')) {
                $('.logo').html('<img src="' + that.get('logo') + '" />');
            } else {
                $('.logo').html(
                    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 272 92" width="100%" height="100%"><path fill="#EA4335" d="M115.75 47.18c0 12.77-9.99 22.18-22.25 22.18s-22.25-9.41-22.25-22.18C71.25 34.32 81.24 25 93.5 25s22.25 9.32 22.25 22.18zm-9.74 0c0-7.98-5.79-13.44-12.51-13.44S80.99 39.2 80.99 47.18c0 7.9 5.79 13.44 12.51 13.44s12.51-5.55 12.51-13.44z"/><path fill="#FBBC05" d="M163.75 47.18c0 12.77-9.99 22.18-22.25 22.18s-22.25-9.41-22.25-22.18c0-12.85 9.99-22.18 22.25-22.18s22.25 9.32 22.25 22.18zm-9.74 0c0-7.98-5.79-13.44-12.51-13.44s-12.51 5.46-12.51 13.44c0 7.9 5.79 13.44 12.51 13.44s12.51-5.55 12.51-13.44z"/><path fill="#4285F4" d="M209.75 26.34v39.82c0 16.38-9.66 23.07-21.08 23.07-10.75 0-17.22-7.19-19.66-13.07l8.48-3.53c1.51 3.61 5.21 7.87 11.17 7.87 7.31 0 11.84-4.51 11.84-13v-3.19h-.34c-2.18 2.69-6.38 5.04-11.68 5.04-11.09 0-21.25-9.66-21.25-22.09 0-12.52 10.16-22.26 21.25-22.26 5.29 0 9.49 2.35 11.68 4.96h.34v-3.61h9.25zm-8.56 20.92c0-7.81-5.21-13.52-11.84-13.52-6.72 0-12.35 5.71-12.35 13.52 0 7.73 5.63 13.36 12.35 13.36 6.63 0 11.84-5.63 11.84-13.36z"/><path fill="#34A853" d="M225 3v65h-9.5V3h9.5z"/><path fill="#EA4335" d="M262.02 54.48l7.56 5.04c-2.44 3.61-8.32 9.83-18.48 9.83-12.6 0-22.01-9.74-22.01-22.18 0-13.19 9.49-22.18 20.92-22.18 11.51 0 17.14 9.16 18.98 14.11l1.01 2.52-29.65 12.28c2.27 4.45 5.8 6.72 10.75 6.72 4.96 0 8.4-2.44 10.92-6.14zm-23.27-7.98l19.82-8.23c-1.09-2.77-4.37-4.7-8.23-4.7-4.95 0-11.84 4.37-11.59 12.93z"/><path fill="#4285F4" d="M35.29 41.41V32H67c.31 1.64.47 3.58.47 5.68 0 7.06-1.93 15.79-8.15 22.01-6.05 6.3-13.78 9.66-24.02 9.66C16.32 69.35.36 53.89.36 34.91.36 15.93 16.32.47 35.3.47c10.5 0 17.98 4.12 23.6 9.49l-6.64 6.64c-4.03-3.78-9.49-6.72-16.97-6.72-13.86 0-24.7 11.17-24.7 25.03 0 13.86 10.84 25.03 24.7 25.03 8.99 0 14.11-3.61 17.39-6.89 2.66-2.66 4.41-6.46 5.1-11.65l-22.49.01z"/></svg>'
                );
            }
            // 夜间模式 和 壁纸
            var nightMode = {
                on: function () {
                    $('body').removeClass('theme-black theme-white').addClass('theme-white');
                    //$("body").css("background-image", "");
                    if (that.get('wallpaper')) {
                        $('body').css('background-image', 'url(' + that.get('wallpaper') + ')');
                    } else {
                        $('body').css('background-image', '');
                    }
                    $('#nightCss').removeAttr('disabled');
                },
                off: function () {
                    if (that.get('wallpaper')) {
                        $('body').css('background-image', 'url(' + that.get('wallpaper') + ')');
                    } else {
                        $('body').css('background-image', '');
                    }
                    $('body')
                        .removeClass('theme-black theme-white')
                        .addClass('theme-' + that.get('bookcolor'));
                    $('#nightCss').attr('disabled', true);
                },
            };
            if (that.get('nightMode') === true) {
                nightMode.on();
            } else {
                nightMode.off();
            }
            // 删除掉VIA浏览器夜间模式的暗色支持
            $('head').on('DOMNodeInserted DOMNodeRemoved', function (evt) {
                if (evt.target.id === 'via_inject_css_night') {
                    if (evt.type === 'DOMNodeInserted') {
                        $('#via_inject_css_night').html('');
                        nightMode.on();
                    } else if (evt.type === 'DOMNodeRemoved') {
                        nightMode.off();
                    }
                }
            });
            if ($('#via_inject_css_night').html('').length > 0) {
                nightMode.on();
            }
        },
    };
    var settings = new settingsFn(store.get('setData'));
    settings.apply();

    /**
     * DOM长按事件
     */
    $.fn.longPress = function (fn) {
        var timeout = void 0,
            $this = this,
            startPos,
            movePos,
            endPos;
        for (var i = $this.length - 1; i > -1; i--) {
            $this[i].addEventListener(
                'touchstart',
                function (e) {
                    var touch = e.targetTouches[0];
                    startPos = {
                        x: touch.pageX,
                        y: touch.pageY,
                    };
                    timeout = setTimeout(function () {
                        if ($this.attr('disabled') === undefined) {
                            fn();
                        }
                    }, 700);
                }, {
                    passive: true,
                }
            );
            $this[i].addEventListener(
                'touchmove',
                function (e) {
                    var touch = e.targetTouches[0];
                    movePos = {
                        x: touch.pageX - startPos.x,
                        y: touch.pageY - startPos.y,
                    };
                    (Math.abs(movePos.x) > 10 || Math.abs(movePos.y) > 10) && clearTimeout(timeout);
                }, {
                    passive: true,
                }
            );
            $this[i].addEventListener(
                'touchend',
                function () {
                    clearTimeout(timeout);
                }, {
                    passive: true,
                }
            );
        }
    };

    /**
     * 文件打开函数
     * @param callback 回调函数
     */
    var openFile = function (callback) {
        $('.openFile').remove();
        var input = $('<input class="openFile" type="file">');
        input.on('propertychange change', callback);
        $('body').append(input);
        input.click();
    };

    /**
     * 文件上传函数
     * @param file 文件
     * @param callback 回调函数
     */
    var uploadFile = function (file, callback) {
        var imageData = new FormData();
        imageData.append('Filedata', file);
        imageData.append('file', 'multipart');
        $.ajax({
            url: 'https://api.uomg.com/api/image.ali',
            type: 'POST',
            data: imageData,
            cache: false,
            contentType: false,
            processData: false,
            dataType: 'json',
            success: function (res) {
                if (res.code == 1) {
                    callback.success && callback.success(res.imgurl);
                } else {
                    callback.error && callback.error(res.msg);
                }
            },
            error: function () {
                callback.error && callback.error('请求失败！');
            },
            complete: function () {
                callback.complete && callback.complete();
            },
        });
    };

    /**
     * 首页书签构建函数
     * @function init 初始化
     * @function bind 绑定事件
     * @function del 删除书签
     * @function add 添加书签
     */
    var bookMarkFn = function (ele, options) {
        this.$ele = $(ele);
        this.options = {
            data: [{
                    name: '精选',
                    url: 'choice()',
                    icon: 'icon/discover.png',
                },
                {
                    name: '微博',
                    url: 'https://weibo.com',
                    icon: 'icon/weibo.png',
                },
                {
                    name: 'Bilibili',
                    url: 'https://m.bilibili.com',
                    icon: 'icon/bilibilibog.png',
                },
                {
                    name: '知乎',
                    url: 'https://www.zhihu.com',
                    icon: 'icon/zhihu.png',
                },
                {
                    name: 'Github',
                    url: 'https://github.com',
                    icon: 'icon/github_octocat.png',
                },
                {
                    name: '贴吧',
                    url: 'https://tieba.baidu.com',
                    icon: 'icon/tieba.png',
                },
                {
                    name: 'IT之家',
                    url: 'https://m.ithome.com',
                    icon: 'icon/ithome.png',
                },
                {
                    name: '少数派',
                    url: 'https://sspai.com/',
                    icon: 'icon/sspai.png',
                },
                {
                    name: '微博',
                    url: 'https://m.weibo.com',
                    icon: 'icon/weibo.png',
                },
                {
                    name: '帮助',
                    url: 'https://h.kurisucat.cn/help.html',
                    icon: 'icon/website.png',
                },
            ],
        };
        this.options = $.extend({}, this.options, options);
        this.init();
    };
    bookMarkFn.prototype = {
        init: function () {
            var html = '';
            var data = this.options.data;
            for (var i = 0, l = data.length; i < l; i++) {
                html +=
                    '<div class="list" data-url="' +
                    data[i].url +
                    '"><div class="img" style="background-image:url(' +
                    data[i].icon +
                    ')"></div><div class="text">' +
                    data[i].name +
                    '</div></div>';
            }
            this.$ele.html(html);
            this.bind();
        },
        getJson: function () {
            return this.options.data;
        },
        bind: function () {
            var that = this;
            var data = this.options.data;
            // 绑定书签长按事件
            this.$ele.longPress(function () {
                if (that.status !== 'editing' && data.length > 0) {
                    that.status = 'editing';
                    $('.logo,.ornament-input-group').css('pointer-events', 'none');
                    $('.addbook').remove();
                    require(['jquery-sortable'], function () {
                        that.$ele.sortable({
                            animation: 150,
                            fallbackTolerance: 3,
                            touchStartThreshold: 3,
                            ghostClass: 'ghost',
                            onEnd: function (evt) {
                                var startID = evt.oldIndex,
                                    endID = evt.newIndex;
                                if (startID > endID) {
                                    data.splice(endID, 0, data[startID]);
                                    data.splice(startID + 1, 1);
                                } else {
                                    data.splice(endID + 1, 0, data[startID]);
                                    data.splice(startID, 1);
                                }
                                store.set('bookMark', data);
                            },
                        });
                    });
                    $(document).click(function () {
                        $(document).unbind('click');
                        $('.logo,.ornament-input-group').css('pointer-events', '');
                        $('.delbook').addClass('animation');
                        $('.delbook').on('transitionend', function (evt) {
                            if (evt.target !== this) {
                                return;
                            }
                            $('.delbook').remove();
                            that.$ele.sortable('destroy');
                            that.status = '';
                        });
                    });
                    var $list = that.$ele.find('.list');
                    for (var i = $list.length; i > -1; i--) {
                        $list.eq(i).find('.img').prepend('<div class="delbook"></div>');
                    }
                }
            });
            this.$ele.on('click', function (evt) {
                if (
                    evt.target !== this ||
                    that.status === 'editing' ||
                    $('.addbook').hasClass('animation') ||
                    data.length >= 20
                ) {
                    return;
                }
                if ($('.addbook').length === 0) {
                    that.$ele.append(
                        '<div class="list addbook"><div class="img"><svg viewBox="0 0 1024 1024"><path class="st0" d="M673,489.2H534.8V350.9c0-12.7-10.4-23-23-23c-12.7,0-23,10.4-23,23v138.2H350.6c-12.7,0-23,10.4-23,23c0,12.7,10.4,23,23,23h138.2v138.2c0,12.7,10.4,23,23,23c12.7,0,23-10.4,23-23V535.2H673c12.7,0,23-10.4,23-23C696.1,499.5,685.7,489.2,673,489.2z" fill="#222"/></svg></div></div>'
                    );
                    $('.addbook').click(function () {
                        $('.addbook').remove();
                        // 取消书签编辑状态
                        $(document).click();
                        // 插入html
                        $('#app').append(`<div class="page-bg"></div>
						<div class="page-addbook">
							<ul class="addbook-choice">
								<li class="current">站点</li>
								<!-- <li>书签</li>
								<li>历史</li> -->
								<span class="active-span"></span>
							</ul>
							<div class="addbook-content">
								<div class="addbook-sites">
								<input type="text" class="addbook-input addbook-url" placeholder="输入网址" value="http://" />
								<input type="text" class="addbook-input addbook-name" placeholder="输入网站名" />
									<div id="addbook-upload">点击选择图标</div>
									<div class="addbook-ok">确认添加</div>
								</div>
								<div class="bottom-close"></div>
							</div>
						</div>`);

                        setTimeout(function () {
                            $('.page-bg').addClass('animation');
                            $('.addbook-choice').addClass('animation');
                            $('.addbook-content').addClass('animation');
                        }, 50);

                        //绑定事件
                        $('#addbook-upload').click(function () {
                            openFile(function () {
                                var file = this.files[0];
                                $('#addbook-upload')
                                    .html('上传图标中...')
                                    .css('pointer-events', 'none');
                                $('.addbook-ok').css('pointer-events', 'none');
                                uploadFile(file, {
                                    success: function (url) {
                                        $('#addbook-upload').html(
                                            '<img src="' + url + '"></img><p>' + file.name + '</p>'
                                        );
                                    },
                                    error: function (msg) {
                                        $('#addbook-upload').html('上传图标失败！' + msg);
                                    },
                                    complete: function () {
                                        $('#addbook-upload').css('pointer-events', '');
                                        $('.addbook-ok').css('pointer-events', '');
                                    },
                                });
                            });
                        });
                        $('.addbook-ok').click(function () {
                            var name = $('.addbook-name').val(),
                                url = $('.addbook-url').val(),
                                icon = $('#addbook-upload img').attr('src');
                            if (name.length && url.length) {
                                if (!icon) {
                                    // 绘制文字图标
                                    var canvas = document.createElement('canvas');
                                    canvas.height = 100;
                                    canvas.width = 100;
                                    var ctx = canvas.getContext('2d');
                                    ctx.fillStyle = '#f5f5f5';
                                    ctx.fillRect(0, 0, 100, 100);
                                    ctx.fill();
                                    ctx.fillStyle = '#222';
                                    ctx.font = '40px Arial';
                                    ctx.textAlign = 'center';
                                    ctx.textBaseline = 'middle';
                                    ctx.fillText(name.substr(0, 1), 50, 52);
                                    icon = canvas.toDataURL('image/png');
                                }
                                $('.bottom-close').click();
                                bookMark.add(name, url, icon);
                            }
                        });
                        $('.bottom-close').click(function () {
                            $('.page-addbook').css({
                                'pointer-events': 'none',
                            });
                            $('.page-bg').removeClass('animation');
                            $('.addbook-choice').removeClass('animation');
                            $('.addbook-content').removeClass('animation');
                            setTimeout(function () {
                                $('.page-addbook').remove();
                                $('.page-bg').remove();
                            }, 300);
                        });
                        $('.page-addbook').click(function (evt) {
                            if (evt.target === evt.currentTarget) {
                                $('.bottom-close').click();
                            }
                        });
                    });
                } else {
                    $('.addbook').addClass('animation');
                    setTimeout(function () {
                        $('.addbook').remove();
                    }, 400);
                }
            });
            this.$ele.on('click', '.list', function (evt) {
                evt.stopPropagation();
                var dom = $(evt.currentTarget);
                if (that.status !== 'editing') {
                    var url = dom.data('url');
                    if (url) {
                        switch (url) {
                            case 'choice()':
                                choice();
                                break;
                            default:
                                location.href = url;
                        }
                    }
                } else {
                    if (evt.target.className === 'delbook') {
                        that.del(dom.index());
                    }
                }
            });
        },
        del: function (index) {
            var that = this;
            var data = this.options.data;
            this.$ele.css('overflow', 'visible');
            var dom = this.$ele.find('.list').eq(index);
            dom.css({
                transform: 'translateY(60px)',
                opacity: 0,
                transition: '.3s',
            });
            dom.on('transitionend', function (evt) {
                if (evt.target !== this) {
                    return;
                }
                dom.remove();
                that.$ele.css('overflow', 'hidden');
            });
            data.splice(index, 1);
            store.set('bookMark', data);
        },
        add: function (name, url, icon) {
            var data = this.options.data;
            url = url.match(/:\/\//) ? url : 'http://' + url;
            var i = data.length - 1;
            var dom = $(
                '<div class="list" data-url="' +
                url +
                '"><div class="img" style="background-image:url(' +
                icon +
                ')"></div><div class="text">' +
                name +
                '</div></div>'
            );
            this.$ele.append(dom);
            dom.css({
                marginTop: '60px',
                opacity: '0',
            }).animate({
                    marginTop: 0,
                    opacity: 1,
                },
                300
            );
            data.push({
                name: name,
                url: url,
                icon: icon,
            });
            store.set('bookMark', data);
        },
    };

    /**
     * 搜索历史构建函数
     * @function init 初始化
     * @function load 加载HTML
     * @function bind 绑定事件
     * @function add 添加历史
     * @function empty 清空历史
     */
    var searchHistoryFn = function (ele, options) {
        this.$ele = $(ele);
        this.options = {
            data: [],
        };
        this.options = $.extend({}, this.options, options);
        this.init();
    };
    searchHistoryFn.prototype = {
        init: function () {
            this.options.data = this.options.data.slice(0, 10);
            this.load();
            this.bind();
        },
        load: function () {
            var data = this.options.data;
            var html = '';
            var l = data.length;
            for (var i = 0; i < l; i++) {
                html += '<li>' + data[i] + '</li>';
            }
            this.$ele.find('.content').html(html);
            l ? $('.emptyHistory').show() : $('.emptyHistory').hide();
        },
        bind: function () {
            var that = this;
            // 监听touch事件，防止点击后弹出或收回软键盘
            $('.emptyHistory')[0].addEventListener(
                'touchstart',
                function (e) {
                    e.preventDefault();
                },
                false
            );
            $('.emptyHistory')[0].addEventListener(
                'touchend',
                function (e) {
                    if ($('.emptyHistory').hasClass('animation')) {
                        that.empty();
                    } else {
                        $('.emptyHistory').addClass('animation');
                    }
                },
                false
            );
            this.$ele.click(function (evt) {
                if (evt.target.nodeName === 'LI') {
                    $('.search-input').val(evt.target.innerText).trigger('propertychange');
                    $('.search-btn').click();
                }
            });
        },
        add: function (text) {
            var data = this.options.data;
            if (settings.get('searchHistory') === true) {
                var pos = data.indexOf(text);
                if (pos !== -1) {
                    data.splice(pos, 1);
                }
                data.unshift(text);
                this.load();
                store.set('history', data);
            }
        },
        empty: function () {
            this.options.data = [];
            store.set('history', []);
            this.load();
        },
    };

    // 开始构建
    var bookMark = new bookMarkFn($('.bookmark'), {
        data: store.get('bookMark'),
    });
    var searchHistory = new searchHistoryFn($('.history'), {
        data: store.get('history'),
    });

    /**
     * 更改地址栏URL参数
     * @param {string} param 参数
     * @param {string} value 值
     * @param {string} url 需要更改的URL,不设置此值会使用当前链接
     */
    var changeParam = function (param, value, url) {
        url = url || location.href;
        var reg = new RegExp('(^|)' + param + '=([^&]*)(|$)');
        var tmp = param + '=' + value;
        return url.match(reg) ?
            url.replace(eval(reg), tmp) :
            url.match('[?]') ?
            url + '&' + tmp :
            url + '?' + tmp;
    };

    // 更改URL，去除后面的参数
    history.replaceState(null, document.title, location.origin + location.pathname);

    // 绑定主页虚假输入框点击事件
    $('.ornament-input-group').click(function () {
        $('body').css('pointer-events', 'none');
        history.pushState(null, document.title, changeParam('page', 'search'));
        // 输入框边框动画
        $('.anitInput').remove();
        var ornamentInput = $('.ornament-input-group');
        var top = ornamentInput.offset().top;
        var left = ornamentInput.offset().left;
        var anitInput = ornamentInput.clone();
        anitInput.attr('class', 'anitInput').css({
            position: 'absolute',
            top: top,
            left: left,
            width: ornamentInput.outerWidth(),
            height: ornamentInput.outerHeight(),
            'pointer-events': 'none',
        });
        anitInput.on('transitionend', function (evt) {
            if (evt.target !== this) {
                return;
            }
            anitInput.unbind('transitionend');
            $('.input-bg').css('border-color', 'var(--dark)');
            anitInput.css('opacity', '0');
        });
        $('body').append(anitInput);
        ornamentInput.css('opacity', 0);
        if ($(window).data('anitInputFn')) {
            $(window).unbind('resize', $(window).data('anitInputFn'));
        }
        var anitInputFn = function () {
            var inputBg = $('.input-bg');
            var scaleX = inputBg.outerWidth() / ornamentInput.outerWidth();
            var scaleY = inputBg.outerHeight() / ornamentInput.outerHeight();
            var translateX =
                inputBg.offset().left -
                left -
                (ornamentInput.outerWidth() - inputBg.outerWidth()) / 2;
            var translateY =
                inputBg.offset().top -
                top -
                (ornamentInput.outerHeight() - inputBg.outerHeight()) / 2;
            anitInput.css({
                transform: 'translateX(' +
                    translateX +
                    'px) translateY(' +
                    translateY +
                    'px) scale(' +
                    scaleX +
                    ',' +
                    scaleY +
                    ') translate3d(0,0,0)',
                transition: '.3s',
                'border-color': 'var(--dark)',
            });
        };
        $(window).data('anitInputFn', anitInputFn);
        $(window).bind('resize', anitInputFn);
        // 弹出软键盘
        $('.s-temp').focus();
        // 书签动画
        $('.bookmark').addClass('animation');
        // 显示搜索页
        $('.page-search').show();
        setTimeout(function () {
            $('.page-search')
                .on('transitionend', function (evt) {
                    if (evt.target !== this) {
                        return;
                    }
                    $('.page-search').off('transitionend');
                    $('body').css('pointer-events', '');
                })
                .addClass('animation');
            $('.search-input').val('').focus();
            $('.history').show().addClass('animation');
            $('.input-bg').addClass('animation');
            $('.shortcut').addClass('animation');
        }, 1);
    });

    $('.page-search').click(function (evt) {
        if (evt.target === evt.currentTarget) {
            history.go(-1);
        }
    });

    // 返回按键被点击
    window.addEventListener(
        'popstate',
        function () {
            if ($('.page-search').is(':visible')) {
                $('body').css('pointer-events', 'none');
                history.replaceState(null, document.title, location.origin + location.pathname);
                // 输入框边框动画
                $(window).unbind('resize', $(window).data('anitInputFn'));
                var anitInput = $('.anitInput');
                anitInput.css({
                    transform: '',
                    transition: '.3s',
                    opacity: '',
                    'border-color': '',
                });
                // 书签动画
                $('.bookmark').removeClass('animation');
                // 隐藏搜索页
                $('.history').removeClass('animation');
                $('.input-bg').css('border-color', '').removeClass('animation');
                $('.shortcut').removeClass('animation');
                $('.page-search').removeClass('animation');
                $('.page-search').on('transitionend', function (evt) {
                    if (evt.target !== this) {
                        return;
                    }
                    $('.page-search').off('transitionend');
                    $('.page-search').hide();
                    $('.ornament-input-group').css({
                        transition: 'none',
                        opacity: '',
                    });
                    anitInput.remove();
                    // 搜索页内容初始化
                    $('.suggestion').html('');
                    $('.search-btn').html('取消');
                    $('.shortcut1').show();
                    $('.shortcut2,.shortcut3,.empty-input').hide();
                    $('.search-input').val('');
                    $('.emptyHistory').removeClass('animation');
                    $('body').css('pointer-events', '');
                });
            }
        },
        false
    );

    $('.suggestion').click(function (evt) {
        if (evt.target.nodeName === 'SPAN') {
            $('.search-input').focus().val($(evt.target).parent().text()).trigger('propertychange');
            return;
        } else {
            searchText(evt.target.innerText);
        }
    });

    $('.search-input').on('input propertychange', function () {
        var that = this;
        var wd = $(that).val();
        $('.shortcut1,.shortcut2,.shortcut3').hide();
        if (!wd) {
            $('.history').show();
            $('.empty-input').hide();
            $('.search-btn').html('收起');
            $('.shortcut1').show();
            $('.suggestion').hide().html('');
        } else {
            $('.history').hide();
            $('.empty-input').show();
            $('.search-btn').html(
                /^\b(((https?|ftp):\/\/)?[-a-z0-9]+(\.[-a-z0-9]+)*\.(?:com|net|org|int|edu|gov|mil|arpa|asia|biz|info|name|pro|coop|aero|museum|[a-z][a-z]|[a-z][a-z][a-z]|((25[0-5])|(2[0-4]\d)|(1\d\d)|([1-9]\d)|\d))\b(\/[-a-z0-9_:\@&?=+,.!\/~%\$]*)?)$/i.test(
                    wd
                ) ?
                '前往' :
                '搜索'
            );
            escape(wd).indexOf('%u') < 0 ? $('.shortcut2').show() : $('.shortcut3').show();
            $.ajax({
                url: 'https://suggestion.baidu.com/su',
                type: 'GET',
                dataType: 'jsonp',
                data: {
                    wd: wd,
                    cb: 'sug',
                },
                timeout: 5000,
                jsonpCallback: 'sug',
                success: function (res) {
                    if ($(that).val() !== wd) {
                        return;
                    }
                    var data = res.s;
                    var isStyle = $('.suggestion').html();
                    var html = '';
                    for (var i = data.length; i > 0; i--) {
                        var style = '';
                        if (isStyle === '') {
                            style = 'animation: fadeInDown both .5s ' + (i - 1) * 0.05 + 's"';
                        }
                        html +=
                            '<li style="' +
                            style +
                            '"><div>' +
                            data[i - 1].replace(wd, '<b>' + wd + '</b>') +
                            '</div><span></span></li>';
                    }
                    $('.suggestion').show().html(html).scrollTop($('.suggestion')[0].scrollHeight);
                },
            });
            $.ajax({
                url: 'https://quark.sm.cn/api/qs',
                type: 'GET',
                dataType: 'jsonp',
                data: {
                    query: wd,
                    ve: '4.1.0.132',
                },
                timeout: 5000,
                success: function (res) {
                    if ($(that).val() !== wd) {
                        return;
                    }
                    var data = res.data;
                    var html = '<li>快搜:</li>';
                    for (var i = 0, l = data.length; i < l; i++) {
                        html += '<li>' + data[i] + '</li>';
                    }
                    $('.shortcut3').html(html);
                },
            });
        }
    });

    $('.empty-input').click(function () {
        $('.search-input').focus().val('').trigger('propertychange');
    });

    $('.shortcut1,.shortcut2').click(function (evt) {
        $('.search-input')
            .focus()
            .val($('.search-input').val() + evt.target.innerText)
            .trigger('propertychange');
    });

    $('.shortcut3').click(function (evt) {
        if (evt.target.nodeName === 'LI') {
            var text = evt.target.innerText;
            var data = {
                百科: 'https://baike.baidu.com/search?word=%s',
                视频: 'https://m.v.qq.com/search.html?act=0&keyWord=%s',
                豆瓣: 'https://m.douban.com/search/?query=%s',
                新闻: 'http://m.toutiao.com/search/?&keyword=%s',
                图片: 'https://m.baidu.com/sf/vsearch?pd=image_content&word=%s&tn=vsearch&atn=page',
                微博: 'https://m.weibo.cn/search?containerid=100103type=1&q=%s',
                音乐: 'http://m.music.migu.cn/v3/search?keyword=%s',
                知乎: 'https://www.zhihu.com/search?q=%s',
                小说: 'https://m.qidian.com/search?kw=%s',
                旅游: 'https://h5.m.taobao.com/trip/rx-search/list/index.html?&keyword=%s',
                地图: 'https://m.amap.com/search/mapview/keywords=%s',
                电视剧: 'http://m.iqiyi.com/search.html?key=%s',
                股票: 'https://emwap.eastmoney.com/info/search/index?t=14&k=%s',
                汽车: 'https://sou.m.autohome.com.cn/zonghe?q=%s',
            };
            if (data[text]) {
                location.href = data[text].replace('%s', $('.search-input').val());
            }
        }
    });

    $('.search-btn').click(function () {
        var text = $('.search-input').val();
        if ($('.search-btn').text() === '进入') {
            !text.match(/^(ht|f)tp(s?):\/\//) && (text = 'http://' + text);
            history.go(-1);
            setTimeout(function () {
                location.href = text;
            }, 1);
        } else {
            if (!text) {
                $('.search-input').blur();
                history.go(-1);
            } else {
                searchText(text);
            }
        }
    });

    $('.search-input').keydown(function (evt) {
        // 使用回车键进行搜索
        evt.keyCode === 13 && $('.search-btn').click();
    });

    // 识别浏览器
    var browserInfo = function () {
        if (window.via) {
            return 'via';
        } else if (window.mbrowser) {
            return 'x';
        }
    };

    // 搜索函数
    function searchText(text) {
        if (!text) {
            return;
        }
        searchHistory.add(text);
        history.go(-1);
        setTimeout(function () {
            // 异步执行 兼容QQ浏览器
            if (settings.get('engines') === 'via') {
                window.via.searchText(text);
            } else {
                location.href = {
                    baidu: 'https://m.baidu.com/s?wd=%s',
                    quark: 'https://quark.sm.cn/s?q=%s',
                    google: 'https://www.google.com/search?q=%s',
                    bing: 'https://cn.bing.com/search?q=%s',
                    sm: 'https://m.sm.cn/s?q=%s',
                    haosou: 'https://m.so.com/s?q=%s',
                    sogou: 'https://m.sogou.com/web/searchList.jsp?keyword=%s',
                    doge: 'https://www.dogedoge.com/results?q=%s',
                    diy: settings.get('diyEngines'),
                } [settings.get('engines')].replace('%s', text);
            }
        }, 1);
    }

    //精选页面
    function choice() {
        // 构建HTML
        var data = {
                常用: [{
                        hl: '百度',
                        shl: '百度一下你就知道',
                        img: 'baidu',
                        url: 'm.baidu.com',
                    },
                    {
                        hl: '腾讯',
                        shl: '手机腾讯网',
                        img: 'qq',
                        url: 'xw.qq.com',
                    },
                    {
                        hl: '新浪',
                        shl: '联通世界的超级平台',
                        img: 'sina',
                        url: 'sina.cn',
                    },
                    {
                        hl: '谷歌',
                        shl: '最大的搜索引擎',
                        img: 'google',
                        url: 'www.google.com.hk',
                    },
                    {
                        hl: '搜狐',
                        shl: '懂手机更懂你',
                        img: 'sina',
                        url: 'm.sohu.com',
                    },
                    {
                        hl: '网易',
                        shl: '各有态度',
                        img: 'netease',
                        url: '3g.163.com',
                    },
                    {
                        hl: '起点中文网',
                        shl: '精彩小说大全',
                        img: 'qidian',
                        url: 'm.qidian.com',
                    },
                    {
                        hl: '淘宝',
                        shl: '淘我喜欢',
                        img: 'taobao',
                        url: 'm.taobao.com',
                    },
                    {
                        hl: '京东',
                        shl: '多好快省品质生活',
                        img: 'jd',
                        url: 'm.jd.com',
                    },
                    {
                        hl: '百度贴吧',
                        shl: '最大的中文社区',
                        img: 'tieba',
                        url: 'c.tieba.baidu.com',
                    },
                    {
                        hl: '12306',
                        shl: '你离世界只差一张票',
                        img: '12306',
                        url: 'www.12306.cn/mormhweb/',
                    },
                    {
                        hl: '飞猪',
                        shl: '阿里旅行再升级',
                        img: 'flypig',
                        url: 'www.fliggy.com',
                    },
                    {
                        hl: '查快递',
                        shl: '快递查询',
                        img: 'kuaidi',
                        url: 'yz.m.sm.cn/s?from=wy279236&q=%E6%9F%A5%E5%BF%AB%E9%80%92',
                    },
                    {
                        hl: '优酷',
                        shl: '热门视频全面覆盖',
                        img: 'youku',
                        url: 'www.youku.com',
                    },
                    {
                        hl: '爱奇艺',
                        shl: '中国领先的视频门户',
                        img: 'iqiyi',
                        url: 'm.iqiyi.com',
                    },
                    {
                        hl: '斗鱼',
                        shl: '每个人的直播平台',
                        img: 'douyu',
                        url: 'm.douyu.com',
                    },
                    {
                        hl: '虎牙',
                        shl: '中国领先的互动直播平台',
                        img: 'huya',
                        url: 'm.huya.com',
                    },
                    {
                        hl: '美团',
                        shl: '吃喝玩乐全都有',
                        img: 'meituan',
                        url: 'i.meituan.com',
                    },
                    {
                        hl: '小米',
                        shl: '小米官网',
                        img: 'xiaomi',
                        url: 'm.mi.com',
                    },
                    {
                        hl: '58同城',
                        shl: '让生活更简单',
                        img: 'tongcheng',
                        url: 'm.58.com',
                    },
                    {
                        hl: '九游',
                        shl: '发现更多好游戏',
                        img: 'game_9',
                        url: 'a.9game.cn',
                    },
                    {
                        hl: '虎扑',
                        shl: '最篮球的世界',
                        img: 'hupu',
                        url: 'm.hupu.com',
                    },
                ],
                科技: [{
                        hl: '知乎',
                        shl: '知识分享社区',
                        img: 'zhihu',
                        url: 'www.zhihu.com',
                    },
                    {
                        hl: '36kr',
                        shl: '互联网创业资讯',
                        img: 'kr36',
                        url: '36kr.com',
                    },
                    {
                        hl: '少数派',
                        shl: '高质量应用推荐',
                        img: 'sspai',
                        url: 'sspai.com',
                    },
                    {
                        hl: '爱范儿',
                        shl: '泛科技媒体',
                        img: 'ifanr',
                        url: 'www.ifanr.com',
                    },
                    {
                        hl: 'ZEALER',
                        shl: '电子产品评测网站',
                        img: 'zealer',
                        url: 'm.zealer.com',
                    },
                    {
                        hl: '瘾科技',
                        shl: '科技新闻和测评',
                        img: 'engadget',
                        url: 'cn.engadget.com',
                    },
                    {
                        hl: '虎嗅网',
                        shl: '科技媒体',
                        img: 'huxiu',
                        url: 'm.huxiu.com',
                    },
                    {
                        hl: '品玩',
                        shl: '有品好玩的科技',
                        img: 'pingwest',
                        url: 'www.pingwest.com',
                    },
                    {
                        hl: '简书',
                        shl: '优质原创的内容社区',
                        img: 'jianshu',
                        url: 'jianshu.com',
                    },
                    {
                        hl: 'V2EX',
                        shl: '关于分享和探索的地方',
                        img: 'v2ex',
                        url: 'www.v2ex.com',
                    },
                ],
                生活: [{
                        hl: '豆瓣',
                        shl: '一个神奇的社区',
                        img: 'douban',
                        url: 'm.douban.com',
                    },
                    {
                        hl: '轻芒杂志',
                        shl: '生活兴趣杂志',
                        img: 'qingmang',
                        url: 'qingmang.me/magazines/',
                    },
                    {
                        hl: 'ONE',
                        shl: '韩寒监制',
                        img: 'one',
                        url: 'm.wufazhuce.com',
                    },
                    {
                        hl: '蚂蜂窝',
                        shl: '旅游攻略社区',
                        img: 'mafengwo',
                        url: 'm.mafengwo.cn',
                    },
                    {
                        hl: '小红书',
                        shl: '可以买到国外的好东西',
                        img: 'xiaohongshu',
                        url: 'www.xiaohongshu.com',
                    },
                    {
                        hl: '什么值得买',
                        shl: '应该能省点钱吧',
                        img: 'smzdm',
                        url: 'm.smzdm.com',
                    },
                    {
                        hl: '淘票票',
                        shl: '不看书，就看几场电影吧',
                        img: 'taopiaopiao',
                        url: 'dianying.taobao.com',
                    },
                    {
                        hl: '下厨房',
                        shl: '是男人就学做几道菜',
                        img: 'xiachufang',
                        url: 'm.xiachufang.com',
                    },
                    {
                        hl: 'ENJOY',
                        shl: '高端美食团购',
                        img: 'enjoy',
                        url: 'enjoy.ricebook.com',
                    },
                ],
                工具: [{
                        hl: '豌豆荚设计',
                        shl: '发现最优美的应用',
                        img: 'wandoujia',
                        url: 'm.wandoujia.com/award',
                    },
                    {
                        hl: '喜马拉雅听',
                        shl: '音频分享平台',
                        img: 'ximalaya',
                        url: 'm.ximalaya.com',
                    },
                    {
                        hl: '第2课堂',
                        shl: '守护全国2亿青少年健康成长',
                        img: '2-class',
                        url: 'm.2-class.com',
                    },
                    {
                        hl: 'Mozilla',
                        shl: '学习网页开发的最佳实践',
                        img: 'mozilla',
                        url: 'developer.mozilla.org/zh-CN',
                    },
                    {
                        hl: '网易公开课',
                        shl: '人丑就要多学习',
                        img: 'netease_edu_study',
                        url: 'm.open.163.com',
                    },
                    {
                        hl: '石墨文档',
                        shl: '可多人实时协作的云端文档',
                        img: 'sm',
                        url: 'shimo.im',
                    },
                ],
            },
            html =
            '<div class="page-bg"></div><div class="page-choice"><div class="page-content"><ul class="choice-ul">',
            tabHtml = '<li class="current">捷径</li>',
            contentHtml = `<li class="choice-cut swiper-slide">
			</li>`;

        $.each(data, function (i, n) {
            tabHtml += '<li>' + i + '</li>';
            contentHtml += '<li class="choice-li swiper-slide">';
            for (var i = 0, l = n.length; i < l; i++) {
                contentHtml +=
                    '<a href="http://' +
                    n[i].url +
                    '"><div><img src="img/choice/' +
                    n[i].img +
                    '.png" /><p>' +
                    n[i].hl +
                    '</p><p>' +
                    n[i].shl +
                    '</p></div></a>';
            }
            contentHtml += '</li>';
        });

        // HTML添加到APP
        $('#app').append(
            html +
            tabHtml +
            '<span class="active-span"></span></ul><div class="choice-swipe"><ul class="swiper-wrapper"><div style="position:absolute;text-align:center;top:50%;width:100%;margin-top:-64px;color:#444">正在加载页面中...</div></ul></div><div class="bottom-close"></div></div></div>'
        );

        setTimeout(function () {
            $('.page-bg').addClass('animation');
            $('.page-choice').addClass('animation');
        }, 1);

        var dom = $('.choice-ul li');
        var width = dom.width();
        $('.active-span').css('transform', 'translate3d(' + (width / 2 - 9) + 'px,0,0)');

        // 动画完成后加载，防止过渡动画卡顿
        $('.page-choice').on('transitionend', function (evt) {
            // 过滤掉子元素
            if (evt.target !== this) {
                return;
            }
            $('.page-choice').off('transitionend');
            $('.choice-swipe').find('.swiper-wrapper').html(contentHtml);
            // 绑定事件
            var last_page = 0;

            require(['Swiper'], function (Swiper) {
                var swiper = new Swiper('.choice-swipe', {
                    on: {
                        slideChange: function () {
                            var i = this.activeIndex;
                            dom.eq(last_page).removeClass('current');
                            $('.active-span').css(
                                'transform',
                                'translate3d(' + (width * i + width / 2 - 9) + 'px,0,0)'
                            );
                            dom.eq(i).addClass('current');
                            last_page = i;
                        },
                    },
                });

                // 绑定TAB点击事件
                $('.choice-ul').click(function (evt) {
                    if (evt.target.nodeName == 'LI') {
                        swiper.slideTo($(evt.target).index());
                    }
                });
            });

            // 绑定关闭按钮事件
            $('.bottom-close').click(function () {
                $('.page-choice').css('pointer-events', 'none').removeClass('animation');
                $('.page-bg').removeClass('animation');
                $('.page-choice').on('transitionend', function (evt) {
                    if (evt.target !== this) {
                        return;
                    }
                    $('.page-choice').remove();
                    $('.page-bg').remove();
                });
            });

            // 天气
            $.ajax({
                url: 'https://ai.sm.cn/quark/1/api?format=json&method=weather&callback=weather',
                type: 'get',
                dataType: 'jsonp',
                success: function (res) {
                    var data = res.data;
                    var color1 = data.color1;
                    var color2 = data.color2;
                    var location = data.location;
                    var temp = data.temp;
                    var air = data.air;
                    var weather = data.weather;
                    var html =
                        '<div>' +
                        temp +
                        '</div><div>' +
                        weather +
                        '</div><div>' +
                        location +
                        ' · ' +
                        air +
                        '</div><div class="cmp-icon" id="lottie-box" style="background-image: url(' +
                        data.lottie +
                        ');"></div>';
                    $('.weather')
                        .html(html)
                        .css(
                            'background-image',
                            'linear-gradient(-33deg,' + color1 + ' 0%,' + color2 + ' 99%)'
                        );
                },
            });

            // 热搜榜 | 今日高分影荐 | 知乎热榜
            $.ajax({
                url: 'https://ai.sm.cn/quark/1/api?format=json&method=newchosen',
                type: 'get',
                dataType: 'jsonp',
                success: function (res) {
                    var data = res.data;
                    for (var i = 0, l = data.length; i < l; i++) {
                        if (data[i].name === '今日冷知识') {
                            $('.trivia').attr('href', data[i].link);
                            $('.trivia').find('.shl').text(data[i].value.subtitle);
                        } else if (data[i].name === '热搜榜') {
                            var html = '';
                            for (var ii = 0, ll = data[i].value.length; ii < ll; ii++) {
                                html +=
                                    '<div class="news-item"><div class="news-item-count">' +
                                    (ii + 1) +
                                    '</div><div class="news-item-title">' +
                                    data[i].value[ii].title +
                                    '</div><div class="news-item-hot">' +
                                    data[i].value[ii].hot +
                                    '</div></div>';
                            }
                            $('.news-list').html(html);
                        } else if (data[i].name === '今日高分影荐') {
                            var html = '';
                            for (var ii = 0, ll = data[i].value.content.length; ii < ll; ii++) {
                                html +=
                                    '<div class="video-preview swiper-slide"><div class="video-title">' +
                                    data[i].value.content[ii].title +
                                    '</div><div class="video-time">' +
                                    data[i].value.content[ii].duration +
                                    '</div><div class="video-poster" style="background-image: url(' +
                                    data[i].value.content[ii].img +
                                    ');"></div></div>';
                            }
                            $('.video-list').find('.swiper-wrapper').html(html);
                            require(['Swiper'], function (Swiper) {
                                var swiper = new Swiper('.video-swipe', {
                                    loop: true,
                                    autoplay: {
                                        delay: 5000,
                                        disableOnInteraction: false,
                                    },
                                });
                            });
                        } else if (data[i].name === '知乎热榜') {
                            var html = '';
                            for (var ii = 0, ll = data[i].value.length; ii < ll; ii++) {
                                html +=
                                    '<div class="audio-item swiper-slide"><div class="audio-item-icon"></div><div class="audio-item-title">' +
                                    data[i].value[ii].title +
                                    '</div></div>';
                            }
                            $('.audio-list').find('.swiper-wrapper').html(html);
                            require(['Swiper'], function (Swiper) {
                                var swiper = new Swiper('.audio-swipe', {
                                    allowTouchMove: false,
                                    height: 54,
                                    direction: 'vertical',
                                    slidesPerView: 2,
                                    slidesPerGroup: 2,
                                    loop: true,
                                    autoplay: {
                                        delay: 5000,
                                        disableOnInteraction: false,
                                    },
                                });
                            });
                        }
                    }
                },
            });

            // 今日份壁纸
            $.ajax({
                url: 'https://jsonp.afeld.me/?callback=&url=https%3A%2F%2Fcn.bing.com%2FHPImageArchive.aspx%3Fformat%3Djs%26cc%3Djp%26idx%3D0%26n%3D1',
                type: 'get',
                dataType: 'jsonp',
                success: function (res) {
                    var url =
                        'https://www.bing.com' +
                        res.images[0].url.replace('1920x1080', '1080x1920');
                    $('.back-img').css('background-image', 'url(' + url + ')');
                    $('.back-btn')
                        .show()
                        .click(function () {
                            settings.set('wallpaper', url);
                        });
                },
            });
        });
    }

    $('.logo')
        .click(() => {
            var browser = browserInfo();
            if (browser === 'via') {
                location.href = 'folder://';
            } else if (browser === 'x') {
                location.href = 'x:bm?sort=default';
            }
        })
        .longPress(() => {
            var data = [{
                    title: '搜索引擎',
                    type: 'select',
                    value: 'engines',
                    data: [{
                            t: '夸克搜索',
                            v: 'quark',
                        },
                        {
                            t: '跟随Via浏览器',
                            v: 'via',
                        },
                        {
                            t: '百度搜索',
                            v: 'baidu',
                        },
                        {
                            t: '谷歌搜索',
                            v: 'google',
                        },
                        {
                            t: '必应搜索',
                            v: 'bing',
                        },
                        {
                            t: '神马搜索',
                            v: 'sm',
                        },
                        {
                            t: '好搜搜索',
                            v: 'haosou',
                        },
                        {
                            t: '搜狗搜索',
                            v: 'sogou',
                        },
                        {
                            t: '多吉搜索',
                            v: 'doge',
                        },
                        {
                            t: '自定义',
                            v: 'diy',
                        },
                    ],
                },
                {
                    title: '设置壁纸',
                    value: 'wallpaper',
                },
                {
                    title: '设置 LOGO',
                    value: 'logo',
                },
                {
                    title: '恢复默认壁纸和 LOGO',
                    value: 'delLogo',
                },
                {
                    title: '图标颜色',
                    type: 'select',
                    value: 'bookcolor',
                    data: [{
                            t: '深色图标',
                            v: 'black',
                        },
                        {
                            t: '浅色图标',
                            v: 'white',
                        },
                    ],
                },
                {
                    title: '主页样式细圆',
                    type: 'checkbox',
                    value: 'styleThin',
                },
                {
                    title: '黑暗模式（实验性）',
                    type: 'checkbox',
                    value: 'nightMode',
                },
                {
                    title: '记录搜索历史',
                    type: 'checkbox',
                    value: 'searchHistory',
                },
                {
                    type: 'hr',
                },
                {
                    title: '导出主页数据',
                    value: 'export',
                },
                {
                    title: '导入主页数据',
                    value: 'import',
                },
                {
                    type: 'hr',
                },
                {
                    title: 'Github@KurisuCN',
                    value: 'openurl',
                    description: 'https://github.com/kurisucn/quarkHomePage',
                },
                {
                    title: 'Github 原版',
                    value: 'openurl',
                    description: 'https://github.com/liumingye/quarkHomePage',
                },
                {
                    title: '关于主页',
                    description: 'KurisuCat 魔改 | 当前版本：' + app.version,
                },
            ];
            var html =
                '<div class="page-settings"><div class="set-header"><div class="set-back"></div><p class="set-logo">设置</p></div><ul class="set-option-from">';
            for (var json of data) {
                if (json.type === 'hr') {
                    html += `<li class="set-hr"></li>`;
                } else {
                    html += `<li class="set-option" ${
                        json.value ? `data-value="${json.value}"` : ''
                    }>
							<div class="set-text">
								<p class="set-title">${json.title}</p>
								${json.description ? `<div class="set-description">${json.description}</div>` : ''}
							</div>`;
                    if (json.type === 'select') {
                        html += `<select class="set-select">`;
                        for (var i of json.data) {
                            html += `<option value="${i.v}">${i.t}</option>`;
                        }
                        html += `</select>`;
                    } else if (json.type === 'checkbox') {
                        html += `<input type="checkbox" class="set-checkbox" autocomplete="off"><label></label>`;
                    }
                    html += `</li>`;
                }
            }
            html += '</ul></div>';
            $('#app').append(html);

            $('.page-settings').show();
            $('.page-settings').addClass('animation');

            var browser = browserInfo();
            if (browser !== 'via') {
                // 只有VIA浏览器才能显示
                $('option[value=via]').hide();
            }

            $('.set-option .set-select').map(function () {
                $(this).val(settings.get($(this).parent().data('value')));
            });

            $('.set-option .set-checkbox').map(function () {
                $(this).prop('checked', settings.get($(this).parent().data('value')));
            });

            $('.set-back').click(function () {
                $('.page-settings').css('pointer-events', 'none').removeClass('animation');
                $('.page-settings').on('transitionend', function (evt) {
                    if (evt.target !== this) {
                        return;
                    }
                    $('.page-settings').remove();
                });
            });

            $('.set-option').click(function (evt) {
                var $this = $(this);
                var value = $this.data('value');
                if (value === 'wallpaper') {
                    openFile(function () {
                        var file = this.files[0];
                        var reader = new FileReader();
                        reader.onload = function () {
                            settings.set('wallpaper', this.result);
                        };
                        reader.readAsDataURL(file);
                    });
                } else if (value === 'logo') {
                    openFile(function () {
                        var file = this.files[0];
                        var reader = new FileReader();
                        reader.onload = function () {
                            settings.set('logo', this.result);
                        };
                        reader.readAsDataURL(file);
                    });
                } else if (value === 'delLogo') {
                    settings.set('wallpaper', '');
                    settings.set('logo', '');
                    settings.set('bookcolor', 'black');
                    location.reload();
                } else if (value === 'openurl') {
                    open($this.find('.set-description').text());
                } else if (value === 'export') {
                    var oInput = $('<input>');
                    oInput.val('{"bookMark":' + JSON.stringify(bookMark.getJson()) + '}');
                    //oInput.val('{"bookMark":' + JSON.stringify(bookMark.getJson()) + ',"setData":' + JSON.stringify(settings.getJson()) + '}');
                    document.body.appendChild(oInput[0]);
                    console.log(store.get('bookMark'));
                    oInput.select();
                    document.execCommand('Copy');
                    alert('已复制到剪贴板，请粘贴保存文件。');
                    oInput.remove();
                } else if (value === 'import') {
                    var data = prompt('在这粘贴主页数据。');
                    try {
                        data = JSON.parse(data);
                        store.set('bookMark', data.bookMark);
                        store.set('setData', data.setData);
                        alert('导入成功!');
                        location.reload();
                    } catch (e) {
                        alert('导入失败!');
                    }
                } else if (
                    evt.target.className !== 'set-select' &&
                    $this.find('.set-select').length > 0
                ) {
                    $.fn.openSelect = function () {
                        return this.each(function (idx, domEl) {
                            if (document.createEvent) {
                                var event = document.createEvent('MouseEvents');
                                event.initMouseEvent(
                                    'mousedown',
                                    true,
                                    true,
                                    window,
                                    0,
                                    0,
                                    0,
                                    0,
                                    0,
                                    false,
                                    false,
                                    false,
                                    false,
                                    0,
                                    null
                                );
                                domEl.dispatchEvent(event);
                            } else if (element.fireEvent) {
                                domEl.fireEvent('onmousedown');
                            }
                        });
                    };
                    $this.find('.set-select').openSelect();
                } else if (
                    evt.target.className !== 'set-checkbox' &&
                    $this.find('.set-checkbox').length > 0
                ) {
                    $this
                        .find('.set-checkbox')
                        .prop('checked', !$this.find('.set-checkbox').prop('checked'))
                        .change();
                }
            });

            $('.set-select').change(function () {
                var dom = $(this),
                    item = dom.parent().data('value'),
                    value = dom.val();
                if (item === 'engines' && value === 'diy') {
                    var engines = prompt('输入搜索引擎网址（用“%s”代替搜索字词）');
                    console.log(engines);
                    if (engines) {
                        settings.set('diyEngines', engines);
                    } else {
                        dom.val(settings.get('engines'));
                        return false;
                    }
                }
                // 保存设置
                settings.set(item, value);
            });

            $('.set-checkbox').change(function () {
                var dom = $(this),
                    item = dom.parent().data('value'),
                    value = dom.prop('checked');
                // 应用设置
                if (item === 'styleThin' && value === true) {
                    $('body').addClass('styleThin');
                } else {
                    $('body').removeClass('styleThin');
                }
                // 保存设置
                settings.set(item, value);
            });
        });

    // 下滑进入搜索
    require(['touchSwipe'], function () {
        $('.page-home').swipe({
            swipeStatus: function (
                event,
                phase,
                direction,
                distance,
                duration,
                fingerCount,
                fingerData
            ) {
                if ($('.delbook').length !== 0) {
                    return;
                }
                if (phase === 'start') {
                    this.height = $(document).height();
                } else if (phase === 'move') {
                    var sliding = Math.max(fingerData[0].end.y - fingerData[0].start.y, 0);
                    $('.logo')
                        .attr('disabled', true)
                        .css({
                            opacity: 1 - (sliding / this.height) * 4,
                            'transition-duration': '0ms',
                        });
                    $('.ornament-input-group').css({
                        transform: 'translate3d(0,' + Math.min((sliding / this.height) * 80, 30) + 'px,0)',
                        'transition-duration': '0ms',
                    });
                    $('.bookmark')
                        .attr('disabled', true)
                        .css({
                            opacity: 1 - (sliding / this.height) * 4,
                            transform: 'scale(' + (1 - (sliding / this.height) * 0.3) + ')',
                            'transition-duration': '0ms',
                        });
                } else if (phase === 'end' || phase === 'cancel') {
                    $('.logo').removeAttr('disabled style');
                    $('.bookmark').removeAttr('disabled style');
                    if (distance >= 100 && direction === 'down') {
                        $('.ornament-input-group').css('transform', '').click();
                        $('.logo,.bookmark,.anitInput').css('opacity', '0');
                        $('.input-bg').css('border-color', 'var(--dark)');
                        setTimeout(function () {
                            $('.logo,.bookmark').css('opacity', '');
                        }, 300);
                    } else {
                        $('.ornament-input-group').removeAttr('style');
                    }
                }
            },
        });
    });
});
