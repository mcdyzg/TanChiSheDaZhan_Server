module.exports = function() {

    function getQizi() {
        var a = [
            "h-xiang", "h-shi", "h-hu", "h-bao", "h-lang", "h-gou", "h-mao", "h-shu",
            "l-xiang", "l-shi", "l-hu", "l-bao", "l-lang", "l-gou", "l-mao", "l-shu"
        ];
        var qizi = [];
        for (var i = 16 - 1; i >= 0; i--) {
            qizi.push(_.pullAt(a, [_.random(0, a.length - 1)]));
        }
        return qizi;
    }


    return {
        "roomLimit": 2,
        "qizi": getQizi(),
        "camps": ["playerA", "playerB"],
        "playerA": {
            "name": "",
            "camp": "h",
            "isYourTurn": true,
            "have": ["xiang", "shi", "hu", "bao", "lang", "gou", "mao", "shu"]
        },
        "playerB": {
            "name": "",
            "camp": "l",
            "isYourTurn": false,
            "have": ["xiang", "shi", "hu", "bao", "lang", "gou", "mao", "shu"]
        }
    };

};
