import { FONT, INTERVAL, WIDTH, HEIGHT, TILECOLUMN, TILEROW, TILESIZE, MAP_WIDTH} from './variable';
import { virtualScreenMap } from './map';
import image                from '../image/map.png';

/**
 * @param count         カウント
 * @param mapImg        画像を作成
 * @param virtualScreen 仮装画面を作成
 */
let count:         number = 0
let mapImg:        CanvasImageSource;
let virtualScreen: HTMLCanvasElement;
let canvasWidth:   number;
let canvasHeight:  number;

/**
 * 仮装画面で描画コンテキストを取得し、仮装画面上に画像を表示させる。
 *
 */
function drawMainScreen() {
  /**
   * @param contex2d 描画コンテキストをJavaScriptで操作するためにコンテキストオブジェクトを設定
   */
  const context2d = virtualScreen.getContext('2d')

  /**
   * x座標とy座標をfor文で回し、作成したマップを仮装画面情に描画していく
   * 計算としては、各座標をタイルサイズ分敷き詰めて作成したマップ配列を
   * drawTile関数でループ処理する
   */
  for(let y = 0; y < 32; y ++){
    for(let x = 0; x < 64; x ++){
      drawTile(
        context2d!,
        x * TILESIZE,
        y * TILESIZE,
        virtualScreenMap[ y * MAP_WIDTH + x]
      )
    }
  }
  /**
   * 使用するフォント、フォントサイズを指定
   */
  context2d!.font = FONT
  context2d!.fillText("Hello World" + count, count / 10, 64)
}

/**
 * 画像をタイルサイズに分けて表示
 *
 */
function drawTile(context2d: CanvasRenderingContext2D, x: number, y: number, index: number) {
  context2d!.drawImage(
    mapImg,
    (index % TILECOLUMN) * TILESIZE,
    Math.floor(index / TILECOLUMN) * TILESIZE,
    TILESIZE, TILESIZE, x, y,
    TILESIZE, TILESIZE
  )
}

function drawPaintImage() {
  drawMainScreen()
  /**
   * @param canvas    mainキャンバスの要素を取得
   * @param context2d 描画コンテキストをJavaScriptで操作するためにコンテキストオブジェクトを設定
   */
  const canvas    = <HTMLCanvasElement>document.getElementById('main')
  const context2d = canvas.getContext('2d')
  /**
   * 仮装画面をmainキャンバスに転送
   *
   */
  context2d!.drawImage(
    virtualScreen,
    0, 0, virtualScreen.width, virtualScreen.height, // 仮装画面
    0, 0, canvasWidth, canvasHeight                  // 実画面
  )

}

function canvasSize() {
  /**
   * @param canvas   mainキャンバスの要素を取得
   */
  const canvas    = <HTMLCanvasElement>document.getElementById('main')
  canvas.width    = window.innerWidth
  canvas.height   = window.innerHeight

  /**
   * ドットのアスペクト比を維持したまま、最大サイズを計算
   *
   */
  canvasWidth  = canvas.width
  canvasHeight = canvas.height

  /**
   * 画像サイズを縦長と横長の場合で処理分けをする
   */
  if(canvasWidth / WIDTH < canvasHeight / HEIGHT){
    canvasHeight = canvasWidth * HEIGHT / WIDTH
  } else {
    canvasWidth = canvasHeight * WIDTH / HEIGHT
  }
}

/**
 * drawPaintImageを呼び出し非同期で描画処理を実行
 *
 */
function drawAsyncCanvas() {

  count++
  drawPaintImage()
}

/**
 * 画面を読み込む処理
 *
 */
window.onload = () => {
  mapImg = new Image();
  mapImg.src = image

  /**
   * @param virtualScreen 仮装画面を作成
   * @param WIDTH  仮装画面の横幅 320
   * @param HEIGHT 仮装画面の縦幅 300
   *
   * 仮装画面を作成し、サイズを変更
   */
  virtualScreen = document.createElement("canvas")
  virtualScreen.width  = WIDTH
  virtualScreen.height = HEIGHT

  /**
   * @param canvasSize 表示させるサイズを指定
   *
   * 画面にリサイズイベントが走るたびに画面サイズを画面一杯に表示されるように処理を行う
   */
  canvasSize()
  window.addEventListener(
    "resize",
    function(){
      canvasSize()
    }
  )
  /**
   * 33ms間隔で、drawAsyncCanvasを呼び出すよう指示(約30.3fps)
   *
   * @param INTERVAL number 33
   */
  setInterval(function(){
    drawAsyncCanvas()
  }, INTERVAL);
}
