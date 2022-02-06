//이미지 상세보기 화면을 보여주는 컴포넌트, "FILE"타입의 요소를 클릭할시 "Modal ImageView"엘리먼트에 랜더링된다.
const IMAGE_PATH_PREFIX = "https://fe-dev-matching-2021-03-serverlessdeploymentbuck-t3kpj3way537.s3.ap-northeast-2.amazonaws.com/public";

export default function ImageView({app, initalState, closeClick}){
    this.state = initalState;
    this.target = document.createElement("div");
    this.target.className = "Modal ImageView";
    this.closeClick = closeClick;
    app.appendChild(this.target);

    this.setState = nextState => {
        this.state = nextState;
        this.render()
    }

    this.render = () =>{
        this.target.innerHTML = `
            <div class="content">
                <div class="close-btn">
                    닫기
                </div>
                ${this.state.selectedFilePath ? `<img src="${IMAGE_PATH_PREFIX}${this.state.selectedFilePath}">`:""}
            </div>
        `;
        this.target.style.display = this.state.selectedFilePath ? "flex" : "none";

        const closeBtn = this.target.querySelector('.close-btn');

        closeBtn.addEventListener('click', this.closeClick)
    }

    this.render();
}