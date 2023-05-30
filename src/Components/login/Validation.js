const errors={}
function Validation (inputs){
 


 if(inputs.email=" "){
     errors.email="email required"
 }

 if(inputs.password=" "){
     errors.password="password required"
 }

 return errors
}
export default Validation 
