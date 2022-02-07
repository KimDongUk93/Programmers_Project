export default function InputForm({app, onSearch}) {
    //-----------------상태관리 구역
    this.onSearch = onSearch;
    
    //-----------------컴포넌트 관리 구역
    this.render = () => {
        this.dom = document.createElement('section');//최상단 요소
        this.dom.className = "form-container"; 
        const html = `
            <input type="text" value="" placeholder="찾고싶은 고양이를 검색하세요"/>
            <button>검색</button>
        `;
        this.dom.innerHTML = html;
        app.appendChild(this.dom);

        //-----------------함수 관리 구역
        const serchButton = this.dom.querySelector('button');
        const serchInput = this.dom.querySelector('input');

        serchButton.addEventListener('click', ()=> {
            const searchText = serchInput.value;

            this.onSearch(searchText)
        })
    }

    this.render()
}