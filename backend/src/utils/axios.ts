import { BadRequestException, HttpException } from "@nestjs/common";
import { AxiosError, isAxiosError } from "axios";


export function formatAxiosError(error:AxiosError){
    if (!isAxiosError(error)) {
        throw new BadRequestException(error)
    }
    if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log(error.response.data);
        console.log(error.response.status);
        //console.log(error.response.headers);
        throw new HttpException(error.response.data,error.response.status)
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        console.log(error.request);
      } else {
        console.log('Error', error.message);
      }
      console.log(error.config);
}