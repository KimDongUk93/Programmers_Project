import Breadcrumb from "./components/Breadcrumb.js";
import Nodes from "./components/Nodes.js";
import { api, request } from "./api.js";

//모든 컴포넌트들을 관장하는 최상위 컴포넌트
//컴포넌트 별로 독립적으로 관리 할 수 있게되며 의존도를 낮추고 쉽게 재사용 할 수 있는 구조가 됨(리액트랑 비슷ㅋ)

export default function App(app) {
    this.state = {
        isRoot: false,
        nodes: [],
        depth: []
    }

    //Breadcrumb컴포넌트 불러옴
    const breadcrumb = new Breadcrumb({
        app,
        initialState:this.state.depth
    })

    //Nodes컴포넌트 불러옴
    const nodes = new Nodes({
        app,
        initialState: [],
        onClick: async (node) => {
            try{
                if (node.type === "DIRECTORY") {
                    const nextNodes = await request(node.id);
                    this.setState({
                        ...this.state,
                        depth:[...this.state.depth, node],
                        nodes: nextNodes
                    })
                } else if (node.type === "FILE") {
    
                }
            } catch (error) {
                throw new Error(`${error.message}`)
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
        }
    }

    this.setState = nextState => {
        this.state = nextState;
        breadcrumb.setState(this.state.depth);
        nodes.setState({
            isRoot: this.state.isRoot,
            nodes: this.state.nodes
        })
    }

    init()
}