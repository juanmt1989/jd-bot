

export const SaveUserInfo = async (sbUser:any) => {

    const userformation = {
        idcustomer: sbUser.username,
        solesid: null,
        fullname: sbUser.name,
        email: sbUser.email,
        refencelink: sbUser.link,
        lastverification: sbUser.date
    }

    try {
        const response = await fetch("http://localhost:5050/users", {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify(userformation),
        });
        if (response.ok) {
            const data = await response.json();
            return data.userid;
        } else {
            console.log(`HTTP error! status: ${response.status}`);
        }
    } catch (error) {
        console.log('A problem occurred adding or updating a record: ', error);
    }
  }



  export const SaveBotInfo = async (bot:any) => {

    try {
        const response = await fetch("http://localhost:5050/botusers", {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify(bot),
        });
        if (response.ok) {
            const data = await response.json();
            console.warn("SaveBotInfo")
            console.warn(data)
            return data.userid;
        } else {
            console.log(`HTTP error! status: ${response.status}`);
        }
    } catch (error) {
        console.log('A problem occurred adding or updating a record: ', error);
    }
  }


  export const GetBidRules = async () => {
    try {
        const response = await fetch("http://localhost:5050/bidrules?id=2");
        if (response.ok) {
            const data = await response.json();
            return data;
        } else {
            console.log(`HTTP error! status: ${response.status}`);
        }
    } catch (error) {
        console.log('A problem occurred adding or updating a record: ', error);
    }
  }