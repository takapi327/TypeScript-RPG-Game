import { FONT } from './variable';
import image    from '../image/map.png';

let count:  number = 0
let mapImg: CanvasImageSource;

function drawAsyncCanvas(){

  count++
  /**
   * @param canvas   mainキャンバスの要素を取得
   * @param object2d 描画コンテキストをJavaScriptで操作するためにコンテキストオブジェクトを設定
   */
  const canvas    = <HTMLCanvasElement>document.getElementById('main')
  const context2d = canvas.getContext('2d')

  for(let y = 0; y < 16; y ++){
    for(let x = 0; x < 16; x ++){
      context2d!.drawImage(mapImg, x * 176, y * 64)
    }
  }

  context2d!.font = FONT
  context2d!.fillText("Hello World", + count, count / 10, 64)
}

window.onload = () => {
  mapImg = new Image();
  mapImg.src = image
  setInterval(function(){drawAsyncCanvas()}, 33);
}
