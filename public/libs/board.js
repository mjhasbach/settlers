require(['underscore', 'KineticJS'], function(_, Kinetic){
    var layer = new Kinetic.Layer,
        stage = new Kinetic.Stage({
            container: 'game',
            width: window.innerWidth,
            height: window.innerHeight
        }).add(layer);

    var hexagonalBloom = function(amount){
        var radius = window.innerWidth / 24,
            hexHeight = radius * 2,
            hexWidth = Math.sqrt(3) / 2 * hexHeight,
            getRandomColor = function() {
                return '#' + Math.floor(Math.random() * 16777215).toString(16)
            },
            hex = new Kinetic.RegularPolygon({
                x: window.innerWidth / 2,
                y: window.innerHeight / 2,
                radius: radius,
                sides: 6,
                fill: getRandomColor()
            }),
            group = new Kinetic.Group().add(hex),
            spacingMap = {
                tr: {
                    x: hexWidth / 2,
                    y: 0.75 * hexHeight
                },
                br: {
                    x: hexWidth / 2,
                    y: -0.75 * hexHeight
                },
                mr: {
                    x: hexWidth,
                    y: 0
                },
                ml: {
                    x: -hexWidth,
                    y: 0
                },
                tl: {
                    x: -hexWidth / 2,
                    y: 0.75 * hexHeight
                },
                bl: {
                    x: -hexWidth / 2,
                    y: -0.75 * hexHeight
                }
            };

        _.times(amount, function(){
            _.each(group.getChildren(), function(tile) {
                _.each(spacingMap, function(distance){
                    var x = tile.x() + distance.x,
                        y = tile.y() + distance.y;

                    if (!stage.getIntersection({x: x, y: y})){
                        group.add(
                            tile.clone({
                                x: x,
                                y: y,
                                fill: getRandomColor()
                            })
                        );
                    }
                });
            });
        });

        return group;
    };

    layer.add(hexagonalBloom(3));
    layer.draw();
});