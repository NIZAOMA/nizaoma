
    $('#fileToUpload').change(function () {
        window.URL = window.URL || window.webkitURL;
        var imgFile = document.getElementById('fileToUpload');
        if (window.URL) {
            //File API
            $('#uphoto').attr("src", window.URL.createObjectURL(imgFile.files[0])); //创建一个object URL，并不是你的本地路径

            $('#uphoto').onload = function (e) {
                window.URL.revokeObjectURL(this.src); //图片加载后，释放object URL
            }

        }

    });
