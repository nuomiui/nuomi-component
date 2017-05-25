/**
 * page列表页面
 * @FileDesc
 * @Author   Memoryza(jincai.wang@foxmail.com)
 * @DateTime 2016-09-22T09:26:50+0800
 */
;(function () {
    let ipAddress;
    let Index = {
        enableFetch() {
            return typeof window.fetch === 'function';
        },
        fetch(url, success, error) {
            if (this.enableFetch) {
                fetch(url).then(res => {
                    if (res.ok) {
                        res.json().then(data => {
                            success(data);
                        });
                    } else {
                        error(res);
                    }
                }, e => {
                    error(e);
                });
            } else {
                $.ajax({
                    url: url,
                    success: function (data) {
                        success(data);
                    },
                    error: function (e) {
                        error(e)
                    }
                })
            }
        },
        getProjectList() {
            $('#loading').fadeOut(100);
            $('#debugProject, #stopProject, #devtoolsTips').fadeIn(100);
            let webrootDir = "%webrootDir%";
            if (webrootDir) {
                webrootDir = webrootDir.charAt(0) === '/' ? webrootDir : '/' + webrootDir;
                webrootDir = webrootDir.replace('\\\\', '/').replace('\\', '/');
            }

            const genHtml = (project, list) => `
                <div class="title">${project}</div>
                <ul>
                ${(list && list.length ? list.map(item => `
                    <li><a href="${(item.url.charAt(0) === '/' ? item.url : '/' + item.url) + '?' + item.qs + '&need_bnjs=1'}">${item.name}</a>
                    <span class="qr" data-qs="${item.qs}"  data-href="http://${ipAddress + webrootDir + (item.url.charAt(0) === '/' ? item.url : '/' + item.url)}"></span>
                `).join('') : `<li>本地没有编译过该项目</li>`)}
                </ul>`;
            this.fetch('./pages.json', data => {
                let {currentproject, list, ip: ipAddress } = data;
                for (let project in list) {
                    if (project && list.hasOwnProperty(project)) {
                        if (project === currentproject) {
                            $('#debugProject').html(genHtml(project, list[project]));
                        } else {
                            $('#stopProject').append(genHtml(project, list[project]));
                        }
                    }
                }
            }, e => {
                alert('数据解析失败');
            });
            return this;
        },
        showSbQr() {
            let href = $(this).data('href');
            let qs = $(this).data('qs');
            if (href) {
                $('#qrCodeLayer').fadeIn();
                let params = {
                    "url": href + (qs ? ('?' + qs) : ''),
                    "plugin_id":"com.nuomi.dcps.plugin"
                };
                $('#qrCode').html('').qrcode('baiduboxapp://invokePlug?action=open&params=' + encodeURIComponent(JSON.stringify(params)));
            }
            return false;
        },
        showQr() {
            let href = $(this).data('href');
            let qs = $(this).data('qs');
            if (href) {
                $('#qrCodeLayer').fadeIn();
                $('#qrCode').html('').qrcode('bainuo://component?url=' + encodeURIComponent(href) + (qs ? ('&' + qs) : ''));
            }
            return false;
        },
        hideQr() {
            $('#qrCodeLayer').fadeOut();
        },
        initEvent() {
            $(document)
                .on('click', '.qr', this.showQr)
                .on('click', '.sbqr', this.showSbQr)
                .on('click', '#qrCodeLayer .bg, #qrCodeLayer .content', this.hideQr)
        },
        init() {
            this.getProjectList().initEvent();
        }
    };
    Index.init();
})();