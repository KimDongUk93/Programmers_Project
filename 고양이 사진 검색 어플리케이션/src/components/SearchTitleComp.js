export default function SearchTitleComp({app, data}) {
    this.state = data;
    this.dom = document.createElement('section');//최상단 요소
    this.dom.className = "searchTitle-container"; 
    app.appendChild(this.dom);

    //-----------------상태관리 구역
    this.setState = nextState => {
        this.state = nextState;
        this.render()
    }

    this.render = () => {
        const searchTitle = this.state;

        if(searchTitle){
            const html = `
                <h3>'${searchTitle}'로 검색한 결과입니다.</h3>
            `
            this.dom.innerHTML = html;
        }
    }
}