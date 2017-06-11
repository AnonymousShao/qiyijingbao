const userInfo = {
    Account: null,  //"13248260,782"
    AreaNo : null,
    Birthday  : null,
    ChannelNO  : null,
    ChannelName  : null,
    CityNo  : null,
    CreditAmount  : null,
    Degree  : null,
    Description : null,
    Email : null,
    HeadUrl : null,
    ID : 0,
    IDNumber : null,
    IsVertify : false,
    LastLoginTime : null,    //"2017-06-06 20:32:00"
    Mobile : null,           //"13248260782"
    Nickname : null,
    OpenID : null,
    OpenIDMall : null,
    Password : null,
    ProvinceNo : null,
    QQ : null,
    RealName : null,
    RegisterTime : null,     //"2017-06-06 20:31:39"'
    Sex : 0,
    Source : 0,
    State : null,
    Telphone : null,
    VIPCardNO : null,
    VertifySum : 0,
    VipEndTime : null,
    VipLevel : null,
    VipStar : null,
    WeiBo : null,
    WeiXinID : null,
    auctiontype : 0,
    bargaintype : 0,
    oldpassword : null,
    securitycode : null,
}

module.exports.userInfo = function () {
    for (const item in userInfo) {
        this[item] = userInfo[item]
    }
}