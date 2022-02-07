import InputForm from "./components/InputForm.js";
import ListContainer from "./components/ListContainer.js";
import SearchTag from "./components/SearchTag.js";
import CatDetailModal from "./components/CatDetailModal.js";
import Loading from "./components/Loading.js";
import { sessionStore } from "./sessionStore.js";
import { api } from "./api.js";

export default function App(app) {
    //-----------------상태관리 구역
    this.state = {
        tagList: [],
        catList: [],
        catDetail: {},
        modalState: false,
        loading: false
    }

    this.setState = nextState => {
        this.state = nextState;
        searchTag.setState(this.state.tagList);
        listContainer.setState(this.state.catList);
        catDetailModal.setState({
            catDetail: this.state.catDetail,
            modalState: this.state.modalState,
        });
        loading.setState(this.state.loading)
    }

    //-----------------컴포넌트 관리 구역
    const inputForm = new InputForm({
        app, 
        onSearch: async (searchText) => {
            loadingController.start()

            const searchResult = await api.fetchCats(searchText);
            const searchResultArray = searchResult.data;
            
            this.setState({
                ...this.state,
                tagList: [...this.state.tagList, searchText],
                catList: searchResultArray
            })

            loadingController.stop()
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
            loadingController.start()

            const searchResult = await api.fetchCatDetail(catId);
            const catDetail = searchResult.data;
            
            this.state.catDetail = catDetail;
            this.state.modalState = true;

            catDetailModal.setState({
                catDetail: this.state.catDetail,
                modalState: this.state.modalState,
            });

            loadingController.stop()

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

    const loading = new Loading({
        app,
        data: this.state.loading
    })

    //-----------------함수 관리
    const init = async () => {
        loadingController.start();
        const savedTagList = sessionStore.getItem("tagList");
        const a = JSON.parse(savedTagList);
        console.log(typeof savedTagList)

        const response = await api.fetchRandomCats();
        const randomCats = response.data;
        this.state.catList = randomCats;

        listContainer.setState(this.state.catList)
        searchTag.setState(this.state.tagList);
        loadingController.stop()
    }

    const loadingController = {
        start: () => {
            this.state.loading = true
            loading.setState(this.state.loading)
        },
        stop: () => {
            this.state.loading = false
            loading.setState(this.state.loading)
        }
    }

    init()
}