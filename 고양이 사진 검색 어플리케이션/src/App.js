import InputForm from "./components/InputForm.js";
import ListContainer from "./components/ListContainer.js";
import SearchTag from "./components/SearchTag.js";
import CatDetailModal from "./components/CatDetailModal.js";
import { api } from "./api.js";

export default function App(app) {
    //-----------------상태관리 구역
    this.state = {
        tagList: [],
        catList: [],
        catDetail: {},
        modalState: false
    }

    this.setState = nextState => {
        this.state = nextState;
        searchTag.setState(this.state.tagList);
        listContainer.setState(this.state.catList);
        catDetailModal.setState({
            catDetail: this.state.catDetail,
            modalState: this.state.modalState,
        });
    }

    //-----------------컴포넌트 관리 구역
    const inputForm = new InputForm({
        app, 
        onSearch: async (searchText) => {
            const searchResult = await api.fetchCats(searchText);
            const searchResultArray = searchResult.data;
            
            this.setState({
                ...this.state,
                tagList: [...this.state.tagList, searchText],
                catList: searchResultArray,
            })
        }
    });

    const searchTag = new SearchTag({
        app,
        data: this.state.tagList
    });

    const listContainer = new ListContainer({
        app,
        data: this.state.catList,
        onClick: async (catId) => {
            const searchResult = await api.fetchCatDetail(catId);
            const catDetail = searchResult.data;
            
            this.state.catDetail = catDetail;
            this.state.modalState = true;

            catDetailModal.setState({
                catDetail: this.state.catDetail,
                modalState: this.state.modalState,
            });
        }
    });

    const catDetailModal = new CatDetailModal({
        app,
        data: {
            catDetail: this.state.catDetail,
            modalState: this.state.modalState,
        },
        closeClick: () => {
            this.state.modalState = false;

            catDetailModal.setState({
                catDetail: {},
                modalState: this.state.modalState,
            });
        }
    })

    //-----------------처음 랜더링
    const init = async () => {
        searchTag.setState(this.state.tagList)
    }

    init()
}