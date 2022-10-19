interface Data {
    [key:string]:any
}
interface Query{
   createRecord:(data:Data)=>Data,
   findAll:()=>Data,
   find:(condition:Data)=>Data,
   deleteRecord:(id:string)=>Data
   
}
export class MongoQuery implements Query {
    private Model:any
    constructor(Model:any){
        this.Model = Model
    }
    async createRecord(data:Data){
         
       try {
        this.Model.create(data)
         return {
            success:true
         }
       } catch (error) {
         return {
            success:false,
            error,
         }
       }
    }
    async findAll(condition?:{[key:string]:any}){
      try {
        const res = await this.Model.find(condition)
        return {
         success:true,
         res
        }
      } catch (error) {
        return {
            success:false,
            error
        }
      }
    }
    async find(condition:Data){
        try {
          const res = await this.Model.findOne(condition)
          if(res){
            return {
              success:true,
              res
             }
          }
          return {
            success:false,
            error:"resource could not be found"
        }
        } catch (error) {
            return {
                success:false,
                error
            }
        }
      }
    async updateOne(condition:Data,newData:Data){
            try {
              await this.Model.updateOne(condition,newData)
              return {
                success:true,
            }
            } catch (error) {
                return {
                    success:false,
                    error
                }
            }
    }
    async deleteRecord(id: string){
        try {
            await this.Model.findByIdAndDelete(id)
            return {
                success:true,
            }
        } catch (error) {
            return {
                success:false,
                error
            }
        }
    };
}

