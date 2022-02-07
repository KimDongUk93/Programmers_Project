export default function CatDetailModal({ app, data, closeClick }) {
    this.state = data;
    this.closeClick = closeClick
    this.dom = document.createElement('div');
    this.dom.className = "cat-detail modal";
    app.appendChild(this.dom);

    //-----------------상태관리 구역
    this.setState = nextState => {
        this.state = nextState;
        this.render()
    }

    //-----------------컴포넌트 관리 구역
    this.render = () => {
        const {catDetail, modalState} = this.state;

        if (catDetail) {
            const html = `
            <div class="inner">
                <div class="close">
                    <img src="./asset/close.png" alt="팝업 닫기">
                </div>
                <img src="${catDetail.url}" alt="${catDetail.name}">
                <p class="name">${catDetail.name}</p>
                <p class="origin">서식지: ${catDetail.origin}</p>
                <p class="temp">성격: ${catDetail.temperament}</p>
            </div>
            `
            this.dom.innerHTML = html;
        }

        this.dom.style.display = modalState ? "block" : "none";

        const closeBtn = this.dom.querySelector('.close');

        closeBtn.addEventListener('click', this.closeClick)
        document.addEventListener('keydown', (e)=>{
            if(e.keyCode === 27) this.closeClick()
        })
    }
}