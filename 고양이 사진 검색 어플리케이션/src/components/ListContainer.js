export default function ListContainer({app, data}) {
    this.state = {
        data
    }

    //-----------------상태관리 구역
    this.setState = nextState => {
        this.state = nextState;
        this.render()
    }

    //-----------------컴포넌트 관리 구역
    this.render = () => {
        const catList = this.state.data;

        this.dom = document.createElement('section');
        this.dom.className = "list-container"; 

        if(catList){
            const html = catList.map(cat => {
                return `
                <li class="list" data-cat-id="${cat.id}">
                    <div class="img-wrap">
                        <img src="${cat.url}" alt="${cat.name}">
                    </div>
                    <p class="name">${cat.name}</p>
                </li>
            `
            }).join("");
            this.dom.innerHTML = html;
            app.appendChild(this.dom);
        }
        //-----------------함수 관리 구역
    }
}