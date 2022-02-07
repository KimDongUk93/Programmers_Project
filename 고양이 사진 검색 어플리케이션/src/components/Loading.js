export default function CatDetailModal({ app, data }) {
    this.state = data;
    this.dom = document.createElement('div');
    this.dom.className = "loading";
    app.appendChild(this.dom);

    //-----------------상태관리 구역
    this.setState = nextState => {
        this.state = nextState;
        this.render()
    }

    //-----------------컴포넌트 관리 구역
    this.render = () => {
        const loading = this.state;

        if (loading) {
            const html = `
            <div class="inner">
                <img src="./asset/loading.gif" alt="로딩중">
            </div>
            `
            this.dom.innerHTML = html;
        }

        this.dom.style.display = loading ? "block" : "none";
    }
}