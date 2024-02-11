//랜덤번호 지정
//유저가 번호를 입력한다 그리고 go라는 버튼을 누름
//만약에 유저가 랜덤번호를 맞추면, 맞췄습니다!
//랜덤번호가 < 유저번호 Down!!!
//랜덤번호가 > 유저번호 Up!!!
//Reset버튼을 누르면 게임이 리셋된다
//5번의 기회를 다쓰면 게임이 끝난다(더이상 추측 불가, 버튼이 disable)
//유저가 1~100 범위 밖에 숫자를 입력하면, 알려준다. 기회가 차감되지 않는다
//유자가 이미 입력한 숫자를 또 입력하면, 알려준다. 기회가 차감되지 않는다

let computerNum = 0
//document.getElementById()
// document : 웹 페이지 그 자체
// getElementById : html태그를 가져오는데 id를 통해 가져온다
let playButton = document.getElementById("play-button")
let userInput = document.getElementById("user-input")
let resultArea = document.getElementById("result-area")
let resetButton = document.getElementById("reset-button")
let chances = 5
let gameOver = false
let chanceArea = document.getElementById("chance-area")

//playButton태그에 event를 추가해주는데
//그건 'click' event이고 클릭했을 때 실행될 함수는
//'play'야
//'play'이렇게 작성한 코드의 뜻은 함수를 매개변수로 넘기겠다는 의미인데(함수도 매개변수로 넘길수 있다!!)
//'play()'이렇게 작성하면 코드가 바로 실행되기 때문에 'click' event가 실행될때만
//해당 함수가 동작하게 하려면 play만 작성해서 매개변수로 넘겨주어야 한다
playButton.addEventListener("click",play)
resetButton.addEventListener("click", reset)

function pickRandomNumber() {
  //Math.random() => 0 ~ 1 범위의 랜덤숫자를 생성해주는 함수
  //Math.round() => 반올림
  //Math.floor() => 내림/버림
  //그런데 Math.random()은 1과 가까운 숫자까지 반환하지 1을 포함하진 않음 그래서 최종적으로 1을 더해주어야 함
  computerNum = Math.floor(Math.random()*100) + 1
  console.log('정답', computerNum)
}

function play() {
  let userValue = userInput.value

  //기회 차감
  chances--;
  // ""는 정적인 값에만 사용가능
  // 정적인 값과 동적인 값을 같이 사용하고 싶을 때는
  // ``(백틱)을 사용해 주어야 한다
  // ${chances} : 동적인값 chances 사용
  chanceArea.textContent = `남은 찬스 : ${chances}번`
  console.log('chances', chances)

  if(userValue > computerNum) {
    //textContent
    // resultArea태그의 값을 ""값(지정한 값)으로 바꿔준다
    resultArea.textContent = "DOWN!!!"
    // console.log("Down!!!")
  } else if(userValue < computerNum) {
    resultArea.textContent = "UP!!!"
    // console.log("Up!!!")
  } 
  else {
  // else if(userValue == computerNum) {
    resultArea.textContent = "맞췄습니다!!!"
    // console.log('정답입니다!!!')
  }

  if(chances < 1) {
    gameOver = true;
  }

  if(gameOver == true) {
    playButton.disabled = true
  }

}

function reset() {
  //user input창이 깨끗하게 정리되고 
  // userInput.value = null;
  userInput.value = "";
  //새로운 번호가 생성되고
  pickRandomNumber()

  resultArea.textContent = "결과값이 여기 나옵니다"
}

//랜덤번호 생성
pickRandomNumber()
