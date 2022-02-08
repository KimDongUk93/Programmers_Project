import InputForm from "./components/InputForm.js";
import SearchTitleComp from "./components/SearchTitleComp.js";
import ListContainer from "./components/ListContainer.js";
import SearchTag from "./components/SearchTag.js";
import CatDetailModal from "./components/CatDetailModal.js";
import Loading from "./components/Loading.js";
import { sessionStore } from "./sessionStore.js";
import { api } from "./api.js";

export default function App(app) {
    //-----------------상태관리
    this.state = {
        searchTitle: "",
        tagList: [],
        catList: [],
        catDetail: {},
        modalState: false,
        loading: false
    }

    this.setState = nextState => {
        this.state = nextState;
        searchTag.setState(this.state.tagList);
        searchTitleComp.setState(this.state.searchTitle);
        listContainer.setState(this.state.catList);
        catDetailModal.setState({
            catDetail: this.state.catDetail,
            modalState: this.state.modalState,
        });
        loading.setState(this.state.loading)
    }

    //-----------------컴포넌트 관리
    const inputForm = new InputForm({
        app, 
        onSearch: async (searchText) => {
            loadingController.start();
            sessionStore.setItem(searchText);

            const searchResult = await api.fetchCats(searchText);
            const searchResultArray = searchResult.data;

            const getTagList = sessionStore.getItem("tagList");

            if(getTagList !== null){
                const parsedTagList = JSON.parse(getTagList);
                this.state.tagList = parsedTagList;
                searchTag.setState(this.state.tagList);
            }
            
            this.setState({
                ...this.state,
                searchTitle: searchText,
                catList: searchResultArray
            })

            loadingController.stop()
        }
    });

    const searchTag = new SearchTag({
        app,
        data: this.state.tagList,
        onClick: async (tagSearchText) => {
            loadingController.start();

            const searchResult = await api.fetchCats(tagSearchText);
            const searchResultArray = await searchResult.data;
            
            this.setState({
                ...this.state,
                searchTitle: tagSearchText,
                catList: searchResultArray
            })

            loadingController.stop()
        },
        onDelete: (tagSearchText) => {
            sessionStore.deleteItem(tagSearchText);

            const getTagList = sessionStore.getItem("tagList");

            if(getTagList !== null){
                const parsedTagList = JSON.parse(getTagList);
                this.state.tagList = parsedTagList;
                searchTag.setState(this.state.tagList);
            }
        }
    });

    const searchTitleComp = new SearchTitleComp({
        app,
        data: this.state.searchTitle
    })

    const listContainer = new ListContainer({
        app,
        data: this.state.catList,
        onClick: async (catId) => {
            loadingController.start();

            this.state.modalState = true;

            if(this.state.catDetail.id !== catId){
                const searchResult = await api.fetchCatDetail(catId);
                const catDetail = searchResult.data;
                
                this.state.catDetail = catDetail;
            }

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

    //-----------------함수
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

    const init = async () => {
        loadingController.start();

        const getTagList = sessionStore.getItem("tagList");

        if(getTagList !== null){
            const parsedTagList = JSON.parse(getTagList);
            this.state.tagList = parsedTagList
        }

        const response = await api.fetchRandomCats();
        const randomCats = response.data;
        this.state.catList = randomCats;

        listContainer.setState(this.state.catList)
        searchTag.setState(this.state.tagList);
        loadingController.stop()
    }

    init()
}