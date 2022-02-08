export default function ListContainer({ app, data, onClick }) {
    this.state = data;
    this.catList10 = [];
    this.catListOther = [];
    this.onClick = onClick;
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
        let catList = this.state;
        this.catList10 = this.state.slice(0, 10);
        this.catListOther = this.state.slice(10);

        if (catList === undefined || catList.length == 0) {
            const html = `
            <li class="no-image">
                <img src="./asset/no-data.png" alt="">
                <p>고양이를 찾을 수 없습니다ㅠ</p>
            </li>
            `;

            this.dom.innerHTML = html;
        } else if (this.catList10.length > 1) {
            const html = this.catList10.map(cat => {
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
        }
        //-----------------함수 관리 구역

        const catPicture = this.dom.querySelectorAll('.list');

        catPicture.forEach((cat, index) => {
            cat.addEventListener('click', () => {
                const { catId } = cat.dataset;

                this.onClick(catId)
            })
        })
    }

    //-----------------함수 관리 구역
    window.addEventListener("scroll", () => {
        const SCROLLED_HEIGHT = window.scrollY;
        const WINDOW_HEIGHT = window.innerHeight;
        const DOC_TOTAL_HEIGHT = document.body.offsetHeight;
        const IS_BOTTOM = WINDOW_HEIGHT + SCROLLED_HEIGHT === DOC_TOTAL_HEIGHT;

        if (IS_BOTTOM) {
            this.catList10 = this.catListOther.slice(0, 10);
            this.catListOther = this.catListOther.slice(10);

            for (let i = 0; i < this.catList10.length; i++) {
                let list = document.createElement("li");
                list.className = "list";
                list.setAttribute("data-cat-id", this.catList10[i].id)

                let html = `
                <div class="img-wrap">
                    <img src="${this.catList10[i].url}" alt="${this.catList10[i].name}">
                    </div>
                <p class="name">${this.catList10[i].name}</p>
                `
                list.innerHTML = html;

                list.addEventListener('click', () => {
                    const { catId } = list.dataset;
    
                    this.onClick(catId)
                })

                this.dom.append(list)
            }
        }
    });
}