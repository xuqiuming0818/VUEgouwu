import { v4 as uuidv4 } from 'uuid';
// 成功一个随机字符串，而且每次执行不发生变化，游客身份存储
export const getUUID = () =>{
    let uuid_token = localStorage.getItem('UUIDTOKEN')
    // 如果没有
    if (!uuid_token) {
        //生成临时身份
        uuid_token = uuidv4();
        localStorage.setItem('UUIDTOKEN',uuid_token)
    }
    return uuid_token
}