if (!!window.EventSource) {
    var source = new EventSource('/update_labels');
    source.addEventListener('logmessage', function(e) {
        var text = e.data;
        if(text == "---- Update Finished ----" ||
            text == "**** Update Failed ****" ||
            text == "**** Update Succeed ****") {
            $("#updatebtn").button("reset");
        }
        else {
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
