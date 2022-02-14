// import Axios  from "axios";
const Axios = require('axios').default

let instance = Axios.create({baseURL:"https://sandeza-inc-407115342556510629.myfreshworks.com/crm/sales/api",
                headers: {
                    'Access-Control-Allow-Origin' : 'https://sandeza-inc-407115342556510629.myfreshworks.com',
                    'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS',
                    'Authorization':'Token token=VMrpkSCFyxB8YX3arc34lg',   
                },
                withCredentials: true,
                timeout: 1000 * 5});

export default {


async  getContactList(){
    try{



    // let requestURL = ;
    // let config 

    let result = await instance.get(`/contacts/view/70002389601`)

    let contacts = result.data.contacts

    
   
    let phoneVerification = contacts.filter(contact => contact.work_number != null)

    let contactList
    for (i=0;i < phoneVerification.length;i++){
       
        contactList = {
            "id": phoneVerification[i].id,
            "name":phoneVerification[i].display_name,
            "phone":phoneVerification[i].work_number
                    
        }
    }
    console.log(contactList)
    return contactList
}catch(err){
    console.log(err)
}


}
//  getContactList() {
//     return new Promise((resolve, reject) => {
//      instance.get(`/contacts/view/70002389601`)
//       .then(function (result) {
//           console.log(result.data)
//           return result.data
      
//       })
//       .catch(function (error) {
//        resolve(error);
//       });
  
//     });
//    }

}

// getContactList()
