import { useState } from "react"; 
import axios, { AxiosRequestConfig } from 'axios';

export interface GetBox  {
  id: number;
  boxName: string;
  agenda: string;
}

export interface GetChatBox {
  id: number;
  name: string;
  date: string;  
  imageUrl: string;
  content: string;
}

export interface GetBoxComment {
  id: number;
  name: string;
  date: string; 
  imageUrl: string;
  content: string;
}

export interface PostBox{
  boxName: string;
  agenda: string;
}

export interface PostChatBox {
  name:string;
  imageUrl?: string;
  content: string;
  boxId: number;
}

export interface PostBoxComment {
  name: string;
  imageUrl: string;
  content: string;
}

export interface PostBoxResponse {
  id: number;
  boxName: string;
  agenda: string;
}

export interface PostChatBoxResponse {
  id:number;
  date:string;
  name:string;
  imageUrl: string;
  content: string;
}

export interface PostBoxCommentResponse {
  id: number;
  name: string;
  date: string; 
  imageUrl: string;
  content: string;
}


export type GetBoxCommentResponse = GetBoxComment[];

export type GetChatBoxResponse = GetChatBox[];

export type GetBoxResponse = GetBox[];


interface DTOMapper {
  REQUEST:{
    GET: {
      ChatBox: GetChatBox;
      Box: GetBoxResponse;
      BoxComment: GetBoxComment;
    };
    POST: {
      ChatBox: PostChatBox;
      Box: PostBox ;
      BoxComment: GetBoxComment;
    };
  };
  RESPONSE: {
    GET: {
      ChatBox: GetChatBoxResponse;
      Box: GetBoxResponse;
      BoxComment: GetBoxCommentResponse;
    };
    POST: {
      ChatBox: PostChatBoxResponse;
      Box: PostBoxResponse;
      BoxComment: PostBoxCommentResponse;
    };
  };
}

const urlMap = {
  Box: "/api/Boxes",
  BoxComment: "/api/BoxComments",
  ChatBox: "/api/ChatBoxes" 
} as const;

const baseUrl = "https://localhost:44330";

type Method = "GET" | "POST"; // Add more methods when needed.
type ModelKey = keyof DTOMapper['REQUEST'][Method];

const createRequest = async <M extends Method, K extends ModelKey>(
  modelKey: K,
  method: M,
  options?: { queryParams?: string; headers?: Record<string, string>; body?: DTOMapper['REQUEST'][M][K];  }
): Promise<DTOMapper['RESPONSE'][M][K]> => {
  try {
    const config: AxiosRequestConfig = {
      method,
      url: `${baseUrl}${urlMap[modelKey]}${options?.queryParams || ""}`,
      headers: options?.headers,
      data: options?.body,
    };
    
    const response = await axios(config);  
    if(response.status < 200 || response.status >= 400){
      throw new Error("Something went wrong...");
    }
    return response.data as DTOMapper['RESPONSE'][M][K];
  } catch (error) {
    throw error;
  }
};

export const useAPI = <M extends Method, K extends ModelKey>(
  modelKey: K,
  method: M,
  options?: { headers?: Record<string, string>; body?: DTOMapper['REQUEST'][M][K]; queryParams?: string; }
): [
  () => Promise<DTOMapper['RESPONSE'][M][K] | []>,  
  boolean,  
  string | null  
] => {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetchData = async (): Promise<DTOMapper['RESPONSE'][M][K] | []> => {
    setIsLoading(true);
    try { 
      const result = await createRequest(modelKey, method, options); 
      return result; 
    } catch (err) {
      setError((err as Error).message);
      return [];
    } finally {
      setIsLoading(false); 
    }
  };

  return [fetchData, isLoading, error];
};

export default useAPI;
