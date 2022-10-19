interface Validator{
    inputType:string,
    inputName?:string,
    inputField:string|number|undefined

}

export function validateFields(validator:Validator[]){
    function isEmpty(field:string){
       field = field.toString().toLowerCase()
       return field.startsWith(" ") || field.endsWith(" ") || field.includes(" ")
    }
    function addErrors(errorArray:any[],message:string,fieldType:string){
        errorArray.push({
            field:fieldType.toLowerCase(),
            error:`${fieldType} ${message}`
          })
    }
    function matchFormat(field:string,regex:RegExp){
      return field.toString().match(regex) === null
    }
  
    let errors:any[] = []
    const fieldTypeObject:{[key:string]:any} = {
       email:{
         emailRegex:/[\w+]\@\w+\.\w+(\.\w+)?$/gi,
         validate(field:string,fieldName='Email'){
          if(isEmpty(field)){
            addErrors(errors,"must not be empty or contain whitespace",fieldName)
          }
          else if(matchFormat(field,this.emailRegex)){
            addErrors(errors,"format invalid",fieldName)
          }
         }
       },
       password:{
         validate(field=" ",fieldName="Password"){
           if(isEmpty(field)){
            addErrors(errors,"must not be empty or contain whitespace",fieldName)
           }
           else if(field.length < 8){
            addErrors(errors,"must be atleast 8 characters long",fieldName)
           }
           else if(matchFormat(field,/[@|#]+/g) || (matchFormat(field,/\d+/g))){
            addErrors(errors,"must contain atleast a number and special characters like(@, _, #) ","Password")
           }
         }
       },
       username:{
        validate(field=" ",fieldName="Username"){
          if(isEmpty(field)){
            addErrors(errors,"must not be empty or contain whitespace",fieldName)
          }
          else if(matchFormat(field,/\w+/gi) || field.includes(" ")){
            addErrors(errors,"must not contain only alphabets and numbers",fieldName)
          }
        }
       },
       number:{
        validate(field="",fieldName="Number"){
          if(isEmpty(field)){
            addErrors(errors,"must not be empty",fieldName)
          }
          else if(field.toString().match(/[0-9|.]+/g) === null){
            addErrors(errors,"must contain only numbers",fieldName)
          }
        }
       },
       text:{
        validate(field=" ",fieldName="Text"){
          if(field.startsWith(" ")|| field.endsWith(" ")){
            addErrors(errors,"must not be empty",fieldName)
          }
          else if(field.length < 3){
            addErrors(errors,"must atleast be 3 characters long",fieldName)
          }
          else if(field.match(/[\d|@|_|#|$|%|!|&]+/g) !== null){
            addErrors(errors,"must contain only alphabets",fieldName)
          }
        }
       },
       word:{
        validate(field=" ",fieldName="Text"){
          if(isEmpty(field)){
            addErrors(errors,"must not be empty",fieldName)
          }
          else if(field.length < 2){
            addErrors(errors,"must atleast be 2 characters long",fieldName)
          }
          else if(field.match(/[\d|@|_|#|$|%|!|&]+/g) !== null){
            addErrors(errors,"must contain only alphabets",fieldName)
          }
        }
       },
        address:{
        validate(field=" ",fieldName="Address"){
          if(field.startsWith(" ")|| field.endsWith(" ")){
            addErrors(errors,"must not be empty",fieldName)
          }
          else if(field.length < 3){
            addErrors(errors,"must atleast be 3 characters long",fieldName)
          }
          else if(field.match(/[|@||#|$|%|!|&]+/g) !== null){
            addErrors(errors,"must contain only alphabets numbers or _ and -",fieldName)
          }
        }
       }
     }
   
    if(validator.length > 0){
        validator.forEach((input=>{
            const {inputType,inputField,inputName} = input
            const index = inputType.toLowerCase().replace(" ","_") as string
            fieldTypeObject[index].validate(inputField,inputName)
        }))
    }
    else{
        errors.push({message:"no fields to validate"})
    }
     return errors
   }

    export function checkEmpty(field:string){
      field = field.toLowerCase()
      return field.startsWith(" ") || field.endsWith(" ") || field.includes(" ") || field == ""
    }
    export function matchFormat(field:string,regex:RegExp){
      return field.match(regex) === null
    }