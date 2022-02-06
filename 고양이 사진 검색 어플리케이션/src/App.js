import InputForm from "./components/InputForm.js";
import ListContainer from "./components/ListContainer.js";
import { api } from "./api.js";

export default function App(app) {
    //-----------------상태관리 구역
    this.state = {
        catList: []
    }

    this.setState = nextState => {
        this.state = nextState;
        listContainer.setState(this.state.catList)
    }

    //-----------------컴포넌트 관리 구역
    const inputForm = new InputForm({
        app, 
        onSearch: async (searchText) => {
            const searchResult = await api.fetchCats(searchText);

            this.setState({
                ...this.state,
                catList: searchResult
            })
        }
    });

    const listContainer = new ListContainer({
        app,
        data: this.state.catList
    });
    
    //-----------------첫 랜더링 구역
    const init = async () => {
        this.setState({
            ...this.state
        })
    }

    init()
}