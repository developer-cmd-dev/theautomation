export default class HttpResponse {

    public success:boolean;
    public message:string;
    public data:object|null=null;

    constructor(success: boolean, message: string, data: object|null=null) {
        this.success = success;
        this.message = message;
        this.data = data;
    }

}