/**
 * @date 2018-1-22
 * 根据编号查询所需数据
 * @param {any} id 查询的编号
 * @param {any} arr 查询的原始数据
 */
export const getValueById = (id,arr)=>{
    let obj = {};
    arr.map(data=>{
        const index = Object.values(data).indexOf(id);
        if(index>-1){
            obj = data
        }
    })
    return obj;
}