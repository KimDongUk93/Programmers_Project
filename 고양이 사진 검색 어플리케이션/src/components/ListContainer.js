export default function ListContainer({ app, data, onClick }) {
    this.state = data;
    this.onClick = onClick
    this.dom = document.createElement('section');
    this.dom.className = "list-container";
    app.appendChild(this.dom);

    //-----------------상태관리 구역
    this.setState = nextState => {
        this.state = nextState;
        this.render()
    }

    //-----------------컴포넌트 관리 구역
    this.render = () => {
        const catList = this.state;
        console.log(catList.length)
        if (catList.length > 0) {
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
        } else if(catList.length == 0) {
            const html = `
            <li class="no-image">
                <img src="./asset/no-data.png" alt="">
                <p>고양이를 찾을 수 없습니다ㅠ</p>
            </li>
            `
            ;

            this.dom.innerHTML = html;
        }
        //-----------------함수 관리 구역

        const catPicture = this.dom.querySelectorAll('.list');

        catPicture.forEach((cat, index) => {
            cat.addEventListener('click', ()=> {
                const {catId} = cat.dataset;

                this.onClick(catId)
            })
        })
    }
}