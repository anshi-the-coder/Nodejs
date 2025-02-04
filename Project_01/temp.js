let a= [1,2,3,4,5]

let arr=a.map((v)=>(v+1)).map((v)=>(v*v)).map((v)=>(v-10))
console.log(arr)

let ar= a.map((value)=>{
    return value+1 // 2,3,4,5,6
   }).map((value)=>{
    return value*value // 4,9,16,25,36
}).map((value)=>{
    return value-10 // -6,-1,6,15,26
})
console.log(ar)