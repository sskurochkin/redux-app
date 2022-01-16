import { CREATE_POST } from "./types"

export const createPost = (post)=>{
    return {
        type: CREATE_POST,
        payload: post
    }
}