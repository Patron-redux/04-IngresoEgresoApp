
export class User {
  public nombre: string;
  public email: string;
  public uid: string;

  constructor(Obj:DataObj){
    this.nombre = Obj && Obj.nombre || null ;
    this.email =  Obj && Obj.email || null ;
    this.uid =  Obj && Obj.uid || null ;
  }
}
interface DataObj{
  nombre:string;
  email:string;
  uid:string;
}
