import Axios, { AxiosInstance } from "axios";

export class TypicodeService {
  private axiosClient: AxiosInstance;

  constructor() {
    this.axiosClient = Axios.create({ baseURL: "https://jsonplaceholder.typicode.com" });
  }

  public getTodos = async (): Promise<void> => {
    try {
      const response = await this.axiosClient.get("/todos");
      return response.data;
    } catch (error: unknown) {
      console.error("Couldn't get todos from typicode");
      console.error(error);
      throw error;
    }
  };
}

export const init = () => {
  return new TypicodeService();
};

export default init;