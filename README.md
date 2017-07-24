# wheels
font-end-wheels
export default function print(url) {
    var image = new Image();

    image.onload = function() {
      var style = [
        'font-size: 1px;',
        'line-height: ' + this.height + 'px;',
        'padding: ' + this.height * .5 + 'px ' + this.width * .5 + 'px;',
        'background-size: ' + this.width + 'px ' + this.height + 'px;',
        'background: url('+ url +') no-repeat;'
       ].join(' ');
       console.log('%c', style);
    };
    // Actually loads the image
    image.src = url;
}
