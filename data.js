export const initialState = {
    nodes: [
        {
            "id": "1",
            "name": "고양이1",
            "type": "DIRECTORY",
            "filePath": "/images/cat01.jpg",
            "parent": {
                "id": "1"
            }
        },
        {
            "id": "2",
            "name": "고양이2",
            "type": "FILE",
            "filePath": "/images/cat02.jpg",
            "parent": {
                "id": "2"
            }
        }
        ,
        {
            "id": "3",
            "name": "고양이3",
            "type": "FILE",
            "filePath": "/images/cat03.jpg",
            "parent": {
                "id": "3"
            }
        }
    ]
}

export const nextState = {
    nodes: [
        {
            "id": "4",
            "name": "고양이4",
            "type": "DIRECTORY",
            "filePath": "/images/cat04.jpg",
            "parent": {
                "id": "4"
            }
        },
        {
            "id": "5",
            "name": "고양이5",
            "type": "FILE",
            "filePath": "/images/cat05.jpg",
            "parent": {
                "id": "5"
            }
        }
        ,
        {
            "id": "6",
            "name": "고양이6",
            "type": "FILE",
            "filePath": "/images/cat06.jpg",
            "parent": {
                "id": "6"
            }
        }
    ]
}

 