// TODO: 이 곳에 정답 코드를 작성해주세요.

const inputId = document.getElementById("id");
const inputPw = document.getElementById("pw");
const inputPwCheck = document.getElementById("pw-check");
const submitBtn = document.getElementById("submit");

// 1. autofocus
// 페이지가 로드 된 시점에 ID 입력 창에 Focus가 되어 있어야 합니다.
window.onload = function() {
  inputId.focus();
}

// 3. 커스텀 에러 메세지
const idMsg = document.getElementById("id-msg");
const pwMsg = document.getElementById("pw-msg");
const pwCheckMsg = document.getElementById("pw-check-msg");

const ERROR_MSG = {
  required: "필수 정보입니다.",
  invalidId: "5~20자의 영문 소문자, 숫자와 특수기호(_),(-)만 사용 가능합니다.",
  invalidPw: "8~16자 영문 대 소문자, 숫자를 사용하세요.",
  invalidPwCheck: "비밀번호가 일치하지 않습니다."
}

// 2. 유효성 검사 로직
const ID_REGEX = /^[a-z0-9_-]{5,20}$/;
const PW_REGEX = /^[a-zA-Z0-9]{8,16}$/;

const checkRegex = (target) => {
  const {value, id} = target;
  if(value.length === 0) {
    return 'required'
  } else {
    switch(id) {
      case 'id':
        return ID_REGEX.test(value) ? true : 'invalidId';
      case 'pw':
        return PW_REGEX.test(value) ? true : 'invalidPw';
      case 'pw-check':
        return value === inputPw.value ? true : 'invalidPwCheck';
    }
  }
}

const checkValidate = (target, msgTarget) => {
  const isValid = checkRegex(target);

  if(isValid !== true){
    msgTarget.innerText = ERROR_MSG[isValid];
    target.classList.add("border-red-600");
  } else {
    msgTarget.innerText = "";
    target.classList.remove("border-red-600");
  }

  return isValid;
}

inputId.addEventListener('focusout', () => checkValidate(inputId, idMsg));
inputPw.addEventListener('focusout', () => checkValidate(inputPw, pwMsg));
inputPwCheck.addEventListener('focusout', () => checkValidate(inputPwCheck, pwCheckMsg));

// 4. 입력 확인 모달 창
const modal = document.getElementById("modal");
const confirmId = document.getElementById("confirm-id");
const confirmPw = document.getElementById("confirm-pw");
const cancelBtn = document.getElementById("cancel-btn");
const approveBtn = document.getElementById("approve-btn");

submitBtn.addEventListener('click', (e) => {
  e.preventDefault();

  const isValidForm = 
  checkValidate(inputId, idMsg) === true &&
  checkValidate(inputPw, pwMsg) === true &&
  checkValidate(inputPwCheck, pwCheckMsg) === true;

  if(isValidForm) {
    confirmId.innerText = inputId.value;
    confirmPw.innerText = inputPw.value;
    modal.showModal();
  }
})

cancelBtn.addEventListener('click', () => {
  modal.close();
})

approveBtn.addEventListener('click', () => {
  window.alert("가입되었습니다 🥳");
  modal.close();
})

// 5. 폰트 사이즈 조절 버튼
const increaseBtn = document.getElementById("increase-font-btn");
const decreaseBtn = document.getElementById("decrease-font-btn");
const html = document.documentElement;

const MAX_FONT_SIZE = 20;
const MIN_FONT_SIZE = 12;

const getHtmlFontSize = () => {
  return parseFloat(window.getComputedStyle(html).fontSize);
}

increaseBtn.addEventListener('click', () => {
  onClickFontSizeControl('increaseBtn');
})

decreaseBtn.addEventListener('click', () => {
  onClickFontSizeControl('decreaseBtn');
})

const onClickFontSizeControl = (flag) => {
  const fontSize = getHtmlFontSize();
  let newFontSize;
  if(flag === 'increase') {
    newFontSize = fontSize + 1;
  } else if(flag === 'decrease') {
    newFontSize = fontSize - 1;
  }
  html.style.fontSize = newFontSize;
  decreaseBtn.disabled = newFontSize <= MIN_FONT_SIZE;
  increaseBtn.disabled = newFontSize >= MAX_FONT_SIZE;
}