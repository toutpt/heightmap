import { useEffect } from "preact/hooks";
import { parse } from "../../../utils/parse";
import './Image.css';

function uuid() {
    var S4 = function() {
       return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
    };
    return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
}

/**
 * this component render an image from an state's entry
 */
export function Image(props) {
	let random = uuid();
    useEffect(() => {
        if (!props.entry) {
            return;
        }
        const config = parse(props.entry.content);
        if (config.values.length === 0) {
			return
		}
		const flata = [].concat(...config.values)
		//const ui = Uint8ClampedArray.from([].concat(...config.values));
		// https://developer.mozilla.org/en-US/docs/Web/API/ImageData/ImageData
		const arr = new Uint8ClampedArray(config.ncols * config.nrows * 4)
		// console.log(`${arr.length}, ${flata.length}`)
		// Iterate through every pixel
		for (let i = 0; i < arr.length; i += 4) {
			arr[i + 0] = Math.floor(flata[i / 4]) // R value
			arr[i + 1] = Math.floor(flata[i / 4]) // G value
			arr[i + 2] = Math.floor(flata[i / 4]) // B value
			arr[i + 3] = 255 // A value
		}
		const idata = new ImageData(arr, config.ncols)

		var target = document.getElementById(random)
		var canvas = document.createElement('canvas')
		canvas.width = config.ncols;
		canvas.height = config.nrows;
		var ctx = canvas.getContext('2d');
		ctx.putImageData(idata, 0, 0);
		target.appendChild(canvas)
		return () => {
			target.removeChild(canvas)
		}
    }, [props.entry]);
    return (
        <div class="canvas" id={random}></div>
    );
}