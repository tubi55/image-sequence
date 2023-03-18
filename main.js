const frame = document.querySelector('section');
const mask = document.querySelector('aside');
const delayTime = convertSpeed(mask);
let imgs = '';
let count = 0;

//동적 IMG DOM생성
for (let i = 1; i <= 200; i++) {
	imgs += `<img src='img/pic${i}.jpg' />`;
}
frame.innerHTML = imgs;
const imgDOM = frame.querySelectorAll('img');

imgDOM.forEach((img) => {
	img.onload = () => {
		count++;
		//현재 카운트되는 값이 1~200아닌
		//1~100까지 백분율화 해서 해당 내용이 마스크에 숫자로 출력되도록
		const percent = parseInt((count / 200) * 100);

		//변경되는 퍼센트 값을 마스크안쪽의 span에 출력
		mask.querySelector('span').innerText = percent;
		mask.querySelector('.bar').style.width = percent + '%';
		console.log(percent);

		if (percent === 100) {
			mask.classList.add('off');
			setTimeout(() => {
				mask.remove();
			}, delayTime);
		}
	};
});

//생성된 DOM을 제어하는 이벤트 연결
frame.addEventListener('mousemove', (e) => {
	let percent = (e.clientX / window.innerWidth) * 200;
	percent = parseInt(percent);
	imgDOM.forEach((img) => (img.style.display = 'none'));
	imgDOM[percent].style.display = 'block';
});

//인수로 선택자를 받아서 해당요소의 transitionDuration값을 밀리세컨드로 반환함수
function convertSpeed(el) {
	let speed = getComputedStyle(el).transitionDuration; //"2.5s"
	speed = parseFloat(speed) * 1000; //2.5 *1000 = 2500
	return speed;
}

/*
	1.css에서 aside요소에 연결되어있는 transitionDuration값을 가져옴 ('2.5s')
	--css의해서 적용된 스타일값을 자바스크립트 돔객체로 부터 직접 스타일 값을 가져올수 없음
	--브라우저에 의해서 랜더링된 값을 재연산해서 그 결과값을 가져와야됨 (getComputedStyle활용)

	2.'2.5s'문자값을 숫자로 변환한 뒤 1000을 곱합
	-- parseInt(문자값 or 숫자) :정수로 변환
	-- parseFloat(문자값 or 숫자) : 실수로 변환

	3.숫자로 변환된 값을 return
*/
