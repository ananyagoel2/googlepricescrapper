let express = require('express');
let querystring = require("querystring");
let router = express.Router();
let Horseman = require('node-horseman');
/* GET home page. */

router.post('/', function(req, res, next) {
    let hotelName = querystring.escape(req.body.hotelName);
    let checkInDate = querystring.escape(req.body.checkInDate);
    let duration = querystring.escape(req.body.duration);
    let link = `https://www.google.com/search?q=${hotelName}&ahotel_dates=${duration}%2C${duration}#ahotel_dates=${checkInDate},${duration}`;


    let horseman = new Horseman();

    horseman
        .userAgent('Mozilla/5.0 (Windows NT 6.1; WOW64; rv:27.0) Gecko/20100101 Firefox/27.0')
        .on('error', console.error)
        .open(link)
        .evaluate(function () {
            var resultArray =[];
            try {
                $('.lhpr-content-item').each(function (index,dataEle) {
                    var url = dataEle.outerHTML;
                    resultArray.push({id: index,
                        url:$(url).find('a:first').attr('href'),
                        price: $(url).find('a:first').attr('data-dp'),
                        name: $(url).find('div:nth-child(1)').find('div:nth-child(3)').find('span:first').text()
                    })

                });
                return resultArray
            }catch (e) {
                console.error(e);
                return [e]
            }
        })
        .then(function (result) {
            res.status(200).send(result);
        })
        .close()
});

module.exports = router;
