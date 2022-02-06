//리스트가 나올 메인 컨텐츠를 랜더링 하는 컴포넌트
// 첫번째 파라매터로 app, 두번째 파라매터로 initialState, 세번째 파라매터로 onClick을 받는다

export default function Nodes({app, initialState, onClick, onBackClick}){
    this.state = initialState;
    this.target = document.createElement('ul');
    this.target.className = "list-container"
    this.onClick = onClick;
    this.onBackClick = onBackClick;
    app.appendChild(this.target)

    //setState : Breadcrumb와 동일한 기능 
    this.setState = (nextState) =>{
        this.state = nextState;
        this.render()
    }

    //render : Breadcrumb와 동일한 기능
    this.render = () =>{
        //state.node를 사용하여 리스트를 출력하는 구문
        if(this.state.nodes){
            const nodesTemplate = this.state.nodes.map(node => {
                const iconPath = node.type === "FILE" ? "./assets/file.png" : "./assets/directory.png";
                return `
                <li class="node" data-node-id="${node.id}">
                    <img src="${iconPath}" alt="${node.name}"/ width="50px" height="50px">
                    <div>${node.name}</di>
                </li>
            `
            }).join('');

            this.target.innerHTML = !this.state.isRoot ? `
                <div class="node prev-btn">
                    <img src="assets/prev.png" width="50px" height="50px">
                </div>
                <ul class="list">
                    ${nodesTemplate}
                </ul>
            ` : 
            nodesTemplate
        }

        //list 요소(node)들 각각 클릭 이벤트를 적용함
        //클릭한 node의 id를 추출하여 onClick메서드로 전달
        this.target.querySelectorAll('.node').forEach(node => {
            node.addEventListener('click', (e)=>{
                // const {nodeId} = e.target.dataset;
                const {nodeId} = node.dataset;

                //만약 클릭한 node에 id가 없으면 뒤로가기 버튼으로 인지, 뒤로가기 이벤트 실행
                if(!nodeId){
                    this.onBackClick();
                } else {
                    const selectNode = this.state.nodes.find(node => node.id === nodeId);
                
                    if(selectNode){
                        this.onClick(selectNode);
                    }
                }
            })
        })
    }

    this.render();
}