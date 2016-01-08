module.exports = function() {
    var data = require('../../../data/boards/easy');
    return [
        require('../../../data/boards/ng-nl'),
        require('../../../data/boards/easy'),
        require('../../../data/boards/medium'),
    ];
};
