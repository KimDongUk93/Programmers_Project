
export default function Loading({app, initialState}){
    this.state = initialState;
    this.target = document.createElement('dic');
    this.target.className = "loading Modal";
    app.appendChild(this.target);

    this.setState = nextState => {
        this.state = nextState;
        this.render()
    }

    this.render = () =>{
        this.target.innerHTML = `
        <div class="loading">
            <img src="./assets/Loader.gif" alt="로딩중...">
            <p>로딩중...</p>
        </div>
        `;
        this.target.style.display = this.state ? "block" : "none";
    }

    this.render();
}
