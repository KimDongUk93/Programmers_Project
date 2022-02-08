export default function SearchTag({app, data, onClick, onDelete}) {
    this.state = data;
    this.onClick = onClick;
    this.onDelete = onDelete;
    this.dom = document.createElement('ul');//최상단 요소
    this.dom.className = "searchTag-container"; 
    app.appendChild(this.dom);

    //-----------------상태관리 구역
    this.setState = nextState => {
        this.state = nextState;
        this.render()
    }

    this.render = () => {
        let tagList = this.state;

        if(tagList.length > 5) tagList.shift();

        if(tagList){
            const makeTagList = tagList.map((tag, index) => {
                return `
                    <li class="tag">
                        <p class="text">${tag}</p>
                        <span class="close">x</span>
                    </li>
                `
            }).join("");

            const html = makeTagList;
            this.dom.innerHTML = html;

            const listsBtns = this.dom.querySelectorAll('.text');
            const closeBtns = this.dom.querySelectorAll('.close');

            listsBtns.forEach(listBtn => {
                listBtn.addEventListener('click', (e)=> {
                    const tagSearchText = e.target.innerHTML;

                    this.onClick(tagSearchText)
                })
            });

            closeBtns.forEach(closeBtn => {
                closeBtn.addEventListener('click', (e)=> {
                    const tagSearchText = e.target.parentNode.querySelector('.text').innerHTML;
                    this.onDelete(tagSearchText)
                })
            });
        }
    }
}