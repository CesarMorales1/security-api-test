class ResponseApi {
    constructor() {
      if (!ResponseApi.instance) {
        ResponseApi.instance = this;
      }
      return ResponseApi.instance;
    }
  
    success(res, data, message = "Success", status = 200) {
      res.status(status).send({
        status,
        message,
        data,
        error: null
      });
    }
  
    error(res, message = "An error occurred", status = 500, error = null,data = 'un error ah ocurrido') {
      res.status(status).send({
        status,
        message,
        data: data,
        error
      });
    }
  }
  
  // Asegurarse de que solo hay una instancia
  const responseHandler = new ResponseApi();
  Object.freeze(responseHandler);
  
export default responseHandler;