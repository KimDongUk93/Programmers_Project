export default function InputForm({app}) {
    //-----------------상태관리 구역
    this.setState = nextState => {
        this.state = nextState;
        this.render()
    }

    //-----------------컴포넌트 관리 구역
    this.render = () => {
        this.dom = document.createElement('section');//최상단 요소
        const html = `
            <form>
                <input type="text"/>
            </form>
        `;
        this.dom.innerHTML = html;
        app.appendChild(this.dom);
    }
}