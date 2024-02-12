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
let playButton = document.getElementById("play-button")
let userInput = document.getElementById("user-input")
let resultText = document.querySelector(".result-text")
let resetButton = document.querySelector(".button-reset")
let resultAreaImg = document.querySelector(".main-img");
// 추가문제1. 남은 기회를 5번이 아닌 10번으로 바꾸고 싶다면? 어디를 바꾸면 될까?
// let chances = 10
let chances = 5
let gameOver = false
let chanceArea = document.getElementById("chance-area")
//유저가 이미 입력한 값들을 저장하는 배열
let history = []

playButton.addEventListener("click",play)
resetButton.addEventListener("click", reset)
// 추가문제5. input창에 포커스를 두면 내가 그전에 입력한 값이 자동으로 지워지게 하려면 어떻게 해야할까?
// userInput.addEventListener("focus", focus)
userInput.addEventListener("focus",function(){userInput.value = ""})


function pickRandomNumber() {
  computerNum = Math.floor(Math.random()*100) + 1
  
  // computerNum를 1~10사이의 랜덤번호를 받고싶다면?
  // 추가문제4. 랜덤변수 생성의 범위를 1~10으로 변경
  // computerNum = Math.floor(Math.random()*10) + 1
  console.log('정답', computerNum)
}

function play() {
  let userValue = userInput.value

  //입력 범위 유효성 검사
  if(userValue < 1 || userValue > 100) {
    // console.log('1 ~ 100 사이의 숫자만 입력해주세요')
    resultText.textContent = "1 ~ 100 사이의 숫자만 입력해주세요"
    return
  }

    //이미 입력한 값 유효성 검사
    // for(let i=0; history.length > i; i++) {
    //   if(userValue == history[i]) {
    //     resultArea.textContent = "이미 입력한 숫자입니다. 다시 입력해주세요"
    //     return;
    //   }
    // }
  
    if(history.includes(userValue)) {
      resultText.textContent = "이미 입력한 숫자입니다. 다시 입력해주세요"
      return;
    }

  //기회 차감
  chances--;
  chanceArea.textContent = `남은 찬스 : ${chances}번`
  console.log('chances', chances)

  if(userValue > computerNum) {
    resultAreaImg.src = "https://media.giphy.com/media/r2puuhrnjG7vy/giphy.gif"
    resultText.textContent = "DOWN!!!"
  } else if(userValue < computerNum) {
    resultAreaImg.src = "https://media0.giphy.com/media/3ov9jExd1Qbwecoqsg/200.gif"
    resultText.textContent = "UP!!!"
  } 
  else {
  // else if(userValue == computerNum) {
    resultText.textContent = "맞췄습니다!!!"
    resultAreaImg.src = "https://media.tenor.com/images/0a81b89954678ebe228e15e35044f7a5/tenor.gif"
    //내가 생각한 코드
    // playButton.disabled = true

    //선생님 코드 -> 이미 gameOver = true이면 playButton이 disabled되는 로직이 짜여있기 때문에
    //맞췄을 때 gameOver = true로 바꿔주는 방법도 있음
    gameOver = true
  }

  //유저가 이미 입력한 값을 배열에 저장
  history.push(userValue)
  console.log('history', history)

  if(chances < 1) {
    gameOver = true;
  }


  //추가문제3. if(gameover == true)를 if(gameover)로 해도 똑같이 동작이 될까? 동작이 된다면 왤까?
	// 동작한다
	// 왜냐하면 gameover값에 true값을 지정했으니 그 변수의 값이 곧 true이니까?
  if(gameOver) {
    playButton.disabled = true
  }

}

function reset() {
  //user input창이 깨끗하게 정리되고 
  userInput.value = "";
  //새로운 번호가 생성되고
  pickRandomNumber()
  resultAreaImg.src =
  "https://media1.giphy.com/media/9DinPR8bzFsmf74j9W/giphy.gif";
  resultText.textContent = "결과값이 여기 나옵니다"
  chances = 5
  chanceArea.textContent = `남은 찬스 : ${chances}번`
  playButton.disabled = false
  userValueList = []
}

// 추가문제5. input창에 포커스를 두면 내가 그전에 입력한 값이 자동으로 지워지게 하려면 어떻게 해야할까?

//=> userInput만 잠시 사용하고 말 함수이기 때문에 익명함수로 처리
// 함수 선언 시 메모리 소모됨
function focus() {
  userInput.value = "";
}

//랜덤번호 생성
pickRandomNumber()
