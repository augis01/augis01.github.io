var i = 0;
setInterval(function() {
    var titles = [
        "|",
        "||",
        "|O|",
        "|Ob|",
        "|Obn|",
        "|Obno|",
        "|Obnox|",
        "|Obnoxi|",
        "|Obnoxio|",
        "|Obnoxiou|",
        "|Obnoxious|",
        "|Obnoxious.|",
        "|Obnoxious.c|",
        "|Obnoxious.cl|",
        "|Obnoxious.clu|",
        "|Obnoxious.club|",
        "|Obnoxious.clu|",
        "|Obnoxious.cl|",
        "|Obnoxious.c|",
        "|Obnoxious.|",
        "|Obnoxiou|",
        "|Obnoxio|",
        "|Obnoxi|",
        "|Obnox|",
        "|Obno|",
        "|Obn|",
        "|Ob|",
        "|O|",
        "||",
        "|",
    ]

    if (i === titles.length) {
        i = 0;
    }
    document.title = titles[i];
    i++;
}, 500);