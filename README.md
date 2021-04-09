# Mini-Banking-System

### Setting it up
1. Install node `version 14.16.0`.
2. Install npm `version 6.14.11`.
3. Run `npm install`
4. Run `npm start`
5. server will be started on default port 8080

### The following table shows overview of the Rest APIs that will be exported:

- POST    `api/signup      `	             for creation of account
- POST    `api/login       `               to login into account by providing valid credentials `(Auth Token will be provided in response)`
- POST    `api/addMoney    `               for depositing money in the account `(Auth Token will be required in header)`
- POST    `api/transaction `               to carry out a transaction`(Auth Token will be required in header)`
- GET     `api/statement  `               for getting complete statement of the account transactions`(Auth Token will be required in header)`


### Sample Requests
- Signup     
{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"email":"anmolpathak8899@gmail.com",<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"password":"pass@123",<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"name":"Anmol Pathak",&nbsp;<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"mobileNumber":"9999999999",<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"address":"Andheri East, Mumbai"<br>}

- Login     
{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"email":"anmolpathak8899@gmail.com",<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"password":"pass@123"<br>}

- AddMoney  
{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"amount":10000 <br>}

- Transaction    
{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"accountNumber":"1617910920659",<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"amount":10000 <br>}

#### Note:
- Token-Key: `authorization`