const MAKE_ACTIVE = "MAKE_ACTIVE"
const MAKE_DISACTIVE = "MAKE_DISACTIVE"

const defaultState = {
    id: 0, 
    isActive: false,

}

export default function isActiveButtonReducer(state=defaultState, action){
    switch (action.type){
        case MAKE_ACTIVE:
            return {
                id: action.payload.id,
                isActive: true
            }
        // case MAKE_DISACTIVE:
        //     return {
        //         isActive: false
        //     }
        default:
            return state
    }
}