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
        getIp() {
            // 获取ip地址
            this.fetch('http://cp01-rdqa04-dev120.cp01.baidu.com:8099/mis/index.php?act=getip',
                data => {
                $('#loading').fadeOut(100);
                $('#debugProject, #stopProject, #devtoolsTips').fadeIn(100);
                ipAddress = data.data;
                this.getProjectList();
            }.bind(this), e => {
                $('#loading').fadeOut(100);
                $('#debugProject, #stopProject, #devtoolsTips').fadeIn(100);
                $('#error').fadeIn(100).html('无法连接开发机，因此扫码调试功能失效，请与<a href="mailto:jincai.wang@foxmail.com">memoryza</a>联系')
                ipAddress = 'localhost';
                this.getProjectList();
            });
            return this;
        },
        getProjectList() {
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
                    <span class="qr" data-qs="${item.qs}"  data-href="http://${ipAddress + webrootDir + (item.url.charAt(0) === '/' ? item.url : '/' + item.url)}"></span></li>
                `).join('') : `<li>本地没有编译过该项目</li>`)}
                </ul>`;

            this.fetch('./pages.json', data => {
                let {currentproject, list} = data;
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
        },
        showQr() {
            let href = $(this).data('href');
            let qs = $(this).data('qs');
            if (href) {
                $('#qrCodeLayer').fadeIn();
                $('#qrCode').html('').qrcode('bainuo://component?url=' + encodeURIComponent(href));
            }
            return false;
        },
        hideQr() {
            $('#qrCodeLayer').fadeOut();
        },
        initEvent() {
            $(document)
                .on('click', '.qr', this.showQr)
                .on('click', '#qrCodeLayer .bg, #qrCodeLayer .content', this.hideQr)
        },
        init() {
            this.getIp().initEvent();
        }
    };
    Index.init();
})();