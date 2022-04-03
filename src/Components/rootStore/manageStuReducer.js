
const student = {
    infoStu: {
        maSV: '',
        ten: '',
        soDT: '',
        mail: ''
    },
    inputErrors: {
        maSV: '',
        ten: '',
        soDT: '',
        mail: ''
    },
    listStu: [],
    listSearch:[],
    isSearching:false,
    isDisable: false
}
export const manageStuReducer = (state = student, action) => {
    switch (action.type) {
        case 'HANDLE_INFOSTU':
            state.infoStu = action.info
            state.inputErrors = action.errors
            return { ...state }

        case 'ADD_STUDENT':
            state.isSearching = false
            state.listStu = [...state.listStu, action.info]
            return { ...state }
        case 'DELETE_STUDENT':
            state.listStu = state.listStu.filter(stu => stu.maSV !== action.info)
            //filter return new array
            return { ...state }
        case 'WATCH_STUDENT':
            state.infoStu = action.info
            state.isDisable = true
            return { ...state }
        case 'UPDATE_STUDENT':
            let arrUpate = [...state.listStu]
            let indexUpdate = arrUpate.findIndex(stu => stu.maSV === action.infoUpdate.maSV)
            arrUpate[indexUpdate] = action.infoUpdate
            state.listStu = arrUpate
            state.isDisable = false
            return { ...state }
        case 'SEARCH_STUDENT':

            state.isSearching = true
            let arrSearch = [...state.listStu]
            let indexSearch = arrSearch.findIndex(stu => stu.maSV === action.info)
            if (indexSearch !== -1) {
                state.listSearch = arrSearch.filter(stu => stu.maSV === action.info)
            }else{
                state.listSearch = state.listStu
            }
            return { ...state }
        default:
            return state;
    }
}