var express = require('express');
var router = express.Router();
var axios = require('axios')
var code = require('../codeParams')

const host_url = 'https://www.universelife.cn'

//社区活动
router.get('/v1.0/communityActCon/homePageList', function (req, res, next) {
    axios.get(host_url+'/activity/api/v1.0/communityActCon/homePageList', {}).then(function (response) {
        console.log(response.data);
        res.send(response.data)
    })
})

//banner
router.get('/bannerCon/bannerShow', function (req, res, next) {
    axios.get(host_url+'/heli-oms/api/bannerCon/bannerShow', {
        params:code(req.query)
    }).then(function (response) {
        console.log(response.data);
        res.send(response.data)
    }).catch(error => {
        console.log(error)
    })
})

//activitylist
router.get('/travel/travelActList',function (req,res,next) {
    axios.get(host_url+'/heli-oms/api/travel/travelActList', {
        params:code(req.query)
    }).then(function (response) {
        console.log(response.data);
        res.send(response.data)
    })
})


module.exports = router;