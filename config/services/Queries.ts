import {Model, ModelStatic, Options} from 'sequelize'

interface Data {
    [key:string]:any
}
interface Query{
   createRecord:(data:Data)=>Promise<Data>,
   findAll:()=>Promise<Data>,
   find:(condition:Data)=>Promise<Data>
   updateOne:(condition:Data,newData:Data)=>Promise<Data>
   deleteRecord:(id:string| Data)=>Promise<Data>
   
}


export class SQLQuery implements Query{
  private QueryModel:ModelStatic<Model>;

  constructor(QueryModel:any){
     this.QueryModel = QueryModel
  }
  async createRecord(data: Data){
    try {
     await  this.QueryModel.create({...data})
     return {
      success:true
     }
    } catch (error) {
      return {
        success:false,
        error,
     }
    }
  };
  async updateOne(condition:Data | Options,newData:Data){
    try {
     await this.QueryModel.update({...newData},{
      where:{...condition}
     })
     return {
      success:true
     }
    } catch (error) {
      return {
        success:false,
        error,
     }
    }
  };
  async find(condition: Data){
    try {
      const res = (await this.QueryModel.findOne(condition?{where:condition}:{where:{}}))?.get()
      return {
        success:true,
        res
      }
    } catch (error) {
      return {
        success:false,
        error,
     }
    }
  };
  async findAll(condition?:{[key:string]:any}){
    try {
      const res = (await this.QueryModel.findAll(condition?{where:condition}:{where:{}}))
      return {
        success:true,
        res,
      }
    } catch (error) {
      return {
        success:false,
        error,
     }
    }
  };
  async deleteRecord(id:string| Data){
    try {
      const condition = id as Data
      await this.QueryModel.destroy({where:{condition}})
      return {
        success:false,
      }
    } catch (error) {
      return {
        success:false,
        error,
     }
    }
  };
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
    async deleteRecord(id: string | Data){
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

