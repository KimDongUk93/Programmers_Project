import { initialState, nextState } from "./data.js";
import { request } from "./api.js";

const $app = document.querySelector('.app');

class Nodes {
    constructor({ $app, initialState, onClick }) {//해당 컴포넌트가 표현될 element를 생성하고, 파라메터로 받은 $app에 렌더링함
        this.state = initialState;
        this.$target = document.createElement('ul');
        this.$target.className = "content";
        this.onClick = onClick;
        $app.appendChild(this.$target);

        this.render();
    }

    setState(nextState) {//해당 컴포넌트의 state를 갱신하고 render함수
        this.state = nextState;
        this.render()
    }

    // render() {//생성된 element에 해당 컴포넌트의 state를 기준으로 렌더링 함
    //     this.$target.innerHTML = this.state.nodes.map(node => `<li>${node.name}</li>`)
    // }

    render() {
        if(this.state.nodes){
            const nodesTemplate = this.state.nodes.map(node => {
                const iconPath = node.type === "FILE" ? "./assets/file.png" : "./assets/directory.png";
                return `
                <li class="node li" data-node-id="${node.id}">
                    <img src="${iconPath}" alt="${node.name}"/ width="50px" height="50px">
                    <div>${node.name}</di>
                </li>
            `
            }).join('');

            this.$target.innerHTML = !this.state.isRoot ? `
                <li class="node prev-btn">
                    <img src="assets/prev.png" width="50px" height="50px">
                </li>
                <ul class="list">
                    ${nodesTemplate}
                </ul>
            ` : 
            nodesTemplate
        }

        this.$target.querySelectorAll('.node').forEach($node => {
            $node.addEventListener('click', (e)=>{
                const {nodeId} = e.target.parentNode.dataset;
                const selectNode = this.state.nodes.find(node => node.id === nodeId);

                if(selectNode){
                    this.onClick(selectNode);
                }
            })
        })
    }
}

class Breadcrumb {
    constructor({ $app, initialState }) {
        this.state = initialState;
        this.$target = document.createElement('nav');
        this.$target.className = "breadcrumb";
        $app.appendChild(this.$target);

        this.render();
    }

    setState = nextState => {
        this.state = nextState;
        this.render()
    }

    render(){
        this.$target.innerHTML = `
            <div class="nav-item">root</div>
            ${this.state.nodes.map((node, index) => 
                `<div class="nav-item" data-index="${index}">${node.name}</div>`
            ).join('')}
            `
    }
}

class App {
    constructor($app){
        this.state = {
            isRoot : false,
            nodes: [],
            depth: []
        }

        const breadcrumb = new Breadcrumb({
            $app,
            initialState
        })
        
        const nodes = new Nodes({
            $app,
            initialState: {
                isRoot: this.state.isRoot,
                nodes: this.state.nodes
            },
            onClick: (node) => {
                if(node.type === "DIRECTORY") {

                } else if (node.type === "FILE") {

                }
            }
        })

        this.init()
    }

    setState = nextState => {
        
        this.state = nextState;
        breadcrumb.setState(this.state.depth);
        nodes.setState({
            isRoot: this.state.isRoot,
            nodes: this.state.nodes
        })
        console.log(nextState)
        
    }

    init = async () => {
        try{
            const rootNodes = await request("jsonData.json");
            this.setState({
                ...this.state,
                isRoot: true,
                nodes: rootNodes
            })
        } catch(e){
            
        }
    }
}

new App($app)
