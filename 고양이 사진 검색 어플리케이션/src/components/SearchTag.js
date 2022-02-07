export default function SearchTag({app, data}) {
    this.state = data;
    this.dom = document.createElement('ul');//최상단 요소
    this.dom.className = "searchTag-container"; 
    app.appendChild(this.dom);

    //-----------------상태관리 구역
    this.setState = nextState => {
        this.state = nextState;
        this.render()
    }

    this.render = () => {
        const tagList = this.state;

        if(tagList){
            const makeTagList = tagList.map((tag, index) => {
                return `<li class="tag">${tag}</li>`
            }).join("");

            const html = makeTagList;
            this.dom.innerHTML = html;
        }
    }
}