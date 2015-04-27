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
		elem.style.visibilty = "hidden";
		elem.setAttribute("style", "display:inline-block;clear:both;float:left;font-size:800px;line-height:1;white-space:nowrap;text-align:center;position:relative;padding:0;margin:0;left:50%;top:50%;");
		
		fontCalc();
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

		console.log(elem);
		// console.log(cont);
		console.log(elemWidth, elemHeight)
		console.log(contWidth, contHeight)
		console.log(padding)
		console.log(widthFactor, heightFactor)
	}

	initFontScale()
}