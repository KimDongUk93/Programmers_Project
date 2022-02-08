export const sessionStore = {
    getItem: (keyword) => {
        const data = sessionStorage.getItem(keyword);
        return data
    },
    setItem: (keyword) => {
        const getTagList = sessionStorage.getItem("tagList");

        if(getTagList === null) {
            const array = [keyword];

            sessionStorage.setItem("tagList", JSON.stringify(array))
        } else {
            let parsedTagList = JSON.parse(getTagList);

            if(parsedTagList.length > 4) {
                parsedTagList.shift()
            }

            for (let i = 0; i < parsedTagList.length; i++) {
                if (parsedTagList[i] === keyword) {
                    parsedTagList.splice(i, 1);
                    break
                }
            }

            parsedTagList.push(keyword);
            sessionStorage.setItem("tagList", JSON.stringify(parsedTagList))
        }
    },
    deleteItem: (keyword) => {
        const getTagList = sessionStorage.getItem("tagList");
        let parsedTagList = JSON.parse(getTagList);

        for (let i = 0; i < parsedTagList.length; i++) {
            if (parsedTagList[i] === keyword) {
                parsedTagList.splice(i, 1);
                i--;
            }
        }
        sessionStorage.setItem("tagList", JSON.stringify(parsedTagList))
    }
};