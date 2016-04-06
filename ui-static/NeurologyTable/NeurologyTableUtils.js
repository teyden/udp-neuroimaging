define("NeurologyTableUtils", [], function() {
    return {
        dateToString: function(date) {
            return date.getFullYear() + '-' + (date.getMonth()+1) + '-' + date.getDate();
        },

        stringToDate: function(str) {
            var dateParts = str.split('-');
            return new Date(dateParts[0], dateParts[1]-1, dateParts[2]);
        },
    };
});