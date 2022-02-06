// 네비게이션을 렌더링하는 컴포넌트
// 첫번째 파라매터로 app을 받고 app에 네비게이션을 렌더링한다.
// 두번째 파라매터로는 초기 state을 받는다.

export default function Breadcrumb({ app, initialState, onClick }) {
    this.state = initialState;
    this.target = document.createElement('nav');
    this.target.className = "breadcrumb";
    this.onClick = onClick;
    app.appendChild(this.target);

    //setState : state가 변경 될 시 사용하는 메서드, 
    //첫번째 파라매터 nextState로 다음 state를 받고 Breadcrumb컴포넌트의 state값을 재설정 한 후 다시 랜더링 한다.
    this.setState = nextState => {
        this.state = nextState;
        this.render()
    }

    //render : state를 사용하여 네비게이션을 랜더링 하는 메서드
    //state.nodes를 이용하여 현재 위치를 랜더링한다.
    this.render = () => {
        this.target.innerHTML = `
            <div class="nav-item">메인화면</div>
            ${this.state.map((node, index) => `
                <span class="divider">
                    ▶
                </span>
                <div class="nav-item" data-index="${index}">${node.name}</div>
            `).join("")}
        `
        //네비 버튼을 클릭시 클릭한 버튼은 index를 받아 onClick으로 전달
        this.target.querySelectorAll('.nav-item').forEach(navBtn => {
            navBtn.addEventListener('click', (e) => {
                const {index} = navBtn.dataset;
                this.onClick(index ? parseInt(index, 10) : null)
            })
        })
    }
}
