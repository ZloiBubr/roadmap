if (!!window.EventSource) {
    var source = new EventSource('/update_progress');
    source.addEventListener('progress', function(e) {
        var data = JSON.parse(e.data);
        if(data.page)
        {
            $("#page_progress_bar").css({ width: data.page + '%' });
        }
    }, false);
    source.addEventListener('logmessage', function(e) {
        var text = e.data;
        if(text == "---- Update Finished ----" ||
           text == "**** Update Failed ****" ||
           text == "**** Update Succeed ****") {
            $("#updatebtn").button("reset");
            $("#cleanbtn").button("reset");
        }
        else {
            $("#cleanbtn").button("loading");
            $("#updatebtn").button("loading");
        }
        $("#serverlog").val(text + "\r\n" + $("#serverlog").val());
    }, false);
    source.addEventListener('errmessage', function(e) {
        var text = e.data;
        $("#errorlog").val(text + "\r\n" + $("#errorlog").val());
    }, false);
    source.addEventListener('error', function(e) {
        source.close();
    }, false);
}
