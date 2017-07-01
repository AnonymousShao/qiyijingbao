import { init } from './index'

export function getHomeAdv() {
    return init.get('/home/ad').then(data=>{
        if(data){
            return data.res_body
        }
    })
}
