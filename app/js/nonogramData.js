System.register([], function(exports_1) {
    var games, rows, columns;
    return {
        setters:[],
        execute: function() {
            games = [];
            // counted from left to right
            rows = [
                [2],
                [7],
                [12],
                [18],
                [24],
                [14, 14],
                [15, 15],
                [14, 14],
                [14, 14],
                [14, 14],
                [13, 13],
                [13, 13],
                [12, 2, 12],
                [1, 1, 2, 2, 2],
                [1, 1, 4, 1, 1],
                [1, 1, 4, 2, 1],
                [1, 1, 6, 1, 1],
                [1, 1, 6, 1, 1],
                [1, 2, 1, 1],
                [1, 1, 1, 1],
                [2, 2, 1, 2],
                [2, 1, 10, 1, 2],
                [1, 2, 10, 6],
                [5, 11, 5],
                [5, 12, 5],
                [4, 12, 4],
                [28],
                [28],
                [25],
                [22],
                [18],
                [14],
                [10],
                [7],
                [4]
            ];
            // counted from top to bottom
            columns = [
                [7],
                [17],
                [8, 8],
                [8, 6],
                [9, 6],
                [9, 7],
                [9, 3, 4],
                [10, 3, 5],
                [10, 3, 5],
                [10, 3, 6],
                [11, 2, 8],
                [12, 12],
                [11, 13],
                [9, 2, 13],
                [6, 4, 14],
                [5, 6, 14],
                [5, 6, 14],
                [6, 4, 14],
                [9, 2, 13],
                [10, 12],
                [12, 12],
                [14, 9],
                [10, 3, 6],
                [10, 2, 5],
                [10, 3, 5],
                [9, 3, 4],
                [9, 8],
                [9, 7],
                [8, 6],
                [8, 8],
                [17],
                [8]
            ];
            games.push({
                rows: rows,
                columns: columns,
                name: 'ng-nl game'
            });
            exports_1("games", games);
        }
    }
});