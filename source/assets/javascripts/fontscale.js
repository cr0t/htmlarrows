/* Font scaling function inspired / modified from Daniel Hoffman's jQuery BigText plugin
 * https://github.com/DanielHoffmann/jquery-bigtext/
 *
 * Original license:
 *
 * jQuery BigText v1.3.0, May 2014
 * Copyright (C) 2013 Daniel Hoffmann Bernardes, Ícaro Technologies
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */
function fontScale() {
	var elem = document.querySelector( '#symbol' ),
			fontSizeMax = 600,
			fontSizeFactor = 0.8

	if( elem ) {
		initFontScale()
	}

	function initFontScale() {
		setStyle();
	}

	function setStyle() {
		if( elem ) {
			elem.style.visibilty = "hidden",
			elem.setAttribute("style", "visibility:hidden;display:inline-block;clear:both;float:left;font-size:800px;line-height:1;white-space:nowrap;text-align:center;position:relative;padding:0;margin:0;left:50%;top:50%;")
		
			fontCalc();
		}
	}

	function fontCalc() {
		var elemWidth = elem.offsetWidth,
				elemHeight = elem.offsetHeight,
				contWidth = elem.parentNode.offsetWidth,
				contHeight = elem.parentNode.offsetHeight,
				cont = window.getComputedStyle(elem.parentNode, null),
				padding = {
					top: parseInt(cont.getPropertyValue('padding-top')),
					right: parseInt(cont.getPropertyValue('padding-right')),
					bottom: parseInt(cont.getPropertyValue('padding-bottom')),
					left: parseInt(cont.getPropertyValue('padding-left'))
				},
				widthFactor = (contWidth - padding.right - padding.left) / elemWidth
				heightFactor = (contHeight - padding.top - padding.bottom) / elemHeight

		if ( widthFactor < heightFactor ) {
			lineHeight = Math.floor( widthFactor * 1000 );
		} else if ( widthFactor >= heightFactor ) {
			lineHeight = Math.floor( heightFactor * 1000 );
		}

		var fontSize = lineHeight * fontSizeFactor;
		if (fontSize > fontSizeMax) {
      fontSize = fontSizeMax;
      lineHeight = fontSize / fontSizeFactor;
    }

		elem.style.fontSize = Math.floor(fontSize) + 'px',
		elem.style.lineHeight = Math.ceil(lineHeight) + 'px',
		elem.style.top = 0,
		elem.style.marginLeft = Math.floor(-elem.offsetWidth / 2) + 'px',
		elem.style.visibility = 'visible'
	}

	initFontScale()
}