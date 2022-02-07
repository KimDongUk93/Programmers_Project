sessionStorage.setItem("tagList", JSON.stringify("[]"))

export const sessionStore = {
    getItem: (keyword) => {
        const data = sessionStorage.getItem(keyword);
        return data
    }
};