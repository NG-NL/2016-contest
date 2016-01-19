module.exports = function () {

    return function(seconds) {

        var sec_num = parseInt(seconds, 10); // don't forget the second param
        var hours   = Math.floor(sec_num / 3600);
        var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
        var seconds = sec_num - (hours * 3600) - (minutes * 60);

        if (hours   < 10) { hours   = '0' + hours; }
        if (minutes < 10) { minutes = '0' + minutes; }
        if (seconds < 10) { seconds = '0' + seconds; }

        if (hours === '00' && minutes === '00') {
            return seconds;
        } else if (hours === '00') {
            return minutes+':'+seconds;
        } else {
            return hours+':'+minutes+':'+seconds;
        }

    }
};
