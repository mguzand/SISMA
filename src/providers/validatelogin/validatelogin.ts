export class ValidateloginProvider {
  
  constructor() {
     
  }
  
  public Token(){
    this.getDate()
  }


  getDate(){
    const date = new Date()
    const formatedDate = date.toISOString().substring(0, 10);
    console.log(formatedDate);
    return formatedDate;
  }

  getDateLogin(){
    const date = new Date()
    const formatedDate = date.toISOString().substring(0, 10);
    localStorage.setItem('Token', formatedDate);
  }



}
