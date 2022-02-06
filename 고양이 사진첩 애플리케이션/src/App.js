import Breadcrumb from "./components/Breadcrumb.js";
import Nodes from "./components/Nodes.js";
import ImageView from "./components/ImageView.js";
import Loading from "./components/Loading.js";
import { request } from "./api.js";

//모든 컴포넌트들을 관장하는 최상위 컴포넌트
//컴포넌트 별로 독립적으로 관리 할 수 있게되며 의존도를 낮추고 쉽게 재사용 할 수 있는 구조가 됨(리액트랑 비슷)

export default function App(app) {
    //리액트의 useState랑 비슷하다고 생각하면 됨
    this.state = {
        isRoot: false,//현재 위치가 최상단인지 아닌지 구분한다.
        nodes: [],//현재 화면에 띄울 요소들을 담은 배열
        depth: [],//네비게이션에 랜더링될 요소들
        selectedFilePath: null,//만약 클릭한 요소의 타입이 "FILE"일시 들어갈 이미지 경로
        isLoading: true,//로딩시에는 true
        selectedNodeImage: false//현재 이미지 상세보기가 활성화가 되있는지
    }

    const loading = new Loading({
        app, 
        initialState:this.state.isLoading
    })

    //Breadcrumb컴포넌트 불러옴
    const breadcrumb = new Breadcrumb({
        app,
        initialState:this.state.depth
    })
    //imageView컴포넌트 불러옴
    const imageView = new ImageView({
        app,
        initalState:this.state.selectedNodeImage,
        closeClick: () => {
            console.log('asd')
        }
    })

    //Nodes컴포넌트 불러옴
    const nodes = new Nodes({
        app,
        initialState: [],
        //onClick : 요소를 클릭시 발생될 이벤트핸들러, 요소의 타입을 구별해서 다른 이벤트가 발생된다.
        onClick: async (node) => {
            try{
                //요소의 타입이 "DIRECTORY"시 api로 요소의 개별 데이터를 가져와서 state에 알맞게 적용 시킨 후 재랜더링.
                if (node.type === "DIRECTORY") {
                    const nextNodes = await request(node.id);
                    this.setState({
                        ...this.state,
                        depth:[...this.state.depth, node],
                        nodes: nextNodes,
                        isRoot: false
                    })
                //요소의 타입이 "FILE"시 state.selectedFilePath를 요소의 filePath로 변경 시킨 후 재랜더링.
                } else if (node.type === "FILE") {
                    this.setState({
                        ...this.state,
                        selectedFilePath:node.filePath
                    })
                }
            } catch (error) {
                throw new Error(`${error.message}`)
            }
        },
        onBackClick: async () => {
            //이전 state의 값을 가져와서 그 스테이트의 마지막 요소를 삭제함
            const nextState = {...this.state}
            nextState.depth.pop();
            //만약 nextState의 길이가 0이면(루트면) null로 아니면 nextState의 말둘의 id를 뒤로갈 요소id로 지정함
            const prevNodeId = nextState.depth.length === 0 ? null : nextState.depth[nextState.depth.length - 1].id;

            //prevNodeId가 root면 컴포넌트 초기화 시킴
            if(prevNodeId === null){
                const rootNodes = await request();

                this.setState({
                    ...nextState,
                    isRoot: true,
                    nodes: rootNodes
                })
                //prevNodeId가 root가 아니면 prevNodeId로 api요청후 화면 재구성
            } else {
                const prevNode = await request(prevNodeId);

                this.setState({
                    ...nextState,
                    isRoot: false,
                    nodes: prevNode
                })
            }
        }
    })

    const init = async () => {
        try {
            const rootNodes = await request();
            this.setState({
                ...this.state,
                isRoot: true,
                nodes: rootNodes
            })
        } catch (error) {
            throw new Error(`${error.message}`)
        } finally {
            this.setState({
                ...this.state,
                isLoading: false
            })
        }
    }

    this.setState = nextState => {
        this.state = nextState;
        breadcrumb.setState(this.state.depth);
        nodes.setState({
            isRoot: this.state.isRoot,
            nodes: this.state.nodes
        })
        imageView.setState({
            selectedFilePath: this.state.selectedFilePath
        });
        loading.setState(this.state.isLoading)
    }

    init()
}