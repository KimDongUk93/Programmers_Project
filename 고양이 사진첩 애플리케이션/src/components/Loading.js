// 네비게이션을 렌더링하는 컴포넌트
// 첫번째 파라매터로 app을 받고 app에 네비게이션을 렌더링한다.
// 두번째 파라매터로는 초기 state을 받는다.

export default function Loading({app, initialState}){
    this.state = initialState;
    this.target = document.createElement('dic');
    this.target.className = "loading Modal";
    app.appendChild(this.target);

    this.setState = nextState => {
        this.state = nextState;
        this.render()
    }

    this.render = () =>{
        this.target.innerHTML = `
        <div class="loading">
            <img src="./assets/Loader.gif" alt="로딩중...">
            <p>로딩중...</p>
        </div>
        `;
        this.target.style.display = this.state ? "block" : "none";
    }

    this.render();
}
