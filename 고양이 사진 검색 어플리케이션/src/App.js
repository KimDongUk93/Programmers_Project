import InputForm from "./components/InputForm.js";

export default function App(app) {
    //-----------------상태관리 구역
    this.state = {

    }

    this.setState = nextState => {
        inputForm.setState()
    }

    //-----------------컴포넌트 관리 구역
    const inputForm = new InputForm({app});
    
    //-----------------첫 랜더링 구역
    const init = async () => {
        this.setState({
            ...this.state
        })
    }

    init()
}