import Enumerable from 'linq'
import {jsontoArray} from '../../helpers/util'


const parserkey = "31b8f5b49e7c6e34f847976f173c96e8";

export const GetGenderByMail = async (email:string) => {
    try {
        const response = await fetch(`https://api.parser.name/?api_key=${parserkey}&endpoint=parse&email=${email}`);
        if (response.ok) {
            let  data = await response.json();
            data = jsontoArray(data);
            data =  Enumerable.from<any>(data)
                    .select(x => ({
                        gender : x.data[0].name.firstname.gender_formatted
                     })).toArray();

            return data[0]?.gender ;
        } else {
            return {error:'Failed to fetch data'};
        }
    } catch (error) {
        return {error: `Error fetching data: '${error}'`};;
    }
  
  }
  

  export const GetUserByGender = async (gender:string) => {
    try {
        let result ="";
        let  data :any;
        let attempts =3;
        while(gender !== result ||attempts>0){
            attempts --;
            let response = await fetch(`https://api.parser.name/?api_key=${parserkey}&endpoint=generate&gender_formatted=${gender}`);
            if (response.ok) {
                data = await response.json();
                data = jsontoArray(data);
                data =  Enumerable.from<any>(data)
                        .select(x => ({
                            nickname : x.data[0].name.firstname.name+ " " + checkLastName(x.data[0].name.lastname.name),
                            salutation: x.data[0].salutation.salutation + " " + x.data[0].salutation.lastname,
                            gender: x.data[0].name.firstname.gender_formatted
                        })).toArray();

                result = data[0]?.gender;
                if (gender === result){
                    break;
                }
            } else {
                return {error:'Failed to fetch data'};
            }          
        }

        return data ;
        
    } catch (error) {
        return {error: `Error fetching data: '${error}'`};;
    }
  
  }

  const checkLastName =(lastname:string)=>{

    return lastname.includes(" ") ? lastname.split(" ")[0] : lastname;

  }

