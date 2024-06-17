class ResponseService {
    constructor(success, data,status = 500) {
      this.success = success;
      this.data = data;
      this.status = status;
    }
  
    getSuccess() {
      return this.success;
    }
  
    getData() {
      return this.data.message;
    }

    getStatus()
    {
        return this.status;
    }
  
    static createSuccessResponse(data,status) {
      return new ResponseService(true, data,status);
    }
  
    static createErrorResponse(message,status) {
      return new ResponseService(false, { message },status);
    }
  }

export default ResponseService;