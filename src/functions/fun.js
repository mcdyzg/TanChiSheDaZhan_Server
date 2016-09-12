module.exports = function(root) {
	var fucpath = root + '/functions';
    return {
        encode: require(fucpath + '/encode'),
        res: require(fucpath + '/response'),
        util: require(fucpath + '/util')
    };
}
