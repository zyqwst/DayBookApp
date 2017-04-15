export class RestEntity{
    constructor(
        public errorCode:string,
        public status:number,
        public msg:string,
        public object:any
    ){}
}